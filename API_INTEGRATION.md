# API_INTEGRATION.md

Maps every GearUp frontend page/component to the backend endpoint(s) it consumes. Base URL is configured via `BACKEND_API_URL` in `.env.local`; all authenticated requests go through `lib/auth-fetch.ts`, which attaches the `accessToken` cookie automatically.

---

## Auth

| Frontend                                      | Component / Action               | Method & Endpoint              | Notes                                                                      |
| --------------------------------------------- | -------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| `/register`                                   | `authAction.ts → registerAction` | `POST /api/auth/register`      | Role selected at registration (CUSTOMER / PROVIDER / ADMIN)                |
| `/login`                                      | `authAction.ts → loginAction`    | `POST /api/auth/login`         | Sets `accessToken`/`refreshToken` httpOnly cookies                         |
| `proxy.ts` (all protected routes)             | —                                | `POST /api/auth/refresh-token` | Called server-side when access token is expired but refresh token is valid |
| Any server component needing the current user | `service/getMe.ts`               | `GET /api/auth/me`             | Used by dashboards/layouts to resolve role & identity                      |

## Public — Gear Discovery

| Frontend                 | Component / Action                             | Method & Endpoint              | Query Params                                                                                                |
| ------------------------ | ---------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `/`                      | `HomePage`                                     | `GET /api/gear`                | `limit=6&sortBy=createdAt&sortOrder=desc` (featured gear, bounded)                                          |
| `/`                      | `HeroSearch`                                   | routes to `/gear?searchTerm=`  | — (no direct API call)                                                                                      |
| `/gear`                  | `lib/actions/publicGearAction.ts → getAllGear` | `GET /api/gear`                | `searchTerm, categoryId, brand, minPrice, maxPrice, condition, isAvailable, page, limit, sortBy, sortOrder` |
| `/gear`                  | `GearFilters`                                  | `GET /api/categories`          | —                                                                                                           |
| `/gear/[id]`             | `getGearById`                                  | `GET /api/gear/:id`            | —                                                                                                           |
| `/gear/[id]` reviews tab | `reviewAction.ts → getGearReviews`             | `GET /api/reviews/:gearItemId` | `page` (response includes `meta.averageRating`, `meta.totalPages`)                                          |

## Customer — Cart, Orders, Payments, Reviews

| Frontend                                                 | Component / Action                                              | Method & Endpoint               | Notes                                                                                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/cart`                                                  | `CartView` (Zustand `useCartStore`, client-only until checkout) | —                               | Cart itself is never persisted server-side; only submitted as one order at checkout                                             |
| `/cart` checkout                                         | `rentalAction.ts → createRentalOrder`                           | `POST /api/rentals`             | Body: `{ startDate, endDate, items: [{ gearItemId, quantity }] }` — **one shared date range for the whole order**, not per item |
| `/dashboard/orders`                                      | `rentalAction.ts → getMyRentals`                                | `GET /api/rentals`              | `page, limit`                                                                                                                   |
| `/dashboard/orders/[id]`                                 | `getRentalById`                                                 | `GET /api/rentals/:id`          | —                                                                                                                               |
| Cancel order (`PLACED` only)                             | `CancelRentalButton`                                            | `PATCH /api/rentals/:id/cancel` | —                                                                                                                               |
| `/dashboard/orders/[id]`                                 | `PayNowButton`                                                  | `POST /api/payments/create`     | Body: `{ rentalOrderId }`. Only rendered when `status === "CONFIRMED"` — payment cannot be initiated before a provider confirms |
| `/dashboard/payments`                                    | `paymentAction.ts → getMyPayments`                              | `GET /api/payments`             | Not paginated server-side (confirmed via Postman — no `meta` in response)                                                       |
| `/dashboard/reviews`                                     | `reviewAction.ts → getMyReviews`                                | `GET /api/reviews/my-reviews`   | Not paginated server-side (confirmed — no `meta`)                                                                               |
| Submit review (post-`RETURNED`)                          | `createReviewAction`                                            | `POST /api/reviews`             | Body: `{ rentalOrderId, gearItemId, rating, comment }`                                                                          |
| `/payment/success`, `/payment/cancel`, `/payment/failed` | —                                                               | —                               | SSLCommerz gateway redirect targets; read query params only, no direct API call                                                 |

## Provider — Inventory & Order Fulfillment

| Frontend                                    | Component / Action                                | Method & Endpoint                       | Notes                                                                                                            |
| ------------------------------------------- | ------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `/provider-dashboard/gear`                  | `gearAction.ts → getAllProviderGear`              | `GET /api/gear`                         | `providerId, page, limit` — filtered server-side, **not** client-filtered                                        |
| `/provider-dashboard/gear/new`, edit dialog | `GearForm`                                        | `POST /api/gear`, `PATCH /api/gear/:id` | Image field is a pasted URL, not a file upload                                                                   |
| Delete gear                                 | `DeleteGearButton`                                | `DELETE /api/gear/:id`                  | —                                                                                                                |
| `/provider-dashboard/orders`                | `providerAction.ts → getProviderOrder`            | `GET /api/provider/orders`              | `page, limit`                                                                                                    |
| Order details + actions                     | `ProviderOrderDetailsDialog`, `UpdateOrderButton` | `PATCH /api/provider/orders/:id`        | Body: `{ status }` — `PLACED→CONFIRMED/CANCELLED`, `CONFIRMED→CANCELLED`, `PAID→PICKED_UP`, `PICKED_UP→RETURNED` |

## Admin — Moderation

| Frontend                      | Component / Action                          | Method & Endpoint                       | Notes                                     |
| ----------------------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------------- |
| `/admin-dashboard/users`      | `userAction.ts → getAllUsers`               | `GET /api/admin/users`                  | `page, limit, searchTerm, role, status`   |
| Suspend/activate user         | `UserStatusToggle → updateUserStatusAction` | `PATCH /api/admin/users/:id`            | Body: `{ status: "ACTIVE" \| "BLOCKED" }` |
| `/admin-dashboard/gear`       | `gearAction.ts (admin) → getAllGear`        | `GET /api/admin/gear`                   | `page, limit`                             |
| `/admin-dashboard/orders`     | `rentalAction.ts (admin) → getAllRentals`   | `GET /api/admin/rentals`                | `page, limit`                             |
| `/admin-dashboard/categories` | `categoryAction.ts`                         | `GET/POST/PATCH/DELETE /api/categories` | Not paginated — small, bounded list       |

## Cross-cutting

| Concern          | How it's handled                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Auth             | JWT access/refresh tokens in httpOnly cookies; verified and rotated in `proxy.ts` (Next.js 16's replacement for `middleware.ts`)                                                                             |
| Route protection | Role-based redirect map in `proxy.ts` — unauthenticated → `/login`; wrong-role dashboard access → redirected to the correct one                                                                              |
| Client state     | Only the cart uses client state (Zustand + `persist` to localStorage). Every filter/sort/search/pagination control is URL-search-param driven and server-rendered — no client cache layer, no TanStack Query |
| Order date model | `CreateRentalOrder` accepts **one** `startDate`/`endDate` for the whole order — this shaped the entire cart design (shared date picker at checkout, not per gear item)                                       |
