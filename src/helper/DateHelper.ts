import translate from '@/locales/fr/common.json'

export default class DateHelper {
  public getGreetings(): string {
    return new Date().getHours() < 20
      ? translate.ACTIVITY.INVITATION.GOOD_MORNING
      : translate.ACTIVITY.INVITATION.GOOD_EVENING
  }
}
