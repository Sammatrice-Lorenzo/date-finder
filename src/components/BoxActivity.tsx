import { Box, Typography } from '@mui/material'
import type React from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import MovieIcon from '@mui/icons-material/Movie'
import MuseumIcon from '@mui/icons-material/Museum'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import CasinoIcon from '@mui/icons-material/Casino'
import SpaIcon from '@mui/icons-material/Spa'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'

type IconsActivities = {
  bar: React.ReactElement
  movie: React.ReactElement
  restaurant: React.ReactElement
  museum: React.ReactElement
  games: React.ReactElement
  spa: React.ReactElement
  cinema: React.ReactElement
  parks: React.ReactElement
}

const iconsActivities: IconsActivities = {
  restaurant: <RestaurantIcon fontSize='large' />,
  movie: <MovieIcon color='action' fontSize='large' />,
  bar: <LocalBarIcon fontSize='large' />,
  museum: <MuseumIcon fontSize='large' />,
  games: <CasinoIcon fontSize='large' />,
  spa: <SpaIcon fontSize='large' />,
  cinema: <LocalMoviesIcon fontSize='large' />,
  parks: <NaturePeopleIcon fontSize='large' />,
}

export type IconBoxKeys = keyof IconsActivities

export type BoxActivityProps = {
  title: string
  icon: IconBoxKeys
  color: string
  route?: string
}

export default function BoxActivity({
  title,
  icon,
  color,
  route,
}: Readonly<BoxActivityProps>): React.ReactElement {
  const router: AppRouterInstance = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        bgcolor: color,
        textAlign: 'center',
        boxShadow: 2,
        '&:hover': { cursor: 'pointer' },
      }}
      onClick={() => router.push(route ?? '/')}
    >
      {iconsActivities[icon]}
      <Typography variant='h6'>{title}</Typography>
    </Box>
  )
}
