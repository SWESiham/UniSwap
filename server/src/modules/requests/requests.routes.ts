import { Router } from "express";
import { requireAuth, AuthRequest } from "../../middleware/auth.middleware";
import * as requestsService from "./requests.service";
import { findMatchingListings } from "./matching.service";

const router = Router();

router.post("/", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    res.status(201).json(await requestsService.createRequest(req.user!.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    res.json(await requestsService.listRequests());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const request = await requestsService.getRequestById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json({ request, matches: await findMatchingListings(request as any) });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    res.json(await requestsService.updateRequest(req.params.id, req.user!.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    await requestsService.deleteRequest(req.params.id, req.user!.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
