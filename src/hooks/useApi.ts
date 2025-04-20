import ApiRequestInterface from '@/interfaces/api/ApiRequestInterface'
import fr from '../locales/fr/common.json'
import useSWR from 'swr'
import Error from 'next/error'
import { useAlert } from './useAlert'
import { AlertEnum } from '@/enums/AlertEnum'

const fetcher = async (apiRequest: ApiRequestInterface): Promise<unknown> => {
  const response: Response = await fetch(apiRequest.url, {
    method: apiRequest.method,
    headers: apiRequest.headers,
    body: apiRequest.body,
  })
  const data = await response.json()
  if (!response.ok) {
    const errorMessage: string = data.message !== '' ? data.message : fr.ERROR.SERVER_ERROR
    throw new Error({ message: errorMessage, statusCode: response.status})
  }

  return data
}

const useApi = (apiRequest: ApiRequestInterface)  => {
  const { data, error, isLoading } = useSWR(apiRequest.url, () => fetcher(apiRequest), apiRequest.optionsSWR)
  const { showAlert } = useAlert()

  if (error) {
    const errorMessage: string = error.props?.title ?? fr.ERROR.SERVER_ERROR;
    showAlert(errorMessage, AlertEnum.Error);
  }

  return {
    data, 
    error,
    isLoading
  }
}

export default useApi