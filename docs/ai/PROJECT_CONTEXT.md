# Project Analysis – URL Shortener SaaS Platform
# AI Project Context

This document was generated to provide AI coding assistants
(Codex, Claude, Antigravity, etc.) with an overview of the
project architecture and current implementation status.

It is a supporting reference and not the authoritative
project documentation.

Refer to PROJECT_LOG.md for implementation history.
Refer to ARCHITECTURE.md for architectural decisions.

## 1. High-Level Architecture Summary

A full-stack SaaS platform split into:

- **Backend** – Spring Boot REST API with Spring Security + JWT, JPA/Hibernate, MySQL. Fully complete.
- **Frontend** – React 19 + Vite SPA. Authentication module complete. Dashboard module in progress (current branch: `feature/dashboard`). All other modules pending.

The frontend communicates **exclusively** through a centralized Axios instance (`apiClient.js`). Pages never call Axios directly; they call service functions. Server state is managed by React Query (TanStack Query). Global UI state is managed by Zustand. Forms use React Hook Form.

---

## 2. Folder Structure Summary

```
frontend/src/
├── App.jsx                    # Root – renders AppRoutes only
├── main.jsx                   # Entry – restores session, mounts BrowserRouter
├── styles/
│   └── globals.css            # CSS custom properties (design tokens) + Tailwind v4 import
├── routes/
│   └── AppRoutes.jsx          # All route definitions
├── components/
│   ├── ProtectedRoute.jsx     # Guards authenticated routes
│   ├── PublicRoute.jsx        # Redirects logged-in users away from auth pages
│   ├── layout/
│   │   ├── DashboardLayout.jsx  # Sidebar + Topbar shell for protected pages
│   │   ├── PublicLayout.jsx     # Navbar wrapper for login/register
│   │   ├── Navbar.jsx           # Top bar for public pages
│   │   ├── Sidebar.jsx          # Left nav with nav items + logout button
│   │   └── Topbar.jsx           # Dashboard header with page title + username
│   ├── ui/
│   │   ├── Button.jsx           # variant: primary | secondary
│   │   ├── Input.jsx            # forwardRef input
│   │   ├── Card.jsx             # Surface-1 card with hairline border
│   │   └── Loader.jsx           # Spinner (NOTE: violates design preference for skeletons)
│   └── dashboard/
│       ├── StatisticCard.jsx    # Single stat display using Card
│       ├── StatisticsGrid.jsx   # 4-column grid of StatisticCards
│       ├── QuickActionCard.jsx  # Clickable card linking to a route
│       └── QuickActions.jsx     # 3-column grid of QuickActionCards
├── pages/
│   ├── login/Login.jsx          # Complete – React Hook Form, auth flow
│   ├── register/Register.jsx    # Complete – React Hook Form, field-level errors
│   ├── dashboard/Dashboard.jsx  # In progress – assembles StatisticsGrid + QuickActions
│   ├── myurls/MyUrls.jsx        # Stub placeholder
│   ├── analytics/Analytics.jsx  # Stub placeholder
│   └── errors/NotFound.jsx      # Stub placeholder
├── services/
│   ├── apiClient.js             # Single Axios instance: baseURL, JWT interceptor, 10s timeout
│   └── authService.js           # login() + register() calls via apiClient
├── store/
│   └── authStore.js             # Zustand: token, username, roles, isAuthenticated, login/logout/restoreSession
├── hooks/
│   └── useAuth.js               # Thin wrapper around useAuthStore()
├── utils/
│   └── jwt.js                   # decodeJwt, isTokenExpired, extractUsername, extractRoles
├── constants/
│   └── storage.js               # AUTH_TOKEN_STORAGE_KEY = "url-shortener.auth.token"
└── context/                     # Empty – intentionally unused (Zustand used instead)
```

> **Notable gap**: `layouts/` folder (as documented in ARCHITECTURE.md) is implemented as `components/layout/`. No `layouts/` top-level directory exists. This is the actual convention in use.

