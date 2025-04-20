import type MovieInterface from '@/interfaces/movie/MovieInterface'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
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
  movies: [],
  addMovies: (newMovies: MovieInterface[]) =>
    set((state: MovieStoreInterface) => ({
      movies: [...state.movies, ...newMovies],
    })),
  setMovies: (newMovies: MovieInterface[]) => set({ movies: newMovies }),
  queryParams: () =>
    new URLSearchParams({
      page: get().page.toString(),
      genre: get().selectedGenre.toString(),
      searchName: get().searchName,
      language: get().language,
    }),
}))

export default useMovieStore
