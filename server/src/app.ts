import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";

import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import listingsRoutes from "./modules/listings/listings.routes";
import marketplaceRoutes from "./modules/marketplace/marketplace.routes";
import favoritesRoutes from "./modules/marketplace/favorites.routes";
import requestsRoutes from "./modules/requests/requests.routes";
import chatRoutes from "./modules/chat/chat.routes";
import exchangeRoutes from "./modules/exchange/exchange.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/listings", listingsRoutes); // includes /listings/ai/analyze
app.use("/listings", marketplaceRoutes); // GET /listings (search/filter) — see docs/api-contracts.md
app.use("/favorites", favoritesRoutes);
app.use("/requests", requestsRoutes);
app.use("/", chatRoutes); // /conversations, /messages
app.use("/exchange", exchangeRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

export default app;
