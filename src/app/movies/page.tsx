import React from 'react'
import Movies from '@/components/Movie/Movies'
import MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import ResponseMoviesInterface from '@/interfaces/movie/ResponseMoviesInterface'

type ResponseMoviesGenres = {
  genres: MovieGenresInterface[]
}

const getGendersMovies =  async (apiTmdb: string, searchParameter: URLSearchParams): Promise<MovieGenresInterface[]> => {
  const res = await fetch(`${apiTmdb}genre/movie/list?${searchParameter.toString()}`)
  const data: ResponseMoviesGenres = await res.json()
  
  return data.genres
}

const getMovies = async (apiTmdb: string, searchParameter: URLSearchParams): Promise<ResponseMoviesInterface> => {
  const res = await fetch(`${apiTmdb}trending/all/day?${searchParameter.toString()}`)
  const data: ResponseMoviesInterface = await res.json()

  return data
}

export default async function MoviesPage(): Promise<React.ReactElement> {
  const apiKey: string | undefined = process.env.TMDB_API_KEY
  const apiTmdb: string | undefined = process.env.TMDB_API
  if (!apiKey || !apiTmdb) {
    throw Error('API KEY is not defined.')
  }

  const language: string = 'fr-FR'
  const searchParameter: URLSearchParams = new URLSearchParams({
    'api_key': apiKey,
    'language': language,
  })

  const genres: MovieGenresInterface[] = await getGendersMovies(apiTmdb, searchParameter)
  const moviesResponse: ResponseMoviesInterface = await getMovies(apiTmdb, searchParameter)

  return (
    <Movies initialMovies={moviesResponse} genres={genres} language={language} />
  )
}