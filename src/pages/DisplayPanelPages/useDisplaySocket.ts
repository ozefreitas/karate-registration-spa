import { useEffect, useRef } from "react";

export const useDisplaySocket = (onMessage?: (data: any) => void) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (
      socketRef.current?.readyState === WebSocket.OPEN ||
      socketRef.current?.readyState === WebSocket.CONNECTING
    )
      return;

    let baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";
    baseURL = baseURL.replace(/^https?:\/\//, "");
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    socketRef.current = new WebSocket(`${protocol}://${baseURL}/ws/match/123/`);

    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({ type: "DISPLAY_READY" }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage?.(data);
    };

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  return socketRef;
};
