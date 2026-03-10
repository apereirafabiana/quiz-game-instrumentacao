import os from "node:os";
import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./socket.js";

const app = express();
const httpServer = createServer(app);

const PORT = Number(process.env.PORT ?? 3001);
const CLIENT_PORT = Number(process.env.CLIENT_PORT ?? 5173);

function getLocalIPv4Addresses() {
  const networkInterfaces = os.networkInterfaces();

  return Object.values(networkInterfaces)
    .flat()
    .filter(Boolean)
    .filter((item) => item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "ok"
  });
});

app.get("/api/meta", (_request, response) => {
  const localAddresses = getLocalIPv4Addresses();
  const suggestedJoinBaseUrl =
    process.env.CLIENT_PUBLIC_URL ??
    (localAddresses[0] ? `http://${localAddresses[0]}:${CLIENT_PORT}` : null);

  response.json({
    clientPort: CLIENT_PORT,
    localAddresses,
    suggestedJoinBaseUrl
  });
});

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true
  }
});

registerSocketHandlers(io);

httpServer.listen(PORT, "0.0.0.0", () => {
  const addresses = getLocalIPv4Addresses();
  console.log(`Quiz server running on http://localhost:${PORT}`);

  if (addresses.length > 0) {
    console.log(`Network access: http://${addresses[0]}:${PORT}`);
    console.log(`Suggested teacher URL: http://${addresses[0]}:${CLIENT_PORT}`);
  }
});
