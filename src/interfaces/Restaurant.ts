import ActivityInterface from "./ActivityInterface";
import LocationActivityInterface from "./LocationActivityInterface";

export interface Restaurant extends ActivityInterface {
  id: string
  alias: string,
  name: string;
  image_url: string;
  rating: number;
  price: string;
  distance: number;
  categories: { title: string }[];
  is_closed: false,
  url: string,
  review_count: number,
  transactions: [],
  phone: string,
  display_phone: string,
  business_hours: [],
  location: LocationActivityInterface
}