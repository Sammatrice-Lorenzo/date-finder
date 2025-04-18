import { fireEvent, render } from '@testing-library/react'
import MovieCard from '../MovieCard'
import type MovieInterface from '@/interfaces/movie/MovieInterface'
import {describe, expect, test} from '@jest/globals'

import translate from '../../../locales/fr/common.json'


describe('Movie Card', (): void => {
  const date: Date = new Date()

  const movie: MovieInterface = {
    id: '1',
    name: 'Inception',
    poster_path: '/fast-and-furious.png',
    genres: ['Comedié'],
    location: 'Streaming',
    release_date: date.toDateString(),
    vote_average: 8.5,
    overview: 'Description',
    providers: [],
  }

  test('Render Movie Card', (): void => {

    const { getByText, getByAltText } = render(<MovieCard movie={movie} />)

    expect(getByText(`Sortie : ${date.toLocaleDateString()}`)).toBeTruthy()
    expect(getByText('Inception')).toBeTruthy()
    
    const image: HTMLElement = getByAltText('Inception')
    expect(image.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500/fast-and-furious.png')
    expect(image.getAttribute('alt')).toBe('Inception')
  })

  test('Click On movie Card for to show a Modal', () => {
    const { getByText } = render(<MovieCard movie={movie} />)


    const card = getByText('Inception')
    fireEvent.click(card)
  
    const modalTitle = getByText(translate.ACTIVITY.MODAL.TITLE)
    expect(modalTitle).toBeTruthy()
  })
})
