import { useNavigate, useSearchParams, redirect } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'
import { getAuthState } from '../features/auth/authService'

export async function loader() {
  if (getAuthState()) return redirect('/dashboard')
  return null
}

export function Component() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') ?? '/dashboard'

  function handleLogin() {
    login()
    navigate(from, { replace: true })
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-8 border border-gray-200 rounded-lg text-center min-w-72 shadow-sm'>
        <h2 className='text-xl font-semibold mb-2'>Login Required</h2>
        <p className='text-gray-500 mb-6'>You must be logged in to view this page.</p>
        <button
          className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded cursor-pointer border-none text-sm'
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  )
}
