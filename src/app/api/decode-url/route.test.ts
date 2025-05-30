/**
 * @jest-environment node
 */
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'
import data from '@/data/json/form-request-data.json'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import { matchers } from 'jest-json-schema'
import { POST } from './route'
import type { NextResponse } from 'next/server'
expect.extend(matchers)
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'
import type { NextResponseUrlActivityDecodedType } from '@/types/NextResponseUrlActivityDecodedType'
import type { ErrorResponseType } from '@/types/ErrorResponseType'

type FormRequest = Omit<FormRequestActivityInterface, 'date'>

it('Test return response with status 200', async () => {
  const activity: ActivityInterface = {
    id: '1',
    location: 'Restaurant',
    name: 'Burger',
  }

  const formData: FormRequest = data
  const form: FormRequestActivityInterface = {
    date: new Date(),
    'author-name': formData['author-name'],
    'target-name': formData['target-name'],
    'author-email': formData['author-email'],
  }

  const token: string = new UrlActivityGeneratorService().generateParametersActivityForShare(
    activity,
    form
  )
  const request: Request = {
    json: async () => ({ token }),
  } as Request
  const response: NextResponse<NextResponseUrlActivityDecodedType | ErrorResponseType> =
    await POST(request)

  expect(response.status).toBe(200)

  const body: NextResponseUrlActivityDecodedType = await response.json()
  expect(body.response.author).toBe(form['author-name'])

  const dateExpected: Date = form.date ?? new Date()
  expect(body.response.date).toBe(dateExpected.toUTCString())
})

it('Test return response error token', async () => {
  const request: Request = {
    json: async () => ({ token: null }),
  } as Request
  const response: NextResponse<NextResponseUrlActivityDecodedType | ErrorResponseType> =
    await POST(request)

  expect(response.status).toBe(200)

  const body: ErrorResponseType = await response.json()
  expect(body.error).toBe('Invalid token')
})
