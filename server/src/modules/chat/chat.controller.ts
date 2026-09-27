import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as chatService from "./chat.service";

export const listConversations = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await chatService.getConversationsForUser(req.user!.id));
  } catch (err) {
    next(err);
  }
};

export const startConversation = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const conversation = await chatService.getOrCreateConversation(
      req.user!.id,
      req.body.otherUserId,
      req.body.listingId
    );
    res.status(201).json(conversation);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.json(await chatService.getMessages(req.params.conversationId));
  } catch (err) {
    next(err);
  }
};

// Also called from sockets/chat.socket.ts for real-time delivery
export const sendMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const message = await chatService.createMessage(req.body.conversationId, req.user!.id, req.body.content);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};
