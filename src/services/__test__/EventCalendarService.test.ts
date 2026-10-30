import EventCalendarService from '../EventCalendarService'
import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import { createTranslator } from 'next-intl'

const translator = ((key: string) => key) as unknown as ReturnType<typeof createTranslator>

const getIcs = (activity: Partial<ActivityEventCalendarInterface['activity']>): string => {
  const body: ActivityEventCalendarInterface = {
    uid: 'uid-test',
    targetEmail: 'target@example.com',
    eventDate: '01/01/2030 20:00',
    startDateTimeStamp: '20300101T190000Z',
    endDateTimeStamp: '20300101T200000Z',
    activity: {
      activity: 'Pique-nique',
      author: 'Author',
      authorEmail: 'author@example.com',
      target: 'Target',
      date: 'Tue, 01 Jan 2030 19:00:00 GMT',
      location: 'Parc Borély',
      ...activity,
    },
  }

  return new EventCalendarService(translator).getCalendarFormatICS(body)
}

/** Lignes logiques : les lignes pliées (CRLF + espace) sont recollées */
const getIcsLines = (activity: Partial<ActivityEventCalendarInterface['activity']>): string[] =>
  getIcs(activity).replace(/\r\n /g, '').split('\r\n')

describe('EventCalendarService', () => {
  test('Test lines use CRLF and are folded at 75 octets', () => {
    const location: string = 'Café de la Plage, '.repeat(10)
    const ics: string = getIcs({ location })
    const rawLines: string[] = ics.split('\r\n')

    expect(ics).not.toMatch(/[^\r]\n/)
    for (const line of rawLines) {
      expect(Buffer.byteLength(line, 'utf8')).toBeLessThanOrEqual(75)
    }
    expect(getIcsLines({ location })).toContain(`LOCATION:${location.replace(/,/g, '\\,')}`)
  })

  test('Test escape text values', () => {
    const lines: string[] = getIcsLines({
      activity: 'Jeux; cartes',
      location: '8 Rue du Jeune Anacharsis, Marseille',
    })

    expect(lines).toContain(String.raw`SUMMARY:Date Jeux\; cartes`)
    expect(lines).toContain(String.raw`LOCATION:8 Rue du Jeune Anacharsis\, Marseille`)
  })

  test('Test new line cannot inject an ICS property', () => {
    const lines: string[] = getIcsLines({
      activity: 'Balade\nATTENDEE:mailto:spam@example.com',
      author: 'Evil"\nX-INJECT:1',
    })

    expect(lines).toContain(String.raw`SUMMARY:Date Balade\nATTENDEE:mailto:spam@example.com`)
    expect(lines).toContain('ORGANIZER;CN="EvilX-INJECT:1":mailto:author@example.com')
    expect(lines.filter(line => line.startsWith('ATTENDEE'))).toHaveLength(1)
  })

  test('Test dates are UTC', () => {
    const lines: string[] = getIcsLines({})

    expect(lines).toContain('DTSTART:20300101T190000Z')
    expect(lines.find(line => line.startsWith('DTSTAMP:'))).toMatch(/^DTSTAMP:\d{8}T\d{6}Z$/)
  })
})
