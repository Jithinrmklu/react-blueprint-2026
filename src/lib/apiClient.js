import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://fake-json-api.mock.beeceptor.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})