---

## 3. Authentication Flow Summary

```
main.jsx
  └─ useAuthStore.getState().restoreSession()
       ├─ reads localStorage["url-shortener.auth.token"]
       ├─ decodes JWT, checks expiry
       └─ if valid → sets { token, username, roles, isAuthenticated: true }
           if invalid → clears token, sets EMPTY_AUTH_STATE

Login.jsx
  └─ authService.login(username, password)
       └─ POST /api/auth/public/login  (via apiClient)
            └─ returns { token }
                 └─ useAuthStore.login(token)
                      ├─ decodes + validates JWT
                      ├─ stores to localStorage
                      └─ sets Zustand state
                           └─ navigate → /dashboard (or original destination)

apiClient.js (request interceptor)
  └─ reads localStorage token → adds Authorization: Bearer <token>

ProtectedRoute.jsx
  └─ reads useAuth().isAuthenticated
       ├─ false → <Navigate to="/login" state={{ from: location }} />
       └─ true  → <Outlet />

PublicRoute.jsx
  └─ isAuthenticated → <Navigate to="/dashboard" /> else <Outlet />

Logout (DashboardLayout.jsx)
  └─ useAuthStore.logout()
       ├─ removeItem(AUTH_TOKEN_STORAGE_KEY)
       └─ set(EMPTY_AUTH_STATE)
            └─ navigate("/login", { replace: true })
```

Token is stored in **`localStorage`** only. There is no refresh token mechanism. The response interceptor in `apiClient.js` has a **TODO comment** noting that 401/403 auto-logout handling is not yet implemented.

---

## 4. Current Frontend Progress

| Phase | Description | Status |
|-------|-------------|--------|
| K | React + Vite foundation, folder structure, layouts, placeholder pages | ✅ Complete |
| L | AI documentation (DESIGN.md, ARCHITECTURE.md, CODING_STANDARDS.md) | ✅ Complete |
| M | Authentication module (Login, Register, JWT, Zustand, ProtectedRoute) | ✅ Complete |
| N | Dashboard module (Statistics, Sidebar, Topbar, layout shell) | 🔄 In Progress (current branch: `feature/dashboard`) |
| O | URL Shortening module | ⬜ Pending |
| P | URL Management (table, search, sort, pagination) | ⬜ Pending |
| Q | URL Actions (activate/deactivate, soft delete, confirmation) | ⬜ Pending |
| R | Analytics Dashboard (charts, filters, skeletons) | ⬜ Pending |
| S | UI Polish & Motion (animations, skeletons, accessibility, toasts) | ⬜ Pending |
| T | Final QA & Deployment | ⬜ Pending |

The dashboard page (`Dashboard.jsx`) renders `StatisticsGrid` and `QuickActions` with static placeholder data — no API integration yet.

---

## 5. Components That Already Exist

### Layout
- [`DashboardLayout`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/layout/DashboardLayout.jsx) – Sidebar + Topbar shell, mobile drawer support, keyboard (Escape) close
- [`PublicLayout`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/layout/PublicLayout.jsx) – Navbar wrapper
- [`Navbar`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/layout/Navbar.jsx) – Public top bar
- [`Sidebar`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/layout/Sidebar.jsx) – Nav links + logout, mobile toggle, ARIA labelled
- [`Topbar`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/layout/Topbar.jsx) – Title + username display + mobile menu trigger

### Route Guards
- [`ProtectedRoute`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/ProtectedRoute.jsx) – Redirects unauthenticated users, preserves `from` location
- [`PublicRoute`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/PublicRoute.jsx) – Redirects authenticated users to dashboard

### UI Primitives
- [`Button`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/ui/Button.jsx) – `primary` / `secondary` variants, disabled, accessible focus ring
- [`Input`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/ui/Input.jsx) – `forwardRef`, ARIA-ready, design token styled
- [`Card`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/ui/Card.jsx) – Surface-1, hairline border, 24px padding, 8px radius
- [`Loader`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/ui/Loader.jsx) – Simple spinner (usage should be limited per DESIGN.md)

