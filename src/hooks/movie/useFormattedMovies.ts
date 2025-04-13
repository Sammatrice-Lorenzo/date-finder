import { MovieFormatter } from '@/formatters/MovieFormatter'
import MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import MovieAPIInterface from '@/interfaces/movie/MovieAPInterface'
import MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { MovieStoreService } from '@/services/Store/MovieStoreService'
import { useMemo } from 'react'
import useSWR from 'swr'

const useFormattedMovies = (moviesResponse: MovieAPIInterface[], genres: MovieGenresInterface[], language: string) => {
  const useMovieStore: MovieStoreInterface = MovieStoreService.useMovieStore()

  const swrKey = useMemo(() => {
    return moviesResponse && genres.length > 0 ? ['formatted-movies', moviesResponse, genres] : null
  }, [moviesResponse, genres])

  const { data: formattedMovies } = useSWR(
    swrKey,
    async () => {
      useMovieStore.setLanguage(language)
      if (!moviesResponse || genres.length === 0) return []
      
      const formatted = await MovieFormatter.getMoviesFormatted(moviesResponse, genres, useMovieStore.language)
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