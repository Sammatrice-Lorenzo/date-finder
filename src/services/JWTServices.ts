import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import jwt from 'jsonwebtoken'

const ERROR_JWT: string = 'JWT_KEY is not defined'

export default class JWTService {
  public static generateToken(payload: ActivityQueryProps): string
  {
    const options: jwt.SignOptions = {
      expiresIn: '1h',
      issuer: 'date-finder',
    }

    const secretKey: string | undefined = process.env.JWT_KEY
    if (!secretKey) {
      throw new Error(ERROR_JWT)
    }

    return jwt.sign(payload, secretKey, options)
  }

  public static isValidToken(token: string): boolean
  {
    const secretKey: string | undefined = process.env.JWT_KEY
    if (!secretKey) {
      throw new Error(ERROR_JWT)
    }

    try {
      jwt.verify(token, secretKey)
      return true
    } catch (error) {
      console.error('Invalid or expired token:', (error as Error).message)
    }

    return false
  }

  public static getDecodedToken(token: string): ActivityQueryProps | null
  {
    const secretKey: string | undefined = process.env.JWT_KEY
    if (!secretKey) {
      throw new Error(ERROR_JWT)
    }

    if (!this.isValidToken(token)) return null

    return jwt.verify(token, secretKey) as unknown as ActivityQueryProps
  }
}