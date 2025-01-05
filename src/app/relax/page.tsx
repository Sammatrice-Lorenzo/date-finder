import React from 'react'
import Places from '@/components/Place/Places'
import { NextPage } from 'next'

const Relax: NextPage = (): React.ReactElement => {
  return (
    <Places 
      typePlace={'Bien être'}
      category='spa|massage|wellness|sauna'
    />
  )
}

export default Relax