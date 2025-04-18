import type MovieProviderResponseInterface from '@/interfaces/movie/MovieProviderResponseInterface'
import MovieProviderService from '@/services/movie/MovieProviderService'
import MovieUrlService from '@/services/movie/MovieUrlService'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<NextResponse<string[]>> {
  const baseUrl: string = `${process.env.TMDB_API}`
  const searchParams: URLSearchParams = new URL(req.url).searchParams

  const language: string = searchParams.get('language') ?? ''
  const defaultParameters: URLSearchParams = MovieUrlService.getDefaultParametersApi(language)
  const movieId: number = Number.parseInt(searchParams.get('movieId') ?? '1')

  const res = await fetch(`${baseUrl}movie/${movieId}/watch/providers?${defaultParameters.toString()}`)
  const data: MovieProviderResponseInterface = await res.json()

  const movieProviderService: MovieProviderService = new MovieProviderService()

  return NextResponse.json(movieProviderService.getProvidersName(data, language))
}
