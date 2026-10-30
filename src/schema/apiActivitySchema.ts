import { z } from 'zod'
import {
  ACTIVITY_LOCATION_MAX_LENGTH,
  ACTIVITY_NAME_MAX_LENGTH,
  DATE_CLOCK_SKEW_MS,
  EMAIL_MAX_LENGTH,
  PERSON_NAME_MAX_LENGTH,
} from './activityLimits'

const TOKEN_MAX_LENGTH = 4096

const emailSchema = z.string().trim().email().max(EMAIL_MAX_LENGTH)
const tokenSchema = z.string().min(1).max(TOKEN_MAX_LENGTH)
/** Fuseau IANA du navigateur, utilisé uniquement pour afficher la date dans l'email */
const timeZoneSchema = z
  .string()
  .max(64)
  .refine(timeZone => {
    try {
      new Intl.DateTimeFormat('fr-FR', { timeZone })
      return true
    } catch {
      return false
    }
  })

export const generateUrlRequestSchema = z.object({
  activity: z.object({
    id: z.coerce.string().max(ACTIVITY_NAME_MAX_LENGTH),
    name: z.string().trim().min(1).max(ACTIVITY_NAME_MAX_LENGTH),
    location: z.string().trim().max(ACTIVITY_LOCATION_MAX_LENGTH),
  }),
  form: z.object({
    // null / '' sont refusés (z.coerce.date() transformerait null en 1970-01-01)
    date: z
      .union([z.string().min(1), z.date()])
      .pipe(z.coerce.date())
      .refine(date => date.getTime() > Date.now() - DATE_CLOCK_SKEW_MS),
    'author-name': z.string().trim().min(1).max(PERSON_NAME_MAX_LENGTH),
    'author-email': emailSchema,
    'target-name': z.string().trim().min(1).max(PERSON_NAME_MAX_LENGTH),
  }),
  baseUrl: z
    .string()
    .url()
    .refine(url => /^https?:\/\//.test(url)),
})

export type GenerateUrlRequest = z.infer<typeof generateUrlRequestSchema>

export const eventRequestSchema = z.object({
  token: tokenSchema,
  targetEmail: emailSchema,
  timeZone: timeZoneSchema,
})

export const inviteRefusedRequestSchema = z.object({
  token: tokenSchema,
  timeZone: timeZoneSchema,
})
