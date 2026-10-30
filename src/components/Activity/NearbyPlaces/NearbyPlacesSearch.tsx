'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { useTranslations } from 'next-intl'
import type React from 'react'

export type NearbyPlacesSearchProps = {
  city: string
  canSearch: boolean
  isLoading: boolean
  onCityChange: (city: string) => void
  onSearch: () => void
}

export default function NearbyPlacesSearch({
  city,
  canSearch,
  isLoading,
  onCityChange,
  onSearch,
}: Readonly<NearbyPlacesSearchProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.IDEAS.NEARBY')

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          id='nearby-places-city'
          size='small'
          label={t('CITY')}
          value={city}
          onChange={event => onCityChange(event.target.value)}
          slotProps={{ htmlInput: { maxLength: 80 } }}
          sx={{ flex: 1, minWidth: 160 }}
        />
        <Button variant='contained' disabled={!canSearch || isLoading} onClick={onSearch}>
          <TravelExploreIcon fontSize='small' sx={{ marginRight: 1 }} />
          {city.trim() ? t('SEARCH_CITY') : t('SEARCH_NEARBY')}
        </Button>
      </Box>
      {!canSearch && (
        <Typography variant='caption' color='text.secondary'>
          {t('HINT')}
        </Typography>
      )}
    </>
  )
}
