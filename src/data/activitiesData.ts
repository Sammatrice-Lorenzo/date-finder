import { IconBoxKeys } from '@/components/BoxActivity'

export interface HomeActivitiesData {
  key: string,
  title: string,
  icon: IconBoxKeys,
  color: string,
  route: string
}

const ACTIVITIES_DATA: HomeActivitiesData[] = [
  { key: 'restaurant', icon: 'restaurant', title: 'Restaurants', color: '#d33252', route: '/restaurants' },
  { key: 'movie', icon: 'movie', title: 'Films', color: '#0aa4c5', route: '' },
  { key: 'bar', icon: 'bar', title: 'Bars', color: '#ff560b', route: '/bars' },
  { key: 'cinema', icon: 'cinema', title: 'Cinémas', color: '#ffc046', route: '/cinemas' },
  { key: 'museum', icon: 'museum', title: 'Musées', color: '#9b7858', route: '/museums' },
  { key: 'parks', icon: 'parks', title: 'Parcs', color: '#02cc93', route: '/parks' },
  { key: 'games', icon: 'games', title: 'Jeux d\'arcades', color: '#9c277b', route: '/games' },
  { key: 'relax', icon: 'spa', title: 'Bien être / Spa', color: '#e93f67', route: '/relax' },
]

export default ACTIVITIES_DATA
