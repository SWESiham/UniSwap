import { Router } from "express";
import { searchListings } from "./marketplace.service";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await searchListings(req.query as any);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
