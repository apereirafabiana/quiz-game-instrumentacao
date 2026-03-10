import { useRef } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../lib/api";

let sharedSocket;

function getSharedSocket() {
  if (!sharedSocket) {
    sharedSocket = io(API_BASE_URL, {
      autoConnect: true,
      transports: ["websocket", "polling"]
    });
  }

  return sharedSocket;
}

export default function useSocket() {
  const socketRef = useRef(getSharedSocket());
  return socketRef.current;
}
