import DateFormatter from '@/formatters/DateFormatter'
import ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import translation from '@/locales/fr/common.json'

export default class EventCalendarService {
  
  public static getCalendarFormatICS(body: ActivityEventCalendarInterface, start: Date, end: Date): string
  {
    const timeStamp: string = DateFormatter.getTimeStampOnDate(new Date())
    const startIcs: string = DateFormatter.getTimeStampOnDate(start)
    const endIcs: string = DateFormatter.getTimeStampOnDate(end)

    return `
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:Microsoft Exchange Server 2010
      BEGIN:VEVENT
      UID:${body.uid}
      DTSTAMP:${timeStamp}Z
      DTSTART:${startIcs}
      DTEND:${endIcs}
      SUMMARY:Date ${body.activity.activity}
      DESCRIPTION:${translation.ACTIVITY.EMAIL.EVENT_DESCRIPTION}
      LOCATION:${body.activity.location}
      STATUS:CONFIRMED
      ORGANIZER;CN=${body.activity.author}:mailto:${body.activity.authorEmail}
      ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${body.activity.target}:mailto:${body.targetEmail}
      BEGIN:VALARM
      TRIGGER:-PT15M
      ACTION:DISPLAY
      DESCRIPTION:Reminder
      END:VALARM
      END:VEVENT
      END:VCALENDAR
    `.split('\n').map(line => line.trim()).join('\n')
  }
}