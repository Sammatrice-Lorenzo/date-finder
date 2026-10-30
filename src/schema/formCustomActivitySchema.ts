import { createTranslator } from 'next-intl'
import { z } from 'zod'

export const CUSTOM_ACTIVITY_NAME_MAX_LENGTH = 80
export const CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH = 120

const createFormCustomActivitySchema = (t: ReturnType<typeof createTranslator>) => {
  return z.object({
    name: z
      .string({ required_error: t('MISSING_NAME') })
      .trim()
      .min(1, t('MISSING_NAME'))
      .max(CUSTOM_ACTIVITY_NAME_MAX_LENGTH, t('TOO_LONG')),
    location: z.string().trim().max(CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH, t('TOO_LONG')),
  })
}

export default createFormCustomActivitySchema
