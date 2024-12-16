import ActivityInterface from './ActivityInterface'

export default interface PlaceInterface extends ActivityInterface {
  id: string,
  name: string,
  location: string,
  image_url: string;
  rating: number;
  price?: string;
  distance: number;
  display_phone: string,
}