import type CachePlaceInterface from '@/interfaces/CacheInterface'
import type { Location } from '@/interfaces/Location'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import type { PlaceQueryInterface } from '@/interfaces/PlaceQueryInterface'

const CACHE_DURATION: number = 3600 * 1000

export default class PlaceCacheService {
  public getCacheKey(requestParameters: PlaceQueryInterface, userLocation: Location): string {
    return `${userLocation.latitude}-${userLocation.longitude}-${JSON.stringify(requestParameters)}`
  }

  public checkCache(cacheResponse: CachePlaceInterface, cacheKey: string): PlaceInterface[] | null {
    if (cacheResponse[cacheKey] && Date.now() - cacheResponse[cacheKey].timestamp < CACHE_DURATION) {
      return cacheResponse[cacheKey].data
    }

    return null
  }
}
