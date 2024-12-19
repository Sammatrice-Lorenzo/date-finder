'use client'

import { Box, Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PlaceCard from '@/components/Place/PlaceCard'
import { Location } from '@/interfaces/Location'
import PlaceInputSearch from '@/components/Place/PlaceInputSearch'
import PlaceSkeleton from '@/components/Place/Loader/PlaceSkeleton'
import { useLocation } from '@/context/LocationContext'
import { useAlert } from '@/hooks/useAlert'
import { AlertEnum } from '@/enums/AlertEnum'
import HeaderPlace from './HeaderPlace'
import PlaceInterface from '@/interfaces/place/PlaceInterface'

export type PlacesProps = {
  typePlace: string,
  category: string
}

export default function Places({ typePlace, category }: PlacesProps): React.ReactElement
{
  const [places, setPlaces] = useState<PlaceInterface[]>([])
  const [skeleton, setSkeleton] = useState<boolean>(true)
  const [searchLocation, setSearchLocation] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const userLocation: Location | null = useLocation()
  const { showAlert } = useAlert()

  useEffect(() => {
    const fetchPlaces = async (): Promise<void> => {
      const response: Response = await fetch('/api/places/', {
        method: 'POST',
        body: JSON.stringify({
          location: searchLocation,
          term: searchTerm,
          longitude: userLocation?.longitude,
          latitude: userLocation?.latitude,
          category: category
        })
      })
      const data = await response.json()
      setSkeleton(false)
      setPlaces(data.response)
      if (!response.ok) {
        showAlert(data.message, AlertEnum.Error)
      }
    }

    fetchPlaces()
  }, [userLocation?.latitude, userLocation?.longitude, searchLocation, searchTerm, showAlert, category])

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
        {skeleton ? 
          <><PlaceSkeleton /><PlaceSkeleton /><PlaceSkeleton /></>
          : null}
        {places?.length > 0 ? places.map((place: PlaceInterface) => (
          <PlaceCard key={place.id} place={place} />
        )) : null}
      </Grid2>
    </Box>
  )
}