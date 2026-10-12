import express from "express";
import cors from "cors";
import path from "path";
import aiRoutes from "./routes/ai.routes";
import categoryRoute from './routes/category.routes'
import { errorHandler } from "./middlewares/error.middleware.js";
import { routerMarketplaces } from "./routes/marketplace.routes.js";
// import {routerFavorite} from "./routes/favorite.routes.js";
// import listingRoutes from "./routes/listing.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static(path.join(__dirname, "./../uploads/")));
app.use("/api/ai", aiRoutes);
app.use('/api/categories', categoryRoute);
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/listings", routerMarketplaces);
// app.use('/api/listings', listingRoutes);
// app.use("/favorites", routerFavorite);

app.use(errorHandler);

export default app;
