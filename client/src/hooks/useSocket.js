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