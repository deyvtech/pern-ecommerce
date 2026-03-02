# PERN Ecommerce

A full-stack ecommerce project built with a PostgreSQL + Express + React + Node stack.

This repository contains:
- `be-app`: Express + TypeScript backend (auth, JWT, role-protected routes)
- `fe-app`: React + TypeScript + Vite frontend (admin dashboard UI)

## Project Structure

```text
pern-ecommerce/
|- be-app/    # Backend API (Express + TS + PostgreSQL)
|- fe-app/    # Frontend app (React + TS + Vite)
|- TODO.md    # Feature progress checklist
```

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL database (Supabase or local)

## Setup

1. Install backend dependencies:

```bash
cd be-app
npm install
```

2. Create `be-app/.env`:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
JWT_ACCESS_SECRET=replace_me
JWT_REFRESH_SECRET=replace_me
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

3. Install frontend dependencies:

```bash
cd ../fe-app
npm install
```

## Run in Development

Open two terminals from the repo root.

Terminal 1 (backend):

```bash
cd be-app
npm run dev
```

Terminal 2 (frontend):

```bash
cd fe-app
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Backend Scripts (`be-app`)

- `npm run dev` - start backend with file watch (`tsx`)
- `npm run build` - compile TypeScript to `dist/`
- `npm run start` - run compiled backend
- `npm run clean` - remove `dist/`

## Frontend Scripts (`fe-app`)

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build production bundle
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Current API Routes

Auth routes:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

Protected routes (require JWT):
- `GET /api/v1/me`
- `GET /api/v1/admin` (admin role required)

## Notes

- Backend currently uses CORS for `http://localhost:5173`.
- Feature progress is tracked in `TODO.md`.
- Frontend authentication flows are still in progress.

## Existing App READMEs

- Backend notes: `be-app/Readme.md`
- Frontend notes: `fe-app/README.md`
