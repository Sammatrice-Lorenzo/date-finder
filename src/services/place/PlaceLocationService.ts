import type { Location } from '@/interfaces/Location'

export default class PlaceLocationService {
  public async getLatitudeLongitudeByLocation(location: string | null, apiKey: string): Promise<Location> {
    const geocodeUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json'
    const geocodeParams: URLSearchParams = new URLSearchParams({
      address: location || 'Paris',
      key: apiKey,
    })

    const geocodeResponse: Response = await fetch(`${geocodeUrl}?${geocodeParams.toString()}`)
    const geocodeData = await geocodeResponse.json()
    if (geocodeData.status !== 'OK') {
      throw new Error(`Failed to get coordinates for location: ${location}, status: ${geocodeData.status}`)
    }

    const locationCity: Location = {
      latitude: geocodeData.results[0].geometry.location.lat,
      longitude: geocodeData.results[0].geometry.location.lng,
    }

    return locationCity
  }
}
