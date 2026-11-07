import { Router } from "express";
import { addSeller, getMe } from "../controllers/user.controller";

const router = Router();

router.post("/register-seller", addSeller);
router.get('/me', getMe);
export default router;