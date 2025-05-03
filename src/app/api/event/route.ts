import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import EventCalendarService from '@/services/EventCalendarService'
import MailEventService from '@/services/MailEventService'
import sgMail from '@sendgrid/mail'
import type { MailData, MailDataRequired } from '@sendgrid/helpers/classes/mail'
import { type NextRequest, NextResponse } from 'next/server'
import fr from '@/locales/fr/common.json'

export async function POST(req: NextRequest) {
  const body: ActivityEventCalendarInterface = await req.json()
  const icsContent: string = new EventCalendarService().getCalendarFormatICS(body)

  try {
    const apiKey: string | undefined = process.env.API_KEY_SEND_GRID
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }
    sgMail.setApiKey(apiKey)
    const mailEventService: MailEventService = new MailEventService()

    const emailTarget: MailData = mailEventService.createEmailInvitation(
      body,
      body.targetEmail,
      icsContent
    )
    const emailAuthor: MailData = mailEventService.createEmailInvitation(
      body,
      body.activity.authorEmail,
      icsContent
    )

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
