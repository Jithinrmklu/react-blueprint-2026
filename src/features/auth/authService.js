import useStore from '../../store'

export const getAuthState = () => useStore.getState().isAuthenticated

export const login = () => useStore.getState().login()

export const logout = () => useStore.getState().logout()
