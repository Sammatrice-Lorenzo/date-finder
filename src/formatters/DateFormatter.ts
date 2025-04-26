export default class DateFormatter {
  public getTimeStampOnDate(date: Date): string {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${year}${month}${day}T${hours}${minutes}00`
  }

  /**
   * @param date format "DD/MM/YYYY HH:mm"
   *
   * @returns Date
   */
  public static generateDateTimeFromString(date: string): Date {
    const [datePart, time] = date.split(' ')
    const [day, month, year] = datePart.split('/')
    const [hours, minutes] = time.split(':')

    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hours),
      Number.parseInt(minutes)
    )
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

  private getTimeZoneFormat(
    date: Date,
    options: Intl.DateTimeFormatOptions
  ): Intl.DateTimeFormatPart[] {
    options.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, options)

    return formatter.formatToParts(date)
  }

  private extractParts(parts: Intl.DateTimeFormatPart[], types: string[]): string[] {
    return types.map(type => {
      if (type === 'year') {
        return parts.find(p => p.type === type)?.value ?? '0000'
      } else {
        return parts.find(p => p.type === type)?.value ?? '00'
      }
    })
  }

  private getDefaultFormatOfDate(date: Date): string[] {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }

    const parts: Intl.DateTimeFormatPart[] = this.getTimeZoneFormat(date, options)

    return this.extractParts(parts, ['year', 'month', 'day'])
  }

  private getDefaultFormatTime(date: Date): string[] {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }

    const parts: Intl.DateTimeFormatPart[] = this.getTimeZoneFormat(date, options)

    return this.extractParts(parts, ['hour', 'minute'])
  }
}
