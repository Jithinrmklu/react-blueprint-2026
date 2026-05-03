import { useLoaderData } from 'react-router-dom'
import { apiClient } from '../lib/apiClient'
import useStore from '../store'

export async function loader() {
  const store = useStore.getState()

  const [users, companies] = await Promise.all([
    store.users.length > 0
      ? store.users
      : apiClient.get('/users').then((r) => {
          store.setUsers(r.data)
          return r.data
        }),
    store.companies.length > 0
      ? store.companies
      : apiClient.get('/companies').then((r) => {
          store.setCompanies(r.data)
          return r.data
        }),
  ])

  return { userCount: users.length, companyCount: companies.length }
}

export function Component() {
  const { userCount, companyCount } = useLoaderData()

  return (
    <div className='text-center mt-10'>
      <h2 className='text-2xl font-semibold mb-8'>Overview</h2>
      <div className='flex gap-6 justify-center'>
        {[
          { label: 'Users', value: userCount },
          { label: 'Companies', value: companyCount },
        ].map(({ label, value }) => (
          <div
            key={label}
            className='flex flex-col gap-2 px-12 py-8 border border-gray-200 rounded-lg'
          >
            <span className='text-5xl font-bold text-indigo-600'>{value}</span>
            <span className='text-sm text-gray-500'>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
