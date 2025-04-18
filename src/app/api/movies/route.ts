import type MovieQueryInterface from '@/interfaces/movie/MovieQueryInterface'
import MovieUrlService from '@/services/movie/MovieUrlService'
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
  const searchParams: URLSearchParams = new URL(req.url).searchParams
  const requestParameters: MovieQueryInterface = {
    page: Number.parseInt(searchParams.get('page') ?? '1'),
    searchName: searchParams.get('searchName') ?? '',
    language: searchParams.get('language') ?? 'fr-FR',
    genre: Number.parseInt(searchParams.get('genre') ?? '0')
  }

  const movieUrlService: MovieUrlService = new MovieUrlService()
  const route: string = await movieUrlService.getMoviesUrl(requestParameters)
  const response: Response = await fetch(route)
  const data = await response.json()

  return NextResponse.json(data)
}
