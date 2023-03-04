import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RequireAuth = () => {
  const auth = useAuth();

  return auth?.user ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
