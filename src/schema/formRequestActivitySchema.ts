import { createTranslator } from 'next-intl'
import { z } from 'zod'
import { EMAIL_MAX_LENGTH, PERSON_NAME_MAX_LENGTH } from './activityLimits'

const createFormActivitySchema = (t: ReturnType<typeof createTranslator>) => {
  return z.object({
    date: z
      .union([z.string({ required_error: t('MISSING_DATE') }), z.date()])
      .transform(val => {
        if (!val) return null
        const dateObj = typeof val === 'string' ? new Date(val) : val
        return Number.isNaN(dateObj.getTime()) ? null : dateObj
      })
      .refine(date => date && date > new Date(), {
        message: t('FUTURE_DATE_REQUIREMENT'),
      }),
    'author-name': z
      .string({ required_error: t('MISSING_AUTHOR_NAME') })
      .trim()
      .min(1, t('MISSING_AUTHOR_NAME'))
      .max(PERSON_NAME_MAX_LENGTH, t('TOO_LONG')),
    'author-email': z
      .string({
        required_error: t('MISSING_EMAIL'),
      })
      .trim()
      .email(t('INVALID_EMAIL'))
      .max(EMAIL_MAX_LENGTH, t('TOO_LONG')),
    'target-name': z
      .string({ required_error: t('MISSING_TARGET_NAME') })
      .trim()
      .min(1, t('MISSING_TARGET_NAME'))
      .max(PERSON_NAME_MAX_LENGTH, t('TOO_LONG')),
  })
}

export default createFormActivitySchema
