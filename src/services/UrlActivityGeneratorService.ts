import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import JWTService from './JWTServices'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import type { Payload } from '@/types/Payload'
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'

export class UrlActivityGeneratorService {
  private _jwtService: JWTService

  constructor() {
    this._jwtService = new JWTService()
  }

  public generateParametersActivityForShare(
    activity: ActivityInterface,
    formJson: FormRequestActivityInterface
  ): string {
    const date: Date = new Date(formJson.date ?? new Date())
    const dateFormatted: string = date.toUTCString()

    const route: ActivityQueryProps = {
      activity: activity.name,
      author: formJson['author-name'],
      authorEmail: formJson['author-email'],
      target: formJson['target-name'],
      date: `${dateFormatted}`,
      location: activity.location,
    }

    return this._jwtService.generateToken(route)
  }

  public decodeParametersRouteRequestActivity(token: string): ActivityQueryProps | null {
    const routerParameters: Payload | null = this._jwtService.getDecodedToken(token)
    if (!routerParameters) {
      return null
    }

    return {
      activity: routerParameters.a,
      author: routerParameters.o,
      authorEmail: routerParameters.e,
      target: routerParameters.t,
      date: routerParameters.d,
      location: routerParameters.l,
    }
  }
}
