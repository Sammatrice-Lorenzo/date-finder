import type MovieProviderResponseInterface from '@/interfaces/movie/MovieProviderResponseInterface'
import {
  isProviderType,
  type CountryInformationMap,
  type ProviderType,
} from '@/interfaces/movie/MovieProviderResponseInterface'
import type InformationProviderInterface from '@/interfaces/movie/InformationProviderInterface'
import { CountryEnum } from '@/enums/CountryEnum'
import type MovieCountryInformationInterface from '@/interfaces/movie/MovieCountryInformationInterface'

export default class MovieProviderService {
  private getDefaultProviders(): string[] {
    return [
      'Netflix',
      'Amazon Prime Video',
      'Disney Plus',
      'Apple TV',
      'Amazon Video',
      'Google Play Movies',
    ]
  }

  private getProviderInCountry(
    movieProvidersResults: CountryInformationMap,
    countryValue: keyof typeof CountryEnum
  ): MovieCountryInformationInterface | null {
    let movieProvidersCountry: MovieCountryInformationInterface | null = null

    if (movieProvidersResults.hasOwnProperty(countryValue)) {
      movieProvidersCountry = movieProvidersResults[countryValue]
    } else if (
      movieProvidersResults.hasOwnProperty(CountryEnum.US as keyof CountryInformationMap)
    ) {
      movieProvidersCountry = movieProvidersResults[CountryEnum.US as keyof CountryInformationMap]
    }

    return movieProvidersCountry
  }

  private getProvidersNameByMovies(
    movieProvidersResults: CountryInformationMap,
    language: string
  ): string[] {
    const countryValue: keyof typeof CountryEnum = language.split(
      '-'
    )[1] as keyof typeof CountryEnum

    let informationsProviders: InformationProviderInterface[] = []

    const movieProvidersCountry: MovieCountryInformationInterface | null =
      this.getProviderInCountry(movieProvidersResults, countryValue)

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

  public getProvidersInformations(
    movieProviders: MovieProviderResponseInterface,
    language: string
  ): string[] | ProviderType[] {
    const movieProvidersResults: CountryInformationMap | undefined | ProviderType[] =
      movieProviders.results
    if (!movieProvidersResults) return []

    if (Array.isArray(movieProvidersResults) && movieProvidersResults.every(isProviderType)) {
      return this.getProviders(movieProvidersResults as ProviderType[])
    }

    return this.getProvidersNameByMovies(movieProvidersResults as CountryInformationMap, language)
  }

  private getProviders(movieProviders: ProviderType[]): ProviderType[] {
    return movieProviders
      .filter((movie: ProviderType) => this.getDefaultProviders().includes(movie.provider_name))
      .reduce((unique: ProviderType[], current: ProviderType) => {
        const alreadyExists = unique.some(p => p.provider_name === current.provider_name)
        if (!alreadyExists) unique.push(current)
        return unique
      }, [])
  }
}
