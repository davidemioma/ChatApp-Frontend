import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface SocketProps {
  socket: any;
  setSocket: any;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const SocketContext = createContext<SocketProps | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: ChildrenProps) => {
  const [socket, setSocket] = useState<any | null>(null);

  useEffect(() => {
    const newSocket = io("ws://localhost:8900");

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
