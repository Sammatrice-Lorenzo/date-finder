import { Restaurant } from '@/interfaces/Restaurant';
import { Card, CardMedia, Grid2 } from '@mui/material';
import RestaurantContentCard from './RestaurantContentCard';
import React from 'react';

type RestaurantCardProps = {
  restaurant: Restaurant;
}
export default function RestaurantCard({ restaurant }: RestaurantCardProps): React.ReactElement
{
  return (
    <Grid2 
      key={restaurant.id}
      size={12}
    >
      <Card sx={{ height: '100%'}}>
        <CardMedia
          component='img'
          height='140'
          image={restaurant.image_url ? restaurant.image_url : '/images/Image-not-found.png' }
          alt={restaurant.name}
        />
        <RestaurantContentCard restaurant={restaurant}/>
      </Card>
    </Grid2>
  )
}