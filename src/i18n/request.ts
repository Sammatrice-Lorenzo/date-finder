import supportedLanguages from '@/data/supportedLanguages'
import { getRequestConfig, RequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const getValidLocale = (userLanguage: string, defaultLocale: string): string => {
  return supportedLanguages.includes(userLanguage) ? userLanguage : defaultLocale
}

export default getRequestConfig(async (): Promise<RequestConfig> => {
  const acceptLang: string = (await headers()).get('accept-language') || ''
  const userLanguagePrefered = acceptLang.split(',')[0]?.split('-')[0]

  const acceptLanguageCookies: string | undefined = (await cookies()).get('NEXT_LOCALE')?.value
  let locale: string = getValidLocale(userLanguagePrefered, 'fr')

  if (acceptLanguageCookies) {
    locale = getValidLocale(acceptLanguageCookies, locale)
  }

  return {
    locale,
    messages: (await import(`@/locales/${locale}/common.json`)).default,
  }
})
