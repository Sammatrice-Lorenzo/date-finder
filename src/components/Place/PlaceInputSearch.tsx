import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Button, Grid2 } from '@mui/material'
import PlaceSearch from './PlaceSearch'

export type PlaceInputSearchProps = {
  typePlace: string,
  setLocationSearch: (search: string) => void
  setTermSearch: (search: string) => void
}

const getValueInput = (element: React.MouseEvent<HTMLButtonElement>, inputSelector: string): string => {
  const parentElement: HTMLElement | null | undefined = element.currentTarget.parentElement?.parentElement
  const input: HTMLInputElement | null | undefined = parentElement?.querySelector<HTMLInputElement>(`#${inputSelector}`)

  return input ? input?.value : ''
}

export default function PlaceInputSearch({ typePlace, setLocationSearch, setTermSearch }: Readonly<PlaceInputSearchProps>): React.ReactElement
{
  const handleSearchPlaces = (element: React.MouseEvent<HTMLButtonElement>): void => {
    const valuePlace: string = getValueInput(element, 'input-place')
    const valueLocation: string = getValueInput(element, 'input-location')

    setTermSearch(valuePlace)
    setLocationSearch(valueLocation)
  }

  return (
    <>
      <Paper
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '85%',
          margin: '0 auto',
          marginBottom: '1.5%'
        }}
      >
        <PlaceSearch 
          idInput='input-location'
          placeholder='Ville'
          setSearch={setLocationSearch}
        />
      </Paper>
      <Paper
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '85%',
          margin: '0 auto',
          marginBottom: '3%'
        }}
      >
         <PlaceSearch
          idInput='input-place'
          placeholder={typePlace}
          setSearch={setTermSearch}
        />
      </Paper>
      <Grid2 sx={{ alignItems: 'center', display: 'flex', marginBottom: '5%' }}>
        <Button
          variant='outlined'
          sx={{ borderColor: '#d33252', color: 'white', margin: '0 auto'}}
          onClick={handleSearchPlaces}
        >
          Rechercher
        </Button>
      </Grid2>
    </>
  )
}
