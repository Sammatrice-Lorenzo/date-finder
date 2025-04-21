import type MovieQueryInterface from '@/interfaces/movie/MovieQueryInterface'
import MovieUrlService from '../MovieUrlService'

describe('MovieUrlService', () => {
  let service: MovieUrlService

  beforeEach(() => {
    service = new MovieUrlService()
  })

  const moviesParams: MovieQueryInterface = {
    genre: 0,
    language: 'fr-FR',
    page: 1,
    searchName: '',
  }
  const baseUrl: string = process.env.TMDB_API ?? ''

  test('Test defautl url', async () => {
    const moviesUrls = await service.getMoviesUrl(moviesParams)

    const apiKey: string = process.env.TMDB_API_KEY ?? ''
    const query: string = `api_key=${apiKey}&language=fr-FR&include_adult=false&page=1`
    expect(moviesUrls).toBe(`${baseUrl}trending/movie/week?${query}`)
  })

  test('Test search query url', async () => {
    moviesParams.searchName = 'fast &'
    const moviesUrls = await service.getMoviesUrl(moviesParams)

    const apiKey: string = process.env.TMDB_API_KEY ?? ''
    const query: string = `api_key=${apiKey}&language=fr-FR&include_adult=false&page=1`
    expect(moviesUrls).toBe(`${baseUrl}search/movie?${query}&query=${moviesParams.searchName}`)
  })

  test('Test search genres', async () => {
    moviesParams.searchName = ''
    moviesParams.genre = 1
    const moviesUrls = await service.getMoviesUrl(moviesParams)

    const apiKey: string = process.env.TMDB_API_KEY ?? ''
    const query: string = `api_key=${apiKey}&language=fr-FR&include_adult=false&page=1`

    expect(moviesUrls).toBe(`${baseUrl}discover/movie?${query}&with_genres=${moviesParams.genre}`)
  })
})
