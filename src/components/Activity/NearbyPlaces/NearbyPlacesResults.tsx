'use client'

import { List, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import type React from 'react'
import SpinnerLoader from '../../Loader/SpinnerLoader'
import NearbyPlaceItem from './NearbyPlaceItem'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'

export type NearbyPlacesResultsProps = {
  places: PlaceInterface[]
  isLoading: boolean
  hasSearched: boolean
  selectedId: string | null
  onSelect: (place: PlaceInterface) => void
}

export default function NearbyPlacesResults({
  places,
  isLoading,
  hasSearched,
  selectedId,
  onSelect,
}: Readonly<NearbyPlacesResultsProps>): React.ReactElement | null {
  const t = useTranslations('ACTIVITY.IDEAS.NEARBY')

  if (isLoading) {
    return <SpinnerLoader sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} />
  }
  if (!hasSearched) {
    return null
  }
  if (places.length === 0) {
    return <Typography sx={{ mt: 1 }}>{t('NOT_FOUND')}</Typography>
  }

  return (
    <List dense sx={{ maxHeight: 280, overflowY: 'auto', mt: 1 }}>
      {places.map((place: PlaceInterface) => (
        <NearbyPlaceItem
          key={place.id}
          place={place}
          isSelected={selectedId === place.id}
          onSelect={onSelect}
        />
      ))}
    </List>
  )
}
