import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return  useContext(SocketContext)
}

const socket = io('http://172.16.68.224:8000'); // Replace with your server URL

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

