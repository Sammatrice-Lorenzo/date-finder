import type { Location } from '@/interfaces/Location'
import type { PlaceQueryInterface } from '@/interfaces/PlaceQueryInterface'
import PlaceLocationService from './PlaceLocationService'

export default class PlaceUrlService {
  private getParameters(requestParameters: PlaceQueryInterface, apiKey: string): URLSearchParams {
    return new URLSearchParams({
      location: `${requestParameters.latitude},${requestParameters.longitude}`,
      radius: requestParameters.radius?.toString() ?? '5000',
      type: requestParameters.category,
      key: apiKey,
      keyword: requestParameters.category,
      // rankby: 'prominence'
    })
  }

  public async getPlacesUrl(requestParameters: PlaceQueryInterface): Promise<string> {
    const baseUrl: string = `${process.env.GOOGLE_PLACE_API}nearbysearch/json`
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      throw new Error('Google Places API key is missing')
    }

    if (!requestParameters.latitude || requestParameters.location) {
      const locationCity: Location = await PlaceLocationService.getLatitudeLongitudeByLocation(
        requestParameters.location,
        apiKey
      )
      requestParameters.latitude = locationCity.latitude.toString()
      requestParameters.longitude = locationCity.longitude.toString()
    }

    const queryParams: URLSearchParams = this.getParameters(requestParameters, apiKey)
    if (requestParameters.term) {
      queryParams.set('keyword', requestParameters.term)
    }

    return `${baseUrl}?${queryParams.toString()}`
  }
}
