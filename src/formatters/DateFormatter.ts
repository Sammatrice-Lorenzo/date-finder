export default class DateFormatter {
  public getTimeStampOnDate(date: Date): string {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${year}${month}${day}T${hours}${minutes}00`
  }

  public getUtcTimeStamp(date: Date): string {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')
  }

  /** Format dd/MM/yyyy HH:mm dans le fuseau donné (affichage côté serveur) */
  public getDateEuropeanFormatInTimeZone(date: Date, timeZone: string): string {
    const parts: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date)
    const getPart = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find(part => part.type === type)?.value ?? ''

    return `${getPart('day')}/${getPart('month')}/${getPart('year')} ${getPart('hour')}:${getPart('minute')}`
  }

  public getDateTimeLocal(date: Date): string {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  public getDateEuropeanFormat(date: Date): string {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  private getDefaultFormatOfDate(date: Date): string[] {
    const year: string = String(date.getFullYear())
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')

    return [year, month, day]
  }

  private getDefaultFormatTime(date: Date): string[] {
    const hours: string = String(date.getHours()).padStart(2, '0')
    const minutes: string = String(date.getMinutes()).padStart(2, '0')

    return [hours, minutes]
  }
}
