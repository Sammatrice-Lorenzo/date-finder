import type { Metadata } from "next"
import localFont from "next/font/local"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import "./globals.css"
import { LocationProvider } from "../context/LocationContext"
import DefaultThemeProvider from "@/components/DefaultThemeProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "DateFinder",
  description: "DateFinder find activity for a new date",
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
          <LocationProvider>
            <DefaultThemeProvider>
              {children}
            </DefaultThemeProvider>
          </LocationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
