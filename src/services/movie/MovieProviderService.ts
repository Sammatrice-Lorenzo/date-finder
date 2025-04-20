import type MovieProviderResponseInterface from '@/interfaces/movie/MovieProviderResponseInterface'
import type { CountryInformationMap } from '@/interfaces/movie/MovieProviderResponseInterface'
import type InformationProviderInterface from '@/interfaces/movie/InformationProviderInterface'
import { CountryEnum } from '@/enums/CountryEnum'
import type MovieCountryInformationInterface from '@/interfaces/movie/MovieCountryInformationInterface'

export default class MovieProviderService {
  private getProviderInCountry(
    movieProvidersResults: CountryInformationMap,
    countryValue: keyof typeof CountryEnum
  ): MovieCountryInformationInterface | null {
    let movieProvidersCountry: MovieCountryInformationInterface | null = null

    if (movieProvidersResults.hasOwnProperty(countryValue)) {
      movieProvidersCountry = movieProvidersResults[countryValue]
    } else if (movieProvidersResults.hasOwnProperty(CountryEnum.US as keyof CountryInformationMap)) {
      movieProvidersCountry = movieProvidersResults[CountryEnum.US as keyof CountryInformationMap]
    }

    return movieProvidersCountry
  }

  public getProvidersName(movieProviders: MovieProviderResponseInterface, language: string): string[] {
    const countryValue: keyof typeof CountryEnum = language.split('-')[1] as keyof typeof CountryEnum

    const movieProvidersResults: CountryInformationMap | undefined = movieProviders.results
    let informationsProviders: InformationProviderInterface[] = []

    if (!movieProvidersResults) return []
    const movieProvidersCountry: MovieCountryInformationInterface | null = this.getProviderInCountry(
      movieProvidersResults,
      countryValue
    )

    if (!movieProvidersCountry) return []

    if (movieProvidersCountry.rent) {
      informationsProviders = informationsProviders.concat(movieProvidersCountry.rent)
    }

    if (movieProvidersCountry.flatrate) {
      informationsProviders = informationsProviders.concat(movieProvidersCountry.flatrate)
    }

    return informationsProviders.length > 0
      ? informationsProviders.map(
          (informationProvider: InformationProviderInterface) => informationProvider.provider_name
        )
      : []
  }
}
