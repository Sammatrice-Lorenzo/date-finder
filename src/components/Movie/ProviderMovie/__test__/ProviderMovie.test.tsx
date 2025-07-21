import { fireEvent, render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, test } from '@jest/globals'

import translate from '@/locales/fr/common.json'
import ProviderMovies from '../ProvidersMovie'
import { setupUseMovieStoreMock } from '@/__test__/__mokcs__/useMovieStore.mock'
import { ProviderInterface } from '@/interfaces/provider/ProviderInteface'

jest.mock('../../../../services/store/useMovieStore')

describe('Providers', (): void => {
  const providers: ProviderInterface[] = [
    {
      provider_id: 1,
      provider_name: 'Netflix',
      logo_path: '/netflix.png',
      display_priority: 1,
      display_priorities: {
        FR: 1,
        AT: 0,
        AU: 0,
        BE: 0,
        BR: 0,
        CA: 0,
        CH: 0,
        DE: 0,
        ES: 0,
        GB: 0,
        IE: 0,
        IN: 0,
        IT: 0,
        JP: 0,
        MX: 0,
        NL: 0,
        NZ: 0,
        PL: 0,
        PT: 0,
        RU: 0,
        SE: 0,
        US: 0,
      },
    },
  ]

  beforeEach(() => {
    setupUseMovieStoreMock({
      providers,
    })
  })
  test('Render Provider Movie', (): void => {
    render(
      <NextIntlClientProvider locale='fr' messages={translate}>
        <ProviderMovies />
      </NextIntlClientProvider>
    )

    expect(screen.findByLabelText(translate.MOVIE.PROVIDERS)).toBeTruthy()
  })

  test('Click On SelectProvider', () => {
    render(
      <NextIntlClientProvider locale='fr' messages={translate}>
        <ProviderMovies />
      </NextIntlClientProvider>
    )

    fireEvent.mouseDown(screen.getByRole('combobox'))
    const selectProviders: HTMLElement = screen.getByTestId('Netflix')
    fireEvent.click(selectProviders.closest('[role="option"]') as Element)

    expect(selectProviders).toBeDefined()
  })
})
