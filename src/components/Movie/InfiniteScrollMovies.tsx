import { Grid2 } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "./MovieCard"
import React, { ReactElement, useCallback, useEffect } from "react"
import { MovieStoreService } from "@/services/Store/MovieStoreService"
import { MovieFormatter } from "@/formatters/MovieFormatter"
import { MoviesProps } from "./Movies"
import useApi from "@/hooks/useApi"
import ResponseMoviesInterface from "@/interfaces/movie/ResponseMoviesInterface"
import MovieAPIInterface from "@/interfaces/movie/MovieAPInterface"
import CardSkeleton from "../Loader/CardSkeleton"

const InfiniteScrollMovies = ({ initialMovies, genres} :MoviesProps): ReactElement => {

  const {
    page,
    setPage,
    addMovies,
    movies,
    queryParams
  } = MovieStoreService.useMovieStore()

  const { data, isLoading } = useApi({
    url: `/api/movies?${queryParams().toString()}`,
    method: 'GET',
    optionsSWR: { keepPreviousData: true,
      fallbackData: {
        results: initialMovies.results,
        page: initialMovies.page,
        total_pages: initialMovies.total_pages
      },
    }
  })
  const moviesData: ResponseMoviesInterface = data as ResponseMoviesInterface
  const moviesResponse: MovieAPIInterface[] = moviesData.results ?? []

  useEffect(() => {
    if (moviesResponse) {
      const moviesFormatted = MovieFormatter.getMoviesFormatted(moviesResponse, genres)
      addMovies(moviesFormatted)
    }
  }, [moviesResponse, genres])
  const hasMore = moviesData.page < moviesData.total_pages
  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(page + 1)
    }
  }, [page, hasMore, setPage])

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<><CardSkeleton /><CardSkeleton /><CardSkeleton /></>}
      scrollThreshold={0.9}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {movies.map((movie) => (
          <Grid2 item spacing={1} sx={{ marginBottom: 3 }} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} >
            <MovieCard movie={movie} />
          </Grid2>
      ))}
    </InfiniteScroll>
  )
}

export default InfiniteScrollMovies