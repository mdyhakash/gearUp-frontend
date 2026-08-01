# GearUp — Frontend

Rent sports & outdoor gear instantly. A Next.js frontend for a three-sided rental marketplace — customers browse and rent gear, providers manage inventory and fulfill orders, admins moderate the platform.

Live: `https://gearup-frontend-seven.vercel.app/` · Backend: `https://gearup-backend-one.vercel.app/`

---

## Screenshots


## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions, `proxy.ts` for edge-level auth (Next.js 16's rename of `middleware.ts`)
- **TypeScript**
- **Tailwind CSS** + shadcn/ui (Radix primitives)
- **Zustand** — cart state only, persisted to `localStorage`; everything else (filters, sort, search, pagination) is driven by URL search params and rendered server-side, deliberately avoiding a client cache layer
- **JWT auth** — access/refresh tokens in httpOnly cookies, verified and rotated in `proxy.ts`
- **SSLCommerz** — hosted checkout redirect for payment

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Environment

Create `.env.local` in the project root:

```
BACKEND_API_URL=http://localhost:5000
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

`JWT_ACCESS_SECRET`/`JWT_REFRESH_SECRET` must match what your backend signs tokens with — `proxy.ts` verifies tokens locally, without a round-trip to the backend, so a mismatch here silently breaks all route protection.

### 3. Run

```bash
npm run dev
```

`http://localhost:3000`

### 4. Admin credentials

```
Email:    admin@gmail.com
Password: 12345
```

---

## Roles

| Role     | Dashboard             | Can do                                                                                      |
| -------- | --------------------- | ------------------------------------------------------------------------------------------- |
| Customer | `/dashboard`          | Browse & rent gear, cart & checkout, track orders, pay, view payment history, leave reviews |
| Provider | `/provider-dashboard` | Manage gear inventory, confirm/fulfill incoming orders                                      |
| Admin    | `/admin-dashboard`    | Manage users (suspend/activate), moderate gear & orders, manage categories                  |

Role is chosen at registration. `proxy.ts` enforces access per role: unauthenticated visitors are redirected to `/login`; an authenticated user hitting the wrong dashboard is redirected to their own.

## Project Structure

```
app/
  (auth)/              — /login, /register
  (public)/            — /, /gear, /gear/[id], /cart
  (dashboard)/
    dashboard/         — customer: orders, payments, reviews, profile
    provider-dashboard/— provider: gear inventory, orders, profile
    admin-dashboard/   — admin: users, gear, orders, categories, profile
  payment/             — /payment/success, /cancel, /failed (SSLCommerz redirect targets)
components/
  gear/                — browse/search/filter/sort, gear card, rent widget, add-to-cart
  cart/                — cart view (item list, shared date range, checkout)
  orders/              — status badges, provider order dialog, cancel button
  payment/             — payment status badge, receipt dialog, pay-now button
  reviews/             — review item, review form
  shared/              — navbar, mobile nav, cart button, pagination
  ui/                  — shadcn primitives
store/
  cart-store.ts        — Zustand cart, persisted to localStorage
lib/actions/            — public server actions (gear, categories)
service/                — auth/session helpers (getMe, refreshToken, logout)
types/                  — shared TypeScript types matching backend response shapes
proxy.ts                — JWT verification + role-based route protection (Next.js 16 middleware)
```

## Key Flows

**Customer rental flow:**
Browse/search/filter gear → gear detail → add to cart (quantity only, no per-item dates) → `/cart` → pick one shared rental date range for the whole order → place order (`PLACED`) → provider confirms (`CONFIRMED`) → customer pays via SSLCommerz (`PAID`) → provider marks picked up (`PICKED_UP`) → provider marks returned (`RETURNED`) → customer leaves a review.

**Provider flow:**
Add gear (URL-based image, pricing, stock) → incoming order arrives (`PLACED`) → confirm or cancel → after payment, mark picked up → mark returned.

**Admin flow:**
Moderate users (suspend/activate), gear listings, and rental orders platform-wide; manage the shared category list.

## Design Notes / Known Constraints

- **One date range per order.** The backend's `CreateRentalOrder` takes a single `startDate`/`endDate` for the entire order, not per gear item — this is why cart items only carry a quantity, and the rental date range is chosen once, at checkout, for everything in the cart.
- **Payment is gated on provider confirmation.** `PayNowButton` only renders when an order's status is `CONFIRMED` — a customer cannot pay on a freshly placed (`PLACED`) order, by design.
- **State strategy.** Only the cart uses global client state (Zustand). Every other stateful UI — filters, sort, search, pagination — reads and writes URL search params and re-renders server-side, so state survives refresh/back-button for free and needs no client cache library.
- **Server actions co-located per dashboard.** Each dashboard (`dashboard/`, `provider-dashboard/`, `admin-dashboard/`) has its own `_actions/` folder scoped to that role — a customer-facing page never imports a provider or admin action, and vice versa.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # run production build
npm run lint    # eslint
```