import { useTranslations } from 'next-intl'
import React from 'react'
import useApiMutate from '../useApiMutate'
import { useCurrentLocation } from '../useCurrentLocation'
import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import type { Location } from '@/interfaces/Location'
import type LocationStoreInterface from '@/interfaces/LocationStoreInterface'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import type { PlaceResponseInterface } from '@/interfaces/place/PlaceResponseInterface'
import PlaceParametersService from '@/services/place/PlaceParametersService'
import useLocationStore from '@/services/store/useLocationStore'

/** Recherche de lieux d'un type donné autour de la position GPS ou dans une ville saisie */
const useNearbyPlaces = (placeType: string) => {
  useCurrentLocation()
  const userLocation: Location | null = useLocationStore(
    (store: LocationStoreInterface) => store.location
  )
  const [city, setCity] = React.useState<string>('')
  const searchCity: string = city.trim()

  const placeParameters: ApiRequestInterface = new PlaceParametersService().buildPlaceOptions(
    userLocation,
    searchCity,
    '',
    placeType
  )
  const { data, isLoading, trigger } = useApiMutate(placeParameters, useTranslations('ERROR'))
  const response = data as PlaceResponseInterface | undefined
  const places: PlaceInterface[] = response?.response ?? []

  return {
    city,
    setCity,
    places,
    isLoading,
    hasSearched: response !== undefined,
    canSearch: searchCity !== '' || userLocation !== null,
    search: () => trigger(placeParameters),
  }
}

export default useNearbyPlaces
