import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import type MovieAPIInterface from '@/interfaces/movie/MovieAPInterface'
import type MovieInterface from '@/interfaces/movie/MovieInterface'

export class MovieFormatter {
  private getGenresFormatted(genres: MovieGenresInterface[], movie: MovieAPIInterface) {
    return genres
      .filter((genre: MovieGenresInterface) => movie.genre_ids.includes(genre.id))
      .map((genre: MovieGenresInterface) => genre.name)
  }

  private getNameMovie(movie: MovieAPIInterface): string {
    const title: string | undefined = movie.title

    return title || this.getFallbackTitle(movie) || ''
  }

  private getFallbackTitle(movie: MovieAPIInterface): string | undefined {
    const originalTitle: string = movie.original_title
    const name: string | undefined = movie.name
    const originalName: string | undefined = movie.original_name

    return originalTitle || name || originalName
  }

  public async getMoviesFormatted(
    moviesData: MovieAPIInterface[],
    genres: MovieGenresInterface[],
    language: string
  ): Promise<MovieInterface[]> {
    const movies: MovieInterface[] = await Promise.all(
      moviesData.map(async (movie: MovieAPIInterface) => {
        const searchParams = new URLSearchParams({
          movieId: movie.id.toString(),
          language: language,
        })
        const movieProviders: string[] = await fetch(`/api/movies/providers?${searchParams.toString()}`).then(data =>
          data.json()
        )

        return {
          id: movie.id.toString(),
          name: this.getNameMovie(movie),
          location: movieProviders.length > 0 ? movieProviders.join(', ') : 'Streaming',
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          genres: this.getGenresFormatted(genres, movie),
          release_date: movie.release_date,
          providers: movieProviders,
        }
      })
    )

    return movies
  }
}
