import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import type React from 'react'
import ModalTitle from '../ModalTitle'
import { FormEmailTarget } from '../Form/FormEmailTarget'
import { useTranslations } from 'next-intl'

export type ModalEmailTargetProps = {
  token: string
  isOpen: boolean
  onClose: () => void
}

export default function ModalEmailTarget({
  token,
  isOpen,
  onClose,
}: ModalEmailTargetProps): React.ReactElement {
  const t = useTranslations('ACTIVITY.MODAL_EMAIL_TARGET')

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <ModalTitle title={t('TITLE')} onCloseModal={onClose} />
      <DialogContent sx={{ pt: 2, px: 3 }}>
        <DialogContentText sx={{ textAlign: 'center', mb: 2 }}>{t('CONTENT')}</DialogContentText>
        <FormEmailTarget token={token} handleClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
