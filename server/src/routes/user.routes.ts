import { Router } from "express";
import { addSeller, login } from "../controllers/user.controller";

const router = Router();

// مسار التسجيل كبائع
router.post("/register-seller", addSeller);

// مسار تسجيل الدخول
router.post("/login", login);

export default router;