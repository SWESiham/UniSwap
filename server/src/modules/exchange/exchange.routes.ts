import { Router } from "express";
import { requireAuth, AuthRequest } from "../../middleware/auth.middleware";
import * as exchangeService from "./exchange.service";

const router = Router();

router.post("/", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    res.status(201).json(
      await exchangeService.createProposal(req.user!.id, req.body.listingId, req.body.offeredItem)
    );
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await exchangeService.getProposalsForListing(req.query.listingId as string));
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    res.json(await exchangeService.respondToProposal(req.params.id, req.body.status));
  } catch (err) {
    next(err);
  }
});

export default router;
