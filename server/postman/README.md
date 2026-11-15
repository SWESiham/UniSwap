# UniSwap Auth in Postman

Import `UniSwap-Auth.postman_collection.json` into Postman.

## Validation without Atlas

From the `server` folder, run:

```powershell
node --import tsx scripts/preview-auth.cjs
```

Use `baseUrl = http://127.0.0.1:5051` and run the **Validation** folder only.
This preview loads the real auth router, but does not connect to MongoDB.
It is only for requests rejected before a database operation.

## Real registration and login

After fixing Atlas and starting the actual server, set `baseUrl` to its address
(normally `http://localhost:5000`). Run the live registration request, copy its
returned email into the login request body, then send the login request.
Registration creates a test account in the connected database.

Successful login returns `token` and `user`. Password hashes must never appear
in either response. Live database requests have not been verified against Atlas.
