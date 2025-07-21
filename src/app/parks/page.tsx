import type React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

const Parks: NextPage = async (): Promise<React.ReactElement> => {
  const t = await getTranslations('ACTIVITY.TYPES')

  return <Places typePlace={t('PARKS_ACTRACTIONS')} category='aquarium|zoo|park|amusement park' />
}

export default Parks
