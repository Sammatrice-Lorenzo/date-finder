import type React from 'react'
import Places from '@/components/Place/Places'
import translate from '@/locales/fr/common.json'

export default function Bars(): React.ReactElement {
  return <Places typePlace={translate.ACTIVITY.TYPES.BARS} category="bar" />
}
