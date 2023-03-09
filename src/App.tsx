import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PersistsLogin from "./components/PersistsLogin";
import RequireAuth from "./components/RequireAuth";
import { useAuth } from "./context/AuthProvider";
import { useSocket } from "./context/SocketProvider";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

//socket.emit to send to the server.
//socket.on to recieve from the server.

const App = () => {
  const auth = useAuth();

  const mySocket = useSocket();

  useEffect(() => {
    mySocket?.socket?.emit("addUserId", auth?.user?._id);

    mySocket?.socket?.on("getUsers", (users: any) => {
      // console.log(users);
    });
  }, [auth?.user]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route element={<PersistsLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />

          <Route path="/chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
