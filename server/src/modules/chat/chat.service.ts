import Conversation from "../../models/Conversation.model";
import Message from "../../models/Message.model";

export const getOrCreateConversation = async (userA: string, userB: string, listingId?: string) => {
  let conversation = await Conversation.findOne({
    participants: { $all: [userA, userB] },
    ...(listingId ? { listing: listingId } : {}),
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [userA, userB],
      listing: listingId,
    });
  }
  return conversation;
};

export const getConversationsForUser = (userId: string) =>
  Conversation.find({ participants: userId }).populate("participants", "name avatarUrl").populate("listing", "title images");

export const getMessages = (conversationId: string) =>
  Message.find({ conversation: conversationId }).sort({ createdAt: 1 });

export const createMessage = (conversationId: string, senderId: string, content: string) =>
  Message.create({ conversation: conversationId, sender: senderId, content });
