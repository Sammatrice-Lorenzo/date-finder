import { render } from '@testing-library/react'
import { describe, expect, test } from '@jest/globals'
import MovieInputSearch from '../MovieInputSearch'

import translate from '../../../locales/fr/common.json'
import { NextIntlClientProvider } from 'next-intl'

describe('Movie Input Search', (): void => {
  const textMovie: string = translate.MOVIE.SEARCH_MOVIE

  test('Render Movie Input Search', (): void => {
    const { getByPlaceholderText } = render(
      <NextIntlClientProvider locale='fr' messages={translate}>
        <MovieInputSearch />
      </NextIntlClientProvider>
    )

    expect(getByPlaceholderText(textMovie)).toBeTruthy()
  })
})
