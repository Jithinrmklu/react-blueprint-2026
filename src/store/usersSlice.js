export const createUsersSlice = (set) => ({
  users: [],
  setUsers: (users) =>
    set((state) => {
      state.users = users
    }),
  addUser: (user) =>
    set((state) => {
      state.users.push(user)
    }),
  updateUser: (id, data) =>
    set((state) => {
      const user = state.users.find((u) => u.id === id)
      if (user) Object.assign(user, data)
    }),
  deleteUser: (id) =>
    set((state) => {
      state.users = state.users.filter((u) => u.id !== id)
    }),
})
