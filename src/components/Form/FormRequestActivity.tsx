import { Button } from '@mui/material'
import type { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import ShareIcon from '@mui/icons-material/Share'
import FormControlRequestActivity from './FormControlRequestActivity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type UseFormReturn } from 'react-hook-form'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import ShareActivityService from '@/services/ShareActivityService'
import type { FormRequestActivityInterface } from '@/interfaces/activity/FormRequestActivityInterface'
import valuesInputsModalRequestActivity from '@/data/valuesInputsModalRequestData'
import { useTranslations } from 'next-intl'
import createFormActivitySchema from '@/schema/formRequestActivitySchema'

export type FormRequestActivityProps = {
  activity: ActivityInterface
  handleClose: () => void
}

export const FormRequestActivity = ({ activity, handleClose }: FormRequestActivityProps) => {
  const t = useTranslations('ACTIVITY')
  const formErrorTranslation = useTranslations('ERROR.FORM_REQUEST_ACTIVITY')
  const formTranslation = useTranslations('ACTIVITY.FORM')
  const activityTranslation = useTranslations('ACTIVITY')

  const form: UseFormReturn<FormRequestActivityInterface> = useForm({
    resolver: zodResolver(createFormActivitySchema(formErrorTranslation)),
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
      new ShareActivityService().handleShare(activity, data, activityTranslation)
      handleClose()
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {valuesInputsModalRequestActivity(formTranslation).map((input: InputModalRequestActivity) => (
        <FormControlRequestActivity form={form} input={input} key={input.id} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
        <Button type='submit' variant='contained' color='primary'>
          <ShareIcon fontSize='small' sx={{ marginRight: 1 }} />
          {t('FORM.SHARE')}
        </Button>
      </div>
    </form>
  )
}
