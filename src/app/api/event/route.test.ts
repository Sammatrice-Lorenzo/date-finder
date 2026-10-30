/**
 * @jest-environment node
 */
import { POST } from './route'
import { POST as POST_REFUSED } from '../invite-refused/route'
import { NextRequest } from 'next/server'
import { UrlActivityGeneratorService } from '@/services/UrlActivityGeneratorService'

jest.mock('next-intl/server', () => ({
  getTranslations: () => Promise.resolve((key: string): string => key),
}))

const fetchSpy = jest.spyOn(global, 'fetch')
let ipCounter = 0

const createRequest = (body: unknown, ip: string = `10.0.0.${++ipCounter}`): NextRequest =>
  new NextRequest('http://localhost/api/event', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'x-forwarded-for': ip },
  })

let tokenCounter = 0

/** Contenu unique : deux tokens identiques signés dans la même seconde seraient égaux */
const createToken = (): string =>
  new UrlActivityGeneratorService().generateParametersActivityForShare(
    { id: '1', name: 'Pique-nique', location: 'Parc Borély' },
    {
      date: new Date('2030-01-01T19:00:00Z'),
      'author-name': `Author ${++tokenCounter}`,
      'author-email': 'author@example.com',
      'target-name': 'Target',
    }
  )

const mockBrevo = (...statuses: number[]): void => {
  let call = 0
  fetchSpy.mockImplementation(
    async () => new Response('{}', { status: statuses[Math.min(call++, statuses.length - 1)] })
  )
}

describe('POST /api/event', () => {
  beforeAll(() => {
    process.env.JWT_KEY ??= 'test-jwt-key'
    process.env.BREVO_API_KEY = 'test-brevo-key'
    process.env.SEND_EMAIL = 'noreply@example.com'
  })

  afterEach(() => fetchSpy.mockReset())

  it('Test refuse a forged activity without valid token', async () => {
    const response = await POST(
      createRequest({
        token: 'forged',
        targetEmail: 'victim@example.com',
        timeZone: 'Europe/Paris',
        activity: { authorEmail: 'spam@example.com' },
      })
    )

    expect(response.status).toBe(400)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('Test refuse an invalid body', async () => {
    const response = await POST(createRequest({ targetEmail: 'not-an-email' }))

    expect(response.status).toBe(400)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('Test send emails once with the date read from the token', async () => {
    mockBrevo(201)
    const token: string = createToken()
    const body = { token, targetEmail: 'target@example.com', timeZone: 'Europe/Paris' }

    const response = await POST(createRequest(body))

    expect(response.status).toBe(202)
    expect(fetchSpy).toHaveBeenCalledTimes(2)
    const email = JSON.parse(fetchSpy.mock.calls[0][1]?.body as string)
    expect(email.htmlContent).toContain('01/01/2030 20:00')

    const replay = await POST(createRequest({ ...body, targetEmail: 'other@example.com' }))
    const refusedAfterAccept = await POST_REFUSED(createRequest({ token, timeZone: 'UTC' }))
    expect(replay.status).toBe(400)
    expect(refusedAfterAccept.status).toBe(400)
    expect(fetchSpy).toHaveBeenCalledTimes(2)
  })

  it('Test report an error when one email fails and allow a retry', async () => {
    mockBrevo(400, 201)
    const body = { token: createToken(), targetEmail: 'target@example.com', timeZone: 'UTC' }

    const failed = await POST(createRequest(body))
    mockBrevo(201)
    const retry = await POST(createRequest(body))

    expect(failed.status).toBe(400)
    expect(retry.status).toBe(202)
  })

  it('Test rate limit requests from the same IP', async () => {
    const statuses: number[] = []
    for (let index = 0; index < 6; index++) {
      const response = await POST(createRequest({ token: 'forged' }, '192.168.1.1'))
      statuses.push(response.status)
    }

    expect(statuses).toEqual([400, 400, 400, 400, 400, 429])
  })
})
