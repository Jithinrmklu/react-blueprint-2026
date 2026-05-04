import type { StateCreator } from 'zustand'
import type { Company, CompaniesSlice, StoreState } from './types'

export const createCompaniesSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  CompaniesSlice
> = (set) => ({
  companies: [],
  setCompanies: (companies: Company[]) => set({ companies }),
})
