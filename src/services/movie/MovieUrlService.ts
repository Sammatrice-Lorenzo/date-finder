import type MovieQueryInterface from '@/interfaces/movie/MovieQueryInterface'

export default class MovieUrlService {
  private getParameters(requestParameters: MovieQueryInterface, apiKey: string): URLSearchParams {
    return new URLSearchParams({
      api_key: apiKey,
      language: requestParameters.language,
      include_adult: 'false',
      page: requestParameters.page.toString(),
    })
  }

  public async getMoviesUrl(requestParameters: MovieQueryInterface): Promise<string> {
    const baseUrl: string = `${process.env.TMDB_API}`
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) {
      throw new Error('TMBD API key is missing')
    }

    const queryParams: URLSearchParams = this.getParameters(requestParameters, apiKey)
    let endpoint = ''

    if (requestParameters.searchName !== '') {
      endpoint = `${baseUrl}search/movie?${queryParams}&query=${requestParameters.searchName}`
    } else if (requestParameters.genre !== 0) {
      endpoint = `${baseUrl}discover/movie?${queryParams}&with_genres=${requestParameters.genre}`
    } else {
      endpoint = `${baseUrl}trending/movie/week?${queryParams}`
    }

    return endpoint
  }

  public static getDefaultParametersApi(language: string): URLSearchParams {
    const apiKey: string | undefined = process.env.TMDB_API_KEY
    if (!apiKey) {
      throw Error('API KEY is not defined.')
    }

    return new URLSearchParams({
      api_key: apiKey,
      language: language,
    })
  }
}
