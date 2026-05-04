import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useLoaderData } from 'react-router-dom'
import type { Company } from '../store/types'

vi.mock('react-router-dom', () => ({
  useLoaderData: vi.fn(),
}))

vi.mock('../lib/apiClient', () => ({
  apiClient: { get: vi.fn() },
}))

vi.mock('../store', () => ({
  default: {
    getState: vi.fn(() => ({ companies: [], setCompanies: vi.fn() })),
  },
}))

import { Component, loader } from './Companies'
import { apiClient } from '../lib/apiClient'
import useStore from '../store'
import type { StoreState } from '../store/types'

const mockCompanies: Company[] = [
  { id: 1, name: 'Acme Corp', address: '123 Main St', city: 'Springfield', country: 'US' },
  { id: 2, name: 'Globex', address: '456 Elm Ave', city: 'Shelbyville', country: 'US' },
]

describe('Companies Component', () => {
  beforeEach(() => {
    vi.mocked(useLoaderData).mockReturnValue({ companies: mockCompanies })
  })

  it('renders the table headers', () => {
    render(<Component />)
    for (const header of ['#', 'Name', 'Address', 'City', 'Country']) {
      expect(screen.getByText(header)).toBeInTheDocument()
    }
  })

  it('renders a row for each company', () => {
    render(<Component />)
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('Globex')).toBeInTheDocument()
  })

  it('renders row numbers starting at 1', () => {
    render(<Component />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders all company fields', () => {
    render(<Component />)
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.getByText('Springfield')).toBeInTheDocument()
    expect(screen.getByText('456 Elm Ave')).toBeInTheDocument()
    expect(screen.getByText('Shelbyville')).toBeInTheDocument()
  })

  it('renders an empty table body when there are no companies', () => {
    vi.mocked(useLoaderData).mockReturnValue({ companies: [] })
    render(<Component />)
    expect(screen.queryByRole('row', { name: /acme/i })).not.toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
  })
})

describe('Companies loader', () => {
  it('returns cached companies from the store without calling the API', async () => {
    vi.mocked(useStore.getState).mockReturnValue({
      companies: mockCompanies,
      setCompanies: vi.fn(),
    } as unknown as StoreState)
    const result = await loader()
    expect(result).toEqual({ companies: mockCompanies })
    expect(vi.mocked(apiClient.get)).not.toHaveBeenCalled()
  })

  it('fetches from the API and populates the store when the cache is empty', async () => {
    const setCompaniesMock = vi.fn()
    vi.mocked(useStore.getState).mockReturnValue({
      companies: [],
      setCompanies: setCompaniesMock,
    } as unknown as StoreState)
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockCompanies })

    const result = await loader()

    expect(vi.mocked(apiClient.get)).toHaveBeenCalledWith('/companies')
    expect(setCompaniesMock).toHaveBeenCalledWith(mockCompanies)
    expect(result).toEqual({ companies: mockCompanies })
  })
})
