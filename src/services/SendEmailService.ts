import { AlertEnum } from '@/enums/AlertEnum'

export default class SendEmailService {
  /** Fuseau du navigateur : le serveur s'en sert pour afficher la date de l'activité dans l'email */
  private getTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  public async handleSendInviteAccepted(
    targetEmail: string,
    token: string,
    showAlert: CallableFunction
  ): Promise<void> {
    const response = await fetch('/api/event/', {
      method: 'POST',
      body: JSON.stringify({
        token,
        targetEmail: targetEmail,
        timeZone: this.getTimeZone(),
      }),
    })

    const data = await response.json()
    const alertType: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alertType)
  }

  public async handleSendInviteRefused(token: string, showAlert: CallableFunction): Promise<void> {
    const response: Response = await fetch('/api/invite-refused', {
      method: 'POST',
      body: JSON.stringify({
        token,
        timeZone: this.getTimeZone(),
      }),
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }
}
