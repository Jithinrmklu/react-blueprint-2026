import useStore from '../../store'

export function useAuth() {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const login = useStore((s) => s.login)
  const logout = useStore((s) => s.logout)
  return { isAuthenticated, login, logout }
}
