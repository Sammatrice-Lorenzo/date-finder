import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import sgMail from '@sendgrid/mail'
import type { MailData, MailDataRequired } from '@sendgrid/helpers/classes/mail'
import type { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import fr from '../../../locales/fr/common.json'
import MailEventService from '@/services/MailEventService'

export async function POST(req: Request, res: NextApiResponse) {
  const body: ActivityEventCalendarInterface = await req.json()

  try {
    const apiKey: string | undefined = process.env.API_KEY_SEND_GRID
    if (!apiKey) {
      return res.status(500).json({ error: 'API KEY not found' })
    }
    sgMail.setApiKey(apiKey)

    const email: MailData = MailEventService.createEmailRefuseInvitation(body)
    let codeResponse = 202
    const responseEmail = await sgMail.send(email as MailDataRequired)

    let message: string = fr.SUCCESS.EMAIL
    if (codeResponse !== 202) {
      message = fr.ERROR.EMAIL_ERROR
      codeResponse = responseEmail[0].statusCode
    }

    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: fr.ERROR.SERVER_ERROR }, { status: 500 })
  }
}
