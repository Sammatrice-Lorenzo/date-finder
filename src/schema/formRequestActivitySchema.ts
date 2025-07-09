import { createTranslator, Messages, NestedKey } from 'next-intl'
import { z } from 'zod'

const createFormActivitySchema = (t: ReturnType<typeof createTranslator<Messages, NestedKey>>) => {
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
      .min(1, t('MISSING_AUTHOR_NAME')),
    'author-email': z
      .string({
        required_error: t('MISSING_EMAIL'),
      })
      .email(t('INVALID_EMAIL')),
    'target-name': z
      .string({ required_error: t('MISSING_TARGET_NAME') })
      .min(1, t('MISSING_AUTHOR_NAME')),
  })
}

export default createFormActivitySchema
