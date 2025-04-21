import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import './globals.css'
import { AlertProvider } from '@/context/AlertContext'
import DefaultThemeProvider from '@/components/DefaultThemeProvider'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <AlertProvider>
            <DefaultThemeProvider>{children}</DefaultThemeProvider>
          </AlertProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
