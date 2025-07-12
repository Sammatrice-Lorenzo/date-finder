import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import { NextResponse } from 'next/server'
import MailEventService from '@/services/MailEventService'
import { getTranslations } from 'next-intl/server'
import BrevoEmailParametersInteface from '@/interfaces/email/BrevoEmailParametersInteface'

export async function POST(req: Request) {
  const body: Pick<ActivityEventCalendarInterface, 'activity' | 'eventDate'> = await req.json()
  const translateError = await getTranslations('ERROR')
  const translateSuccess = await getTranslations('SUCCESS')
  const translatorActivity = await getTranslations('ACTIVITY.EMAIL')

  try {
    const apiKey: string | undefined = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }
    const mailEventService: MailEventService = new MailEventService(translatorActivity)
    const email: BrevoEmailParametersInteface =
      await mailEventService.createEmailRefuseInvitation(body)

    const codeResponse: number = await mailEventService.sendEmail(email)
    const message = codeResponse === 202 ? translateSuccess('EMAIL') : translateError('EMAIL_ERROR')

    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: translateError('SERVER_ERROR') }, { status: 500 })
  }
}
