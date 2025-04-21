import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import EventCalendarService from '@/services/EventCalendarService'
import MailEventService from '@/services/MailEventService'
import sgMail from '@sendgrid/mail'
import type { MailData, MailDataRequired } from '@sendgrid/helpers/classes/mail'
import type { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import DateFormatter from '@/formatters/DateFormatter'
import fr from '@/locales/fr/common.json'

export async function POST(req: Request, res: NextApiResponse) {
  const body: ActivityEventCalendarInterface = await req.json()
  const start: Date = DateFormatter.generateDateTimeFromString(body.activity.date)
  const end: Date = new Date(new Date(start).getTime() + 60 * 60 * 1000)

  const icsContent: string = EventCalendarService.getCalendarFormatICS(body, start, end)

  try {
    const apiKey: string | undefined = process.env.API_KEY_SEND_GRID
    if (!apiKey) {
      return res.status(500).json({ error: 'API KEY not found' })
    }
    sgMail.setApiKey(apiKey)

    const emailTarget: MailData = MailEventService.createEmailInvitation(body, body.targetEmail, icsContent)
    const emailAuthor: MailData = MailEventService.createEmailInvitation(body, body.activity.authorEmail, icsContent)

    let codeResponse = 202
    for (const email of [emailAuthor, emailTarget]) {
      const responseEmail = await sgMail.send(email as MailDataRequired)
      codeResponse = responseEmail[0].statusCode
    }

    let message: string = fr.SUCCESS.EMAIL
    if (codeResponse !== 202) {
      message = fr.ERROR.EMAIL_ERROR
    }

    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: fr.ERROR.SERVER_ERROR }, { status: 500 })
  }
}
