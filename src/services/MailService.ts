import DateHelper from '@/helper/DateHelper'
import type { ShareDataInterface } from '@/interfaces/ShareDataInterface'
import { createTranslator } from 'next-intl'

export class MailService {
  public sendMail(shareData: ShareDataInterface, t: ReturnType<typeof createTranslator>): void {
    const greetings: string = new DateHelper().getGreetings(t)
    const body: string = `\n${greetings},\n\n${t('EMAIL.REQUEST_ACTIVITY')} ${shareData.url}`

    window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(body)}`
  }
}
