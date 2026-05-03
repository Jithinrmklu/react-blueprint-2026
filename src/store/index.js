import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createUsersSlice } from './usersSlice'
import { createCompaniesSlice } from './companiesSlice'
import { createAuthSlice } from './authSlice'

const useStore = create(
  immer((set) => ({
    ...createUsersSlice(set),
    ...createCompaniesSlice(set),
    ...createAuthSlice(set),
  }))
)

export default useStore
