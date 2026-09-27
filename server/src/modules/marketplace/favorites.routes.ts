import { Router } from "express";
import { requireAuth, AuthRequest } from "../../middleware/auth.middleware";
import * as favoritesService from "./favorites.service";

const router = Router();

router.get("/", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    res.json(await favoritesService.getFavorites(req.user!.id));
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    res.status(201).json(await favoritesService.addFavorite(req.user!.id, req.body.listingId));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    await favoritesService.removeFavorite(req.user!.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
