import { Button } from '@mui/material'
import type { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import ShareIcon from '@mui/icons-material/Share'
import FormControlRequestActivity from './FormControlRequestActivity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import fr from '../../locales/fr/common.json'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import ShareActivityService from '@/services/ShareActivityService'
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'
import valuesInputsModalRequestActivity from '@/data/valuesInputsModalRequestData'

const formSchema = z.object({
  date: z
    .union([z.string({ required_error: fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_DATE }), z.date()])
    .transform(val => {
      if (!val) return null
      const dateObj = typeof val === 'string' ? new Date(val) : val
      return Number.isNaN(dateObj.getTime()) ? null : dateObj
    })
    .refine(date => date && date > new Date(), {
      message: fr.ERROR.FORM_REQUEST_ACTIVITY.FUTURE_DATE_REQUIREMENT,
    }),
  'author-name': z
    .string({ required_error: fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_AUTHOR_NAME })
    .min(1, fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_AUTHOR_NAME),
  'author-email': z
    .string({
      required_error: fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_EMAIL,
    })
    .email(fr.ERROR.FORM_REQUEST_ACTIVITY.INVALID_EMAIL),
  'target-name': z
    .string({ required_error: fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_TARGET_NAME })
    .min(1, fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_AUTHOR_NAME),
})

export type FormRequestActivityProps = {
  activity: ActivityInterface
  handleClose: () => void
}

export const FormRequestActivity = ({ activity, handleClose }: FormRequestActivityProps) => {
  const form: UseFormReturn<FormRequestActivityInterface> = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      date: new Date(),
      'author-name': '',
      'author-email': '',
      'target-name': '',
    },
  })

  const onSubmit = (data: FormRequestActivityInterface): void => {
    if (Object.keys(form.formState.errors).length === 0) {
      new ShareActivityService().handleShare(activity, data)
      handleClose()
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {valuesInputsModalRequestActivity().map((input: InputModalRequestActivity) => (
        <FormControlRequestActivity form={form} input={input} key={input.id} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
        <Button type="submit" variant="contained" color="primary">
          <ShareIcon fontSize="small" sx={{ marginRight: 1 }} />
          {fr.ACTIVITY.FORM.SHARE}
        </Button>
      </div>
    </form>
  )
}
