import { Restaurant } from '@/interfaces/Restaurant'
import { Card, CardMedia, Grid2 } from '@mui/material'
import RestaurantContentCard from './RestaurantContentCard'
import React from 'react'
import ModalRequestActivity from '../Activity/ModalRequestActivity'

type RestaurantCardProps = {
  restaurant: Restaurant
}
export default function RestaurantCard({ restaurant }: Readonly<RestaurantCardProps>): React.ReactElement
{
  const [openModal, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid2
      className='restaurant-card' 
      key={restaurant.id}
      size={{ xs: 12, md: 4 }}
      sx={{
        "&:hover": { cursor: "pointer" }
      }}
    >
      <Card sx={{ height: '100%'}} onClick={handleClickOpen} >
        <CardMedia
          component='img'
          height='140'
          image={restaurant.image_url ? restaurant.image_url : '/images/Image-not-found.png' }
          alt={restaurant.name}
        />
        <RestaurantContentCard restaurant={restaurant}/>
      </Card>
      <ModalRequestActivity activity={restaurant} open={openModal} onClose={handleClose} />
    </Grid2>
  )
}