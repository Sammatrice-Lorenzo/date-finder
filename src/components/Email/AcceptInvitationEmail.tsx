import { Text } from '@react-email/components'
import * as React from 'react'
import BaseTemplateEmailActivity from './BaseTemplateEmailActivity'
import { EmailActivityPropsType } from '@/types/email/EmailActivityPropsType'

export default function AcceptInvitationEmail({
  eventDate,
  eventLocation,
  t,
}: EmailActivityPropsType) {
  return (
    <BaseTemplateEmailActivity t={t}>
      <Text>{t.greeting}</Text>
      <Text>{t.message}</Text>
      <ul>
        <li>
          <strong>{t.date}:</strong> {eventDate}
        </li>
        <li>
          <strong>{t.location}:</strong> {eventLocation}
        </li>
      </ul>
    </BaseTemplateEmailActivity>
  )
}
