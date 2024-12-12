import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { InputRequestActivity } from './InputRequestActivity'
import { AlertEnum } from '@/enums/AlertEnum'
import { useAlert } from '@/hooks/useAlert'
import React from 'react'
import { v1 as uuidv1 } from 'uuid'
import { ActivityQueryProps } from '@/types/ActivityQueryProps'
import ModalTitle from '../ModalTitle'
import SendIcon from '@mui/icons-material/Send'

export type ModalEmailTargetProps = {
  activity: ActivityQueryProps
  isOpen: boolean
  onClose: () => void
}

export default function ModalEmailTarget({ activity, isOpen, onClose }: ModalEmailTargetProps): React.ReactElement
{
  const { showAlert } = useAlert()
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData: FormData = new FormData(event.currentTarget)
    const email: string | undefined = formData.get('target-email') as string
    if (email !== undefined) {
      handleSendInviteAccepted(email)
    }
  }

  const handleSendInviteAccepted = async (targetEmail: string) => {
    onClose()
    const response = await fetch('/api/event/', {
      method: 'POST',
      body: JSON.stringify({
        uid: uuidv1(),
        activity: activity,
        targetEmail: targetEmail,
      })
    })

    const data = await response.json()
    const alert: AlertEnum = response.ok ? AlertEnum.Success : AlertEnum.Error
    showAlert(data.message, alert)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <ModalTitle
        title='Accepter l&apos;invitation'
        onCloseModal={onClose}
      />
      <DialogContent sx={{ pt: 2, px: 3 }}>
        <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
          Veuillez saisir votre e-mail pour recevoir l&apos;invitation à ajouter à votre calendrier.
          Pensez a vérifier vos spams.
        </DialogContentText>
        <InputRequestActivity
          label='Votre email'
          type='email'
          name='target-email'
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: '2' }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          <SendIcon fontSize='small' sx={{ marginRight: 1 }}/>
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  )
}