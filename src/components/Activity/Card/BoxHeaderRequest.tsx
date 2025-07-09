import { Avatar, Box, Typography } from '@mui/material'
import type React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import DateHelper from '@/helper/DateHelper'
import { useTranslations } from 'next-intl'

export type BoxHeaderRequestProps = {
  targetName: string
}
const BoxHeaderRequest = ({ targetName }: BoxHeaderRequestProps): React.ReactElement => {
  const t = useTranslations('ACTIVITY')

  return (
    <Box display='flex' mb={3}>
      <Avatar sx={{ bgcolor: '#d33252', width: 30, height: 30 }}>
        <PersonIcon fontSize='medium' />
      </Avatar>
      <Typography variant='h5' sx={{ ml: 2, fontWeight: 'bold' }}>
        {new DateHelper().getGreetings(t)} {targetName}
      </Typography>
    </Box>
  )
}

export default BoxHeaderRequest
