import MovieAPIInterface from './MovieAPInterface'

export default interface ResponseMoviesInterface {
  page: number;
  results: MovieAPIInterface[];
  total_pages: number;
  total_results: number;
}
