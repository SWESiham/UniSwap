import express from "express";
import cors from "cors";
import path from "path";
import aiRoutes from "./routes/ai.routes";
import categoryRoute from './routes/category.routes'
// import listingRoutes from "./routes/listing.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./../uploads/")));
app.use("/api/ai", aiRoutes);
app.use('/api/categories', categoryRoute);
// app.use('/api/listings', listingRoutes);
export default app;