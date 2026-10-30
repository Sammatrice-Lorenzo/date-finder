'use client'

import { Box, Chip } from '@mui/material'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { ACTIVITY_IDEA_CATEGORIES } from '@/services/ActivityIdeaService'
import type { ActivityIdeaCategory } from '@/types/ActivityIdeaCategory'

export type IdeaCategoryFilterProps = {
  category: ActivityIdeaCategory | null
  onChange: (category: ActivityIdeaCategory | null) => void
}

export default function IdeaCategoryFilter({
  category,
  onChange,
}: Readonly<IdeaCategoryFilterProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.IDEAS.CATEGORIES')

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
      <Chip
        label={t('ALL')}
        color={category === null ? 'primary' : 'default'}
        onClick={() => onChange(null)}
      />
      {ACTIVITY_IDEA_CATEGORIES.map((ideaCategory: ActivityIdeaCategory) => (
        <Chip
          key={ideaCategory}
          label={t(ideaCategory)}
          color={category === ideaCategory ? 'primary' : 'default'}
          onClick={() => onChange(ideaCategory)}
        />
      ))}
    </Box>
  )
}
