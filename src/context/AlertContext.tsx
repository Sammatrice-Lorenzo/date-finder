'use client'

import React, { type ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import type { AlertEnum } from '@/enums/AlertEnum'
import type AlertInterface from '@/interfaces/AlertInterface'
import AlertComponent from '@/components/AlertComponent'

export type AlertContextProps = {
  showAlert: (description: string, severity: AlertEnum) => void
}

export const AlertContext = createContext<AlertContextProps>({
  showAlert: () => {},
})

export function AlertProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [alertMessages, setAlertMessages] = useState<AlertInterface[]>([])
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (alertMessages.length > 0) {
        setAlertMessages(prev => prev.slice(1))
      }
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [alertMessages])

  const contextValue = useMemo(
    () => ({
      showAlert: (description: string, severity: AlertEnum) => {
        setAlertMessages(prev => [...prev, { description, severity }])
      },
    }),
    []
  )

  return (
    <AlertContext.Provider value={contextValue}>
      {hasMounted &&
        alertMessages.map((alert, index) => (
          <AlertComponent
            key={`${index}${alert.description}`}
            description={alert.description}
            severity={alert.severity}
          />
        ))}
      {children}
    </AlertContext.Provider>
  )
}
