export default class DateFormatter
{
  public static getTimeStampOnDate(date: Date): string
  {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0]
  }

  public static generateDateTimeFromString(date: string): Date
  {
    const [datePart, time] = date.split(' ')
    const [day, month, year] = datePart.split('/')
    const [hours, minutes] = time.split(':')

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes))
  }

  public static getDateTimeLocal(date: Date): string
  {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  public static getDateEuropeanFormat(date: Date): string
  {
    const [year, month, day] = this.getDefaultFormatOfDate(date)
    const [hours, minutes] = this.getDefaultFormatTime(date)

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  private static getDefaultFormatOfDate(date: Date): string[]
  {
    const year: string = String(date.getFullYear())
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')

    return [year, month, day]
  }

  private static getDefaultFormatTime(date: Date): string[]
  {
    const hours: string = String(date.getHours()).padStart(2, '0')
    const minutes: string = String(date.getMinutes()).padStart(2, '0')

    return [hours, minutes]
  }
}