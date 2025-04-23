'use client'

import { AlertContext, type AlertContextProps } from '@/context/AlertContext'
import { useContext } from 'react'

export function useAlert(): AlertContextProps {
  const context: AlertContextProps = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }

  return context
}
