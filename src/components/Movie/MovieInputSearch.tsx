import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputSearch from '../InputSearch'
import { MovieStoreService } from '@/services/Store/MovieStoreService'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { mutate } from 'swr'
import translate from '@/locales/fr/common.json'

export default function MovieInputSearch(): React.ReactElement
{
  const refSearchMovie = React.useRef<HTMLInputElement>(null)
  const movieStore: MovieStoreInterface = new MovieStoreService().useMovieStore()

  const handleUpdateSearch = () => {
    movieStore.setSearchName(refSearchMovie.current ? refSearchMovie.current.value : '')
    movieStore.setPage(1)
    movieStore.setMovies([])
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
          marginBottom: '1.5%'
        }}
      >
        <InputSearch 
          idInput='input-movie'
          placeholder={translate.MOVIE.SEARCH_MOVIE}
          refSearch={refSearchMovie}
          onUpdateInput={handleUpdateSearch}
        />
      </Paper>
    </>
  )
}
