import { Restaurant } from "@/interfaces/Restaurant";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse<{response: Restaurant[]}>>
{
  const apiKey: string | undefined = process.env.API_KEY_YELP
  const defaultsTerms: string = 'restaurants'
  if (apiKey === undefined) {
    return new NextResponse('API_KEY_YELP is not defined', { status: 500})
  }
  const requestParameters = await request.json()
  const baseUrl: string = 'https://api.yelp.com/v3/businesses/search?'
    
  let url: string = `${baseUrl}location=Paris&term=${defaultsTerms}&categories=${requestParameters.category}&limit=30`
  if (requestParameters.location !== '') {
    const term: string = requestParameters.term !== '' ? requestParameters.term : defaultsTerms
    url = `${baseUrl}location=${requestParameters.location}&term=${term}&categories=${requestParameters.category}&limit=30`
  } else if (requestParameters.latitude) {
    url = `${baseUrl}latitude=${requestParameters.latitude}&longitude=${requestParameters.longitude}&term=${defaultsTerms}&categories=${requestParameters.category}&limit=30`
  }

  const response: Response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
  })
  const data = await response.json()

  return NextResponse.json({response: data.businesses})
}
