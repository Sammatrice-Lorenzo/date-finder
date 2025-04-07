import MovieGenresInterface from '../genre/MovieGenresInterface'
import MovieInterface from './MovieInterface'

export default interface MovieStoreInterface {
  page: number;
  setPage: (page: number) => void;
  selectedGenre: number;
  setSelectedGenre: (genreId: number) => void;
  searchName: string;
  setSearchName: (name: string) => void;
  movies: MovieInterface[];
  addMovies: (newMovies: MovieInterface[]) => void;
  setMovies: (movies: MovieInterface[]) => void;
  queryParams: () => URLSearchParams;
}