# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev           # start Vite dev server
npm run build         # production build → dist/
npm run preview       # serve the production build locally

npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier — format all files
npm run format:check  # Prettier — check only (use in CI)

npm run test          # Vitest — run all tests once
npm run test:watch    # Vitest — watch mode
```

Tests use Vitest + Testing Library. Setup file: `src/test/setup.js`. Test environment is `jsdom` (configured in `vite.config.js`).

**Docker:**

```bash
docker build --build-arg VITE_SENTRY_DSN=your_dsn -t app .
docker run -p 3000:80 app
```

---

## Architecture

This is a client-side React SPA using React Router v7's data router pattern as the primary data layer. There is no backend — all data comes from an external mock REST API.

### Request lifecycle

1. User navigates to a route
2. React Router calls the route's `loader` (fetches data, checks auth)
3. The page `Component` renders with data from `useLoaderData()`
4. Form submissions go through a route `action` via `fetcher.submit()`
5. After the action, React Router automatically re-runs the loader

### Two layers of state

- **Zustand** (`src/store/`) — global UI state and a client-side cache for API responses. Loaders check the store first and only call the API if the store is empty.
- **TanStack Query** — installed and configured (`staleTime: 5min`) for cross-component cache invalidation via `queryClient.invalidateQueries`. Use `queryClient.invalidateQueries({ queryKey: ['key'] })` when a mutation in one component needs to trigger a refetch in another.

### Auth flow

Auth state lives in `authSlice`. Two access patterns exist intentionally:

- `useAuth()` (`src/features/auth/useAuth.js`) — React hook, use in components
- `getAuthState()` (`src/features/auth/authService.js`) — plain function, use in loaders/actions (hooks cannot run outside React)

Route protection is done via `ProtectedLayout` (`src/layouts/ProtectedLayout.jsx`) — a **pathless layout route** whose loader calls `getAuthState()` and `redirect()`s to `/login` if unauthenticated. Nest any protected route under it in `src/app/router.jsx`.

### Entry point chain

```
main.jsx
  └── import './lib/sentry'   ← must be first, before React
  └── <Providers />           ← src/app/providers.jsx
        ├── QueryClientProvider
        └── RouterProvider    ← router from src/app/router.jsx
              └── MainLayout  ← nav shell with <Outlet />
                    ├── ProtectedLayout (pathless, wraps protected routes)
                    └── page Components
```

---

## Key Conventions

### Page modules

Every file in `src/pages/` exports named members — never `export default`:

```js
export async function loader() { ... }      // data fetching
export async function action({ request }) { ... }  // mutations
export function Component() { ... }         // the React component
```

React Router's `lazy: () => import('./pages/Foo.jsx')` picks these up automatically for code splitting.

### Zustand slices

Use Immer draft mutations — never spread:

```js
// ✅
addUser: (user) =>
  set((state) => {
    state.users.push(user)
  })
// ❌
addUser: (user) => set((state) => ({ users: [...state.users, user] }))
```

Register every new slice in `src/store/index.js`.

### API calls

Always use the shared Axios instance — never raw `fetch` or inline `axios`:

```js
import { apiClient } from '../lib/apiClient'
const { data } = await apiClient.get('/users') // data, not .json()
```

### Forms

React Hook Form + Zod schema defined at module level + `zodResolver`. Use `register` for plain inputs, `Controller` for `<select>` and custom inputs. Submit through a React Router action:

```js
fetcher.submit(data, { method: 'post', encType: 'application/json' })
```

### List keys

Use composite keys for API-sourced lists — the mock API returns duplicate IDs:

```jsx
{
  items.map((item, i) => <tr key={`${item.id}-${i}`} />)
}
```

### Sentry

`src/lib/sentry.js` must be the first import in `main.jsx`. The router is wrapped with `Sentry.wrapCreateBrowserRouterV6` for route-change tracking. DSN comes from `import.meta.env.VITE_SENTRY_DSN`.

---

## Environment Variables

| Variable          | Where used          |
| ----------------- | ------------------- |
| `VITE_SENTRY_DSN` | `src/lib/sentry.js` |

Set in `.env` locally. Pass as `--build-arg` in Docker. All Vite env vars must be prefixed `VITE_`.

---

## What Not To Do

- Do not fetch data in `useEffect` — use loaders
- Do not use `<BrowserRouter>` / `<Routes>` — use `createBrowserRouter`
- Do not `export default` from page files — use named `export function Component`
- Do not import `axios` directly in pages — use `apiClient`
- Do not call `useAuth()` in loaders — use `getAuthState()`
- Do not spread state in Zustand setters — use Immer draft syntax
- Do not hardcode API URLs — configure in `src/lib/apiClient.js`
