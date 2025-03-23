'use client'

import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import { Box, Button } from '@mui/material'
import React from 'react'
import ModalEmailTarget from '../ModalEmailTarget'
import { AlertEnum } from '@/enums/AlertEnum'
import { useAlert } from '@/hooks/useAlert'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import ConfirmDialog from '@/components/ConfirmDialog'

type BoxFooterCardRequestProps = {
  activity: ActivityQueryProps
}

const BoxFooterCardRequest = ({ activity }: BoxFooterCardRequestProps): React.ReactElement => {
  const [openModal, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleRefused = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)
  const { showAlert } = useAlert()

  const handleSendInviteRefused = async () => {
    const response = await fetch('/api/invite-refused', {
      method: 'POST',
      body: JSON.stringify({
        activity: activity,
      })
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }

  return (
    <Box display='flex' justifyContent='space-around' mt={3}>
      <Button variant='contained' sx={{ justifyContent: 'space-between'}} color='secondary' onClick={() => handleClickOpen()}>
        <EventAvailableIcon fontSize='small' sx={{ marginRight: 1 }} />
        Accepter
      </Button>
      <Button variant='outlined' color='error' onClick={() => handleRefused()}>
        <EventBusyIcon fontSize='small' sx={{ marginRight: 1 }} />
        Décliner
      </Button>
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title='Confirmer la déclinaison'
        message='Voulez-vous vraiment décliner cette invitation ?'
        onConfirm={handleSendInviteRefused}
      />
      <ModalEmailTarget
        activity={activity}
        isOpen={openModal}
        onClose={handleClose}
      />
    </Box>
  )
}

export default BoxFooterCardRequest