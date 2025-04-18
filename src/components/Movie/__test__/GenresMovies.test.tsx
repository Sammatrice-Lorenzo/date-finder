import { render } from '@testing-library/react'
import {describe, expect, test} from '@jest/globals'
import GenresMovies from '../GenresMovies'
import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'

describe('Genres Movies', (): void => {
  const genres: MovieGenresInterface[] = [
    {
      id: 1,
      name: 'Action',
    },
    {
      id: 2,
      name: 'Comédie',
    }
  ]

  test('Render Genres Movie', (): void => {

    const { getByText } = render(<GenresMovies genres={genres} />)

    expect(getByText('Action')).toBeTruthy()
  })
})
