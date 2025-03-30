import DateHelper from '@/helper/DateHelper'
import { ShareDataInterface } from '@/interfaces/ShareDataInterface'

export class MailService {
  public static sendMail(shareData: ShareDataInterface): void
  {
    const greetings: string = DateHelper.getGreetings()
    const body: string = `\n${greetings},\n\nVoici l'invitation : ${shareData.url}`
    window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(body)}`
  }
}