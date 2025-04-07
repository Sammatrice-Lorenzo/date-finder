import { Box, Typography } from '@mui/material'
import React from 'react'

export type BoxContentCardProps = {
  text: string,
  icon?: React.ReactNode
  iconProps?: object
}

const defaultIconProps = {
  color: 'action',
  fontSize: 'small',
  sx: { mr: 1 },
}

const BoxContentCard = ({ text, icon, iconProps = {} }: BoxContentCardProps) => {
  return (
    <Box display='flex' alignItems='center' mb={1}>
      {icon && React.isValidElement(icon) ? React.cloneElement(icon, { ...defaultIconProps, ...iconProps }) : null}

      <Typography variant='body2' color='text.secondary'>
       {text}
      </Typography>
    </Box>
  )
}

export default BoxContentCard
