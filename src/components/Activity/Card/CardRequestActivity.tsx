import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import BoxCardRequest from './BoxCardRequest'

interface CardRequestActivityProps {
  authorName: string
  activityName: string
  location: string
  date: string
}

export default function CardRequestActivity({
  authorName,
  activityName,
  location,
  date,
}: Readonly<CardRequestActivityProps>): React.ReactElement
{

  return (
    <Card sx={{ my: 3, p: 2 }}>
      <CardContent>
        <Typography variant='h6' color='primary' gutterBottom>{activityName}</Typography>
        <BoxCardRequest text={date} iconBox='event' />
        <BoxCardRequest text={location} iconBox='map' />
        <BoxCardRequest text={authorName} iconBox='person' />
      </CardContent>
    </Card>
  )
}