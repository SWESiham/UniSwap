# UniSwap — API Contracts

Fill this in per endpoint BEFORE frontend integration. Keep it up to date —
this file is the single source of truth for request/response shapes.

## Auth (DEV 1)

### POST /auth/register
Request: { name, email, password, faculty, department }
Response 201: { id, name, email, token }
Response 400: { error }

### POST /auth/login
Request: { email, password }
Response 200: { id, name, email, token, role }
Response 401: { error }

## Listings (DEV 2)

### POST /listings
Request: { title, description, price, category, condition, images[], type: "sell" | "exchange" }
Response 201: { id, title, ...fields, createdAt }

### POST /ai/analyze
Request: multipart/form-data { image }
Response 200: { name, category, brand, condition, description }
Response 502: { error: "AI_UNAVAILABLE" }  // fallback: user fills manually

## Marketplace (DEV 3)

### GET /listings?search=&category=&price=&condition=&faculty=&department=&page=
Response 200: { items: [...], total, page, pages }

## Requests / Chat / Exchange (DEV 4)

### POST /requests
Request: { title, description, budget, category }
Response 201: { id, ...fields }

### GET /messages/:conversationId
Response 200: { messages: [...] }

## Admin (DEV 5)

### GET /admin/stats
Response 200: { totalUsers, totalListings, pendingReports, ... }

---
_Add new endpoints above as you build them. PRs that add a route without updating
this file will be asked to update it before merge._
