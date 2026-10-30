'use client'

import { Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useTranslations } from 'next-intl'
import type { UseFormReturn } from 'react-hook-form'
import type React from 'react'
import CustomActivityField from './CustomActivityField'
import type FormCustomActivityInterface from '@/interfaces/activity/FormCustomActivityInterface'
import {
  CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH,
  CUSTOM_ACTIVITY_NAME_MAX_LENGTH,
} from '@/schema/formCustomActivitySchema'

export type CustomActivityFormProps = {
  form: UseFormReturn<FormCustomActivityInterface>
  onSubmit: (data: FormCustomActivityInterface) => void
}

export default function CustomActivityForm({
  form,
  onSubmit,
}: Readonly<CustomActivityFormProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.CUSTOM')

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <CustomActivityField
        form={form}
        name='name'
        label={t('NAME')}
        maxLength={CUSTOM_ACTIVITY_NAME_MAX_LENGTH}
        required
      />
      <CustomActivityField
        form={form}
        name='location'
        label={t('LOCATION')}
        maxLength={CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH}
        required={false}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button type='submit' variant='contained' color='primary'>
          <SendIcon fontSize='small' sx={{ marginRight: 1 }} />
          {t('INVITE')}
        </Button>
      </Box>
    </form>
  )
}
