import type React from 'react'
import Movies from '@/components/Movie/Movies'
import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import type ResponseMoviesInterface from '@/interfaces/movie/ResponseMoviesInterface'
import { getLocale } from 'next-intl/server'
import { ProviderType } from '@/interfaces/movie/MovieProviderResponseInterface'

type ResponseMoviesGenres = {
  genres: MovieGenresInterface[]
}

const getGendersMovies = async (
  apiTmdb: string,
  searchParameter: URLSearchParams
): Promise<MovieGenresInterface[]> => {
  const res = await fetch(`${apiTmdb}genre/movie/list?${searchParameter.toString()}`)
  const data: ResponseMoviesGenres = await res.json()

  return data.genres
}

const getMovies = async (
  apiTmdb: string,
  searchParameter: URLSearchParams
): Promise<ResponseMoviesInterface> => {
  const res = await fetch(`${apiTmdb}trending/all/day?${searchParameter.toString()}`)
  const data: ResponseMoviesInterface = await res.json()

  return data
}

const getProviders = async (language: string): Promise<ProviderType[]> => {
  const searchParameter: URLSearchParams = new URLSearchParams({
    language,
  })

  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/movies/providers?${searchParameter.toString()}`)
  const data: ProviderType[] = await res.json()

  return data
}

export default async function MoviesPage(): Promise<React.ReactElement> {
  const apiKey: string | undefined = process.env.TMDB_API_KEY
  const apiTmdb: string | undefined = process.env.TMDB_API
  if (!apiKey || !apiTmdb) {
    throw Error('API KEY is not defined.')
  }

  const locale: string = await getLocale()
  const language: string = `${locale}-${locale.toUpperCase()}`
  const searchParameter: URLSearchParams = new URLSearchParams({
    api_key: apiKey,
    language: language,
  })

  const genres: MovieGenresInterface[] = await getGendersMovies(apiTmdb, searchParameter)
  const moviesResponse: ResponseMoviesInterface = await getMovies(apiTmdb, searchParameter)
  const providersResponse: ProviderType[] = await getProviders(language)

  return (
    <Movies
      initialMovies={moviesResponse}
      genres={genres}
      language={language}
      providers={providersResponse}
    />
  )
}
