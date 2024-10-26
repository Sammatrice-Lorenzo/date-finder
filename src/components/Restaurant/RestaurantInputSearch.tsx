import * as React from 'react';
import Paper from '@mui/material/Paper';
import RestaurantLocationSearch from './RestaurantLocationSearch';
import RestaurantTermSearch from './RestaurantTermSearch';
import { Button, Grid2 } from '@mui/material';

export type RestaurantInputSearchProps = {
  setLocationSearch: (search: string) => void
  setTermSearch: (search: string) => void
}

const getValueInput = (element: React.MouseEvent<HTMLButtonElement>, inputSelector: string): string => {
  const parentElement: HTMLElement | null | undefined = element.currentTarget.parentElement?.parentElement
  const input: HTMLInputElement | null | undefined = parentElement?.querySelector<HTMLInputElement>(`#${inputSelector}`)

  return input ? input?.value : ''
}

export default function RestaurantInputSearch({ setLocationSearch, setTermSearch }: Readonly<RestaurantInputSearchProps>): React.ReactElement
{
  const handleSearchRestaurants = (element: React.MouseEvent<HTMLButtonElement>): void => {
    const valueRestaurant: string = getValueInput(element, 'input-restaurant')
    const valueLocation: string = getValueInput(element, 'input-location')

    setTermSearch(valueRestaurant)
    setLocationSearch(valueLocation)
  }

  return (
    // <React.Suspense></React.Suspense>
    <>
      <Paper
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '85%',
          margin: '0 auto',
          // padding: '8px',
          marginBottom: '1.5%'
        }}
      >
        <RestaurantLocationSearch/>
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
        <RestaurantTermSearch />
      </Paper>
      <Grid2 sx={{ alignItems: 'center', display: 'flex', marginBottom: '5%' }}>
        <Button
          variant='outlined'
          sx={{ borderColor: '#d33252', color: 'white', margin: '0 auto'}}
          onClick={handleSearchRestaurants}
        >
          Rechercher
        </Button>
      </Grid2>
    </>
  )
}
