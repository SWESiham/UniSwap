# 🎓 UniSwap

University students' marketplace — buy, sell, exchange items, and request what you need, with an AI-powered listing generator.

## Structure
- `client/` — React + TypeScript frontend
- `server/` — Node.js + Express backend
- `docs/` — architecture & API contracts (read before integrating!)

## Quick Start

```bash
# Backend
cd server && cp .env.example .env && npm install && npm run dev

# Frontend
cd client && cp .env.example .env && npm install && npm run dev
```

## Team Workflow
- No direct push to `main`
- One feature branch per dev (`feature/auth-profile`, `feature/listings-ai`, `feature/marketplace`, `feature/communication`, `feature/admin`)
- PR → Review → Merge
- Update `docs/api-contracts.md` before building any frontend API call

## Docs
- [Architecture & Ownership Map](docs/architecture.md)
- [API Contracts](docs/api-contracts.md)

# UniSwap — Server

Node.js + Express + TypeScript + MongoDB backend.

## Setup
```bash
cp .env.example .env
npm install
npm run dev
```

## Structure
- `modules/` — one folder per feature (owned by one dev each)
- `models/` — Mongoose schemas (shared, coordinate before editing)
- `middleware/` — auth, roles, upload, error handling
- `sockets/` — Socket.IO handlers

## Env
| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Token signing secret |
| `CLOUDINARY_*` | Image upload |
| `GEMINI_API_KEY` | AI listing analysis |
| `CLIENT_URL` | CORS origin |

# UniSwap — Client

React + TypeScript frontend (Vite).

## Setup
```bash
cp .env.example .env
npm install
npm run dev
```

## Structure
- `pages/` — one folder per feature (owned by one dev each)
- `components/` — shared UI only
- `services/` — API calls (axios)
- `context/` — Auth, Theme, Language (AR/EN)
- `locales/` — i18n translation files

## Env
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL |
| `VITE_SOCKET_URL` | Socket.IO server URL |
