import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import type { Location } from '@/interfaces/Location'

export default class PlaceParametersService {
  public buildPlaceOptions(
    userLocation: Location | null,
    searchLocation: string,
    searchTerm: string,
    category: string
  ): ApiRequestInterface {
    return {
      url: '/api/places/',
      method: 'POST',
      body: JSON.stringify({
        location: searchLocation,
        term: searchTerm,
        longitude: userLocation?.longitude,
        latitude: userLocation?.latitude,
        category,
      }),
    }
  }
}
