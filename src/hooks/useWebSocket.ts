import { useState, useEffect, useRef } from 'react';

export interface MessageEvent {
  data: string;
}

export function useWebSocket(url: string = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000') {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WS Connected');
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (err) {
        console.error('Failed to parse WS message:', err);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('WS Disconnected');
    };

    return () => {
      socket.close();
    };
  }, [url]);

  const send = (message: Record<string, any>) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { isConnected, data, send };
}
