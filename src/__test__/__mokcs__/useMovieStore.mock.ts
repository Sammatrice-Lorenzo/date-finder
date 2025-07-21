import MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import useMovieStore from '@/services/store/useMovieStore'
jest.mock('../../services/store/useMovieStore.ts')

export function setupUseMovieStoreMock(overrides: Partial<MovieStoreInterface> = {}) {
  const defaultMock = {
    genres: [],
    providers: [],
    movies: [],
    selectedGenre: 0,
    language: 'fr-FR',
    page: 1,
    selectedProvider: 0,
    setGenres: jest.fn(),
    setProviders: jest.fn(),
    setMovies: jest.fn(),
    setInitialMovies: jest.fn(),
    setLanguage: jest.fn(),
    setPage: jest.fn(),
    setSelectedProvider: jest.fn(),
    resetFilters: jest.fn(),
    queryParams: jest.fn(() => new URLSearchParams()),
    ...overrides,
  } as unknown as MovieStoreInterface

  const useMovieStoreMock = useMovieStore as jest.MockedFunction<typeof useMovieStore>
  useMovieStoreMock.mockReturnValue(defaultMock)

  return defaultMock
}
