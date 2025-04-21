import type React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'
import translate from '@/locales/fr/common.json'

const Cinemas: NextPage = (): React.ReactElement => {
  return <Places typePlace={translate.ACTIVITY.TYPES.CINEMA} category="cinema|movie" />
}

export default Cinemas
