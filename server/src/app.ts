import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

import { routerMarketplaces } from "./routes/marketplace.routes.js";
// import {routerFavorite} from "./routes/favorite.routes.js";

const app = express();

app.use(cors({ }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/listings", routerMarketplaces);
// app.use("/favorites", routerFavorite);

app.use(errorHandler);

export default app;
