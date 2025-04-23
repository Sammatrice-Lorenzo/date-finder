import EventIcon from '@mui/icons-material/Event'
import PlaceIcon from '@mui/icons-material/Place'
import PersonIcon from '@mui/icons-material/Person'
import type React from 'react'
import { Box, Typography } from '@mui/material'

type IconsActivities = {
  map: React.ReactElement
  person: React.ReactElement
  event: React.ReactElement
}

const iconsActivities: IconsActivities = {
  map: <PlaceIcon color='primary' sx={{ mr: 1 }} />,
  person: <PersonIcon color='primary' sx={{ mr: 1 }} />,
  event: <EventIcon color='primary' sx={{ mr: 1 }} />,
}

type IconBoxKeys = keyof IconsActivities // 'map' | 'person' | 'event'

export type BoxCardRequestProps = {
  text: string
  iconBox: IconBoxKeys
}

const BoxCardRequest = ({ text, iconBox }: BoxCardRequestProps): React.ReactElement => {
  return (
    <Box display='flex' alignItems='center' mb={1}>
      {iconsActivities[iconBox]}
      <Typography variant='body1'>{text}</Typography>
    </Box>
  )
}

export default BoxCardRequest
