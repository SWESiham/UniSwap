import { Router } from "express";
import { addSeller, getMe } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register-seller", addSeller);
router.get('/me', authenticate, getMe);
export default router;