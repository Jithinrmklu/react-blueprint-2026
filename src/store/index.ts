import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createUsersSlice } from './usersSlice'
import { createCompaniesSlice } from './companiesSlice'
import { createAuthSlice } from './authSlice'
import type { StoreState } from './types'

const useStore = create<StoreState>()(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immer((set: any, get: any, store: any) => ({
    ...createAuthSlice(set, get, store),
    ...createUsersSlice(set, get, store),
    ...createCompaniesSlice(set, get, store),
  }))
)

export default useStore
