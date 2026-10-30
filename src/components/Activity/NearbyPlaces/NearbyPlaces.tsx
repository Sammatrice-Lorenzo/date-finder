'use client'

import { Paper, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import useNearbyPlaces from '@/hooks/place/useNearbyPlaces'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import NearbyPlacesResults from './NearbyPlacesResults'
import NearbyPlacesSearch from './NearbyPlacesSearch'

export type NearbyPlacesProps = {
  placeType: string
  onSelectPlace: (place: PlaceInterface) => void
}

export default function NearbyPlaces({
  placeType,
  onSelectPlace,
}: Readonly<NearbyPlacesProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.IDEAS.NEARBY')
  const { city, setCity, places, isLoading, hasSearched, canSearch, search } =
    useNearbyPlaces(placeType)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const handleSelectPlace = (place: PlaceInterface): void => {
    setSelectedId(place.id)
    onSelectPlace(place)
  }

  return (
    <Paper variant='outlined' sx={{ p: 2, mt: 2 }}>
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        {t('TITLE')}
      </Typography>
      <NearbyPlacesSearch
        city={city}
        canSearch={canSearch}
        isLoading={isLoading}
        onCityChange={setCity}
        onSearch={search}
      />
      <NearbyPlacesResults
        places={places}
        isLoading={isLoading}
        hasSearched={hasSearched}
        selectedId={selectedId}
        onSelect={handleSelectPlace}
      />
    </Paper>
  )
}
