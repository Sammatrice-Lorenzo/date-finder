'use client'
import { Location } from '@/interfaces/Location'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const LocationContext = createContext<Location | null>(null)

type LocationContextProvider = {
  children: ReactNode
}

export const LocationProvider = ({ children }: LocationContextProvider): React.ReactElement => {
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
      function handleLocation(): void {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const { longitude, latitude } = position.coords
              setLocation({ longitude, latitude })
            },
            (err: GeolocationPositionError) => console.log(err),
            {
              enableHighAccuracy: true,
              timeout: 1000,
              maximumAge: 0,
            }
          )
        } else {
          console.log("Can't get position using navigator.geolocation  ")
        }
      }

      handleLocation()
  }, [])

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = (): Location | null => {
  const context = useContext(LocationContext)
  
  if (context === null) {
    console.warn("useLocation must be used within a LocationProvider")
  }

  return context
}
