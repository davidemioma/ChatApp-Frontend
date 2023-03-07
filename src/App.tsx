import React from "react";
import { Routes, Route } from "react-router-dom";
import PersistsLogin from "./components/PersistsLogin";
import RequireAuth from "./components/RequireAuth";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
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
