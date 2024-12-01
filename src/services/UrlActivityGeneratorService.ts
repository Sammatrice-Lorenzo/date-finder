import LocationFormatter from "@/formatters/LocationFormatter"
import ActivityInterface from "@/interfaces/ActivityInterface"
import JWTService from "./JWTServices"
import { ActivityQueryProps } from "@/types/ActivityQueryProps"

export class UrlActivityGeneratorService {

  public static generateParametersActivityForShare(activity: ActivityInterface, formJson: Record<string, string>): string
  {
    const dateFormatted: Date = new Date(formJson['date'].toString())
    const route: ActivityQueryProps = {
      activityId: encodeURIComponent(activity.id),
      activityName: encodeURIComponent(activity.name),
      authorName: encodeURIComponent(formJson['author-name'].toString()),
      authorEmail: encodeURIComponent(formJson['author-email'].toString()),
      targetName: encodeURIComponent(formJson['target-name'].toString()),
      date: encodeURIComponent(`${dateFormatted.toLocaleDateString()} ${dateFormatted.toLocaleTimeString()}`),
      location: encodeURIComponent(LocationFormatter.getAddressBusinessActivity(activity.location))
    }

    return JWTService.generateToken(route)
  }

  public static decodeParametersRouteRequestActivity(token: string): ActivityQueryProps | null
  {
    const routerParameters: ActivityQueryProps | null = JWTService.getDecodedToken(token)
    if (!routerParameters) {
      return null
    }

    return {
      activityId: decodeURIComponent(routerParameters.activityId),
      activityName: decodeURIComponent(routerParameters.activityName),
      authorName: decodeURIComponent(routerParameters.authorName),
      authorEmail: decodeURIComponent(routerParameters.authorEmail),
      targetName: decodeURIComponent(routerParameters.targetName),
      date: decodeURIComponent(routerParameters.date),
      location: decodeURIComponent(routerParameters.location)
    }
  }
}