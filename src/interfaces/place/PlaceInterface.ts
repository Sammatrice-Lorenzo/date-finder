import ActivityInterface from '../activity/ActivityInterface'

export default interface PlaceInterface extends ActivityInterface {
  image_url: string,
  rating: number,
  price?: string,
  distance: number,
  display_phone: string,
}