export default interface MovieAPIInterface {
  id: number
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title?: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
}
