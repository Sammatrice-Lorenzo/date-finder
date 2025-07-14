import { CardContent, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import type React from 'react'
import BoxContentCard from '../BoxContentCard'
import { useTranslations } from 'next-intl'

interface MovieContentCardProps {
  movie: MovieInterface
}

export default function MovieContentCard({
  movie,
}: Readonly<MovieContentCardProps>): React.ReactElement {
  const vote: string = movie.vote_average.toFixed(1)
  const translateMovie = useTranslations('MOVIE')
  const translatePlace = useTranslations('PLACE')
  const release: string = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : translateMovie('INVALID_DATE')

  return (
    <CardContent sx={{ padding: 2 }}>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        {movie.name}
      </Typography>

      <BoxContentCard
        icon={<CalendarTodayIcon />}
        text={`${translateMovie('RELEASE')} ${release}`}
      />

      <BoxContentCard icon={<StarIcon />} text={`${translatePlace('RATING')} ${vote} / 10`} />

      {movie.genres && movie.genres.length > 0 && (
        <BoxContentCard text={`${translateMovie('GENRES')} ${movie.genres.join(', ')}`} />
      )}

      {movie.providers.length > 0 && (
        <BoxContentCard text={`${translateMovie('PROVIDERS')} ${movie.providers.join(', ')}`} />
      )}

      <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
        {movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}
      </Typography>
    </CardContent>
  )
}
