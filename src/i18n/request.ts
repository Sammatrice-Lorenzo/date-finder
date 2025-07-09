import { getRequestConfig, RequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

export default getRequestConfig(async (): Promise<RequestConfig> => {
  // export default getRequestConfig(async ({ locale = 'fr' }): Promise<RequestConfig> => {
  const acceptLang: string = (await headers()).get('accept-language') || ''
  const userLanguagePrefered = acceptLang.split(',')[0]?.split('-')[0]

  const supporteds: string[] = ['fr', 'it']
  const locale: string = supporteds.includes(userLanguagePrefered) ? userLanguagePrefered : 'fr'

  return {
    locale,
    messages: (await import(`@/locales/${locale}/common.json`)).default,
  }
})
