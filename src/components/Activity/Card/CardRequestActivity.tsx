import type React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import BoxCardRequest from './BoxCardRequest'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import DateFormatter from '@/formatters/DateFormatter'

interface CardRequestActivityProps {
  activity: ActivityQueryProps
}

export default function CardRequestActivity({
  activity,
}: Readonly<CardRequestActivityProps>): React.ReactElement {
  const date = new DateFormatter().getDateEuropeanFormat(new Date(activity.date))

  return (
    <Card sx={{ my: 3, p: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {activity.activity}
        </Typography>
        <BoxCardRequest text={date} iconBox='event' />
        <BoxCardRequest text={activity.location} iconBox='map' />
        <BoxCardRequest text={activity.author} iconBox='person' />
      </CardContent>
    </Card>
  )
}
