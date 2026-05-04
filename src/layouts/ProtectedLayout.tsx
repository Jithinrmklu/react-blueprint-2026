import { Outlet, redirect } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { getAuthState } from '../features/auth/authService'

export async function loader({ request }: LoaderFunctionArgs) {
  if (!getAuthState()) {
    const url = new URL(request.url)
    return redirect(`/login?from=${url.pathname}`)
  }
  return null
}

export function Component() {
  return <Outlet />
}
