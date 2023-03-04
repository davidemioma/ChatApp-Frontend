import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useRefreshToken from "../hooks/useRefreshToken";
import Spinner from "./Spinner";

const PersistsLogin = () => {
  const auth = useAuth();

  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    let subscribe = true;

    const refreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.user ? refreshToken() : setIsLoading(false);

    return () => {
      subscribe = false;
    };
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <Navigate to="/login" replace={true} />;
  } else {
    content = <Outlet />;
  }

  return <>{content}</>;
};

export default PersistsLogin;
