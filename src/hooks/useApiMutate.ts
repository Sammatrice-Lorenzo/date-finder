import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import useSWRMutation from 'swr/mutation'
import { useAlert } from './useAlert'
import { AlertEnum } from '@/enums/AlertEnum'
import fr from '../locales/fr/common.json'

const fetcher = async (url: string, { arg }: { arg: ApiRequestInterface }): Promise<unknown> => {
  const response = await fetch(url, {
    method: arg.method,
    headers: arg.headers,
    body: arg.body,
  })
  const data = await response.json()

  if (!response.ok) {
    const errorMessage: string = data.message !== '' ? data.message : fr.ERROR.SERVER_ERROR
    throw new Error(errorMessage)
  }

  return data
}

const useApiMutate = (apiRequest: ApiRequestInterface) => {
  const { trigger, data, error, isMutating: isLoading } = useSWRMutation(apiRequest.url, fetcher)
  const { showAlert } = useAlert()

  if (error) {
    const errorMessage: string = error.props?.title ?? fr.ERROR.SERVER_ERROR
    showAlert(errorMessage, AlertEnum.Error)
  }

  return { trigger, data, error, isLoading }
}

export default useApiMutate
