import { Router } from "express";
import rateLimit from "express-rate-limit";
import { dashboard, myItems, publicProfile, requestsUnavailable } from "../controllers/dashboard.controller";
import { getMe, updateMe } from "../controllers/user.controller";
import { register } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();
// كل مستخدم يقدر يبيع؛ نفس التسجيل الآمن على المسار القديم للتوافق.
router.post("/register-seller", rateLimit({ windowMs: 900000, limit: 30 }), register);
router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, updateMe);
router.get("/me/dashboard", authenticate, dashboard);
router.get("/me/listings", authenticate, myItems);
router.get("/me/sold", authenticate, myItems);
router.get("/me/favorites", authenticate, myItems);
router.get("/me/requests", authenticate, requestsUnavailable);
router.get("/:id", publicProfile);
export default router;
