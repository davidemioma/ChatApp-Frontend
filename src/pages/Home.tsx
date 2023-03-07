import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {
  const navigate = useNavigate();

  const createConversation = () => {
    navigate("/chat", { replace: true });
  };

  return (
    <>
      <Nav />

      <div className="w-screen flex">
        <div className="w-full h-[calc(100vh-40px)] flex flex-col space-y-4 p-5 overflow-y-scroll overflow-x-hidden">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((user, i) => (
            <div
              key={i}
              className="flex items-center space-x-6 justify-between"
            >
              <div className="flex items-center space-x-2">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src="/no-image.jpeg"
                  alt=""
                />

                <p className="text-sm font-bold">John Doe</p>
              </div>

              <button
                className="bg-[#1775ee] flex items-center justify-center px-2 py-1 text-white rounded text-sm font-bold"
                onClick={createConversation}
              >
                Message
              </button>
            </div>
          ))}
        </div>

        <div className="hidden md:inline bg-black w-full h-[calc(100vh-40px)]"></div>
      </div>
    </>
  );
};

export default Home;
