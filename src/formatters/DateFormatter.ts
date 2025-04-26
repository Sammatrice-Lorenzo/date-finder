export default class DateFormatter {
  public getTimeStampOnDate(date: Date): string {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${year}${month}${day}T${hours}${minutes}00`
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
