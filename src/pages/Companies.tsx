import { useLoaderData } from 'react-router-dom'
import useStore from '../store'
import { apiClient } from '../lib/apiClient'
import type { Company } from '../store/types'

export async function loader(): Promise<{ companies: Company[] }> {
  const store = useStore.getState()

  if (store.companies.length > 0) return { companies: store.companies }

  const { data } = await apiClient.get<Company[]>('/companies')
  store.setCompanies(data)
  return { companies: data }
}

export function Component() {
  const { companies } = useLoaderData() as { companies: Company[] }

  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr>
          {['#', 'Name', 'Address', 'City', 'Country'].map((h) => (
            <th key={h} className='bg-indigo-600 text-white px-3 py-2.5 text-left text-sm'>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {companies.map((company, i) => (
          <tr key={`${company.id}-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{i + 1}</td>
            <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{company.name}</td>
            <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{company.address}</td>
            <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{company.city}</td>
            <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{company.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
