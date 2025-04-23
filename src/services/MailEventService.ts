import DateFormatter from '@/formatters/DateFormatter'
import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import type { MailData } from '@sendgrid/helpers/classes/mail'
import translation from '@/locales/fr/common.json'

export default class MailEventService {
  public createEmailInvitation(body: ActivityEventCalendarInterface, emailUser: string, icsContent: string): MailData {
    const mailUsername: string | undefined = process.env.SEND_EMAIL
    if (!mailUsername) {
      throw new Error('No mail username found')
    }

    const start: Date = DateFormatter.generateDateTimeFromString(body.activity.date)

    return {
      to: emailUser,
      from: mailUsername,
      subject: translation.ACTIVITY.EMAIL.SUBJECT,
      templateId: process.env.SEND_GRID_TEMPLATE_ID,
      dynamicTemplateData: {
        event_date: start,
        event_location: body.activity.location,
      },
      attachments: [
        {
          filename: 'invite.ics',
          content: Buffer.from(icsContent).toString('base64'),
          type: 'application/ics',
          disposition: 'attachment',
        },
      ],
    }
  }

  public createEmailRefuseInvitation(body: ActivityEventCalendarInterface): MailData {
    const mailUsername: string | undefined = process.env.SEND_EMAIL
    if (!mailUsername) {
      throw new Error('No mail username found')
    }

    const start: Date = DateFormatter.generateDateTimeFromString(body.activity.date)

    return {
      to: body.activity.authorEmail,
      from: mailUsername,
      subject: translation.ACTIVITY.EMAIL.SUBJECT,
      templateId: process.env.SEND_GRID_TEMPLATE_REFUSED_ID,
      dynamicTemplateData: {
        event_date: start,
        event_location: body.activity.location,
        author_name: body.activity.author,
      },
    }
  }
}
