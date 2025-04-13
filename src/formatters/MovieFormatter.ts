import MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import MovieAPIInterface from '@/interfaces/movie/MovieAPInterface'
import MovieInterface from '@/interfaces/movie/MovieInterface'

export class MovieFormatter {

  public static async getMoviesFormatted(
    moviesData: MovieAPIInterface[],
    genres: MovieGenresInterface[],
    language: string
  ): Promise<MovieInterface[]>
  {
    const movies: MovieInterface[] = await Promise.all(moviesData.map(async (movie: MovieAPIInterface) => {
      const genresMovie: string[] = genres
        .filter((genre: MovieGenresInterface) => movie.genre_ids.includes(genre.id))
        .map((genre: MovieGenresInterface) => genre.name)

      const searchParams = new URLSearchParams({
        'movieId': movie.id.toString(),
        'language': language
      })
      const movieProviders: string[] = await fetch(`/api/movies/providers?${searchParams.toString()}`).then((data) => data.json())

      return {
        id: movie.id.toString(),
        name: movie.title,
        location: movieProviders.length > 0 ? movieProviders.join(', ') : 'streaming',
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        genres: genresMovie,
        release_date: movie.release_date,
        providers: movieProviders
      }
    }))

    return movies
  }
}
