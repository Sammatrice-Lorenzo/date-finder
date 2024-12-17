import { NextResponse } from "next/server"
import fr from '../../../locales/fr/common.json'
import { PlaceResponseInterface } from "@/interfaces/PlaceResponseInterface"
import data from '../../../data/restaurant-test-data.json'
import { PlaceQueryInterface } from "@/interfaces/PlaceQueryInterface"
import PlaceAPIInterface from "@/interfaces/PlaceAPIInterface"
import PlaceInterface from "@/interfaces/PlaceInterface"
import { Location } from "@/interfaces/Location"
import PlaceFormatter from "@/formatters/PlaceFormatter"
import PlaceUrlService from "@/services/place/PlaceUrlService"

function handleResponsePlacesForEnvTest(): NextResponse<PlaceResponseInterface>
{
  const result: PlaceInterface | undefined = data[0]
  const response: PlaceResponseInterface = {
    response: result ? [result] : [],
    message: ''
  }
  return NextResponse.json(response)
}

async function convertData(place: PlaceAPIInterface, apiKey: string, locationUser: Location): Promise<PlaceInterface>
{
  const urlAPI: string | undefined = process.env.GOOGLE_PLACE_API
  const detailsUrl: string = `${urlAPI}details/json?place_id=${place.place_id}&fields=formatted_phone_number,photos&key=${apiKey}`
  const detailsResponse = await fetch(detailsUrl)
  const details = await detailsResponse.json()

  if (details.status !== 'OK') {
    throw new Error(`Failed to get details for place: ${place.place_id}`)
  }

  return PlaceFormatter.convertDataFromAPIToPlace(place, details.result, locationUser)
}

export async function POST(request: Request): Promise<NextResponse<PlaceResponseInterface>>
{
  if (process.env.TEST_ENV === 'true') {
    return handleResponsePlacesForEnvTest()
  }
  const nextResponse: PlaceResponseInterface = {
    response: [],
    message: fr.ERROR.SERVER_ERROR
  }

  const apiKey: string | undefined = process.env.GOOGLE_PLACES_API_KEY
  if (apiKey === undefined) {
    nextResponse.message = 'API_KEY_YELP is not defined'
    return NextResponse.json(nextResponse)
  }
  const requestParameters: PlaceQueryInterface = await request.json()
  const userLocation: Location =  { longitude: Number(requestParameters.longitude), latitude: Number(requestParameters.latitude)}
  const url: string = await PlaceUrlService.getPlacesUrl(requestParameters)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })

  const status: number = response.status
  if (response.ok) {
    const data = await response.json()
    const results: PlaceAPIInterface[] = data.results

    const convertedResults: PlaceInterface[] = []
    for (const result of results) {
      const place: PlaceInterface = await convertData(result, apiKey, userLocation)
      convertedResults.push(place)
    }

    return NextResponse.json({response: convertedResults, message: ''}, {status: status})
  }

  if (status === 429 || status === 400) {
    nextResponse.message = fr.ERROR.LIMIT_RATING
  }

  return NextResponse.json(nextResponse, { status: status })
}
