import ActivityInterface from "@/interfaces/activity/ActivityInterface"
import { ShareDataInterface } from "@/interfaces/ShareDataInterface"
import { MailService } from "./MailService"
import { FormRequestActivityInterface } from "@/interfaces/activity/FormRequestActivityInterface"

export default class ShareActivityService {

  private async generateUrl(activity: ActivityInterface, form: FormRequestActivityInterface): Promise<ShareDataInterface> {
    const baseUrl: string = window.location.origin

    const response: Response = await fetch('/api/generate-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity, baseUrl, form })
    })
    const data: { response: ShareDataInterface } = await response.json()

    return data.response
  }

  public async handleShare(activity : ActivityInterface, data: FormRequestActivityInterface): Promise<void> {
    const shareData: ShareDataInterface = await this.generateUrl(activity, data)

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Error to share:', err)
      }
    } else {
      MailService.sendMail(shareData)
      console.error('The api to share a link is not supported')
    }
  }
}
