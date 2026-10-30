/**
 * @jest-environment node
 */
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'
import data from '@/data/json/form-request-data.json'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import { matchers } from 'jest-json-schema'
import { POST } from './route'
import type { NextResponse } from 'next/server'
import type { NextResponseShareDateType } from '@/types/NextResponseShareDateType'
expect.extend(matchers)
import translate from '@/locales/fr/common.json'

type FormRequest = Omit<FormRequestActivityInterface, 'date'>
type TranslationType = Record<string, string> & {
  TITLE_LINK_SHARED: string
}

jest.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string): string => {
      const translations: TranslationType = {
        TITLE_LINK_SHARED: translate.ACTIVITY.TITLE_LINK_SHARED,
      }
      return translations[key]
    }),
}))

it('Test return response with status 200', async () => {
  const formData: FormRequest = data
  const form: FormRequestActivityInterface = {
    date: new Date(),
    'author-name': formData['author-name'],
    'target-name': formData['target-name'],
    'author-email': formData['author-email'],
  }

  const activity: ActivityInterface = {
    id: '1',
    location: 'Restaurant',
    name: 'Burger',
  }

  const request: Request = {
    json: async () => ({ activity, form, baseUrl: 'http://localhost' }),
  } as Request
  const response = (await POST(request)) as NextResponse<NextResponseShareDateType>

  expect(response.status).toBe(200)

  const body: NextResponseShareDateType = await response.json()
  expect(body.response.title).toBe(translate.ACTIVITY.TITLE_LINK_SHARED)
})

it('Test return status 400 when body is invalid', async () => {
  const request: Request = {
    json: async () => ({
      activity: { id: '1', name: '', location: 'Restaurant' },
      form: { date: 'not a date', 'author-email': 'invalid' },
      baseUrl: 'javascript:alert(1)',
    }),
  } as Request
  const response = await POST(request)

  expect(response.status).toBe(400)
})

it.each([
  ['null', null],
  ['in the past', '2020-01-01T10:00:00.000Z'],
])('Test return status 400 when date is %s', async (_label: string, date: string | null) => {
  const request: Request = {
    json: async () => ({
      activity: { id: '1', name: 'Burger', location: 'Restaurant' },
      form: { ...data, date },
      baseUrl: 'http://localhost',
    }),
  } as Request
  const response = await POST(request)

  expect(response.status).toBe(400)
})
