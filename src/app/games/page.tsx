import type React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'
import translate from '@/locales/fr/common.json'

const Games: NextPage = (): React.ReactElement => {
  return <Places typePlace={translate.ACTIVITY.TYPES.GAMES} category="arcade|bowling|laser+tag|billiards" />
}

export default Games
