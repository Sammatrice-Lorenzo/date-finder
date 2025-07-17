import { CountryEnum } from '@/enums/CountryEnum'

type PropetriesProviderCountry = {
  [country in keyof typeof CountryEnum]: number
}

export function isProviderInterface(obj: ProviderInterface): obj is ProviderInterface {
  return (
    typeof obj === 'object' &&
    typeof obj.display_priority === 'number' &&
    typeof obj.logo_path === 'string' &&
    typeof obj.provider_id === 'number' &&
    typeof obj.provider_name === 'string'
  )
}

export interface ProviderInterface {
  provider_id: number
  provider_name: string
  display_priority: number
  display_priorities: PropetriesProviderCountry
  logo_path: string
}
