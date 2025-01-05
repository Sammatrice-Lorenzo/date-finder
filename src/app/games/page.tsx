import React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'

const Games: NextPage = (): React.ReactElement => {
  return (
    <Places 
      typePlace={'Jeux d\'arcades'}
      category='arcade|bowling|laser+tag|billiards'
    />
  )
}

export default Games