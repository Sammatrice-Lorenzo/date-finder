import { CountryEnum } from "@/enums/CountryEnum";
import InformationProviderInterface from "./InformationProviderInterface";
import MovieCountryInformationInterface from "./MovieCountryInformationInterface";

export type CountryInformationMap = {
  [country in keyof typeof CountryEnum]: MovieCountryInformationInterface;
}

export default interface MovieProviderResponseInterface {
  id: number;
  results?: CountryInformationMap
}
