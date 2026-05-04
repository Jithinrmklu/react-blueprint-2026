import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/useAuth'

export function Component() {
  const { isAuthenticated } = useAuth()

  return (
    <div className='text-center mt-10'>
      <h2 className='text-3xl font-semibold mb-2'>Welcome</h2>
      <p className='text-gray-500 mb-8'>Navigate to a section to get started.</p>
      <div className='flex gap-4 justify-center'>
        <Link
          to='/users'
          className='flex flex-col gap-1.5 px-8 py-6 border border-gray-200 rounded-lg no-underline text-gray-900 hover:shadow-md transition-shadow'
        >
          <span className='text-lg font-semibold'>Users</span>
          <span className='text-sm text-gray-500'>Browse and manage users</span>
        </Link>
        <Link
          to='/companies'
          className='flex flex-col gap-1.5 px-8 py-6 border border-gray-200 rounded-lg no-underline text-gray-900 hover:shadow-md transition-shadow'
        >
          <span className='text-lg font-semibold'>Companies</span>
          <span className='text-sm text-gray-500'>
            {isAuthenticated ? 'Browse companies' : 'Login required'}
          </span>
        </Link>
      </div>
    </div>
  )
}
