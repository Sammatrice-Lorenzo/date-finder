import type { ActivityQueryProps } from '@/types/ActivityQueryProps'

export default interface ActivityEventCalendarInterface {
  uid: string
  activity: ActivityQueryProps
  targetEmail: string
}
