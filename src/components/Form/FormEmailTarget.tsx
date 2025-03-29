import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import FormControlRequestActivity from './FormControlRequestActivity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import fr from '../../locales/fr/common.json'
import FormTargetSendEmailInterface from '@/interfaces/activity/FormTargetSendEmailInterface'
import { useAlert } from '@/hooks/useAlert'
import React from 'react'
import { InputModalRequestActivity } from '@/interfaces/InputModalRequestActivity'
import { RequestActivityNameEnum } from '@/enums/RequestActivityNameEnum'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import SendEmailService from '@/services/SendEmailService'

const formSchema = z.object({
  'target-email': z.string({
    required_error: fr.ERROR.FORM_REQUEST_ACTIVITY.MISSING_EMAIL,
  }).email(fr.ERROR.FORM_REQUEST_ACTIVITY.INVALID_EMAIL),
})

export type FormEmailTargetProps = {
  activityQuery: ActivityQueryProps
  handleClose: () => void
}

export const FormEmailTarget = ({ activityQuery, handleClose }: FormEmailTargetProps) => {
  
  const { showAlert } = useAlert()
  
  const form: UseFormReturn<FormTargetSendEmailInterface> = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      'target-email': undefined,
    },
  })

  const onSubmit = async (data: FormTargetSendEmailInterface): Promise<void> => {
    if (Object.keys(form.formState.errors).length === 0) {
      handleClose()
      await new SendEmailService().handleSendInviteAccepted(data['target-email'], activityQuery, showAlert)
    }
  }

  const inputForm: InputModalRequestActivity = {
    id: 'email-form',
    label: fr.ACTIVITY.FORM.YOUR_EMAIL,
    type: 'email',
    name: RequestActivityNameEnum.TARGET_EMAIL,
    margin: 'dense'
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FormControlRequestActivity
        form={form}
        input={inputForm}
        key={inputForm.id}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          <SendIcon fontSize='small' sx={{ marginRight: 1 }}/>
          {fr.ACTIVITY.FORM.SEND}
        </Button>
      </div>
    </form>
  )
}