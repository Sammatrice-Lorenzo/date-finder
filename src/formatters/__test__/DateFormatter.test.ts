import DateFormatter from '../DateFormatter'

describe('MovieUrlService', () => {
  let service: DateFormatter

  beforeEach(() => {
    service = new DateFormatter()
  })

  test('Test get date time local', async () => {
    const date: Date = new Date('2025-01-01 08:10')
    const localDate: string = service.getDateTimeLocal(date)

    expect(localDate).toBe('2025-01-01T08:10')
  })

  test('Test get eureopean time local', async () => {
    const date: Date = new Date('2025-01-01 08:10')
    const localDate: string = service.getDateEuropeanFormat(date)

    expect(localDate).toBe('01/01/2025 08:10')
  })
})

describe('getTimeStampOnDate function', () => {
  let service: DateFormatter

  beforeEach(() => {
    service = new DateFormatter()
  })

  it('should return a timestamp string for a valid date', () => {
    const date: Date = new Date('2022-01-01T00:00:00')
    const expectedOutput = '20220101T000000'

    expect(service.getTimeStampOnDate(date)).toBe(expectedOutput)
  })

  it('should return a timestamp string in UTC timezone for a date in a different timezone', () => {
    const date: Date = new Date('2022-01-01T00:10:00.00')
    const expectedOutput = '20220101T001000'
    expect(service.getTimeStampOnDate(date)).toBe(expectedOutput)
  })
})
