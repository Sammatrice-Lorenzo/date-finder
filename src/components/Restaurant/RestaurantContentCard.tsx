'use client'
import { Restaurant } from '@/interfaces/Restaurant';
import { Box, CardContent, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocationFormatter from '@/formatters/LocationFormatter';

type RestaurantContentCardProps = {
  restaurant: Restaurant
}

export default function RestaurantContentCard({ restaurant }: Readonly<RestaurantContentCardProps>): React.ReactElement
{
  const location: string = LocationFormatter.getAddressBusinessActivity(restaurant.location)
  const distanceInKm: string = (restaurant.distance / 1000).toFixed(2)

  return (
    <CardContent sx={{ padding: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        {restaurant.name}
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
          Note : {restaurant.rating} / 5
        </Typography>
      </Box>

      <Box display='flex' alignItems='center' mb={1}>
        <AttachMoneyIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          Prix : {restaurant.price || 'Non spécifié'}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center' mb={1}>
        <PhoneIcon color='action' fontSize='small' sx={{ mr: 1 }} />
        <Typography variant='body2' color='text.secondary'>
          Numéro de téléphone : {restaurant.display_phone || 'Non spécifié'}
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