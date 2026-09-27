import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import * as listingsController from "./listings.controller";
import aiRouter from "./ai/ai.controller";

const router = Router();

router.post("/", requireAuth, listingsController.create);
router.get("/:id", listingsController.getOne);
router.patch("/:id", requireAuth, listingsController.update);
router.delete("/:id", requireAuth, listingsController.remove);
router.patch("/:id/sold", requireAuth, listingsController.sold);

router.use("/ai", aiRouter); // mounted separately as /ai/analyze in app.ts if preferred

export default router;
