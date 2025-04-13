import InformationProviderInterface from './InformationProviderInterface'

export default interface MovieCountryInformationInterface {
  link: string;
  rent?: InformationProviderInterface[];
  buy?: InformationProviderInterface[];
  flatrate?: InformationProviderInterface[];
}