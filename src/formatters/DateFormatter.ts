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

  private getDefaultFormatOfDate(date: Date): string[] {
    const year = String(date.getFullYear())
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return [year, month, day]
  }

  private getDefaultFormatTime(date: Date): string[] {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return [hours, minutes]
  }
}
