import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import type { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import { MailService } from './MailService'
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'
import { createTranslator } from 'next-intl'
import { AlertEnum } from '@/enums/AlertEnum'

export default class ShareActivityService {
  private async generateUrl(
    activity: ActivityInterface,
    form: FormRequestActivityInterface,
    showAlert: CallableFunction
  ): Promise<ShareDataInterface | null> {
    const baseUrl: string = window.location.origin

    const response: Response = await fetch('/api/generate-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity, baseUrl, form }),
    })
    const data: { response?: ShareDataInterface; message?: string } = await response.json()
    if (!response.ok || !data.response) {
      showAlert(data.message, AlertEnum.Error)
      return null
    }

    return data.response
  }

  public async handleShare(
    activity: ActivityInterface,
    data: FormRequestActivityInterface,
    t: ReturnType<typeof createTranslator>,
    showAlert: CallableFunction
  ): Promise<void> {
    const shareData: ShareDataInterface | null = await this.generateUrl(activity, data, showAlert)
    if (!shareData) return

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Error to share:', err)
      }
    } else {
      new MailService().sendMail(shareData, t)
      console.error('The api to share a link is not supported')
    }
  }
}
