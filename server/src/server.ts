import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";
import { registerChatSocket } from "./sockets/chat.socket";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });
  registerChatSocket(io);

  server.listen(PORT, () => console.log(`UniSwap server running on port ${PORT}`));
};

start();
