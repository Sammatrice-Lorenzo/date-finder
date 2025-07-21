'use client'

import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box, Button } from '@mui/material'
import React from 'react'
import ModalEmailTarget from '../ModalEmailTarget'
import { useAlert } from '@/hooks/useAlert'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import ConfirmDialog from '@/components/ConfirmDialog'
import SendEmailService from '@/services/SendEmailService'
import { useTranslations } from 'next-intl'

type BoxFooterCardRequestProps = {
  activityQuery: ActivityQueryProps
}

const BoxFooterCardRequest = ({ activityQuery }: BoxFooterCardRequestProps): React.ReactElement => {
  const [openModal, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const { showAlert } = useAlert()
  const activityInvationTranslation = useTranslations('ACTIVITY.INVITATION')
  const confirmTranslation = useTranslations('CONFIRM_DIALOG')

  const sendEmailService: SendEmailService = new SendEmailService()

  return (
    <Box display='flex' justifyContent='space-around' mt={3}>
      <Button
        variant='contained'
        sx={{ justifyContent: 'space-between' }}
        color='secondary'
        onClick={() => setOpen(true)}
      >
        <EventAvailableIcon fontSize='small' sx={{ marginRight: 1 }} />
        {activityInvationTranslation('ACCEPT')}
      </Button>
      <Button variant='outlined' color='error' onClick={() => setOpenDialog(true)}>
        <EventBusyIcon fontSize='small' sx={{ marginRight: 1 }} />
        {activityInvationTranslation('REFUSED')}
      </Button>
      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={confirmTranslation('TITLE_CONFIRM_DECLINE')}
        message={confirmTranslation('DECLINE_INVITATION')}
        onConfirm={() => sendEmailService.handleSendInviteRefused(activityQuery, showAlert)}
      />
      <ModalEmailTarget
        activityQuery={activityQuery}
        isOpen={openModal}
        onClose={() => setOpen(false)}
      />
    </Box>
  )
}

export default BoxFooterCardRequest
