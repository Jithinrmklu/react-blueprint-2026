export const createAuthSlice = (set) => ({
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
