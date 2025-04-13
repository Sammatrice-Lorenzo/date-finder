import ActivityInterface from '../activity/ActivityInterface'

export default interface MovieInterface extends ActivityInterface {
  poster_path?: string;
  backdrop_path?: string;
  overview: string;
  vote_average: number;
  genres: string[];
  release_date: string | undefined;
  providers: string[]
}
