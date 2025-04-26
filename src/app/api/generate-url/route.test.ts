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
  const response: NextResponse<NextResponseShareDateType> = await POST(request)

  expect(response.status).toBe(200)

  const body: NextResponseShareDateType = await response.json()
  expect(body.response.title).toBe(translate.ACTIVITY.TITLE_LINK_SHARED)
})
