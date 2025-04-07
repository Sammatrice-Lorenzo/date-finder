import MovieQueryInterface from '@/interfaces/movie/MovieQueryInterface'

export default class MovieUrlService {
  
  private static getParameters(requestParameters: MovieQueryInterface, apiKey: string): URLSearchParams
  {
    return new URLSearchParams({
      api_key: apiKey,
      language: requestParameters.language,
      include_adult: 'false',
      page: requestParameters.page.toString(),
    })
  }

  public static async getMoviesUrl(requestParameters: MovieQueryInterface): Promise<string> {
    const baseUrl: string = `${process.env.TMDB_API}`
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) {
      throw new Error('TMBD API key is missing')
    }
    const queryParams: URLSearchParams = MovieUrlService['getParameters'](requestParameters, apiKey)
    let endpoint: string = ''
    
    if (requestParameters.searchName !== '') {
      endpoint = `${baseUrl}search/movie?${queryParams}&query=${requestParameters.searchName}`
    } else if (requestParameters.genre !== 0) {
      endpoint = `${baseUrl}discover/movie?${queryParams}&with_genres=${requestParameters.genre}`
    } else {
      endpoint = `${baseUrl}trending/movie/week?${queryParams}`
    }

    return endpoint
  }
}