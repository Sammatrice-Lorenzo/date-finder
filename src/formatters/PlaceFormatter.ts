import type DetailsPlaceAPIInterface from '@/interfaces/api/DetailsPlaceAPIInterface'
import type { Location } from '@/interfaces/Location'
import type PlaceAPIInterface from '@/interfaces/place/PlaceAPIInterface'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import haversine from 'haversine'

export default class PlaceFormatter {
  private getPriceFormatted(place: PlaceAPIInterface): string {
    let priceFormatted = ''
    for (let index = 0; index < place.price_level; index++) {
      priceFormatted += '€'
    }

    return priceFormatted
  }

  public async convertDataFromAPIToPlace(
    place: PlaceAPIInterface,
    details: DetailsPlaceAPIInterface,
    locationUser: Location
  ): Promise<PlaceInterface> {
    const urlAPI: string | undefined = process.env.GOOGLE_PLACE_API
    const apiKey: string | undefined = process.env.GOOGLE_PLACES_API_KEY

    const photoUrl: string = details.photos
      ? `${urlAPI}photo?maxwidth=400&photoreference=${details.photos[0].photo_reference}&key=${apiKey}`
      : ''

    const placeLocation: Location = {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    }
    const phone: string | null = details.formatted_phone_number

    return {
      id: place.place_id,
      name: place.name,
      location: place.vicinity,
      rating: place.rating,
      image_url: photoUrl,
      display_phone: phone || '',
      price: this.getPriceFormatted(place),
      distance: haversine(locationUser, placeLocation),
    }
  }
}
