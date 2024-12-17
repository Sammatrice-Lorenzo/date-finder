import React from 'react'
import Places from '@/components/Place/Places'

export default function Museums(): React.ReactElement
{
  return (
    <Places 
      typePlace='Musées'
      category='museum'
    />
  )
}