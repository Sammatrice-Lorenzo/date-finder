import ideas from '@/data/json/activity-ideas.json'
import type ActivityIdeaInterface from '@/interfaces/activity/ActivityIdeaInterface'
import type { ActivityIdeaCategory } from '@/types/ActivityIdeaCategory'

export const ACTIVITY_IDEA_CATEGORIES: ActivityIdeaCategory[] = [
  'HOME',
  'OUTDOOR',
  'CULTURE',
  'FOOD',
  'SPORT',
]

export default class ActivityIdeaService {
  private _ideas: ActivityIdeaInterface[]

  constructor(activityIdeas: ActivityIdeaInterface[] = ideas as ActivityIdeaInterface[]) {
    this._ideas = activityIdeas
  }

  public getIdeas(category: ActivityIdeaCategory | null): ActivityIdeaInterface[] {
    return category ? this._ideas.filter(idea => idea.category === category) : this._ideas
  }

  /** Idée au hasard, différente de la précédente quand c'est possible */
  public getRandomIdea(
    category: ActivityIdeaCategory | null,
    previousKey: string | null,
    random: () => number = Math.random
  ): ActivityIdeaInterface | null {
    const ideasByCategory: ActivityIdeaInterface[] = this.getIdeas(category)
    const candidates: ActivityIdeaInterface[] =
      ideasByCategory.length > 1
        ? ideasByCategory.filter(idea => idea.key !== previousKey)
        : ideasByCategory

    return candidates[Math.floor(random() * candidates.length)] ?? null
  }
}
