import { Alert } from '@mui/material'
import type React from 'react'
import type { AlertEnum } from '@/enums/AlertEnum'

export type AlertComponentProps = {
  description: string
  severity: AlertEnum
}

export default function AlertComponent({ description, severity }: Readonly<AlertComponentProps>): React.ReactElement {
  return (
    <div
      style={{
        position: 'fixed',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <Alert variant="filled" severity={severity} sx={{ width: '300px', textAlign: 'center' }}>
        {description}
      </Alert>
    </div>
  )
}
