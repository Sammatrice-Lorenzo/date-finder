import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import './globals.css'
import { AlertProvider } from '@/context/AlertContext'
import DefaultThemeProvider from '@/components/DefaultThemeProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'DateFinder',
  description: 'DateFinder find activity for a new date',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.ReactElement> {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider>
          <AppRouterCacheProvider>
            <AlertProvider>
              <DefaultThemeProvider>{children}</DefaultThemeProvider>
            </AlertProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
