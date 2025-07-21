import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputSearch from '../InputSearch'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { mutate } from 'swr'
import useMovieStore from '@/services/store/useMovieStore'
import { useTranslations } from 'next-intl'

export default function MovieInputSearch(): React.ReactElement {
  const refSearchMovie = React.useRef<HTMLInputElement>(null)
  const movieStore: MovieStoreInterface = useMovieStore()
  const t = useTranslations('MOVIE')

  const handleUpdateSearch = () => {
    movieStore.resetFilters()
    movieStore.setSearchName(refSearchMovie.current ? refSearchMovie.current.value : '')
    mutate(`/api/movies?${movieStore.queryParams().toString()}`)
  }

  return (
    <>
      <Paper
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: { xs: '85%', md: '40%' },
          margin: '0 auto',
          marginBottom: '1.5%',
        }}
      >
        <InputSearch
          idInput='input-movie'
          placeholder={t('SEARCH_MOVIE')}
          refSearch={refSearchMovie}
          onUpdateInput={handleUpdateSearch}
        />
      </Paper>
    </>
  )
}
