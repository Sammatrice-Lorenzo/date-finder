'use client'

import { ListItemButton, ListItemText } from '@mui/material'
import { useTranslations } from 'next-intl'
import type React from 'react'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'

export type NearbyPlaceItemProps = {
  place: PlaceInterface
  isSelected: boolean
  onSelect: (place: PlaceInterface) => void
}

export default function NearbyPlaceItem({
  place,
  isSelected,
  onSelect,
}: Readonly<NearbyPlaceItemProps>): React.ReactElement {
  const t = useTranslations('PLACE')

  const details: string = [
    place.location,
    place.distance ? `${place.distance.toFixed(1)} km` : null,
    place.rating ? `${t('RATING')} ${place.rating} / 5` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <ListItemButton className='nearby-place' selected={isSelected} onClick={() => onSelect(place)}>
      <ListItemText primary={place.name} secondary={details} />
    </ListItemButton>
  )
}
