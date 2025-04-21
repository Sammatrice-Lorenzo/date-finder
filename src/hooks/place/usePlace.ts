import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import type { Location } from '@/interfaces/Location'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import type { PlaceResponseInterface } from '@/interfaces/place/PlaceResponseInterface'
import useApi from '../useApi'
import useApiMutate from '../useApiMutate'
import PlaceParametersService from '../../services/place/PlaceParametersService'

const usePlace = (userLocation: Location | null, searchLocation: string, searchTerm: string, category: string) => {
  const options: ApiRequestInterface = new PlaceParametersService().buildPlaceOptions(
    userLocation,
    searchLocation,
    searchTerm,
    category
  )

  const { data: initialData, isLoading: isLoadingInitial } = useApi(options)
  const { data: mutatedData, isLoading: isLoadingMutate, trigger } = useApiMutate(options)

  const effectiveData = mutatedData ?? initialData
  const isLoading: boolean = isLoadingInitial || isLoadingMutate

  const response: PlaceInterface[] = (effectiveData as PlaceResponseInterface)?.response ?? []

  return {
    isLoading,
    response,
    trigger,
  }
}

export default usePlace
