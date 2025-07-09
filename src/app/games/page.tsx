import type React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

const Games: NextPage = async (): Promise<React.ReactElement> => {
  const t = await getTranslations('ACTIVITY.TYPES')

  return <Places typePlace={t('GAMES')} category='arcade|bowling|laser+tag|billiards' />
}

export default Games
