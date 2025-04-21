'use client'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d33252',
      light: '#d33140',
      // ff560b
    },
    secondary: {
      main: '#40916c',
      light: '#3e6f5c',
      // dark: ''
    },
  },
})

export default function DefaultThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
