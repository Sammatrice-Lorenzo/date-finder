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

export type MoviesProps = {
  initialMovies: ResponseMoviesInterface
  genres: MovieGenresInterface[]
  language: string
}
export default function Movies({
  initialMovies,
  genres,
  language,
}: MoviesProps): React.ReactElement {
  const t = useTranslations('MOVIE')

  return (
    <Box sx={{ padding: 4 }}>
      <HeaderPlace title={`${t('HOME_MOVIES')}`} />

      <MovieInputSearch />
      <GenresMovies genres={genres} />

      <Grid2 container spacing={4}>
        <InfiniteScrollMovies genres={genres} initialMovies={initialMovies} language={language} />
      </Grid2>
    </Box>
  )
}
