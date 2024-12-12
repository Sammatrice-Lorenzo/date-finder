import React from 'react'
import { DialogTitle } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'


export type ModalTitleProps = {
  title: string,
  onCloseModal: () => void
}

export default function ModalTitle({ title, onCloseModal}: ModalTitleProps): React.ReactElement
{
  return (
    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', position: 'relative' }}>
      {title}
      <HighlightOffIcon 
        onClick={onCloseModal} 
        sx={{
          position: 'absolute',
          right: 14,
          top: 6,
          cursor: 'pointer',
        }} 
      />
    </DialogTitle>
  )
}