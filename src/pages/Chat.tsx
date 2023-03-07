import React from "react";
import Conversation from "../components/Conversation";

const Chat = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Conversation />

      <div>Messages</div>
    </div>
  );
};

export default Chat;
