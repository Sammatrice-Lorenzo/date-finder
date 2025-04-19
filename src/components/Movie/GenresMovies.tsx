import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { MovieStoreService } from '@/services/Store/MovieStoreService'
import { Chip, Stack } from '@mui/material'
import { mutate } from 'swr'

export type GenresMoviesProps = {
  genres: MovieGenresInterface[],
}

const GenresMovies = ({ genres }: GenresMoviesProps) => {
  const movieStore: MovieStoreInterface = new MovieStoreService().useMovieStore()

  const handleUpdateGenre = (genre: MovieGenresInterface): void => {
    movieStore.setSelectedGenre(movieStore.selectedGenre !== genre.id ? genre.id : 0)
    movieStore.setPage(1)
    movieStore.setMovies([])
    mutate(`/api/movies?${movieStore.queryParams().toString()}`)
  }

  return (
    <Stack
      direction='row'
      spacing={1}
      useFlexGap
      flexWrap='wrap'
      justifyContent='center'
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: 3,
        marginBottom: 2,
      }}
    >
      {genres.map((genre: MovieGenresInterface) => (
        <Chip
          key={genre.id}
          label={genre.name}
          variant='outlined'
          clickable
          onClick={() => handleUpdateGenre(genre)}
          color={movieStore.selectedGenre === genre.id ? 'primary' : 'default'}
          sx={{
            fontSize: '0.8rem',
            paddingX: 1,
            paddingY: 0.5,
          }}
        />
      ))}
    </Stack>
  )
}

export default GenresMovies