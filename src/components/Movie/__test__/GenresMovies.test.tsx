import { render } from '@testing-library/react'
import { describe, expect, test } from '@jest/globals'
import GenresMovies from '../GenresMovies'
import type MovieGenresInterface from '@/interfaces/genre/MovieGenresInterface'
import { NextIntlClientProvider } from 'next-intl'
import translate from '../../../locales/fr/common.json'
import MovieStoreInterface from '@/interfaces/movie/MovieStoreInterface'
import { setupUseMovieStoreMock } from '@/__test__/__mokcs__/useMovieStore.mock'

jest.mock('../../../services/store/useMovieStore')

describe('Genres Movies', (): void => {
  const genres: MovieGenresInterface[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comédie' },
  ]

  beforeEach(() => {
    setupUseMovieStoreMock({
      genres,
    } as unknown as MovieStoreInterface)
  })

  test('Render Genres Movie', (): void => {
    const { getByText } = render(
      <NextIntlClientProvider locale='fr' messages={translate}>
        <GenresMovies />
      </NextIntlClientProvider>
    )

    expect(getByText('Action')).toBeTruthy()
  })
})
