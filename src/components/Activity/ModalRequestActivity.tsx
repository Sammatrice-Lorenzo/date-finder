import type * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import type ActivityInterface from '@/interfaces/activity/ActivityInterface'
import ModalTitle from '../ModalTitle'
import { FormRequestActivity } from '../Form/FormRequestActivity'
import fr from '../../locales/fr/common.json'

export type ModalRequestActivityProps = {
  activity: ActivityInterface
  open: boolean
  onClose: () => void
}

export default function ModalRequestActivity({
  activity,
  open,
  onClose,
}: ModalRequestActivityProps): React.ReactElement {
  return (
    <Dialog open={open} onClose={onClose}>
      <ModalTitle title={fr.ACTIVITY.MODAL.TITLE} onCloseModal={onClose} />
      <DialogContent sx={{ pt: 2, px: 3 }}>
        <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>{fr.ACTIVITY.MODAL.CONTENT}</DialogContentText>
        <FormRequestActivity activity={activity} handleClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
