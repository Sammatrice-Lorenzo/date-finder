import type LocationStoreInterface from '@/interfaces/LocationStoreInterface'
import useLocationStore from '@/services/store/useLocationStore'
import { useEffect } from 'react'

export const useCurrentLocation = (): void => {
  const setLocation = useLocationStore((state: LocationStoreInterface) => state.setLocation)

  useEffect(() => {
    function handleLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { longitude, latitude } = position.coords
            setLocation({ longitude, latitude })
          },
          err => console.log(err),
          {
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 0,
          }
        )
      } else {
        console.error("Can't get position using navigator.geolocation  ")
      }
    }

    handleLocation()
  }, [setLocation])
}
