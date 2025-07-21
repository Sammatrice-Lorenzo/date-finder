import { NextResponse } from 'next/server'
import type { PlaceResponseInterface } from '@/interfaces/place/PlaceResponseInterface'
import data from '../../../data/json/restaurant-test-data.json'
import type { PlaceQueryInterface } from '@/interfaces/PlaceQueryInterface'
import type PlaceAPIInterface from '@/interfaces/place/PlaceAPIInterface'
import type { Location } from '@/interfaces/Location'
import PlaceUrlService from '@/services/place/PlaceUrlService'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import PlaceAPIService from '@/services/place/PlaceAPIService'
import type CachePlaceInterface from '@/interfaces/CacheInterface'
import PlaceCacheService from '@/services/place/PlaceCacheService'
import { getTranslations } from 'next-intl/server'

const cacheResponse: CachePlaceInterface = {}

function handleResponsePlacesForEnvTest(): NextResponse<PlaceResponseInterface> {
  const result: PlaceInterface | undefined = data[0]
  const response: PlaceResponseInterface = {
    response: result ? [result] : [],
    message: '',
  }
  return NextResponse.json(response)
}

async function fetchPlaces(
  apiKey: string,
  requestParameters: PlaceQueryInterface
): Promise<Response> {
  const url: string = await new PlaceUrlService().getPlacesUrl(requestParameters)

  return await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })
}

async function handleRequestParameters(
  request: Request
): Promise<{ userLocation: Location; requestParameters: PlaceQueryInterface }> {
  const requestParameters: PlaceQueryInterface = await request.json()
  const userLocation: Location = {
    longitude: Number(requestParameters.longitude),
    latitude: Number(requestParameters.latitude),
  }
  return { userLocation, requestParameters }
}

async function handleApiResponse(
  response: Response,
  userLocation: Location,
  nextResponse: PlaceResponseInterface,
  cacheKey: string
): Promise<NextResponse<PlaceResponseInterface>> {
  const status: number = response.status
  const translateError = await getTranslations('ERROR')

  if (response.ok) {
    const data = await response.json()
    const results: PlaceAPIInterface[] = data.results
    const { convertedResults, cache } = await new PlaceAPIService().getDataAPI(
      results,
      userLocation
    )
    cacheResponse[cacheKey] = cache

    return NextResponse.json({ response: convertedResults, message: '' }, { status: status })
  }

  if (status === 429 || status === 400) {
    nextResponse.message = translateError('LIMIT_RATING')
  }

  return NextResponse.json(nextResponse, { status: status })
}

export async function POST(request: Request): Promise<NextResponse<PlaceResponseInterface>> {
  const translateError = await getTranslations('ERROR')
  if (process.env.TEST_ENV === 'true') {
    return handleResponsePlacesForEnvTest()
  }
  const nextResponse: PlaceResponseInterface = {
    response: [],
    message: translateError('SERVER_ERROR'),
  }

  const apiKey: string | undefined = process.env.GOOGLE_PLACES_API_KEY
  if (apiKey === undefined) {
    nextResponse.message = 'API GOOGLE is not defined'
    return NextResponse.json(nextResponse)
  }
  const { userLocation, requestParameters } = await handleRequestParameters(request)

  const placeCacheService: PlaceCacheService = new PlaceCacheService()
  const cacheKey: string = placeCacheService.getCacheKey(requestParameters, userLocation)
  if (placeCacheService.checkCache(cacheResponse, cacheKey)) {
    nextResponse.response = cacheResponse[cacheKey].data

    return NextResponse.json(
      { response: cacheResponse[cacheKey].data, message: '' },
      { status: 200 }
    )
  }

  const response: Response = await fetchPlaces(apiKey, requestParameters)

  return handleApiResponse(response, userLocation, nextResponse, cacheKey)
}
