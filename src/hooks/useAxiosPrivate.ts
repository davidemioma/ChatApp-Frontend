import { useEffect } from "react";
import { axiosPrivate } from "../util/axios";
import { useAuth } from "../context/AuthProvider";
import useRefreshAccessToken from "../hooks/useRefreshToken";

const useAxiosPrivate = () => {
  const auth = useAuth();

  const refresh = useRefreshAccessToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.user?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
