import { Card, CardMedia, Grid2 } from '@mui/material'
import React from 'react'
import ModalRequestActivity from '../Activity/ModalRequestActivity'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import MovieContentCard from './MovieContentCard'

type MovieCardProps = {
  movie: MovieInterface
}

export default function MovieCard({ movie }: Readonly<MovieCardProps>): React.ReactElement {
  const [openModal, setOpen] = React.useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid2
      className="movie-card"
      key={movie.id}
      // size={{ xs: 12, md: 3 }}
      sx={{
        '&:hover': { cursor: 'pointer' },
      }}
    >
      <Card sx={{ height: '100%' }} onClick={handleClickOpen}>
        <CardMedia
          component="img"
          height="500"
          image={
            movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/Image-not-found.png'
          }
          alt={movie.name}
        />
        <MovieContentCard movie={movie} />
      </Card>
      <ModalRequestActivity activity={movie} open={openModal} onClose={handleClose} />
    </Grid2>
  )
}
