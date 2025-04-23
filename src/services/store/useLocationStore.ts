import type { Location } from '@/interfaces/Location'
import type LocationStoreInterface from '@/interfaces/LocationStoreInterface'
import { create } from 'zustand'

const useLocationStore = create<LocationStoreInterface>(set => ({
  location: null,
  setLocation: (newLocation: Location) => set({ location: newLocation }),
}))

export default useLocationStore
