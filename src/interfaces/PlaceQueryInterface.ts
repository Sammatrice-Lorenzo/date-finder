export interface PlaceQueryInterface {
  location: string,
  term: string,
  longitude: string | null,
  latitude: string | null,
  category: string,
  radius?: string,
}