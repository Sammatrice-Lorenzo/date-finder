import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import type React from 'react'
import type { ActivityQueryProps } from '@/types/ActivityQueryProps'
import ModalTitle from '../ModalTitle'
import { FormEmailTarget } from '../Form/FormEmailTarget'
import fr from '../../locales/fr/common.json'

export type ModalEmailTargetProps = {
  activityQuery: ActivityQueryProps
  isOpen: boolean
  onClose: () => void
}

export default function ModalEmailTarget({
  activityQuery,
  isOpen,
  onClose,
}: ModalEmailTargetProps): React.ReactElement {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <ModalTitle title={fr.ACTIVITY.MODAL_EMAIL_TARGET.TITLE} onCloseModal={onClose} />
      <DialogContent sx={{ pt: 2, px: 3 }}>
        <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>
          {fr.ACTIVITY.MODAL_EMAIL_TARGET.CONTENT}
        </DialogContentText>
        <FormEmailTarget activityQuery={activityQuery} handleClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
