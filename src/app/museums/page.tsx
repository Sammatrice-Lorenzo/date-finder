import type React from 'react'
import Places from '@/components/Place/Places'
import { getTranslations } from 'next-intl/server'

export default async function Museums(): Promise<React.ReactElement> {
  const t = await getTranslations('ACTIVITY.TYPES')

  return <Places typePlace={t('MUSEUM')} category='museum' />
}
