import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from '@jest/globals'
import { NextIntlClientProvider } from 'next-intl'
import ActivityIdeas from '../ActivityIdeas'
import translate from '../../../../locales/fr/common.json'
import places from '../../../../data/json/restaurant-test-data.json'

const ideas = translate.ACTIVITY.IDEAS

const renderIdeas = (onSelectIdea = jest.fn(), onSelectPlace = jest.fn()) => {
  render(
    <NextIntlClientProvider locale='fr' messages={translate}>
      <ActivityIdeas onSelectIdea={onSelectIdea} onSelectPlace={onSelectPlace} />
    </NextIntlClientProvider>
  )

  return { onSelectIdea, onSelectPlace }
}

describe('ActivityIdeas', (): void => {
  test('Select an idea without place type', (): void => {
    const { onSelectIdea } = renderIdeas()

    fireEvent.click(screen.getByText(ideas.ITEMS.BOARD_GAMES))

    expect(onSelectIdea).toHaveBeenCalledWith(ideas.ITEMS.BOARD_GAMES)
    expect(screen.queryByText(ideas.NEARBY.TITLE)).toBeNull()
  })

  test('Filter ideas by category', (): void => {
    renderIdeas()

    fireEvent.click(screen.getByText(ideas.CATEGORIES.SPORT))

    expect(screen.getByText(ideas.ITEMS.BOWLING)).toBeTruthy()
    expect(screen.queryByText(ideas.ITEMS.PICNIC)).toBeNull()
  })

  test('Search places in a city for an idea with place type', async (): Promise<void> => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: [places[0]], message: '' }),
    })
    global.fetch = fetchMock as unknown as typeof fetch
    const { onSelectPlace } = renderIdeas()

    fireEvent.click(screen.getByText(ideas.ITEMS.PICNIC))
    fireEvent.change(screen.getByLabelText(ideas.NEARBY.CITY), { target: { value: 'Marseille' } })
    fireEvent.click(screen.getByText(ideas.NEARBY.SEARCH_CITY))

    fireEvent.click(await screen.findByText(places[0].name))

    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body).toMatchObject({ location: 'Marseille', category: 'park' })
    await waitFor(() => expect(onSelectPlace).toHaveBeenCalledWith(places[0]))
  })
})
