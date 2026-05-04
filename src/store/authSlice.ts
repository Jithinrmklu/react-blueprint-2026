import type { StateCreator } from 'zustand'
import type { AuthSlice, StoreState } from './types'

export const createAuthSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  AuthSlice
> = (set) => ({
  isAuthenticated: false,
  login: () =>
    set((state) => {
      state.isAuthenticated = true
    }),
  logout: () =>
    set((state) => {
      state.isAuthenticated = false
    }),
})
