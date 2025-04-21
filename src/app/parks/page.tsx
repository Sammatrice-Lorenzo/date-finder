import type React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'
import translate from '@/locales/fr/common.json'

const Parks: NextPage = (): React.ReactElement => {
  return <Places typePlace={translate.ACTIVITY.TYPES.PARKS_ACTRACTIONS} category="aquarium|zoo|park|amusement park" />
}

export default Parks
