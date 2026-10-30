import ActivityIdeaService, { ACTIVITY_IDEA_CATEGORIES } from '../ActivityIdeaService'
import ideas from '@/data/json/activity-ideas.json'
import activityIdeaIcons from '@/data/activityIdeaIcons'
import translate from '@/locales/fr/common.json'
import type ActivityIdeaInterface from '@/interfaces/activity/ActivityIdeaInterface'

const testIdeas: ActivityIdeaInterface[] = [
  { key: 'PICNIC', category: 'OUTDOOR', icon: 'picnic', placeType: 'park' },
  { key: 'WALK', category: 'OUTDOOR', icon: 'walk' },
  { key: 'COOKING', category: 'HOME', icon: 'cooking' },
]

describe('ActivityIdeaService', () => {
  const service: ActivityIdeaService = new ActivityIdeaService(testIdeas)

  test('Test filter ideas by category', () => {
    expect(service.getIdeas('OUTDOOR').map(idea => idea.key)).toEqual(['PICNIC', 'WALK'])
    expect(service.getIdeas(null)).toHaveLength(3)
  })

  test('Test random idea is different from the previous one', () => {
    const idea = service.getRandomIdea('OUTDOOR', 'PICNIC', () => 0)

    expect(idea?.key).toBe('WALK')
  })

  test('Test random idea when the category has only one idea', () => {
    expect(service.getRandomIdea('HOME', 'COOKING', () => 0.99)?.key).toBe('COOKING')
    expect(service.getRandomIdea('SPORT', null)).toBeNull()
  })

  test('Test every idea has a valid category, a translation and an icon', () => {
    const items: Record<string, string> = translate.ACTIVITY.IDEAS.ITEMS

    for (const idea of ideas) {
      expect(ACTIVITY_IDEA_CATEGORIES).toContain(idea.category)
      expect(items[idea.key]).toBeDefined()
      expect(activityIdeaIcons[idea.icon]).toBeDefined()
    }
  })
})
