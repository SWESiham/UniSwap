# UniSwap — Architecture & Ownership Map

Feature-based structure: each folder under `modules/` (backend) and `pages/` (frontend)
is owned by one developer, matching the team task distribution. This keeps merge
conflicts low since devs rarely touch the same files.

## Ownership Map

| Dev   | Backend                                                        | Frontend                            |
|-------|-----------------------------------------------------------------|--------------------------------------|
| DEV 1 | modules/auth, modules/users                                     | pages/auth, pages/profile           |
| DEV 2 | modules/listings (+ listings/ai)                                | pages/listings                      |
| DEV 3 | modules/marketplace                                              | pages/marketplace                   |
| DEV 4 | modules/requests, modules/chat, modules/exchange, sockets/       | pages/requests, pages/chat          |
| DEV 5 | modules/admin                                                    | pages/admin                          |
| All   | models/, middleware/, utils/ (coordinate before editing)         | components/, layouts/, context/, locales/ |

## Rules
1. Don't edit another dev's `modules/` or `pages/` folder without a heads-up.
2. Any change to a shared model (`models/`) must be flagged in the team chat first.
3. Update `docs/api-contracts.md` BEFORE building the frontend call for a new endpoint.
4. Keep responses consistent — use `utils/response.util.ts` helpers everywhere.
