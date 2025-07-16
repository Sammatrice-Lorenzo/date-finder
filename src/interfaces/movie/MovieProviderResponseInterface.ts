import type { CountryEnum } from '@/enums/CountryEnum'
import type MovieCountryInformationInterface from './MovieCountryInformationInterface'

export type CountryInformationMap = {
  [country in keyof typeof CountryEnum]: MovieCountryInformationInterface
}

export type PropetriesProviderCountry = {
  [country in keyof typeof CountryEnum]: number
}

export type ProviderType = {
  provider_id: number
  provider_name: string
  display_priority: number
  display_priorities: PropetriesProviderCountry
  logo_path: string
}

export function isProviderType(obj: ProviderType): obj is ProviderType {
  return (
    typeof obj === 'object' &&
    typeof obj.display_priority === 'number' &&
    typeof obj.logo_path === 'string' &&
    typeof obj.provider_id === 'number' &&
    typeof obj.provider_name === 'string'
  )
}

export default interface MovieProviderResponseInterface {
  id: number
  results?: CountryInformationMap | ProviderType[]
}
