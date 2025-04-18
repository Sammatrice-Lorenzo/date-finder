'use client'

import { Box, Grid2 } from '@mui/material'
import type React from 'react'
import HeaderPlace from '../Place/HeaderPlace'
import translate from '@/locales/fr/common.json'
import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import GenresMovies from './GenresMovies'
import type ResponseMoviesInterface from '@/interfaces/movie/ResponseMoviesInterface'
import InfiniteScrollMovies from './InfiniteScrollMovies'
import MovieInputSearch from './MovieInputSearch'

export type MoviesProps = {
  initialMovies: ResponseMoviesInterface,
  genres: MovieGenresInterface[],
  language: string,
}
export default function Movies({ initialMovies, genres, language }: MoviesProps): React.ReactElement
{
  return (
    <Box sx={{ padding: 4 }}>
      <HeaderPlace title={`${translate.MOVIE.HOME_MOVIES}`} />

      <MovieInputSearch />
      <GenresMovies
        genres={genres}
      />

      <Grid2
        container
        spacing={4}
      >
        <InfiniteScrollMovies
          genres={genres}
          initialMovies={initialMovies}
          language={language}
        />
      </Grid2>
    </Box>
  )
}