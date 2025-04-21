import type React from 'react'
import Places from '@/components/Place/Places'
import type { NextPage } from 'next'
import translate from '@/locales/fr/common.json'

const Relax: NextPage = (): React.ReactElement => {
  return <Places typePlace={translate.ACTIVITY.TYPES.RELAX_SPA} category="spa|massage|wellness|sauna" />
}

export default Relax
