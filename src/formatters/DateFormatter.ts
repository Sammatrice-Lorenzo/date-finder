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
}