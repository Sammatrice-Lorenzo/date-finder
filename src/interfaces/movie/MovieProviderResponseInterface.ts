import type { CountryEnum } from '@/enums/CountryEnum'
import type MovieCountryInformationInterface from './MovieCountryInformationInterface'
import { ProviderInterface } from '../provider/ProviderInteface'

export type CountryInformationMap = {
  [country in keyof typeof CountryEnum]: MovieCountryInformationInterface
}

export default interface MovieProviderResponseInterface {
  id: number
  results?: CountryInformationMap | ProviderInterface[]
}
