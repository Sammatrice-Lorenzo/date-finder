'use client'
import { Box, CardContent, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PlaceInterface from '@/interfaces/PlaceInterface';

type RestaurantContentCardProps = {
  place: PlaceInterface
}

export default function RestaurantContentCard({ place }: Readonly<RestaurantContentCardProps>): React.ReactElement
{
  const location: string = place.location
  const distanceInKm: string = place.distance?.toFixed(2)

  return (
    <CardContent sx={{ padding: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        {place.name}
      </Typography>
      
      <Box display='flex' alignItems='center' mb={1}>
        <LocationOnIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          {location}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center' mb={1}>
        <StarIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          Note : {place.rating} / 5
        </Typography>
      </Box>

      <Box display='flex' alignItems='center' mb={1}>
        <AttachMoneyIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          Prix : {place.price || 'Non spécifié'}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center' mb={1}>
        <PhoneIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          Numéro de téléphone : {place.display_phone || 'Non spécifié'}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center'>
        <DirectionsWalkIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          Distance : {distanceInKm} km
        </Typography>
      </Box>
    </CardContent>
  )
}