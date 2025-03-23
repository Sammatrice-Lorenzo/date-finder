import { Card, CardMedia, Grid2 } from '@mui/material'
import PlaceContentCard from './PlaceContentCard'
import React from 'react'
import ModalRequestActivity from '../Activity/ModalRequestActivity'
import PlaceInterface from '@/interfaces/place/PlaceInterface'

type PlaceCardProps = {
  place: PlaceInterface
}

export default function PlaceCard({ place }: Readonly<PlaceCardProps>): React.ReactElement
{
  const [openModal, setOpen] = React.useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid2
      className='place-card' 
      key={place.id}
      size={{ xs: 12, md: 4 }}
      sx={{
        '&:hover': { cursor: 'pointer' }
      }}
    >
      <Card sx={{ height: '100%'}} onClick={handleClickOpen} >
        <CardMedia
          component='img'
          height='140'
          image={place.image_url ? place.image_url : '/images/Image-not-found.png' }
          alt={place.name}
        />
        <PlaceContentCard place={place}/>
      </Card>
      <ModalRequestActivity activity={place} open={openModal} onClose={handleClose} />
    </Grid2>
  )
}