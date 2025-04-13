import DateHelper from '@/helper/DateHelper'
import { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import translate from '@/locales/fr/common.json'

export class MailService {
  public static sendMail(shareData: ShareDataInterface): void
  {
    const greetings: string = DateHelper.getGreetings()
    const body: string = `\n${greetings},\n\n${translate.ACTIVITY.EMAIL.REQUEST_ACTIVITY} ${shareData.url}`
    window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(body)}`
  }
}