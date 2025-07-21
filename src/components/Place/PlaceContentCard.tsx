'use client'

import { CardContent, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PhoneIcon from '@mui/icons-material/Phone'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import BoxContentCard, { type BoxContentCardProps } from '../BoxContentCard'
import { createTranslator, useTranslations } from 'next-intl'

type PlaceContentCardProps = {
  place: PlaceInterface
}

const getContentBox = (
  place: PlaceInterface,
  t: ReturnType<typeof createTranslator>
): BoxContentCardProps[] => {
  const location: string = place.location
  const distanceInKm: string = place.distance?.toFixed(2) ?? ''

  return [
    {
      text: location,
      icon: <LocationOnIcon />,
    },
    {
      text: `${t('RATING')} ${place.rating} / 5`,
      icon: <StarIcon />,
    },
    {
      text: `${t('PRICE')} ${place.price || t('NOT_DEFINED')}`,
      icon: <AttachMoneyIcon />,
    },
    {
      text: `${t('PHONE')} ${place.display_phone || t('NOT_DEFINED')}`,
      icon: <PhoneIcon />,
    },
    {
      text: `${t('DISTANCE')} ${distanceInKm} km`,
      icon: <DirectionsWalkIcon />,
    },
  ]
}

export default function PlaceContentCard({
  place,
}: Readonly<PlaceContentCardProps>): React.ReactElement {
  const t = useTranslations('PLACE')

  return (
    <CardContent sx={{ padding: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        {place.name}
      </Typography>

      {getContentBox(place, t).map((content: BoxContentCardProps) => (
        <BoxContentCard key={content.text} text={content.text} icon={content.icon} />
      ))}
    </CardContent>
  )
}
