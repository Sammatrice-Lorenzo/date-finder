import React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'

const Cinemas: NextPage = (): React.ReactElement => {
  return (
    <Places 
      typePlace={'Cinémas'}
      category='cinema|movie'
    />
  )
}

export default Cinemas