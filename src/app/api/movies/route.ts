import MovieQueryInterface from '@/interfaces/movie/MovieQueryInterface'
import MovieUrlService from '@/services/movie/MovieUrlService'
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
  const searchParams: URLSearchParams = new URL(req.url).searchParams
  const requestParameters: MovieQueryInterface = {
    page: parseInt(searchParams.get('page') ?? '1'),
    searchName: searchParams.get('searchName') ?? '',
    language: searchParams.get('language') ?? 'fr-FR',
    genre: parseInt(searchParams.get('genre') ?? '0')
  }

  const route: string = await MovieUrlService.getMoviesUrl(requestParameters)
  const response: Response = await fetch(route)
  const data = await response.json()

  return NextResponse.json(data)
}
