import * as React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'

export interface ConfirmDialogProps {
  open: boolean
  onClose: (value?: string) => void
  title: string,
  message: string,
  onConfirm: () => void
}

export default function ConfirmDialog(props: ConfirmDialogProps): React.ReactElement
{
  const { onClose,  open, title, message, onConfirm } = props
  const handleCancel = (): void => {
    onClose()
  }

  const handleOk = (): void => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
      maxWidth='xs'
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {message}
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='secondary' autoFocus onClick={handleCancel}>
          Annuler
        </Button>
        <Button variant='contained' color='error' onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
