import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BtnSpinner from "../components/BtnSpinner";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const loginhandler = async () => {
    setError(false);

    setLoading(true);

    try {
    } catch (err) {
      setLoading(false);

      setError(true);
    }
  };
  return (
    <div className="bg-[#f0f2f5] w-screen h-screen overflow-hidden flex items-center justify-center">
      <main className="flex flex-col lg:flex-row lg:items-center gap-10 px-5 lg:px-0">
        <div className="w-full space-y-2 text-center lg:text-left">
          <h1 className="text-[#1775ee] text-3xl lg:text-4xl font-bold">
            Messenger
          </h1>

          <p className="lg:text-lg tracking-wide">
            Connect with friends and the world around you on Messenger
          </p>
        </div>

        <div className="w-full bg-white flex flex-col space-y-5 p-5 rounded-lg overflow-hidden">
          <input
            className="py-2 px-4 border border-[gray] outline-none rounded text-sm sm:text-base"
            value={username}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="py-2 px-4 border border-[gray] outline-none rounded text-sm sm:text-base"
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-[#1775ee] flex items-center justify-center p-2 text-white rounded text-sm font-bold sm:text-base"
            onClick={loginhandler}
          >
            {loading ? <BtnSpinner /> : <p>Sign In</p>}
          </button>

          {error && (
            <p className="text-sm text-red-500 sm:text-base">
              Something went wrong
            </p>
          )}

          <Link to="/register">
            <div className="w-[70%] bg-[#42b72a] flex items-center justify-center mx-auto p-2 text-white rounded text-sm font-bold sm:text-base whitespace-nowrap">
              Create a New Account
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
