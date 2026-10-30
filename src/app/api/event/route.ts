import type ActivityEventCalendarInterface from '@/interfaces/activity/ActivityEventCalendarInterface'
import EventCalendarService from '@/services/EventCalendarService'
import MailEventService from '@/services/MailEventService'
import { type NextRequest, NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'
import BrevoEmailParametersInteface from '@/interfaces/email/BrevoEmailParametersInteface'
import { eventRequestSchema } from '@/schema/apiActivitySchema'
import { invitationRequestService } from '@/services/InvitationRequestService'
import InvitationResponseHelper from '@/helper/InvitationResponseHelper'
import DateFormatter from '@/formatters/DateFormatter'
import { v4 as uuidv4 } from 'uuid'

const EVENT_DURATION_MS = 60 * 60 * 1000

export async function POST(req: NextRequest) {
  const translateError = await getTranslations('ERROR')
  const translateSuccess = await getTranslations('SUCCESS')
  const translatorEmail = await getTranslations('ACTIVITY.EMAIL')
  const responseHelper: InvitationResponseHelper = new InvitationResponseHelper()

  try {
    const request = await invitationRequestService.parseRequest(req, eventRequestSchema)
    if (request.status !== 'ok') {
      return responseHelper.getErrorResponse(request, translateError)
    }

    const apiKey: string | undefined = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: 'API KEY not found' }, { status: 500 })
    }

    const { activity } = request
    const dateFormatter: DateFormatter = new DateFormatter()
    const start: Date = new Date(activity.date)
    const body: ActivityEventCalendarInterface = {
      uid: uuidv4(),
      activity,
      targetEmail: request.body.targetEmail,
      eventDate: dateFormatter.getDateEuropeanFormatInTimeZone(start, request.body.timeZone),
      startDateTimeStamp: dateFormatter.getUtcTimeStamp(start),
      endDateTimeStamp: dateFormatter.getUtcTimeStamp(
        new Date(start.getTime() + EVENT_DURATION_MS)
      ),
    }
    const icsContent: string = new EventCalendarService(translatorEmail).getCalendarFormatICS(body)
    const mailEventService: MailEventService = new MailEventService(translatorEmail)

    const emails: BrevoEmailParametersInteface[] = await Promise.all([
      mailEventService.createEmailInvitation(body, body.activity.authorEmail, icsContent),
      mailEventService.createEmailInvitation(body, body.targetEmail, icsContent),
    ])
    const codeResponse: number = responseHelper.getSendStatus(
      await Promise.all(emails.map(email => mailEventService.sendEmail(email)))
    )
    if (codeResponse === 202) {
      invitationRequestService.markTokenUsed(request.body.token)
    }

    const message = codeResponse === 202 ? translateSuccess('EMAIL') : translateError('EMAIL_ERROR')

    return NextResponse.json({ message }, { status: codeResponse })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: translateError('SERVER_ERROR') }, { status: 500 })
  }
}
