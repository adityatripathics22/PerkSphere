# PerkSphere ? Startup Benefits Platform

A full-stack platform that gives startup founders and early-stage teams exclusive deals on SaaS products (cloud, marketing, analytics, productivity). Some deals are public; others are **locked** and require user verification to claim.

## Project structure

- **`backend/`** ? Node.js + Express + MongoDB (Mongoose). REST API, JWT auth.
- **`frontend/`** ? Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.

Backend and frontend are separate folders and run as separate processes.

## Prerequisites

- **Node.js** 18+
- **MongoDB** (local or Atlas)

## Quick start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # edit .env if needed (MONGODB_URI, JWT_SECRET)
npm run dev
```

Backend runs at **http://localhost:5000**.

Seed sample deals (optional):

```bash
npm run seed
```

### 2. Frontend

```bash
cd frontend
npm install
# Optional: create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

Frontend runs at **http://localhost:3000**.

### 3. End-to-end tests (Playwright)

**Prerequisites:** MongoDB running, backend running with **latest code** (`cd backend && npm run dev`), and deals seeded (`npm run seed` in backend). The backend CORS allows `http://127.0.0.1:3000` (used by Playwright)?restart the backend if you just updated the repo.

```bash
cd frontend
npm install
npx playwright install chromium   # one-time: install browser
npm run test:e2e
```

Playwright starts the frontend dev server automatically. The tests cover: landing page, register/login, deals listing and detail, claim flow, and dashboard. For UI mode: `npm run test:e2e:ui`.

---

## End-to-end application flow

1. **User** opens the app ? sees **Landing** (hero, value prop, CTA).
2. **Register / Log in** ? backend creates/validates user, returns **JWT**. Frontend stores token and shows **Dashboard** link.
3. **Browse deals** (`/deals`) ? frontend calls `GET /api/deals` (optional filters: category, access). Deals list with locked/unlocked indication.
4. **Deal detail** (`/deals/[id]`) ? `GET /api/deals/:id`. User sees full description, partner, eligibility. **Claim** button calls `POST /api/deals/:id/claim` with JWT.
5. **Claim flow** ? see below.
6. **Dashboard** (`/dashboard`) ? `GET /api/claims` with JWT. Shows profile and list of claimed deals with status (pending / approved / rejected).

---

## Authentication and authorization strategy

- **Registration**: `POST /api/auth/register` (name, email, password). Backend hashes password (bcrypt), creates user, returns JWT.
- **Login**: `POST /api/auth/login` (email, password). Backend validates, returns JWT.
- **JWT**: Signed with `JWT_SECRET`, contains `id` (user id). Expiry: 7 days.
- **Protected routes**: `POST /api/deals/:id/claim`, `GET /api/claims`, `GET /api/auth/me`. Request must include header: `Authorization: Bearer <token>`. Middleware verifies JWT and attaches `req.user`.
- **Locked deals**: Backend checks `deal.isLocked` and `user.isVerified`. If deal is locked and user is not verified ? **403** with message that verification is required. Unverified users cannot claim locked deals.

---

## Internal flow of claiming a deal

1. User clicks **Claim** on deal detail page.
2. Frontend sends `POST /api/deals/:id/claim` with `Authorization: Bearer <JWT>`.
3. Backend:
   - Verifies JWT ? gets user.
   - Loads deal by id; if not found ? 404.
   - If `deal.isLocked && !user.isVerified` ? **403** (verification required).
   - If user already has a claim for this deal ? **400** (already claimed).
   - Creates **Claim** document (user, deal, status: `pending`).
   - Returns created claim (with populated deal).
4. Frontend shows success (e.g. ?Claimed! Check your dashboard.?). User can go to Dashboard to see claimed deals and status.

---

## Interaction between frontend and backend

- **API base URL**: Frontend uses `NEXT_PUBLIC_API_URL` (default `http://localhost:5000/api`).
- **Auth**: Frontend stores JWT in `localStorage` and sends it in `Authorization: Bearer <token>` for protected calls.
- **CORS**: Backend allows origin `FRONTEND_URL` or `http://localhost:3000`.
- **Data**: All deal and claim data comes from backend (MongoDB). Frontend does not implement its own persistence for deals/claims.

---

## Known limitations / weak points

- **Verification**: `user.isVerified` exists but there is no in-app flow to verify users (e.g. admin panel or integration). For demo, users can be set to verified manually in DB.
- **JWT in localStorage**: Vulnerable to XSS. For production, consider httpOnly cookies.
- **No rate limiting** on auth or claim endpoints.
- **No email verification** on signup.
- **Deal validity**: `validUntil` exists on Deal but is not enforced when claiming.

---

## Improvements required for production readiness

- Move JWT to **httpOnly cookies** and use CSRF protection.
- Add **rate limiting** (e.g. express-rate-limit) on `/auth` and `/deals/:id/claim`.
- Implement **user verification** flow (e.g. admin approval, or automated checks).
- **Input validation** with a schema library (e.g. Joi/Zod) and sanitization.
- **Logging** and **error tracking** (e.g. Pino, Sentry).
- **Env validation** at startup (required env vars).
- **HTTPS** and secure headers (helmet).
- **Tests**: unit and integration for auth, deals, and claims.

---

## UI and performance considerations

- **Animations**: Landing uses Framer Motion (hero, sections, cards). Deals listing uses stagger and layout transitions. Loading states use skeletons.
- **Responsiveness**: Layouts are responsive (Tailwind breakpoints). Header, forms, and deal cards work on mobile.
- **Loading**: Skeleton placeholders on deals list and dashboard; disabled buttons and ?Claiming...? during claim.
- **Accessibility**: Semantic HTML, labels on form inputs. Further: focus states, ARIA where needed, keyboard navigation.
- **Performance**: Next.js App Router for routing and code splitting. Consider image optimization if partner logos are added.

---

## API summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register (name, email, password) |
| POST | `/api/auth/login` | No | Login (email, password) |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/deals` | No | List deals (query: category, access) |
| GET | `/api/deals/:id` | No | Single deal |
| POST | `/api/deals/:id/claim` | Yes | Claim deal |
| GET | `/api/claims` | Yes | Current user?s claims |

---

## License

MIT (or as specified for the assignment).
