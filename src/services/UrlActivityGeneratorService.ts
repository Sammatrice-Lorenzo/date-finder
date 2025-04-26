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
      activity: encodeURIComponent(activity.name),
      author: encodeURIComponent(formJson['author-name']),
      authorEmail: encodeURIComponent(formJson['author-email']),
      target: encodeURIComponent(formJson['target-name']),
      date: encodeURIComponent(`${dateFormatted}`),
      location: encodeURIComponent(activity.location),
    }

    return this._jwtService.generateToken(route)
  }

  public decodeParametersRouteRequestActivity(token: string): ActivityQueryProps | null {
    const routerParameters: Payload | null = this._jwtService.getDecodedToken(token)
    if (!routerParameters) {
      return null
    }

    return {
      activity: decodeURIComponent(routerParameters.a),
      author: decodeURIComponent(routerParameters.o),
      authorEmail: decodeURIComponent(routerParameters.e),
      target: decodeURIComponent(routerParameters.t),
      date: decodeURIComponent(routerParameters.d),
      location: decodeURIComponent(routerParameters.l),
    }
  }
}
