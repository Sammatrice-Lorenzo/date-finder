import { NextResponse } from 'next/server'
import MailEventService from '@/services/MailEventService'
import { getTranslations } from 'next-intl/server'
import BrevoEmailParametersInteface from '@/interfaces/email/BrevoEmailParametersInteface'
import { inviteRefusedRequestSchema } from '@/schema/apiActivitySchema'
import { invitationRequestService } from '@/services/InvitationRequestService'
import InvitationResponseHelper from '@/helper/InvitationResponseHelper'
import DateFormatter from '@/formatters/DateFormatter'

export async function POST(req: Request) {
  const translateError = await getTranslations('ERROR')
  const translateSuccess = await getTranslations('SUCCESS')
  const translatorActivity = await getTranslations('ACTIVITY.EMAIL')

  try {
    const request = await invitationRequestService.parseRequest(req, inviteRefusedRequestSchema)
    if (request.status !== 'ok') {
      return new InvitationResponseHelper().getErrorResponse(request, translateError)
    }

    const apiKey: string | undefined = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }
    const mailEventService: MailEventService = new MailEventService(translatorActivity)
    const email: BrevoEmailParametersInteface = await mailEventService.createEmailRefuseInvitation({
      activity: request.activity,
      eventDate: new DateFormatter().getDateEuropeanFormatInTimeZone(
        new Date(request.activity.date),
        request.body.timeZone
      ),
    })

    const codeResponse: number = await mailEventService.sendEmail(email)
    if (codeResponse === 202) {
      invitationRequestService.markTokenUsed(request.body.token)
    }
    const message = codeResponse === 202 ? translateSuccess('EMAIL') : translateError('EMAIL_ERROR')

    return NextResponse.json({ message: message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: translateError('SERVER_ERROR') }, { status: 500 })
  }
}
