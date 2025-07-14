import type { IconBoxKeys } from '@/components/BoxActivity'
import { createTranslator } from 'next-intl'

export interface HomeActivitiesData {
  key: string
  title: string
  icon: IconBoxKeys
  color: string
  route: string
}

const getActivitiesData = (t: ReturnType<typeof createTranslator>): HomeActivitiesData[] => {
  return [
    {
      key: 'restaurant',
      icon: 'restaurant',
      title: t('RESTAURANTS'),
      color: '#d33252',
      route: '/restaurants',
    },
    { key: 'movie', icon: 'movie', title: t('MOVIES'), color: '#0aa4c5', route: '/movies' },
    { key: 'bar', icon: 'bar', title: t('BARS'), color: '#ff560b', route: '/bars' },
    { key: 'cinema', icon: 'cinema', title: t('CINEMA'), color: '#ffc046', route: '/cinemas' },
    { key: 'museum', icon: 'museum', title: t('MUSEUM'), color: '#9b7858', route: '/museums' },
    { key: 'parks', icon: 'parks', title: t('PARKS'), color: '#02cc93', route: '/parks' },
    { key: 'games', icon: 'games', title: t('GAMES'), color: '#9c277b', route: '/games' },
    { key: 'relax', icon: 'spa', title: t('RELAX_SPA'), color: '#e93f67', route: '/relax' },
  ]
}

export default getActivitiesData
