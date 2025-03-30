import { Location } from '@/interfaces/Location'
import LocationStoreInterface from '@/interfaces/LocationStoreInterface'
import { create } from 'zustand'

export default class LocationStoreService {

  public static useStore = create<LocationStoreInterface>((set) => ({
    location: null,
    setLocation: (newLocation: Location) => set({ location: newLocation }),
  }))
}