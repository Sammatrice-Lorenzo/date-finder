import type { IconBoxKeys } from '@/components/BoxActivity'
import translate from '@/locales/fr/common.json'

export interface HomeActivitiesData {
  key: string
  title: string
  icon: IconBoxKeys
  color: string
  route: string
}

const ACTIVITIES_DATA: HomeActivitiesData[] = [
  {
    key: 'restaurant',
    icon: 'restaurant',
    title: translate.ACTIVITY.TYPES.RESTAURANTS,
    color: '#d33252',
    route: '/restaurants',
  },
  { key: 'movie', icon: 'movie', title: 'Films', color: '#0aa4c5', route: '/movies' },
  { key: 'bar', icon: 'bar', title: 'Bars', color: '#ff560b', route: '/bars' },
  { key: 'cinema', icon: 'cinema', title: translate.ACTIVITY.TYPES.CINEMA, color: '#ffc046', route: '/cinemas' },
  { key: 'museum', icon: 'museum', title: translate.ACTIVITY.TYPES.MUSEUM, color: '#9b7858', route: '/museums' },
  { key: 'parks', icon: 'parks', title: translate.ACTIVITY.TYPES.PARKS, color: '#02cc93', route: '/parks' },
  { key: 'games', icon: 'games', title: translate.ACTIVITY.TYPES.GAMES, color: '#9c277b', route: '/games' },
  { key: 'relax', icon: 'spa', title: translate.ACTIVITY.TYPES.RELAX_SPA, color: '#e93f67', route: '/relax' },
]

export default ACTIVITIES_DATA
