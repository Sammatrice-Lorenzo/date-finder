import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import sgMail from '@sendgrid/mail'
import type { MailData, MailDataRequired } from '@sendgrid/helpers/classes/mail'
import { NextResponse } from 'next/server'
import MailEventService from '@/services/MailEventService'
import { getTranslations } from 'next-intl/server'

export async function POST(req: Request) {
  const body: ActivityEventCalendarInterface = await req.json()
  const translateError = await getTranslations('ERROR')
  const translateSuccess = await getTranslations('SUCCESS')
  const translatorActivity = await getTranslations('ACTIVITY.EMAIL')

  try {
    const apiKey: string | undefined = process.env.API_KEY_SEND_GRID
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }
    sgMail.setApiKey(apiKey)

    const email: MailData = new MailEventService(translatorActivity).createEmailRefuseInvitation(
      body
    )
    let codeResponse = 202
    const responseEmail = await sgMail.send(email as MailDataRequired)

    let message: string = translateSuccess('EMAIL')
    if (codeResponse !== 202) {
      message = translateError('EMAIL_ERROR')
      codeResponse = responseEmail[0].statusCode
    }

    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: translateError('SERVER_ERROR') }, { status: 500 })
  }
}
