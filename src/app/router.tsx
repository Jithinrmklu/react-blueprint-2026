import { createBrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouterV6(createBrowserRouter)

export const router = sentryCreateBrowserRouter([
  {
    path: '/',
    lazy: () => import('../layouts/MainLayout'),
    children: [
      {
        index: true,
        lazy: () => import('../pages/Home'),
      },
      {
        path: 'users',
        lazy: () => import('../pages/Users'),
      },
      {
        lazy: () => import('../layouts/ProtectedLayout'),
        children: [
          {
            path: 'companies',
            lazy: () => import('../pages/Companies'),
          },
          {
            path: 'dashboard',
            lazy: () => import('../pages/Dashboard'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    lazy: () => import('../pages/Login'),
  },
])
