import { NextResponse } from "next/server"
import fr from '../../../locales/fr/common.json'
import { RestaurantResponseInterface } from "@/interfaces/RestaurantResponseInterface"
import data from '../../../data/restaurant-test-data.json'
import { Restaurant } from "@/interfaces/Restaurant"
import { RestaurantQueryInterface } from "@/interfaces/RestaurantQueryInterface"

function handleResponseRestaurantForEnvTest(): NextResponse<RestaurantResponseInterface>
{
  const result: Restaurant | undefined = data[0]
  const response: RestaurantResponseInterface = {
    response: result ? [result] : [],
    message: ''
  }
  return NextResponse.json(response)
}

function getUrlAPI(requestParameters: RestaurantQueryInterface): string
{
  const defaultsTerms: string = 'restaurants'
  const baseUrl: string = 'https://api.yelp.com/v3/businesses/search?'
    
  let url: string = `${baseUrl}location=Paris&term=${defaultsTerms}&categories=${requestParameters.category}&limit=30`
  if (requestParameters.location !== '') {
    const term: string = requestParameters.term !== '' ? requestParameters.term : defaultsTerms
    url = `${baseUrl}location=${requestParameters.location}&term=${term}&categories=${requestParameters.category}&limit=30`
  } else if (requestParameters.latitude) {
    url = `${baseUrl}latitude=${requestParameters.latitude}&longitude=${requestParameters.longitude}&term=${defaultsTerms}&categories=${requestParameters.category}&limit=30`
  }

  return url
}

export async function POST(request: Request): Promise<NextResponse<RestaurantResponseInterface>>
{
  if (process.env.TEST_ENV === 'true') {
    return handleResponseRestaurantForEnvTest()
  }
  const nextResponse: RestaurantResponseInterface = {
    response: [],
    message: fr.ERROR.SERVER_ERROR
  }

  const apiKey: string | undefined = process.env.API_KEY_YELP
  if (apiKey === undefined) {
    nextResponse.message = 'API_KEY_YELP is not defined'
    return NextResponse.json(nextResponse)
  }
  const requestParameters: RestaurantQueryInterface = await request.json()
  const url: string = getUrlAPI(requestParameters)
  const response: Response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
  })

  const status: number = response.status
  if (response.ok) {
    const data = await response.json()

    return NextResponse.json({response: data.businesses, message: ''}, {status: status})
  }

  if (status === 429 || status === 400) {
    nextResponse.message = fr.ERROR.LIMIT_RATING
  }

  return NextResponse.json(nextResponse, { status: status })
}
