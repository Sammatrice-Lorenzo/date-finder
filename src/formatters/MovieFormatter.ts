import MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import MovieAPIInterface from '@/interfaces/movie/MovieAPInterface'
import MovieInterface from '@/interfaces/movie/MovieInterface'

export class MovieFormatter {
  public static getMoviesFormatted(moviesData: MovieAPIInterface[], genres: MovieGenresInterface[]): MovieInterface[] {
    return moviesData.map((movie: MovieAPIInterface) => {
      const genresMovie: string[] = genres.filter((genre: MovieGenresInterface) => movie.genre_ids.includes(genre.id)).map((genre: MovieGenresInterface) => genre.name)
  
      return {
        id: movie.id.toString(),
        name: movie.title,
        location: 'streaming',
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        genres: genresMovie,
        release_date: movie.release_date,
      }
    })
  }
}
