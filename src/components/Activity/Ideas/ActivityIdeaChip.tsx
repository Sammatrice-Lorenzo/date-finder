'use client'

import { Chip } from '@mui/material'
import { useTranslations } from 'next-intl'
import type React from 'react'
import activityIdeaIcons from '@/data/activityIdeaIcons'
import type ActivityIdeaInterface from '@/interfaces/activity/ActivityIdeaInterface'

export type ActivityIdeaChipProps = {
  idea: ActivityIdeaInterface
  isSelected: boolean
  onSelect: (idea: ActivityIdeaInterface) => void
}

export default function ActivityIdeaChip({
  idea,
  isSelected,
  onSelect,
}: Readonly<ActivityIdeaChipProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.IDEAS.ITEMS')
  const { icon, color } = activityIdeaIcons[idea.icon]

  return (
    <Chip
      className='activity-idea'
      icon={icon}
      label={t(idea.key)}
      variant='outlined'
      onClick={() => onSelect(idea)}
      sx={{
        '& .MuiChip-icon': { color },
        ...(isSelected && {
          borderColor: color,
          bgcolor: `${color}33`,
          '&&:hover': { bgcolor: `${color}4d` },
        }),
      }}
    />
  )
}
