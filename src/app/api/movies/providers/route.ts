import type MovieProviderResponseInterface from '@/interfaces/movie/MovieProviderResponseInterface'
import { ProviderType } from '@/interfaces/movie/MovieProviderResponseInterface'
import MovieProviderService from '@/services/movie/MovieProviderService'
import MovieUrlService from '@/services/movie/MovieUrlService'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<NextResponse<string[] | ProviderType[]>> {
  const baseUrl: string = `${process.env.TMDB_API}`
  const searchParams: URLSearchParams = new URL(req.url).searchParams

  const language: string = searchParams.get('language') ?? ''
  const defaultParameters: URLSearchParams = MovieUrlService.getDefaultParametersApi(language)
  const movieId: number = Number.parseInt(searchParams.get('movieId') ?? '0')

  const endpoint =
    movieId === 0
      ? `${baseUrl}watch/providers/movie?${defaultParameters.toString()}`
      : `${baseUrl}movie/${movieId}/watch/providers?${defaultParameters.toString()}`
  const res = await fetch(endpoint)
  const data: MovieProviderResponseInterface = await res.json()

  const movieProviderService: MovieProviderService = new MovieProviderService()

  return NextResponse.json(movieProviderService.getProvidersInformations(data, language))
}
