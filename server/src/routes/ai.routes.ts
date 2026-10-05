import { Router } from "express";
import { upload } from "../middlewares/uploads.middleware";
import { analyze } from "../controllers/ai.controller";

const router = Router();
router.post("/analyze", upload.array('images', 6), analyze);


export default router;