import { createTranslator } from 'next-intl'

export default class DateHelper {
  public getGreetings(t: ReturnType<typeof createTranslator>): string {
    return t(new Date().getHours() < 20 ? 'INVITATION.GOOD_MORNING' : 'INVITATION.GOOD_EVENING')
  }
}
