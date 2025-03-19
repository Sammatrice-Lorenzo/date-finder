'use client'

import fr from '../../locales/fr/common.json'
import { Box, Grid2, Typography } from '@mui/material'
import React, { useState } from 'react'
import PlaceCard from '@/components/Place/PlaceCard'
import { Location } from '@/interfaces/Location'
import PlaceInputSearch from '@/components/Place/PlaceInputSearch'
import PlaceSkeleton from '@/components/Place/Loader/PlaceSkeleton'
import { useLocation } from '@/context/LocationContext'
import { useAlert } from '@/hooks/useAlert'
import { AlertEnum } from '@/enums/AlertEnum'
import HeaderPlace from './HeaderPlace'
import PlaceInterface from '@/interfaces/place/PlaceInterface'
import useApi from '@/hooks/useApi'
import { PlaceResponseInterface } from '@/interfaces/place/PlaceResponseInterface'

export type PlacesProps = {
  typePlace: string,
  category: string
}

export default function Places({ typePlace, category }: Readonly<PlacesProps>): React.ReactElement
{
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const userLocation: Location | null = useLocation()
  const { showAlert } = useAlert()

  const body: string = JSON.stringify({
    location: searchLocation,
    term: searchTerm,
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
    category: category
  })
  
  const { data, error, isLoading } = useApi({
    url: '/api/places/',
    method: 'POST',
    body
  })

  if (error) {
    const errorMessage: string = error.props
    showAlert(errorMessage, AlertEnum.Error)
  }

  const response: PlaceInterface[] = (data as PlaceResponseInterface)?.response ?? [];

  return (
    <Box sx={{ padding: 4 }}>
      <HeaderPlace typePlace={typePlace} />
      <PlaceInputSearch
        typePlace={typePlace}
        setLocationSearch={setSearchLocation}
        setTermSearch={setSearchTerm}
      />
      <Grid2
        container
        spacing={4}
      >
        {isLoading ? 
          <><PlaceSkeleton /><PlaceSkeleton /><PlaceSkeleton /></>
          : null}
        {response.length > 0 ? response.map((place: PlaceInterface) => (
          <PlaceCard key={place.id} place={place} />
        )) : <Grid2 sx={{
                alignItems: 'center', 
                display: 'flex', 
                justifyContent: 'center', 
                textAlign: 'center' }}
              >
              <Typography>{fr.PLACE.NOT_FOUND}</Typography>
            </Grid2>}
      </Grid2>
    </Box>
  )
}