import { useState } from 'react'
import { useLoaderData, useFetcher } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useStore from '../store'
import { apiClient } from '../lib/apiClient'

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

  return { users, companies }
}

export async function action({ request }) {
  const { intent, ...data } = await request.json()
  const store = useStore.getState()

  if (intent === 'add') store.addUser({ id: Date.now(), ...data })
  if (intent === 'update') store.updateUser(data.id, data)
  if (intent === 'delete') store.deleteUser(data.id)

  return null
}

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  company: z.string().min(1, 'Please select a company'),
})

export function Component() {
  const { users, companies } = useLoaderData()
  const fetcher = useFetcher()
  const [editId, setEditId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', company: '' },
  })

  function onSubmit(data) {
    if (editId !== null) {
      fetcher.submit(
        { intent: 'update', id: editId, ...data },
        { method: 'post', encType: 'application/json' }
      )
      setEditId(null)
    } else {
      fetcher.submit({ intent: 'add', ...data }, { method: 'post', encType: 'application/json' })
    }
    reset()
  }

  function startEdit(user) {
    setEditId(user.id)
    setValue('name', user.name)
    setValue('email', user.email)
    setValue('company', user.company ?? '')
  }

  function cancelEdit() {
    setEditId(null)
    reset()
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-2 mb-6 flex-wrap items-start'
        noValidate
      >
        <div className='flex flex-col flex-1 min-w-36'>
          <input
            className={`px-3 py-2 text-sm border rounded outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder='Name'
            {...register('name')}
          />
          {errors.name && <span className='text-red-500 text-xs mt-1'>{errors.name.message}</span>}
        </div>

        <div className='flex flex-col flex-1 min-w-36'>
          <input
            className={`px-3 py-2 text-sm border rounded outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder='Email'
            type='email'
            {...register('email')}
          />
          {errors.email && (
            <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>
          )}
        </div>

        <div className='flex flex-col flex-1 min-w-40'>
          <Controller
            name='company'
            control={control}
            render={({ field }) => (
              <select
                className={`px-3 py-2 text-sm border rounded outline-none focus:ring-2 focus:ring-indigo-400 ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                {...field}
              >
                <option value=''>— Select Company —</option>
                {companies.map((c, i) => (
                  <option key={`${c.id}-${i}`} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.company && (
            <span className='text-red-500 text-xs mt-1'>{errors.company.message}</span>
          )}
        </div>

        <div className='flex gap-2 items-center pt-0.5'>
          <button
            className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded border-none cursor-pointer disabled:opacity-50'
            type='submit'
            disabled={fetcher.state !== 'idle'}
          >
            {editId !== null ? 'Update' : 'Add User'}
          </button>
          {editId !== null && (
            <button
              className='px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded border-none cursor-pointer'
              type='button'
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className='w-full border-collapse'>
        <thead>
          <tr>
            {['#', 'Name', 'Email', 'Company', 'Actions'].map((h) => (
              <th key={h} className='bg-indigo-600 text-white px-3 py-2.5 text-left text-sm'>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={`${user.id}-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{i + 1}</td>
              <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{user.name}</td>
              <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>{user.email}</td>
              <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>
                {user.company ?? '—'}
              </td>
              <td className='px-3 py-2.5 border-b border-gray-100 text-sm'>
                <button
                  className='mr-1.5 px-2.5 py-1 bg-sky-500 hover:bg-sky-600 text-white text-xs rounded border-none cursor-pointer'
                  onClick={() => startEdit(user)}
                >
                  Edit
                </button>
                <button
                  className='px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded border-none cursor-pointer'
                  onClick={() =>
                    fetcher.submit(
                      { intent: 'delete', id: user.id },
                      { method: 'post', encType: 'application/json' }
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