### Dashboard Components
- [`StatisticCard`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/dashboard/StatisticCard.jsx) – title / value / description using `Card`
- [`StatisticsGrid`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/dashboard/StatisticsGrid.jsx) – 4-column responsive grid of StatisticCards
- [`QuickActionCard`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/dashboard/QuickActionCard.jsx) – Linked card with hover border transition
- [`QuickActions`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/components/dashboard/QuickActions.jsx) – 3-column grid of QuickActionCards

### Pages (fully implemented)
- [`Login`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/pages/login/Login.jsx)
- [`Register`](file:///d:/URL Shortener/url-shortener-sb/frontend/src/pages/register/Register.jsx)

### Pages (stubs only)
- `Dashboard.jsx`, `MyUrls.jsx`, `Analytics.jsx`, `NotFound.jsx`

---

## 6. Components That Are Reusable

These are the confirmed reusable primitives per ARCHITECTURE.md — never duplicate them:

| Component | Location | Notes |
|-----------|----------|-------|
| `Button` | `components/ui/Button.jsx` | Extend with new variants if needed |
| `Input` | `components/ui/Input.jsx` | forwardRef; works with React Hook Form |
| `Card` | `components/ui/Card.jsx` | Base surface; compose all card-like UI from this |
| `StatisticCard` | `components/dashboard/StatisticCard.jsx` | Accepts `{ title, value, description }` |
| `StatisticsGrid` | `components/dashboard/StatisticsGrid.jsx` | Accepts `statistics[]` array |
| `QuickActionCard` | `components/dashboard/QuickActionCard.jsx` | Accepts `{ title, description, route }` |

**Still missing** (to be built):
Modal, Table, Pagination, Badge, Toast, Skeleton, SearchBar, Dropdown, EmptyState, ChartsWrapper

---

## 7. Coding Conventions That Must Never Be Violated

### Architecture
- Pages **never** call Axios directly. All API calls go through `services/` → `apiClient`.
- Server state → React Query only. Never put server data in Zustand.
- Global UI state → Zustand only. No prop-drilling auth state.
- Forms → React Hook Form only. Never manage large forms with `useState`.
- One Axios instance only (`apiClient.js`). Never create another.

### Naming
- Components & Pages → `PascalCase` (e.g., `Button.jsx`, `Dashboard.jsx`)
- Hooks → `camelCase` prefixed with `use` (e.g., `useAuth.js`, `useUrls.js`)
- Services → `camelCase` with `Service` suffix (e.g., `authService.js`)
- Utils → `camelCase` (e.g., `jwt.js`, `formatDate.js`)
- Constants → `UPPER_SNAKE_CASE` (e.g., `AUTH_TOKEN_STORAGE_KEY`)

### Styling
- Tailwind CSS only. No inline styles. No `style={}` props.
- Never hardcode colors, spacing, or font sizes — use CSS variables.
- All design tokens are in `styles/globals.css` as CSS custom properties.
- No glassmorphism, no neumorphism, no rainbow gradients, no over-animation.
- No more than one accent color (`--color-brand-primary: #5e6ad2`).

### Component Structure (import order)
1. React
2. Libraries
3. Components
4. Hooks
5. Services
6. Utils
7. Styles

### File Size
- Recommended < 200 lines. Acceptable < 300 lines. If larger, split.

### Icons
- Lucide React **only**. No mixing of icon libraries.

### Loading States
- Use **skeleton loaders** — not full-page spinners.
- Avoid `Loader.jsx` for page-level loading.

### Error Handling
- Never silently ignore errors.
- Every API call must handle: Loading / Success / Failure / Empty State / Unauthorized.
- Use Toast notifications for API errors (Toast not yet built).

### Accessibility
- Keyboard navigation mandatory.
- ARIA labels required.
- Semantic HTML required.
- Minimum 44px touch targets.
- `prefers-reduced-motion` must be respected (already done in Sidebar and QuickActionCard).

### React
- Functional components only. No class components.
- No legacy lifecycle methods.

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:` — not vague messages like "update".

---

## 8. Architectural Concerns

1. **`Loader.jsx` violates DESIGN.md** — The spinner-based Loader exists but DESIGN.md explicitly states "Avoid spinners whenever possible. Use skeleton loaders." `Loader.jsx` should not be used for page/table/card loading in future phases.

2. **`apiClient.js` — 401/403 interceptor is a stub** — The response error interceptor has a comment `// Future 401/403 session handling belongs in this central interceptor.` but does not yet auto-logout on token expiry. This is a security gap that needs to be addressed before or during Phase O/P when protected API calls proliferate.

3. **React Query not yet installed** — `package.json` does not list `@tanstack/react-query`. It is required by ARCHITECTURE.md and will be needed for Phases O, P, Q, R. It must be installed before those phases begin.

4. **Lucide React not yet installed** — `package.json` does not list `lucide-react`. CODING_STANDARDS.md mandates it as the only icon library. It must be installed before icons are added.

5. **`context/` folder is empty** — This is fine by design (Zustand replaces Context), but the folder should not be used going forward.

6. **`StatisticsGrid` uses hardcoded placeholder data** — Currently renders zeros. Phase N work or Phase O integration needs to wire this to real API data via React Query.

7. **`QuickActions` "Create Short URL" and "My URLs" both route to `/myurls`** — This is likely intentional as a placeholder, but once the URL creation modal/page is built in Phase O, the Create Short URL action should point to its own route or trigger a modal.

8. **No `/settings` route exists** — ARCHITECTURE.md mentions `/settings` as a protected route, but it is absent from `AppRoutes.jsx`.

---

## 9. Remaining Roadmap

### Phase N – Dashboard Module (Current)
- Wire `StatisticsGrid` to real backend data (GET user URL stats)
- Add React Query for data fetching
- Install `@tanstack/react-query` and `lucide-react`
- Add icon support to Sidebar nav items
- Implement "Recent URLs" section in Dashboard
- Add skeleton loading states for statistics cards

### Phase O – URL Shortening Module
- Build `urlService.js` (POST /shorten)
- Build URL creation form (with optional expiration date)
- Show result short URL with copy button
- Toast notification on success
- Integrate with My URLs page

### Phase P – URL Management
- Build URL data table with columns: Original URL, Short URL, Clicks, Created, Expiration, Status, Actions
- Build `Table`, `Pagination`, `SearchBar`, `Badge` reusable components
- Wire to GET /my-urls with React Query (pagination, sorting, search params)
- Responsive table layout

### Phase Q – URL Actions
- Activate/Deactivate toggle (PATCH endpoint)
- Soft delete with confirmation dialog
- Build `Modal` reusable component
- Optimistic updates via React Query mutation

### Phase R – Analytics Dashboard
- URL selection
- Charts (Line, Bar, Area) — needs charting library (Recharts likely)
- Date range filter
- Statistics cards per URL
- Skeleton loading for charts

### Phase S – UI Polish & Motion
- Add micro-animations (hover scale 1.02, transitions 150–250ms)
- Build `Toast` notification system
- Build `Skeleton` loader components
- Accessibility audit
- Responsive improvements

### Phase T – Final QA & Deployment
- Full integration testing
- README update
- Deployment configuration

---

## Summary

I have fully read and internalized all documentation (DESIGN.md, ARCHITECTURE.md, CODING_STANDARDS.md, PROJECT_LOG.md) and every existing source file in the frontend. I understand the architecture, conventions, design system, current state, and what remains to be built. I am ready to implement future tasks while strictly respecting this project's established patterns.
