import { useEffect } from "react";

export const useWebSocket = (url, onMessage) => {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
};
