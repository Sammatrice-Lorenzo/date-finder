import { fireEvent, render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, test } from '@jest/globals'
import translate from '../../../locales/fr/common.json'
import SelectLanguage from '../SelectLanguage'

describe('Select Language', (): void => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        reload: jest.fn(),
      },
    })
  })

  test('Render Select Language', (): void => {
    render(
      <NextIntlClientProvider locale='fr' messages={translate}>
        <SelectLanguage />
      </NextIntlClientProvider>
    )

    const hiddenInput = screen.getByTestId('language-flag-test').querySelector('input')
    if (hiddenInput) {
      expect(hiddenInput.value).toBe('fr')
    }
  })

  test('Select an other language', () => {
    render(
      <NextIntlClientProvider locale='fr' messages={translate}>
        <SelectLanguage />
      </NextIntlClientProvider>
    )

    fireEvent.mouseDown(screen.getByRole('combobox'))
    const italianFlag: HTMLElement = screen.getByTestId('it-select')
    fireEvent.click(italianFlag.closest('[role="option"]') as Element)

    expect(italianFlag).toBeDefined()

    const hiddenInput = screen.getByTestId('language-flag-test').querySelector('input')
    if (hiddenInput) {
      expect(hiddenInput.value).toBe('it')
    }
  })
})
