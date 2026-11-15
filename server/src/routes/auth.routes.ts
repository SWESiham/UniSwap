import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middlewares/auth.middleware";
import * as password from "../controllers/password.controller";
import { register, login } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 30,
    standardHeaders: true, legacyHeaders: false }));
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/admin/login", login);
authRouter.post("/forgot-password", password.forgot);
authRouter.post("/reset-password", password.reset);
authRouter.patch("/change-password", requireAuth, password.change);
authRouter.post("/logout", requireAuth, password.logout);

export default authRouter;
