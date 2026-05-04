export type User = {
  id: number
  name: string
  email: string
  company?: string
}

export type Company = {
  id: number
  name: string
  address: string
  city: string
  country: string
}

export type AuthSlice = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export type UsersSlice = {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (id: number, data: Partial<Omit<User, 'id'>>) => void
  deleteUser: (id: number) => void
}

export type CompaniesSlice = {
  companies: Company[]
  setCompanies: (companies: Company[]) => void
}

export type StoreState = AuthSlice & UsersSlice & CompaniesSlice
