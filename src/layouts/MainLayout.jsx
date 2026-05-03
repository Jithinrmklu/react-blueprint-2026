import { NavLink, Outlet, useNavigation } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'

export function Component() {
  const { isAuthenticated, logout } = useAuth()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className='max-w-4xl mx-auto px-4 py-10 font-sans'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold m-0'>Dashboard</h1>
        {isAuthenticated && (
          <button
            className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded cursor-pointer border-none'
            onClick={logout}
          >
            Log Out
          </button>
        )}
      </div>

      <nav className='flex gap-2 mb-6'>
        {[
          { to: '/', label: 'Home', end: true },
          { to: '/users', label: 'Users' },
          { to: '/companies', label: 'Companies' },
          ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-5 py-2 rounded text-sm no-underline border-none cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {isLoading ? <p className='text-center mt-10 text-gray-500'>Loading...</p> : <Outlet />}
    </div>
  )
}
