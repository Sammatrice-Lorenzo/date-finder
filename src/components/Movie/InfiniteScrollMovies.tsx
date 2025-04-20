import { Grid2 } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from './MovieCard'
import React, { type ReactElement, useCallback } from 'react'
import type { MoviesProps } from './Movies'
import useApi from '@/hooks/useApi'
import type ResponseMoviesInterface from '@/interfaces/movie/ResponseMoviesInterface'
import type MovieAPIInterface from '@/interfaces/movie/MovieAPInterface'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import useFormattedMovies from '@/hooks/movie/useFormattedMovies'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import SpinnerLoader from '../Loader/SpinnerLoader'
import useMovieStore from '@/services/Store/MovieStoreService'

const InfiniteScrollMovies = ({ initialMovies, genres, language }: MoviesProps): ReactElement => {
  const movieStore: MovieStoreInterface = useMovieStore()

  const { page, setPage, queryParams } = movieStore

  const { data } = useApi({
    url: `/api/movies?${queryParams().toString()}`,
    method: 'GET',
    optionsSWR: {
      keepPreviousData: true,
      fallbackData: {
        results: initialMovies.results,
        page: initialMovies.page,
        total_pages: initialMovies.total_pages,
      },
    },
  })
  const moviesData: ResponseMoviesInterface = data as ResponseMoviesInterface
  const moviesResponse: MovieAPIInterface[] = moviesData.results ?? []

  useFormattedMovies(moviesResponse, genres, language)

  const hasMore = moviesData.page < moviesData.total_pages
  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(page + 1)
    }
  }, [page, hasMore, setPage])

  return (
    <InfiniteScroll
      dataLength={movieStore.movies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<SpinnerLoader />}
      scrollThreshold={0.9}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {movieStore.movies.map((movie: MovieInterface, index: number) => (
        <Grid2
          id={`grid-${movie.id}-${index}`}
          className="grid-movies"
          spacing={1}
          sx={{ marginBottom: 3 }}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          key={`grid-${movie.id}-${index}`}
        >
          <MovieCard movie={movie} key={`movie-card-${movie.id}`} />
        </Grid2>
      ))}
    </InfiniteScroll>
  )
}

export default InfiniteScrollMovies
