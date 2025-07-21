import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import FormControlRequestActivity from './FormControlRequestActivity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type UseFormReturn } from 'react-hook-form'
import type FormTargetSendEmailInterface from '@/interfaces/activity/FormTargetSendEmailInterface'
import { useAlert } from '@/hooks/useAlert'
import React from 'react'
import type { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import { RequestActivityNameEnum } from '@/enums/RequestActivityNameEnum'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import SendEmailService from '@/services/SendEmailService'
import { useTranslations } from 'next-intl'
import createFormTargetEmailSchema from '@/schema/formTargetEmail'

export type FormEmailTargetProps = {
  activityQuery: ActivityQueryProps
  handleClose: () => void
}

export const FormEmailTarget = ({ activityQuery, handleClose }: FormEmailTargetProps) => {
  const { showAlert } = useAlert()
  const t = useTranslations('ACTIVITY.FORM')
  const errorFormTranslate = useTranslations('ERROR.FORM_REQUEST_ACTIVITY')

  const form: UseFormReturn<FormTargetSendEmailInterface> = useForm({
    resolver: zodResolver(createFormTargetEmailSchema(errorFormTranslate)),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      'target-email': undefined,
    },
  })

  const onSubmit = async (data: FormTargetSendEmailInterface): Promise<void> => {
    if (Object.keys(form.formState.errors).length === 0) {
      handleClose()
      await new SendEmailService().handleSendInviteAccepted(
        data['target-email'],
        activityQuery,
        showAlert
      )
    }
  }

  const inputForm: InputModalRequestActivity = {
    id: 'email-form',
    label: t('YOUR_EMAIL'),
    type: 'email',
    name: RequestActivityNameEnum.TARGET_EMAIL,
    margin: 'dense',
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FormControlRequestActivity form={form} input={inputForm} key={inputForm.id} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
        <Button type='submit' variant='contained' color='primary'>
          <SendIcon fontSize='small' sx={{ marginRight: 1 }} />
          {t('SEND')}
        </Button>
      </div>
    </form>
  )
}
