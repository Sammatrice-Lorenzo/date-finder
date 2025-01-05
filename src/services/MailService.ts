import { ShareDataInterface } from "@/interfaces/ShareDataInterface"

export class MailService {
  public static sendMail(shareData: ShareDataInterface): void
  {
    const greetings: string = (new Date()).getHours() < 20 ? 'Bonjour' : 'Bonsoir' 
    const body: string = `\n${greetings},\n\nVoici l'invitation : ${shareData.url}`
    window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(body)}`
  }
}