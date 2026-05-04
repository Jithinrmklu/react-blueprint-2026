import useStore from '../../store'

export const getAuthState = (): boolean => useStore.getState().isAuthenticated

export const login = (): void => useStore.getState().login()

export const logout = (): void => useStore.getState().logout()
