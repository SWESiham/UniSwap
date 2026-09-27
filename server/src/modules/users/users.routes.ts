import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { me, editMe, getUser } from "./users.controller";

const router = Router();

router.get("/me", requireAuth, me);
router.patch("/me", requireAuth, editMe);
router.get("/:id", getUser);

export default router;
