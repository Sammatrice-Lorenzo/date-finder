import * as React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import fr from '../locales/fr/common.json'

export interface ConfirmDialogProps {
  open: boolean
  onClose: (value?: string) => void
  title: string,
  message: string,
  onConfirm: () => void
}

export default function ConfirmDialog(props: ConfirmDialogProps): React.ReactElement
{
  const { onClose, open, title, message, onConfirm } = props

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
        <Button variant='outlined' color='secondary' autoFocus onClick={() => onClose()}>
          {fr.CONFIRM_DIALOG.CANCELED}
        </Button>
        <Button variant='contained' color='error' onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
