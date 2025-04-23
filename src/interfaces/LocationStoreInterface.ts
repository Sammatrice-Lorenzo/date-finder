import type { Location } from './Location'

export default interface LocationStoreInterface {
  location: Location | null
  setLocation: (location: Location) => void
}
