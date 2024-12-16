import { Card, CardMedia, Grid2 } from '@mui/material'
import RestaurantContentCard from './RestaurantContentCard'
import React from 'react'
import ModalRequestActivity from '../Activity/ModalRequestActivity'
import PlaceInterface from '@/interfaces/PlaceInterface'

type RestaurantCardProps = {
  place: PlaceInterface
}
export default function RestaurantCard({ place }: Readonly<RestaurantCardProps>): React.ReactElement
{
  const [openModal, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid2
      className='restaurant-card' 
      key={place.id}
      size={{ xs: 12, md: 4 }}
      sx={{
        "&:hover": { cursor: "pointer" }
      }}
    >
      <Card sx={{ height: '100%'}} onClick={handleClickOpen} >
        <CardMedia
          component='img'
          height='140'
          image={place.image_url ? place.image_url : '/images/Image-not-found.png' }
          alt={place.name}
        />
        <RestaurantContentCard place={place}/>
      </Card>
      <ModalRequestActivity activity={place} open={openModal} onClose={handleClose} />
    </Grid2>
  )
}