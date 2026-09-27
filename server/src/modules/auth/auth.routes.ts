import { Router } from "express";
import { register, login } from "./auth.controller";
import { registerValidation, loginValidation } from "./auth.validation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
// TODO: POST /forgot-password

export default router;
