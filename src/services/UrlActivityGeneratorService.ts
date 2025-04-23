import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import JWTService from './JWTServices'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import DateFormatter from '@/formatters/DateFormatter'
import type { Payload } from '@/types/Payload'

export class UrlActivityGeneratorService {
  private _jwtService: JWTService

  constructor() {
    this._jwtService = new JWTService()
  }

  public generateParametersActivityForShare(
    activity: ActivityInterface,
    formJson: Record<string, string>
  ): string {
    const dateFormatted: Date = new Date(formJson.date)
    const dateEuropean: string = new DateFormatter().getDateEuropeanFormat(dateFormatted)

    const route: ActivityQueryProps = {
      activity: encodeURIComponent(activity.name),
      author: encodeURIComponent(formJson['author-name'].toString()),
      authorEmail: encodeURIComponent(formJson['author-email'].toString()),
      target: encodeURIComponent(formJson['target-name'].toString()),
      date: encodeURIComponent(`${dateEuropean}`),
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
