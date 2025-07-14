import { createTranslator } from 'next-intl'
import { z } from 'zod'

const createFormTargetEmailSchema = (t: ReturnType<typeof createTranslator>) => {
  return z.object({
    'target-email': z
      .string({
        required_error: t('MISSING_EMAIL'),
      })
      .email(t('INVALID_EMAIL')),
  })
}

export default createFormTargetEmailSchema
