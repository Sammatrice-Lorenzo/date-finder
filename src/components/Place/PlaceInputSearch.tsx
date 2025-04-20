import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Button, Grid2 } from '@mui/material'
import InputSearch from '../InputSearch'
import translate from '@/locales/fr/common.json'

export type PlaceInputSearchProps = {
  typePlace: string,
  setLocationSearch: (search: string) => void
  setTermSearch: (search: string) => void
}

export default function PlaceInputSearch({ typePlace, setLocationSearch, setTermSearch }: Readonly<PlaceInputSearchProps>): React.ReactElement
{
  const refSearchLocation = React.useRef<HTMLInputElement>(null)
  const refSearchTerm = React.useRef<HTMLInputElement>(null)

  const handleSearchPlaces = (): void => {
    if (refSearchLocation.current) {
      setLocationSearch(refSearchLocation.current.value)
    }

    if (refSearchTerm.current) {
      setTermSearch(refSearchTerm.current.value)
    }
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
          idInput='input-location'
          placeholder={translate.PLACE.CITY}
          setSearch={setLocationSearch}
          refSearch={refSearchLocation}
        />
      </Paper>
      <Paper
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: { xs: '85%', md: '40%' },
          margin: '0 auto',
          marginBottom: '3%'
        }}
      >
         <InputSearch
          idInput='input-place'
          placeholder={typePlace}
          setSearch={setTermSearch}
          refSearch={refSearchTerm}
        />
      </Paper>
      <Grid2 sx={{ alignItems: 'center', display: 'flex', marginBottom: '5%' }}>
        <Button
          variant='outlined'
          sx={{ borderColor: '#d33252', color: 'white', margin: '0 auto'}}
          onClick={handleSearchPlaces}
        >
          {translate.PLACE.SEARCH}
        </Button>
      </Grid2>
    </>
  )
}
