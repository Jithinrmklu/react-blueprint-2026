import { createBrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouterV6(createBrowserRouter)

export const router = sentryCreateBrowserRouter([
  {
    path: '/',
    lazy: () => import('../layouts/MainLayout.jsx'),
    children: [
      {
        index: true,
        lazy: () => import('../pages/Home.jsx'),
      },
      {
        path: 'users',
        lazy: () => import('../pages/Users.jsx'),
      },
      {
        // pathless protected layout — auth check in loader
        lazy: () => import('../layouts/ProtectedLayout.jsx'),
        children: [
          {
            path: 'companies',
            lazy: () => import('../pages/Companies.jsx'),
          },
          {
            path: 'dashboard',
            lazy: () => import('../pages/Dashboard.jsx'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    lazy: () => import('../pages/Login.jsx'),
  },
])
