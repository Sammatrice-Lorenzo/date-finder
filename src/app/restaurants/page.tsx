import type React from 'react'
import Places from '@/components/Place/Places'
import { getTranslations } from 'next-intl/server'

export default async function Restaurants(): Promise<React.ReactElement> {
  const t = await getTranslations('ACTIVITY.TYPES')

  return <Places typePlace={t('RESTAURANTS')} category='restaurant' />
}
