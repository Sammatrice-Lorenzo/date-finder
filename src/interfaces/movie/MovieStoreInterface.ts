import MovieGenresInterface from '../genre/MovieGenresInterface'
import { ProviderInterface } from '../provider/ProviderInteface'
import type MovieInterface from './MovieInterface'
import ResponseMoviesInterface from './ResponseMoviesInterface'

export default interface MovieStoreInterface {
  page: number
  setPage: (page: number) => void

  selectedGenre: number
  setSelectedGenre: (genreId: number) => void

  searchName: string
  setSearchName: (name: string) => void

  language: string
  setLanguage: (newLanguage: string) => void

  selectedProvider: number
  setSelectedProvider: (newProvider: number) => void

  movies: MovieInterface[]
  addMovies: (newMovies: MovieInterface[]) => void
  setMovies: (movies: MovieInterface[]) => void

  initialMovies: ResponseMoviesInterface
  setInitialMovies: (movies: ResponseMoviesInterface) => void
  providers: ProviderInterface[]

  setProviders: (providers: ProviderInterface[]) => void
  genres: MovieGenresInterface[]

  setGenres: (genres: MovieGenresInterface[]) => void
  queryParams: () => URLSearchParams
  resetFilters: () => void
  initilaizeValues: (
    movies: ResponseMoviesInterface,
    newPorviders: ProviderInterface[],
    newGenres: MovieGenresInterface[],
    newLanguage: string
  ) => void
}
