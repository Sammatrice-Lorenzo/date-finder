import { AlertEnum } from '@/enums/AlertEnum'
import DateFormatter from '@/formatters/DateFormatter'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { v1 as uuidv1 } from 'uuid'

export default class SendEmailService {
  private _dateFormatter: DateFormatter

  public constructor() {
    this._dateFormatter = new DateFormatter()
  }

  public async handleSendInviteAccepted(
    targetEmail: string,
    activityQuery: ActivityQueryProps,
    showAlert: CallableFunction
  ): Promise<void> {
    const start: Date = new Date(activityQuery.date)
    const end: Date = new Date(new Date(start).getTime() + 60 * 60 * 1000)
    const startDateTimeStamp: string = this._dateFormatter.getTimeStampOnDate(start)
    const endDateTimeStamp: string = this._dateFormatter.getTimeStampOnDate(end)

    const response = await fetch('/api/event/', {
      method: 'POST',
      body: JSON.stringify({
        uid: uuidv1(),
        activity: activityQuery,
        targetEmail: targetEmail,
        eventDate: this._dateFormatter.getDateEuropeanFormat(start),
        startDateTimeStamp,
        endDateTimeStamp,
      }),
    })

    const data = await response.json()
    const alertType: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alertType)
  }

  public async handleSendInviteRefused(
    activityQuery: ActivityQueryProps,
    showAlert: CallableFunction
  ): Promise<void> {
    const start: Date = new Date(activityQuery.date)

    const response: Response = await fetch('/api/invite-refused', {
      method: 'POST',
      body: JSON.stringify({
        activity: activityQuery,
        eventDate: this._dateFormatter.getDateEuropeanFormat(start),
      }),
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }
}
