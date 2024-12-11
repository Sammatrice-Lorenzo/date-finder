export interface RestaurantQueryInterface {
  location: string,
  term: string,
  longitude: string | null,
  latitude: string | null,
  category: string
}