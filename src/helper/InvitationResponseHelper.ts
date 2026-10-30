import { NextResponse } from 'next/server'
import { createTranslator } from 'next-intl'
import type { InvitationRequestResult } from '@/services/InvitationRequestService'

export default class InvitationResponseHelper {
  /** Réponse d'erreur pour une requête d'invitation refusée */
  public getErrorResponse(
    result: Exclude<InvitationRequestResult<unknown>, { status: 'ok' }>,
    translateError: ReturnType<typeof createTranslator>
  ): NextResponse<{ message: string }> {
    if (result.status === 'rate-limited') {
      return NextResponse.json({ message: translateError('TOO_MANY_REQUESTS') }, { status: 429 })
    }

    return NextResponse.json({ message: translateError('INVALID_REQUEST') }, { status: 400 })
  }

  /** Premier code d'erreur Brevo, 202 si tous les emails sont partis */
  public getSendStatus(codes: number[]): number {
    return codes.find(code => code !== 202) ?? 202
  }
}
