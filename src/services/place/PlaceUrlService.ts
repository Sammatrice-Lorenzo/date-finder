import { Location } from "@/interfaces/Location"
import { PlaceQueryInterface } from "@/interfaces/PlaceQueryInterface"
import PlaceLocationService from "./PlaceLocationService"

export default class PlaceUrlService {
  
  private static getParameters(requestParameters: PlaceQueryInterface, apiKey: string): URLSearchParams
  {
    return new URLSearchParams({
      location: `${requestParameters.latitude},${requestParameters.longitude}`,
      radius: requestParameters.radius?.toString() ?? '5000',
      type: requestParameters.category || 'restaurant',
      key: apiKey,
      keyword: 'restaurant'
      // rankby: 'prominence'
    })
  }

  public static async getPlacesUrl(requestParameters: PlaceQueryInterface): Promise<string> {
    const baseUrl: string = `${process.env.GOOGLE_PLACE_API}nearbysearch/json`
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      throw new Error('Google Places API key is missing')
    }
  
    if (!requestParameters.latitude || requestParameters.location) {
      const locationCity: Location = await PlaceLocationService.getLatitudeLongitudeByLocation(requestParameters.location, apiKey)
      requestParameters.latitude = locationCity.latitude.toString()
      requestParameters.longitude = locationCity.longitude.toString()
    }

    const queryParams: URLSearchParams = PlaceUrlService['getParameters'](requestParameters, apiKey)
    if (requestParameters.term) {
      queryParams.append('keyword', requestParameters.term)
    }

    return `${baseUrl}?${queryParams.toString()}`
  }
}