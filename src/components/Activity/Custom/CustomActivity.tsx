'use client'

import { Box, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import HeaderPlace from '../../Place/HeaderPlace'
import ModalRequestActivity from '../ModalRequestActivity'
import ActivityIdeas from '../Ideas/ActivityIdeas'
import CustomActivityForm from './CustomActivityForm'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import type FormCustomActivityInterface from '@/interfaces/activity/FormCustomActivityInterface'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import createFormCustomActivitySchema, {
  CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH,
} from '@/schema/formCustomActivitySchema'

const formatPlaceLocation = (place: PlaceInterface): string =>
  [place.name, place.location]
    .filter(Boolean)
    .join(', ')
    .slice(0, CUSTOM_ACTIVITY_LOCATION_MAX_LENGTH)

export default function CustomActivity(): React.ReactElement {
  const t = useTranslations('ACTIVITY.CUSTOM')
  const formErrorTranslation = useTranslations('ERROR.FORM_CUSTOM_ACTIVITY')
  const [activity, setActivity] = React.useState<ActivityInterface | null>(null)

  const form: UseFormReturn<FormCustomActivityInterface> = useForm({
    resolver: zodResolver(createFormCustomActivitySchema(formErrorTranslation)),
    mode: 'onChange',
    defaultValues: { name: '', location: '' },
  })

  const onSubmit = (data: FormCustomActivityInterface): void => {
    setActivity({
      id: uuidv4(),
      name: data.name,
      location: data.location || t('LOCATION_DEFAULT'),
    })
  }

  return (
    <Box sx={{ padding: 4 }}>
      <HeaderPlace title={t('TITLE')} />
      <Typography sx={{ textAlign: 'center', mb: 2 }}>{t('CONTENT')}</Typography>
      <ActivityIdeas
        onSelectIdea={(name: string) => form.setValue('name', name, { shouldValidate: true })}
        onSelectPlace={(place: PlaceInterface) =>
          form.setValue('location', formatPlaceLocation(place), { shouldValidate: true })
        }
      />
      <CustomActivityForm form={form} onSubmit={onSubmit} />
      {activity && (
        <ModalRequestActivity activity={activity} open onClose={() => setActivity(null)} />
      )}
    </Box>
  )
}
