'use client'

import { Box, Grid2 } from '@mui/material'
import type React from 'react'
import HeaderPlace from '../Place/HeaderPlace'
import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import GenresMovies from './GenresMovies'
import type ResponseMoviesInterface from '@/interfaces/movie/ResponseMoviesInterface'
import InfiniteScrollMovies from './InfiniteScrollMovies'
import MovieInputSearch from './MovieInputSearch'
import { useTranslations } from 'next-intl'
import ProviderMovies from './ProviderMovie/ProvidersMovie'
import { ProviderInterface } from '@/interfaces/provider/ProviderInteface'
import useMovieStore from '@/services/store/useMovieStore'
import MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { useEffect } from 'react'

export type MoviesProps = {
  initialMovies: ResponseMoviesInterface
  genres: MovieGenresInterface[]
  language: string
  providers: ProviderInterface[]
}
export default function Movies({
  initialMovies,
  genres,
  language,
  providers,
}: MoviesProps): React.ReactElement {
  const t = useTranslations('MOVIE')

  const movieStore: MovieStoreInterface = useMovieStore()
  useEffect(() => {
    movieStore.initilaizeValues(initialMovies, providers, genres, language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ padding: 4 }}>
      <HeaderPlace title={`${t('HOME_MOVIES')}`} />

      <MovieInputSearch />
      <GenresMovies />
      <ProviderMovies />

      <Grid2 container spacing={4}>
        <InfiniteScrollMovies />
      </Grid2>
    </Box>
  )
}
