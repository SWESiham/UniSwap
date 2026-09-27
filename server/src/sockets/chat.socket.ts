import { Server, Socket } from "socket.io";
import { createMessage } from "../modules/chat/chat.service";

// Called once from server.ts with the http server's Socket.IO instance.
export const registerChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("joinConversation", (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on("sendMessage", async ({ conversationId, senderId, content }) => {
      const message = await createMessage(conversationId, senderId, content);
      io.to(conversationId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      // no-op for now
    });
  });
};
