import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import type { Payload } from '@/types/Payload'
import jwt from 'jsonwebtoken'

const ERROR_JWT: string = 'JWT_KEY is not defined'

export default class JWTService {
  private replaceToken(token: string, searchValue: string, replaceValue: string): string {
    return token.replace(searchValue, replaceValue)
  }

  public generateToken(payload: ActivityQueryProps): string {
    const options: jwt.SignOptions = {
      expiresIn: '24h',
    }

    const compressedPayload: Payload = {
      a: payload.activity,
      o: payload.author,
      e: payload.authorEmail,
      t: payload.target,
      d: payload.date,
      l: payload.location,
    }

    const secretKey: string | undefined = process.env.JWT_KEY
    if (!secretKey) {
      throw new Error(ERROR_JWT)
    }

    return this.replaceToken(jwt.sign(compressedPayload, secretKey, options), '.', '_')
  }

  public isValidToken(token: string): boolean {
    const secretKey: string | undefined = process.env.JWT_KEY
    if (!secretKey) {
      throw new Error(ERROR_JWT)
    }

    const tokenReplaced: string = this.replaceToken(token, '_', '.')

    try {
      jwt.verify(tokenReplaced, secretKey)
      return true
    } catch (error) {
      console.error('Invalid or expired token:', (error as Error).message)
    }

    return false
  }

  public getDecodedToken(token: string): Payload | null {
    const secretKey: string | undefined = process.env.JWT_KEY
    if (!secretKey) {
      throw new Error(ERROR_JWT)
    }

    if (!this.isValidToken(token)) return null
    const tokenReplaced: string = this.replaceToken(token, '_', '.')

    return jwt.verify(tokenReplaced, secretKey) as unknown as Payload
  }
}
