import { CardContent, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import type React from 'react'
import BoxContentCard from '../BoxContentCard'
import translate from '@/locales/fr/common.json'

interface MovieContentCardProps {
  movie: MovieInterface
}

export default function MovieContentCard({ movie }: Readonly<MovieContentCardProps>): React.ReactElement {
  const vote: string = movie.vote_average.toFixed(1)
  const release: string = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : translate.MOVIE.INVALID_DATE

  return (
    <CardContent sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {movie.name}
      </Typography>

      <BoxContentCard icon={<CalendarTodayIcon />} text={`${translate.MOVIE.RELEASE} ${release}`} />

      <BoxContentCard icon={<StarIcon />} text={`${translate.PLACE.RATING} ${vote}`} />

      {movie.genres && movie.genres.length > 0 && (
        <BoxContentCard text={`${translate.MOVIE.GENRES} ${movie.genres.join(', ')}`} />
      )}

      {movie.providers.length > 0 && (
        <BoxContentCard text={`${translate.MOVIE.PROVIDERS} ${movie.providers.join(', ')}`} />
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}
      </Typography>
    </CardContent>
  )
}
