import { FormControl, InputLabel, Stack, useMediaQuery } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import { theme } from '@/components/DefaultThemeProvider'
import SelectMovieProviders from './SelectMovieProviders'

const ProviderMovies = () => {
  const t = useTranslations('MOVIE')
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Stack
      justifyContent={isDesktop ? 'flex-end' : 'center'}
      flexDirection={isDesktop ? 'row' : 'column'}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='select-provider-label'>{t('PROVIDERS')}</InputLabel>
        <SelectMovieProviders />
      </FormControl>
    </Stack>
  )
}

export default ProviderMovies
