import type { StateCreator } from 'zustand'
import type { User, UsersSlice, StoreState } from './types'

export const createUsersSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  UsersSlice
> = (set) => ({
  users: [],
  setUsers: (users: User[]) =>
    set((state) => {
      state.users = users
    }),
  addUser: (user: User) =>
    set((state) => {
      state.users.push(user)
    }),
  updateUser: (id: number, data: Partial<Omit<User, 'id'>>) =>
    set((state) => {
      const user = state.users.find((u) => u.id === id)
      if (user) Object.assign(user, data)
    }),
  deleteUser: (id: number) =>
    set((state) => {
      state.users = state.users.filter((u) => u.id !== id)
    }),
})
