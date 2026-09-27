import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import * as chatController from "./chat.controller";

const router = Router();

router.get("/conversations", requireAuth, chatController.listConversations);
router.post("/conversations", requireAuth, chatController.startConversation);
router.get("/messages/:conversationId", requireAuth, chatController.getMessages);
router.post("/messages", requireAuth, chatController.sendMessage);

export default router;
