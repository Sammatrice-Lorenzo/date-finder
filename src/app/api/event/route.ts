import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import EventCalendarService from '@/services/EventCalendarService'
import MailEventService from '@/services/MailEventService'
import { type NextRequest, NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'
import BrevoEmailParametersInteface from '@/interfaces/email/BrevoEmailParametersInteface'

export async function POST(req: NextRequest) {
  const body: ActivityEventCalendarInterface = await req.json()
  const translateError = await getTranslations('ERROR')
  const translateSuccess = await getTranslations('SUCCESS')
  const translatorEmail = await getTranslations('ACTIVITY.EMAIL')
  const icsContent: string = new EventCalendarService(translatorEmail).getCalendarFormatICS(body)

  try {
    const apiKey: string | undefined = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }
    const mailEventService: MailEventService = new MailEventService(translatorEmail)

    const emailTarget: BrevoEmailParametersInteface = await mailEventService.createEmailInvitation(
      body,
      body.targetEmail,
      icsContent
    )
    const emailAuthor: BrevoEmailParametersInteface = await mailEventService.createEmailInvitation(
      body,
      body.activity.authorEmail,
      icsContent
    )

    let codeResponse = 202
    for (const email of [emailAuthor, emailTarget]) {
      codeResponse = await mailEventService.sendEmail(email)
    }

    const message = codeResponse === 202 ? translateSuccess('EMAIL') : translateError('EMAIL_ERROR')

    return NextResponse.json({ message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: translateError('SERVER_ERROR') }, { status: 500 })
  }
}
