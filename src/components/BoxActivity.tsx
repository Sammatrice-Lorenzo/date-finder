import { Box, Typography } from "@mui/material"
import React from "react"
import MapIcon from '@mui/icons-material/Map'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import MovieIcon from '@mui/icons-material/Movie'
import MuseumIcon from '@mui/icons-material/Museum'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

type IconsActivities = {
  map: React.ReactElement,
  movie: React.ReactElement,
  restaurant: React.ReactElement,
  museum: React.ReactElement
}
  
const iconsActivities: IconsActivities = {
  restaurant: <RestaurantIcon  fontSize='large' />,
  movie: <MovieIcon color="action"  fontSize='large' />,
  map: <MapIcon fontSize='large' />,
  museum: <MuseumIcon fontSize='large' />,
}

type IconBoxKeys = keyof IconsActivities

export type BoxActivityProps = {
  title: string,
  icon: IconBoxKeys,
  color: string,
  route?: string
}

export default function BoxActivity({ title, icon, color, route}: BoxActivityProps): React.ReactElement
{
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
        "&:hover": { cursor: "pointer" } 
      }}
      onClick={() => router.push(route ?? '/')}
    >
      {iconsActivities[icon]}
      <Typography variant='h6'>{title}</Typography>
    </Box>
  )
}