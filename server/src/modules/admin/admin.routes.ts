import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import * as admin from "./admin.controller";

const router = Router();
router.use(requireAuth, requireRole("admin"));

router.get("/stats", admin.getStats);

router.get("/users", admin.listUsers);
router.patch("/users/:id/block", admin.blockUser);
router.patch("/users/:id/unblock", admin.unblockUser);

router.get("/listings", admin.listPendingListings);
router.patch("/listings/:id/approve", admin.approveListing);
router.patch("/listings/:id/reject", admin.rejectListing);

router.get("/reports", admin.listReports);
router.patch("/reports/:id", admin.resolveReport);

router.post("/categories", admin.createCategory);
router.patch("/categories/:id", admin.updateCategory);
router.delete("/categories/:id", admin.deleteCategory);

export default router;
