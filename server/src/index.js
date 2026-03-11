import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

const PORT = Number(process.env.PORT ?? 3001);
const CLIENT_PORT = Number(process.env.CLIENT_PORT ?? 5173);
const NODE_ENV = process.env.NODE_ENV ?? "development";
const IS_PRODUCTION = NODE_ENV === "production";
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "";
const clientBuildPath = path.resolve(__dirname, "../public");
const clientIndexPath = path.join(clientBuildPath, "index.html");
const hasClientBuild = fs.existsSync(clientIndexPath);

function getLocalIPv4Addresses() {
  const networkInterfaces = os.networkInterfaces();

  return Object.values(networkInterfaces)
    .flat()
    .filter(Boolean)
    .filter((item) => item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}

function getRequestBaseUrl(request) {
  if (PUBLIC_BASE_URL) {
    return PUBLIC_BASE_URL;
  }

  const forwardedProto = request.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = request.get("x-forwarded-host")?.split(",")[0]?.trim();
  const protocol = forwardedProto || request.protocol;
  const host = forwardedHost || request.get("host");

  return host ? `${protocol}://${host}` : "";
}

app.set("trust proxy", 1);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    mode: NODE_ENV
  });
});

app.get("/api/meta", (request, response) => {
  const requestBaseUrl = getRequestBaseUrl(request);
  const localAddresses = IS_PRODUCTION ? [] : getLocalIPv4Addresses();
  const suggestedJoinBaseUrl = IS_PRODUCTION
    ? requestBaseUrl
    : PUBLIC_BASE_URL ||
      (localAddresses[0] ? `http://${localAddresses[0]}:${CLIENT_PORT}` : requestBaseUrl);

  response.json({
    clientPort: IS_PRODUCTION ? PORT : CLIENT_PORT,
    localAddresses,
    suggestedJoinBaseUrl,
    mode: NODE_ENV
  });
});

if (IS_PRODUCTION && hasClientBuild) {
  app.use(express.static(clientBuildPath));
  app.get(/^\/(?!api|socket\.io).*/, (_request, response) => {
    response.sendFile(clientIndexPath);
  });
}

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true
  }
});

registerSocketHandlers(io);

httpServer.listen(PORT, "0.0.0.0", () => {
  const addresses = getLocalIPv4Addresses();
  console.log(`Quiz server running in ${NODE_ENV} mode on port ${PORT}`);

  if (IS_PRODUCTION) {
    console.log(hasClientBuild ? "Serving frontend build from server/public" : "Frontend build not found in server/public");
    return;
  }

  if (addresses.length > 0) {
    console.log(`Network access: http://${addresses[0]}:${PORT}`);
    console.log(`Suggested teacher URL: http://${addresses[0]}:${CLIENT_PORT}`);
  }
});