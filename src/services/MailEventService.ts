import AcceptInvitationEmail from '@/components/Email/AcceptInvitationEmail'
import RejectInvitationEmail from '@/components/Email/RejectInvitationEmail'
import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import BrevoEmailParametersInteface from '@/interfaces/email/BrevoEmailParametersInteface'
import { render } from '@react-email/render'
import { createTranslator } from 'next-intl'

export default class MailEventService {
  private _mailUsername: string | undefined
  private _translator: ReturnType<typeof createTranslator>

  constructor(translator: ReturnType<typeof createTranslator>) {
    this._mailUsername = process.env.SEND_EMAIL
    this._translator = translator
  }

  public async createEmailInvitation(
    body: ActivityEventCalendarInterface,
    emailUser: string,
    icsContent: string
  ): Promise<BrevoEmailParametersInteface> {
    if (!this._mailUsername) {
      throw new Error('No mail username found')
    }

    return {
      to: [
        {
          name: body.activity.target,
          email: emailUser,
        },
      ],
      sender: {
        name: 'DateFinder',
        email: this._mailUsername,
      },
      subject: this._translator('SUBJECT'),
      htmlContent: await this.getParametersEmailInvitation(body),
      attachment: [
        {
          name: 'invite.ics',
          content: Buffer.from(icsContent).toString('base64'),
        },
      ],
    }
  }

  public async createEmailRefuseInvitation(
    body: Pick<ActivityEventCalendarInterface, 'activity' | 'eventDate'>
  ): Promise<BrevoEmailParametersInteface> {
    if (!this._mailUsername) {
      throw new Error('No mail username found')
    }

    return {
      to: [
        {
          name: body?.activity?.author,
          email: body?.activity?.authorEmail,
        },
      ],
      sender: {
        name: 'DateFinder',
        email: this._mailUsername,
      },
      subject: this._translator('SUBJECT'),
      htmlContent: await this.getParametersEmailRejectInvitation(body),
    }
  }

  public async sendEmail(email: BrevoEmailParametersInteface): Promise<number> {
    const response: Response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json',
      },
      body: JSON.stringify(email),
    })

    let codeResponse = 202
    const resData = await response.json()
    if (!response.ok) {
      console.error('Email error:', resData)
      codeResponse = response.status
    }

    return codeResponse
  }

  private async getParametersEmailInvitation(
    body: ActivityEventCalendarInterface
  ): Promise<string> {
    return await render(
      AcceptInvitationEmail({
        eventDate: body.eventDate,
        eventLocation: body.activity.location,
        t: {
          title: this._translator('TITLE'),
          greeting: this._translator('GREETING'),
          message: this._translator('MESSAGE'),
          date: this._translator('DATE'),
          location: this._translator('LOCATION'),
          regards: this._translator('REGARDS'),
        },
      }),
      { pretty: true }
    )
  }

  private async getParametersEmailRejectInvitation(
    body: Pick<ActivityEventCalendarInterface, 'activity' | 'eventDate'>
  ): Promise<string> {
    return await render(
      RejectInvitationEmail({
        eventDate: body.eventDate,
        eventLocation: body.activity.location,
        authorName: body.activity.author,
        t: {
          title: this._translator('TITLE_REFUSED'),
          greeting: this._translator('GREETING'),
          message: this._translator('REFUSED_MESSAGE'),
          date: this._translator('DATE'),
          location: this._translator('LOCATION'),
          regards: this._translator('REGARDS'),
        },
      }),
      { pretty: true }
    )
  }
}
