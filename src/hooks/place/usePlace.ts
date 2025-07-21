import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import type { PlaceResponseInterface } from '@/interfaces/place/PlaceResponseInterface'
import useApi from '../useApi'
import useApiMutate from '../useApiMutate'
import { createTranslator } from 'next-intl'

const usePlace = (
  placeParameters: ApiRequestInterface,
  translator: ReturnType<typeof createTranslator>
) => {
  const { data: initialData, isLoading: isLoadingInitial } = useApi(placeParameters, translator)
  const {
    data: mutatedData,
    isLoading: isLoadingMutate,
    trigger,
  } = useApiMutate(placeParameters, translator)

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
