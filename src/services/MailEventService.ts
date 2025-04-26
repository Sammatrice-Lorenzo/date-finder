import DateFormatter from '@/formatters/DateFormatter'
import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import type { MailData } from '@sendgrid/helpers/classes/mail'
import translation from '@/locales/fr/common.json'

export default class MailEventService {
  private _mailUsername: string | undefined

  constructor() {
    this._mailUsername = process.env.SEND_EMAIL
  }

  public createEmailInvitation(
    body: ActivityEventCalendarInterface,
    emailUser: string,
    icsContent: string
  ): MailData {
    if (!this._mailUsername) {
      throw new Error('No mail username found')
    }

    const start: Date = new Date(body.activity.date)

    return {
      to: emailUser,
      from: this._mailUsername,
      subject: translation.ACTIVITY.EMAIL.SUBJECT,
      templateId: process.env.SEND_GRID_TEMPLATE_ID,
      dynamicTemplateData: {
        event_date: new DateFormatter().getDateEuropeanFormat(start),
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
    if (!this._mailUsername) {
      throw new Error('No mail username found')
    }

    const start: Date = new Date(body.activity.date)

    return {
      to: body.activity.authorEmail,
      from: this._mailUsername,
      subject: translation.ACTIVITY.EMAIL.SUBJECT,
      templateId: process.env.SEND_GRID_TEMPLATE_REFUSED_ID,
      dynamicTemplateData: {
        event_date: new DateFormatter().getDateEuropeanFormat(start),
        event_location: body.activity.location,
        author_name: body.activity.author,
      },
    }
  }
}
