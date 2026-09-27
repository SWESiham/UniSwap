import { Router, Request, Response } from "express";
import { upload } from "../../../middleware/upload.middleware";
import { analyzeProductImage } from "./ai.service";

const router = Router();

router.post("/analyze", upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Image is required" });

  try {
    const data = await analyzeProductImage(req.file.buffer, req.file.mimetype);
    res.json(data);
  } catch (err) {
    console.error("AI analysis failed:", err);
    // Fallback contract: frontend shows the manual form instead of blocking the user
    res.status(502).json({ error: "AI_UNAVAILABLE" });
  }
});

export default router;
