import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = (token: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.VITE_API_BASE_URL as string, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return {
    socket,
  };
};
