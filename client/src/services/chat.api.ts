import api from "./api";

export const getConversations = () => api.get("/conversations");
export const startConversation = (otherUserId: string, listingId?: string) =>
  api.post("/conversations", { otherUserId, listingId });
export const getMessages = (conversationId: string) => api.get(`/messages/${conversationId}`);
