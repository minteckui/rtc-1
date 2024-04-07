import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const socket = useContext(SocketContext)
  return socket
}

const socket = io('http://localhost:8000'); // Replace with your server URL

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

