import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "../util/axios";

const Nav = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get("/auth/signout", {
        withCredentials: true,
      });

      auth?.setUser(null);

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#1775ee] w-screen h-10 flex items-center">
      <div className="w-full px-5 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">Messenger</h1>
        </Link>

        <div className="flex items-center space-x-3 text-white text-sm">
          <div className="flex items-center space-x-1">
            <img
              className="w-7 h-7 rounded-full object-cover"
              src={
                auth?.user?.profileUrl
                  ? `/uploads/${auth?.user?.profileUrl}`
                  : "/no-image.jpeg"
              }
              alt=""
            />

            <p className="hidden sm:inline capitalize font-bold">
              {auth?.user?.username || "mmmmm"}
            </p>
          </div>

          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
