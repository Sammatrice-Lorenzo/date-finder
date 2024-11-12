import LocationActivityInterface from "@/interfaces/LocationActivityInterface";

export default class LocationFormatter
{
  public static getAddressBusinessActivity(businessLocation: LocationActivityInterface): string
  {
    return `${businessLocation.address1} ${businessLocation.city} ${businessLocation.zip_code}`
  }
}