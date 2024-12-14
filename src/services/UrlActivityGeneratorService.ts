import LocationFormatter from '@/formatters/LocationFormatter'
import ActivityInterface from '@/interfaces/ActivityInterface'
import JWTService, { Payload } from './JWTServices'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import DateFormatter from '@/formatters/DateFormatter'

export class UrlActivityGeneratorService {

  public static generateParametersActivityForShare(activity: ActivityInterface, formJson: Record<string, string>): string
  {
    const dateFormatted: Date = new Date(formJson['date'].toString())
    const dateEuropean: string = DateFormatter.getDateEuropeanFormat(dateFormatted)

    const route: ActivityQueryProps = {
      activity: encodeURIComponent(activity.name),
      author: encodeURIComponent(formJson['author-name'].toString()),
      authorEmail: encodeURIComponent(formJson['author-email'].toString()),
      target: encodeURIComponent(formJson['target-name'].toString()),
      date: encodeURIComponent(`${dateEuropean}`),
      location: encodeURIComponent(LocationFormatter.getAddressBusinessActivity(activity.location))
    }

    return JWTService.generateToken(route)
  }

  public static decodeParametersRouteRequestActivity(token: string): ActivityQueryProps | null
  {
    const routerParameters: Payload | null = JWTService.getDecodedToken(token)
    if (!routerParameters) {
      return null
    }

    return {
      activity: decodeURIComponent(routerParameters.a),
      author: decodeURIComponent(routerParameters.auth),
      authorEmail: decodeURIComponent(routerParameters.e),
      target: decodeURIComponent(routerParameters.t),
      date: decodeURIComponent(routerParameters.d),
      location: decodeURIComponent(routerParameters.l)
    }
  }
}