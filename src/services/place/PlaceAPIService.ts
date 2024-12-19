import PlaceFormatter from '@/formatters/PlaceFormatter'
import { Location } from '@/interfaces/Location'
import PlaceAPIInterface from '@/interfaces/place/PlaceAPIInterface'
import PlaceInterface from '@/interfaces/place/PlaceInterface'

export default class PlaceAPIService {

  private static async convertData(place: PlaceAPIInterface, locationUser: Location): Promise<PlaceInterface>
  {
    const apiKey: string | undefined = process.env.GOOGLE_PLACES_API_KEY
    const urlAPI: string | undefined = process.env.GOOGLE_PLACE_API
    const detailsUrl: string = `${urlAPI}details/json?place_id=${place.place_id}&fields=formatted_phone_number,photos&key=${apiKey}`
    const detailsResponse = await fetch(detailsUrl)
    const details = await detailsResponse.json()
  
    if (details.status !== 'OK') {
      throw new Error(`Failed to get details for place: ${place.place_id}`)
    }
  
    return PlaceFormatter.convertDataFromAPIToPlace(place, details.result, locationUser)
  }

  public static async getDataAPI(data: PlaceAPIInterface[], userLocation: Location): Promise<{
    convertedResults: PlaceInterface[]
    cache: {
      data: PlaceInterface[]
      timestamp: number
    }
  }>
  {
    const convertedResults: PlaceInterface[] = []
    for (const result of data) {
      const place: PlaceInterface = await PlaceAPIService['convertData'](result, userLocation)
      convertedResults.push(place)
    }

    return {
      convertedResults,
      cache: {
        data: convertedResults,
        timestamp: Date.now(),
      }
    }
  }
}