import DateFormatter from '@/formatters/DateFormatter'
import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import translation from '@/locales/fr/common.json'

export default class EventCalendarService {
  public getCalendarFormatICS(body: ActivityEventCalendarInterface): string {
    const dateFormatter: DateFormatter = new DateFormatter()
    const timeStamp: string = dateFormatter.getTimeStampOnDate(new Date())

    return `
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:Microsoft Exchange Server 2010
      BEGIN:VEVENT
      UID:${body.uid}
      DTSTAMP:${timeStamp}Z
      DTSTART:${body.startDateTimeStamp}
      DTEND:${body.endDateTimeStamp}
      SUMMARY:Date ${body.activity.activity}
      DESCRIPTION:${translation.ACTIVITY.EMAIL.EVENT_DESCRIPTION}
      LOCATION:${body.activity.location}
      STATUS:CONFIRMED
      ORGANIZER;CN=${body.activity.author}:mailto:${body.activity.authorEmail}
      ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${body.activity.target}:mailto:${body.targetEmail}
      BEGIN:VALARM
      TRIGGER;RELATED=START:-PT2H
      ACTION:DISPLAY
      DESCRIPTION:Reminder 2h before
      END:VALARM
      BEGIN:VALARM
      TRIGGER;RELATED=START:-PT30M
      ACTION:DISPLAY
      DESCRIPTION:Reminder 30m before
      END:VALARM
      END:VEVENT
      END:VCALENDAR
    `
      .split('\n')
      .map(line => line.trim())
      .join('\n')
  }
}
