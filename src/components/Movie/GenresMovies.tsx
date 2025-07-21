import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import type MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import useMovieStore from '@/services/store/useMovieStore'
import { Chip, Stack } from '@mui/material'
import { mutate } from 'swr'

const GenresMovies = () => {
  const movieStore: MovieStoreInterface = useMovieStore()

  const handleUpdateGenre = (genre: MovieGenresInterface): void => {
    movieStore.resetFilters()
    movieStore.setSelectedGenre(movieStore.selectedGenre !== genre.id ? genre.id : 0)

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
      {movieStore.genres.map((genre: MovieGenresInterface) => (
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
