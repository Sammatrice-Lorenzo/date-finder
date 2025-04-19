import { AlertEnum } from "@/enums/AlertEnum"
import type { ActivityQueryProps } from "@/types/ActivityQueryProps"
import { v1 as uuidv1 } from 'uuid'

export default class SendEmailService {

  public async handleSendInviteAccepted(targetEmail: string, activityQuery: ActivityQueryProps, showAlert: CallableFunction): Promise<void> {
    const response = await fetch('/api/event/', {
      method: 'POST',
      body: JSON.stringify({
        uid: uuidv1(),
        activity: activityQuery,
        targetEmail: targetEmail,
      })
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }

  public async handleSendInviteRefused(activityQuery: ActivityQueryProps, showAlert: CallableFunction): Promise<void> {
    const response: Response = await fetch('/api/invite-refused', {
      method: 'POST',
      body: JSON.stringify({
        activity: activityQuery,
      })
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }
}
