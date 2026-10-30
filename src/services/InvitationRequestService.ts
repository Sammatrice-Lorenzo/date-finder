import type { z } from 'zod'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { UrlActivityGeneratorService } from './UrlActivityGeneratorService'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
/** Durée de vie du JWT d'invitation (JWTService : expiresIn 24h) */
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000

export type InvitationRequestResult<T> =
  | { status: 'ok'; body: T; activity: ActivityQueryProps }
  | { status: 'invalid' }
  | { status: 'rate-limited' }

/**
 * Protège les routes qui envoient des emails (/api/event, /api/invite-refused) :
 * corps validé, activité relue depuis le token signé, token à usage unique, limite par IP.
 * L'état est en mémoire : il est perdu au redémarrage et propre à chaque instance du serveur.
 */
export default class InvitationRequestService {
  private _usedTokens: Map<string, number> = new Map()
  private _requestsByIp: Map<string, number[]> = new Map()
  private _now: () => number

  constructor(now: () => number = Date.now) {
    this._now = now
  }

  public async parseRequest<T extends { token: string }>(
    req: Request,
    schema: z.ZodType<T, z.ZodTypeDef, unknown>
  ): Promise<InvitationRequestResult<T>> {
    this.purgeExpired()
    if (this.isRateLimited(this.getClientIp(req))) {
      return { status: 'rate-limited' }
    }

    const parsedBody = schema.safeParse(await req.json().catch(() => null))
    if (!parsedBody.success || this._usedTokens.has(parsedBody.data.token)) {
      return { status: 'invalid' }
    }

    const activity: ActivityQueryProps | null =
      new UrlActivityGeneratorService().decodeParametersRouteRequestActivity(parsedBody.data.token)

    return activity ? { status: 'ok', body: parsedBody.data, activity } : { status: 'invalid' }
  }

  /** À appeler après un envoi réussi : une invitation ne peut être acceptée ou refusée qu'une fois */
  public markTokenUsed(token: string): void {
    this._usedTokens.set(token, this._now() + TOKEN_TTL_MS)
  }

  private isRateLimited(ip: string): boolean {
    const windowStart: number = this._now() - RATE_LIMIT_WINDOW_MS
    const requests: number[] = (this._requestsByIp.get(ip) ?? []).filter(time => time > windowStart)
    requests.push(this._now())
    this._requestsByIp.set(ip, requests)

    return requests.length > RATE_LIMIT_MAX_REQUESTS
  }

  private getClientIp(req: Request): string {
    const forwardedFor: string | null = req.headers.get('x-forwarded-for')

    return forwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  }

  private purgeExpired(): void {
    const now: number = this._now()
    for (const [token, expiresAt] of this._usedTokens) {
      if (expiresAt <= now) this._usedTokens.delete(token)
    }

    for (const [ip, requests] of this._requestsByIp) {
      if (requests.every(time => time <= now - RATE_LIMIT_WINDOW_MS)) this._requestsByIp.delete(ip)
    }
  }
}

export const invitationRequestService: InvitationRequestService = new InvitationRequestService()
