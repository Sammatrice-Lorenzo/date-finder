'use client'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d33252',
      light: '#d33140',
    },
    secondary: {
      main: '#40916c',
      light: '#3e6f5c',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }),
          ...(ownerState.color === 'secondary' && {
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
            },
          }),
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          }),
          ...(ownerState.color === 'secondary' && {
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
            },
          }),
        }),
      },
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
