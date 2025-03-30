import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.SERVER_URL, { autoConnect: false });

    newSocket.connect();

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('user-joined', newSocket.id);
      setSocketId(newSocket.id);
    });

    newSocket.on('connect_error', (err) => {
      console.log('Connection error:', err);
    });

    setSocket(newSocket);

    // event registration cleanup
    // to prevent event duplicate registrations
    // clean-up function runs when component unmounts or before the effect re-runs
    return () => {
      newSocket.off('connect_error');
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket, socketId }}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
