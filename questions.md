# React Interview Questions

## Project Architecture

1. How would you structure a mid-scale React application? What goes in `features/` vs `pages/` vs `components/`?
2. Why would you separate `authService.js` (plain functions) from `useAuth.js` (hook)? When does that distinction matter?
3. How do you decide when to use global state (Zustand) vs local state (`useState`) vs server state (React Query)?

---

## State Management

4. What is the Immer middleware in Zustand and why would you use it over plain `set`?
5. How do you compose multiple Zustand slices into a single store? Walk me through the slice pattern.
6. If two components on different routes both need user data, how do you avoid fetching it twice?

---

## React Router v6.4+

7. What is the difference between `BrowserRouter` + `<Routes>` and `createBrowserRouter` + `RouterProvider`? Why would you prefer one over the other?
8. What are loaders and actions in React Router? How do they change the data fetching lifecycle compared to `useEffect`?
9. How would you protect a route so unauthenticated users are redirected to `/login`? Why handle this in a loader rather than a component?
10. What is a pathless layout route? Give a real use case for one.
11. How does React Router's `lazy` property differ from `React.lazy` + `<Suspense>`? What advantage does it have with loaders?
12. After an action mutates data, how does React Router ensure the UI reflects the change?

---

## Data Fetching & Caching

13. What is `staleTime` in TanStack Query and what happens if you leave it at the default `0`?
14. How do you invalidate a query from a different component — what is the TanStack Query equivalent of RTK Query's `invalidateTags`?
15. How would you use `useFetcher` to submit a React Hook Form without losing client-side validation?
16. Why would you use an Axios instance (`axios.create`) instead of calling `axios.get` directly?

---

## Forms & Validation

17. What is the difference between controlled and uncontrolled inputs in React Hook Form? Why does it matter for performance?
18. How do you connect a Zod schema to React Hook Form? What does `zodResolver` do?
19. How would you handle a `<select>` with React Hook Form — why does it need `Controller` when a text input doesn't?

---

## Code Quality & Tooling

20. What is the role of `eslint-config-prettier` and why must it be the last item in the ESLint config?
21. What is `lint-staged` and why is it preferable to running ESLint on the entire codebase in a pre-commit hook?
22. Walk me through the Husky + `lint-staged` setup. What happens step by step when a developer runs `git commit`?

---

## Error Monitoring

23. Why must Sentry be initialised before all other imports in `main.jsx`?
24. What is Session Replay in Sentry? How would you configure it so that normal sessions are sampled at 10% but error sessions are always captured?
25. What does `wrapCreateBrowserRouterV6` do — what would be missing if you skipped it?

---

## Docker & Build

26. Explain a multi-stage Docker build for a Vite React app. What is in each stage and why is the final image small?
27. Vite env vars (`VITE_*`) are embedded at build time. How do you pass them into a Docker build securely?
28. Without the `try_files $uri /index.html` directive in Nginx, what breaks in a React Router app and why?
29. What cache strategy would you apply to Nginx for JS/CSS assets, and why is `immutable` safe to use with Vite?

---

## General Senior-Level

30. A junior developer on your team opens a PR that fetches data inside `useEffect` instead of a loader, skips Zod validation on a form, and hardcodes API URLs in the component. How do you handle the review?
31. How would you enforce these standards across a team so they are followed consistently without relying on PR reviews alone?
