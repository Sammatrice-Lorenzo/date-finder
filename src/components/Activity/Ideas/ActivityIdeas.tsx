'use client'

import { Box } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import ActivityIdeaService from '@/services/ActivityIdeaService'
import type ActivityIdeaInterface from '@/interfaces/activity/ActivityIdeaInterface'
import type { ActivityIdeaCategory } from '@/types/ActivityIdeaCategory'
import type PlaceInterface from '@/interfaces/place/PlaceInterface'
import NearbyPlaces from '../NearbyPlaces/NearbyPlaces'
import ActivityIdeaChip from './ActivityIdeaChip'
import ActivityIdeasHeader from './ActivityIdeasHeader'
import IdeaCategoryFilter from './IdeaCategoryFilter'

export type ActivityIdeasProps = {
  onSelectIdea: (name: string) => void
  onSelectPlace: (place: PlaceInterface) => void
}

const activityIdeaService: ActivityIdeaService = new ActivityIdeaService()

export default function ActivityIdeas({
  onSelectIdea,
  onSelectPlace,
}: Readonly<ActivityIdeasProps>): React.ReactElement {
  const t = useTranslations('ACTIVITY.IDEAS.ITEMS')
  const [category, setCategory] = React.useState<ActivityIdeaCategory | null>(null)
  const [selectedIdea, setSelectedIdea] = React.useState<ActivityIdeaInterface | null>(null)

  const selectIdea = (idea: ActivityIdeaInterface | null): void => {
    if (!idea) return
    setSelectedIdea(idea)
    onSelectIdea(t(idea.key))
  }

  return (
    <Box sx={{ mb: 3 }}>
      <ActivityIdeasHeader
        onRandom={() =>
          selectIdea(activityIdeaService.getRandomIdea(category, selectedIdea?.key ?? null))
        }
      />
      <IdeaCategoryFilter category={category} onChange={setCategory} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {activityIdeaService.getIdeas(category).map((idea: ActivityIdeaInterface) => (
          <ActivityIdeaChip
            key={idea.key}
            idea={idea}
            isSelected={selectedIdea?.key === idea.key}
            onSelect={selectIdea}
          />
        ))}
      </Box>
      {selectedIdea?.placeType && (
        <NearbyPlaces
          key={selectedIdea.placeType}
          placeType={selectedIdea.placeType}
          onSelectPlace={onSelectPlace}
        />
      )}
    </Box>
  )
}
