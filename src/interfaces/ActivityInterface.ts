import LocationActivityInterface from "./LocationActivityInterface";

export default interface ActivityInterface {
  id: string,
  name: string,
  location: LocationActivityInterface
}