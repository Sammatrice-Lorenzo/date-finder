import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import type { Location } from '@/interfaces/Location'
import type LocationStoreInterface from '@/interfaces/LocationStoreInterface'
import PlaceParametersService from '@/services/place/PlaceParametersService'
import useLocationStore from '@/services/store/useLocationStore'
import { Button, Grid2 } from '@mui/material'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import InputSearch from '../InputSearch'
import { useTranslations } from 'next-intl'

export type PlaceInputSearchProps = {
  typePlace: string
  category: string
  onTriggerSearch: (optins: ApiRequestInterface) => void
}

export default function PlaceInputSearch({
  typePlace,
  onTriggerSearch,
  category,
}: Readonly<PlaceInputSearchProps>): React.ReactElement {
  const refSearchLocation = React.useRef<HTMLInputElement>(null)
  const refSearchTerm = React.useRef<HTMLInputElement>(null)
  const userLocation: Location | null = useLocationStore(
    (store: LocationStoreInterface) => store.location
  )

  const t = useTranslations('PLACE')

  const handleSearchPlaces = (): void => {
    const options = new PlaceParametersService().buildPlaceOptions(
      userLocation,
      refSearchLocation?.current ? refSearchLocation.current.value : '',
      refSearchTerm?.current ? refSearchTerm.current.value : '',
      category
    )
    onTriggerSearch(options)
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
          idInput='input-location'
          placeholder={t('CITY')}
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
          marginBottom: '3%',
        }}
      >
        <InputSearch idInput='input-place' placeholder={typePlace} refSearch={refSearchTerm} />
      </Paper>
      <Grid2 sx={{ alignItems: 'center', display: 'flex', marginBottom: '5%' }}>
        <Button
          variant='outlined'
          sx={{ borderColor: '#d33252', color: 'white', margin: '0 auto' }}
          onClick={handleSearchPlaces}
        >
          {t('SEARCH')}
        </Button>
      </Grid2>
    </>
  )
}
