import React from 'react'
import Places from '@/components/Place/Places'

export default function Restaurants(): React.ReactElement
{
  return (
    <Places
      typePlace='Restaurants'
      category='restaurant'
    />
  )
}