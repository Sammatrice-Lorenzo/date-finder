import { render } from '@testing-library/react'
import {describe, expect, test} from '@jest/globals'
import MovieInputSearch from '../MovieInputSearch'

import translate from '../../../locales/fr/common.json'
import React from 'react'

describe('Movie Input Search', (): void => {
  const textMovie: string = translate.MOVIE.SEARCH_MOVIE

  test('Render Movie Input Search', (): void => {

    const { getByPlaceholderText } = render(<MovieInputSearch />)

    expect(getByPlaceholderText(textMovie)).toBeTruthy()
  })
})