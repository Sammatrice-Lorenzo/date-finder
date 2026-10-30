import DateFormatter from '@/formatters/DateFormatter'
import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import { createTranslator } from 'next-intl'

const ICS_LINE_MAX_OCTETS = 75
const ICS_LINE_BREAK = '\r\n'

export default class EventCalendarService {
  private _translator: ReturnType<typeof createTranslator>

  constructor(translator: ReturnType<typeof createTranslator>) {
    this._translator = translator
  }

  public getCalendarFormatICS(body: ActivityEventCalendarInterface): string {
    const timeStamp: string = new DateFormatter().getUtcTimeStamp(new Date())
    const author: string = this.escapeParameter(body.activity.author)
    const target: string = this.escapeParameter(body.activity.target)

    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:Microsoft Exchange Server 2010',
      'BEGIN:VEVENT',
      `UID:${body.uid}`,
      `DTSTAMP:${timeStamp}`,
      `DTSTART:${body.startDateTimeStamp}`,
      `DTEND:${body.endDateTimeStamp}`,
      `SUMMARY:Date ${this.escapeText(body.activity.activity)}`,
      `DESCRIPTION:${this.escapeText(this._translator('EVENT_DESCRIPTION'))}`,
      `LOCATION:${this.escapeText(body.activity.location)}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=${author}:mailto:${body.activity.authorEmail}`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${target}:mailto:${body.targetEmail}`,
      'BEGIN:VALARM',
      'TRIGGER;RELATED=START:-PT2H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder 2h before',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER;RELATED=START:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder 30m before',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ]

    return lines.map(line => this.foldLine(line)).join(ICS_LINE_BREAK) + ICS_LINE_BREAK
  }

  /** Échappe une valeur TEXT (RFC 5545 §3.3.11) pour empêcher l'injection de lignes */
  private escapeText(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n|\r/g, '\\n')
  }

  /** Valeur de paramètre (CN=…) entre guillemets, sans guillemets ni caractères de contrôle (RFC 5545 §3.1) */
  private escapeParameter(value: string): string {
    return `"${value.replace(/["\u0000-\u001f\u007f]/g, '')}"`
  }

  private foldLine(line: string): string {
    const chunks: string[] = []
    let chunk = ''
    let chunkOctets = 0

    for (const char of line) {
      const charOctets: number = Buffer.byteLength(char, 'utf8')
      const maxOctets: number = chunks.length === 0 ? ICS_LINE_MAX_OCTETS : ICS_LINE_MAX_OCTETS - 1
      if (chunkOctets + charOctets > maxOctets) {
        chunks.push(chunk)
        chunk = ''
        chunkOctets = 0
      }
      chunk += char
      chunkOctets += charOctets
    }
    chunks.push(chunk)

    return chunks.join(`${ICS_LINE_BREAK} `)
  }
}
