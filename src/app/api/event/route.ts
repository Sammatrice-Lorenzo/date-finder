import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import EventCalendarService from '@/services/EventCalendarService'
import MailEventService from '@/services/MailEventService'
import sgMail from '@sendgrid/mail'
import type { MailData, MailDataRequired } from '@sendgrid/helpers/classes/mail'
import { type NextRequest, NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'

export async function POST(req: NextRequest) {
  const body: ActivityEventCalendarInterface = await req.json()
  const translateError = await getTranslations('ERROR')
  const translateSuccess = await getTranslations('SUCCESS')
  const translatorEmail = await getTranslations('ACTIVITY.EMAIL')
  const icsContent: string = new EventCalendarService(translatorEmail).getCalendarFormatICS(body)

  try {
    const apiKey: string | undefined = process.env.API_KEY_SEND_GRID
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }
    sgMail.setApiKey(apiKey)
    const mailEventService: MailEventService = new MailEventService(translatorEmail)

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

    let message: string = translateSuccess('EMAIL')
    if (codeResponse !== 202) {
      message = translateError('EMAIL_ERROR')
    }

    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: translateError('SERVER_ERROR') }, { status: 500 })
  }
}
