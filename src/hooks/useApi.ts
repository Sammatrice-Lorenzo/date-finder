import type ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import useSWR from 'swr'
import { useAlert } from './useAlert'
import { AlertEnum } from '@/enums/AlertEnum'
import { createTranslator } from 'next-intl'

const fetcher = async (
  apiRequest: ApiRequestInterface,
  translator: ReturnType<typeof createTranslator>
): Promise<unknown> => {
  const response: Response = await fetch(apiRequest.url, {
    method: apiRequest.method,
    headers: apiRequest.headers,
    body: apiRequest.body,
  })
  const data = await response.json()
  if (!response.ok) {
    const errorMessage: string = data.message !== '' ? data.message : translator('SERVER_ERROR')
    throw new Error(errorMessage)
  }

  return data
}

const useApi = (
  apiRequest: ApiRequestInterface,
  translator: ReturnType<typeof createTranslator>
) => {
  const { data, error, isLoading } = useSWR(
    apiRequest.url,
    () => fetcher(apiRequest, translator),
    apiRequest.optionsSWR
  )
  const { showAlert } = useAlert()

  if (error) {
    const errorMessage: string = error.props?.title ?? translator('SERVER_ERROR')
    showAlert(errorMessage, AlertEnum.Error)
  }

  return {
    data,
    error,
    isLoading,
  }
}

export default useApi
