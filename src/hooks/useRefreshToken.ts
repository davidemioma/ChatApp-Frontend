import { useAuth } from "../context/AuthProvider";
import axios from "../util/axios";

const useRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    const res = await axios.get("/auth/refresh", { withCredentials: true });

    auth?.setUser(res.data);

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
