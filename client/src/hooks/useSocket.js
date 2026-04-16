import { useRef } from "react";
import { io } from "socket.io-client";

let sharedSocket;

function getSocketBaseUrl() {
  if (import.meta.env.DEV && import.meta.env.VITE_SERVER_URL) {
    return import.meta.env.VITE_SERVER_URL;
  }

  return undefined;
}

function getSharedSocket() {
  if (!sharedSocket) {
    sharedSocket = io(getSocketBaseUrl(), {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 700,
      reconnectionDelayMax: 2500,
      timeout: 5000,
      path: "/socket.io",
      transports: ["websocket", "polling"]
    });
  }

  return sharedSocket;
}

export default function useSocket() {
  const socketRef = useRef(getSharedSocket());
  return socketRef.current;
}
