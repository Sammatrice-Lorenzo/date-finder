import type { ActivityIdeaCategory } from '@/types/ActivityIdeaCategory'

export default interface ActivityIdeaInterface {
  key: string
  category: ActivityIdeaCategory
  icon: string
  /** Type Google Places pour proposer des lieux réels à proximité */
  placeType?: string
}
