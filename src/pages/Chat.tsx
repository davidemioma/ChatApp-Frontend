import React, { useState } from "react";
import Conversation from "../components/Conversation";
import Nav from "../components/Nav";
import Message from "../components/Message";
import { BiHappyAlt } from "react-icons/bi";

const Chat = () => {
  const [text, setText] = useState("");

  return (
    <>
      <Nav />

      <div className="w-screen flex">
        <div className="w-20 md:w-60 lg:w-78 h-[calc(100vh-40px)] flex flex-col space-y-2 p-5 border border-l overflow-y-scroll overflow-x-hidden">
          {[1, 2].map((conversation, i) => (
            <Conversation key={i} />
          ))}
        </div>

        <div className="relative w-full h-[calc(100vh-40px)]">
          <div className="h-[calc(100vh-96px)] space-y-4 py-7 px-5 sm:px-7 overflow-y-scroll">
            <Message myMessage />

            <Message />

            <Message myMessage />

            <Message />

            <Message myMessage />

            <Message />

            <Message myMessage />

            <Message />
          </div>

          <div className="absolute bottom-0 w-full h-14 ">
            <form className="flex items-center space-x-2 px-4">
              <div className="flex flex-1 items-center space-x-2 rounded-full bg-gray-100 px-4 py-1.5">
                <input
                  className="flex-1 bg-transparent outline-none"
                  value={text}
                  type="text"
                  placeholder="Aa"
                  onChange={(e) => setText(e.target.value)}
                />

                <BiHappyAlt className="text-[#1775ee]" size={20} />
              </div>

              <button
                className="font-semibold text-[#1775ee] disabled:cursor-not-allowed"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
