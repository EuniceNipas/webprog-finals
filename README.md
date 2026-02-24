# webprog-finals

Personal profile website using:
- Frontend: Vue 3 + Vite + Tailwind CSS
- Backend: Nest.js (serverless-ready for Vercel)
- Database: Supabase (PostgreSQL)

## Project structure

```
webprog-finals/
├── frontend/
└── backend/
```

## 1) Prerequisites

- Node.js 20+
- npm 10+
- Supabase project

## 2) Environment variables

### Backend

In `backend/`, create `.env` from `.env.example`:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### Frontend

In `frontend/`, create `.env` from `.env.example`:

```
VITE_API_URL=http://localhost:3000/api
```

## 3) Supabase tables (minimum)

Create these tables in Supabase SQL editor:

```sql
create table if not exists profiles (
	id bigint generated always as identity primary key,
	name text not null,
	headline text,
	bio text,
	avatar_url text,
	github_url text,
	linkedin_url text,
	email text
);

create table if not exists skills (
	id bigint generated always as identity primary key,
	name text not null,
	category text,
	"order" int default 0
);

create table if not exists projects (
	id bigint generated always as identity primary key,
	title text not null,
	description text,
	image_url text,
	repo_url text,
	live_url text,
	tech_stack text,
	created_at timestamptz default now()
);

create table if not exists contacts (
	id bigint generated always as identity primary key,
	name text not null,
	email text not null,
	message text not null,
	created_at timestamptz default now()
);

create table if not exists guestbook (
	id bigint generated always as identity primary key,
	name text not null,
	message text not null,
	created_at timestamptz default now()
);
```

## 4) Run locally

Open two terminals:

### Terminal A (backend)

```bash
cd backend
npm install
npm run start:dev
```

Backend runs on `http://localhost:3000`.

### Terminal B (frontend)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 5) API endpoints

- `GET /api/profile`
- `GET /api/skills`
- `GET /api/projects`
- `POST /api/contact`
- `GET /api/guestbook`
- `POST /api/guestbook`

## 6) Deploy backend to Vercel

`backend/vercel.json` is configured for Nest.js serverless routing:

```json
{
	"version": 2,
	"builds": [{ "src": "api/index.ts", "use": "@vercel/node" }],
	"routes": [{ "src": "/api/(.*)", "dest": "api/index.ts" }]
}
```

Important:
- Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel Project Settings → Environment Variables.
- Keep CORS enabled in `backend/src/main.ts` and `backend/api/index.ts`.

## 7) Deploy frontend to Vercel

- Set project root to `frontend`.
- Add environment variable:

```
VITE_API_URL=https://<your-backend-project>.vercel.app/api
```

Then redeploy.