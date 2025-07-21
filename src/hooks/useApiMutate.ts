import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import useSWRMutation from 'swr/mutation'
import { useAlert } from './useAlert'
import { AlertEnum } from '@/enums/AlertEnum'
import { createTranslator } from 'next-intl'

const fetcher = async (url: string, { arg }: { arg: ApiRequestInterface }): Promise<unknown> => {
  const response = await fetch(url, {
    method: arg.method,
    headers: arg.headers,
    body: arg.body,
  })
  const data = await response.json()

  if (!response.ok) {
    const errorMessage: string = data.message !== '' ? data.message : 'SERVER_ERROR'
    throw new Error(errorMessage)
  }

  return data
}

const useApiMutate = (
  apiRequest: ApiRequestInterface,
  translator: ReturnType<typeof createTranslator>
) => {
  const { trigger, data, error, isMutating: isLoading } = useSWRMutation(apiRequest.url, fetcher)
  const { showAlert } = useAlert()

  if (error) {
    const errorMessage: string =
      error.props?.title === 'SERVER_ERROR' ? translator('SERVER_ERROR') : error.props?.title
    showAlert(errorMessage, AlertEnum.Error)
  }

  return { trigger, data, error, isLoading }
}

export default useApiMutate
