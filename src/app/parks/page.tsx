import React from 'react'
import Places from '@/components/Place/Places'
import { NextPage } from 'next'

const Parks: NextPage = (): React.ReactElement => {
  return (
    <Places 
      typePlace={'Parcs et attractions naturelles'}
      category='aquarium|zoo|park|amusement park'
    />
  )
}

export default Parks