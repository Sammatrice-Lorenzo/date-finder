'use client'

import fr from '../../locales/fr/common.json'
import { Box, Grid2, Typography } from '@mui/material'
import type React from 'react'
import PlaceCard from '@/components/Place/PlaceCard'
import type { Location } from '@/interfaces/Location'
import PlaceInputSearch from '@/components/Place/PlaceInputSearch'
import HeaderPlace from './HeaderPlace'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import type LocationStoreInterface from '@/interfaces/LocationStoreInterface'
import translate from '@/locales/fr/common.json'
import { CardsSkeletons } from '../Loader/CardsSkeletons'
import usePlace from '@/hooks/place/usePlace'
import useLocationStore from '@/services/store/LocationStoreService'

export type PlacesProps = {
  typePlace: string
  category: string
}

export default function Places({ typePlace, category }: Readonly<PlacesProps>): React.ReactElement {
  const userLocation: Location | null = useLocationStore((store: LocationStoreInterface) => store.location)

  const { response, isLoading, trigger } = usePlace(userLocation, '', '', category)

  return (
    <Box sx={{ padding: 4 }}>
      <HeaderPlace title={`${typePlace} ${translate.PLACE.PROXIMITY}`} />
      <PlaceInputSearch typePlace={typePlace} category={category} onTriggerSearch={trigger} />
      <Grid2 container spacing={4}>
        {isLoading ? <CardsSkeletons /> : null}
        {response.length > 0 ? (
          response.map((place: PlaceInterface) => <PlaceCard key={place.id} place={place} />)
        ) : (
          <Grid2
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography>{fr.PLACE.NOT_FOUND}</Typography>
          </Grid2>
        )}
      </Grid2>
    </Box>
  )
}
