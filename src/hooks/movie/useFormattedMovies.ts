import { MovieFormatter } from '@/formatters/MovieFormatter'
import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import type MovieAPIInterface from '@/interfaces/movie/MovieAPInterface'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { MovieStoreService } from '@/services/Store/MovieStoreService'
import { useMemo } from 'react'
import useSWR from 'swr'

const useFormattedMovies = (moviesResponse: MovieAPIInterface[], genres: MovieGenresInterface[], language: string) => {
  const useMovieStore: MovieStoreInterface = new MovieStoreService().useMovieStore()

  const swrKey = useMemo(() => {
    return moviesResponse && genres.length > 0 ? ['formatted-movies', moviesResponse, genres] : null
  }, [moviesResponse, genres])

  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  const { } = useSWR(
    swrKey,
    async () => {
      useMovieStore.setLanguage(language)
      if (!moviesResponse || genres.length === 0) return []
      
      const movieFormatter: MovieFormatter = new MovieFormatter()
      const formatted: MovieInterface[] = await movieFormatter.getMoviesFormatted(moviesResponse, genres, useMovieStore.language)
      useMovieStore.addMovies(formatted)

      return formatted
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true
    }
  )
}

export default useFormattedMovies