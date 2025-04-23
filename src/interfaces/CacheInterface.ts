import type PlaceInterface from './place/PlaceInterface'

export default interface CachePlaceInterface {
  [key: string]: {
    data: PlaceInterface[]
    timestamp: number
  }
}
