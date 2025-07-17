import MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import ResponseMoviesInterface from '@/interfaces/movie/ResponseMoviesInterface'
import { ProviderInterface } from '@/interfaces/provider/ProviderInteface'
import { create } from 'zustand'

const useMovieStore = create<MovieStoreInterface>((set, get) => ({
  page: 1,
  setPage: page => set({ page }),
  selectedGenre: 0,
  setSelectedGenre: genreId => {
    set({ selectedGenre: genreId, page: 1 })
  },
  searchName: '',
  setSearchName: name => {
    set({ searchName: name, page: 1 })
  },
  language: 'fr-FR',
  setLanguage: (newLanguage: string) => set({ language: newLanguage }),
  selectedProvider: 0,
  setSelectedProvider: (newProvider: number) => set({ selectedProvider: newProvider }),
  movies: [],
  addMovies: (newMovies: MovieInterface[]) =>
    set((state: MovieStoreInterface) => ({
      movies: [...state.movies, ...newMovies],
    })),
  setMovies: (newMovies: MovieInterface[]) => set({ movies: newMovies }),
  initialMovies: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  setInitialMovies: (movies: ResponseMoviesInterface) => set({ initialMovies: movies }),
  providers: [],
  setProviders: (newPorviders: ProviderInterface[]) => set({ providers: newPorviders }),
  genres: [],
  setGenres: (newGenres: MovieGenresInterface[]) => set({ genres: newGenres }),
  queryParams: () =>
    new URLSearchParams({
      page: get().page.toString(),
      genre: get().selectedGenre.toString(),
      searchName: get().searchName,
      language: get().language,
      provider: get().selectedProvider.toString(),
    }),
  resetFilters: () => {
    set({
      page: 1,
      selectedGenre: 0,
      searchName: '',
      selectedProvider: 0,
      movies: [],
    })
  },
  initilaizeValues: (
    movies: ResponseMoviesInterface,
    newPorviders: ProviderInterface[],
    newGenres: MovieGenresInterface[],
    newLanguage: string
  ) => {
    set({
      initialMovies: movies,
      genres: newGenres,
      providers: newPorviders,
      language: newLanguage,
    })
  },
}))

export default useMovieStore
