import { Text } from '@react-email/components'
import * as React from 'react'
import BaseTemplateEmailActivity from './BaseTemplateEmailActivity'
import { EmailActivityPropsType } from '@/types/email/EmailActivityPropsType'

export default function RejectInvitationEmail({
  eventDate,
  eventLocation,
  t,
  authorName,
}: EmailActivityPropsType & { authorName: string }) {
  return (
    <BaseTemplateEmailActivity t={t}>
      <Text>
        {t.greeting}, {authorName}
      </Text>
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
