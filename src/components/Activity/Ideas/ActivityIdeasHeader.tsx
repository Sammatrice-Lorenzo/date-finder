'use client'

import { Box, Button, Typography } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import { useTranslations } from 'next-intl'
import type React from 'react'

export type ActivityIdeasHeaderProps = {
  onRandom: () => void
}

export default function ActivityIdeasHeader({
  onRandom,
}: Readonly<ActivityIdeasHeaderProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.IDEAS')

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant='subtitle1'>{t('TITLE')}</Typography>
      <Button size='small' variant='outlined' onClick={onRandom}>
        <ShuffleIcon fontSize='small' sx={{ marginRight: 1 }} />
        {t('RANDOM')}
      </Button>
    </Box>
  )
}
