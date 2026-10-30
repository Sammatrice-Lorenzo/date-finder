import { createTranslator } from 'next-intl'
import createFormCustomActivitySchema, {
  CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH,
  CUSTOM_ACTIVITY_NAME_MAX_LENGTH,
} from '../formCustomActivitySchema'

const translator = ((key: string) => key) as unknown as ReturnType<typeof createTranslator>

describe('formCustomActivitySchema', () => {
  const schema = createFormCustomActivitySchema(translator)

  test('Test valid activity with empty location', () => {
    const result = schema.safeParse({ name: '  Pique-nique  ', location: '' })

    expect(result.success).toBe(true)
    expect(result.data).toEqual({ name: 'Pique-nique', location: '' })
  })

  test('Test missing name', () => {
    const result = schema.safeParse({ name: '   ', location: 'Parc Borély' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('MISSING_NAME')
  })

  test('Test name and location too long', () => {
    const result = schema.safeParse({
      name: 'a'.repeat(CUSTOM_ACTIVITY_NAME_MAX_LENGTH + 1),
      location: 'a'.repeat(CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH + 1),
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues.map(issue => issue.message)).toEqual(['TOO_LONG', 'TOO_LONG'])
  })
})
