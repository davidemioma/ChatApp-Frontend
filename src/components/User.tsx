import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { UserProps } from "../types";
import { useAuth } from "../context/AuthProvider";

interface Props {
  user: UserProps;
}

const User = ({ user }: Props) => {
  const auth = useAuth();

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const createConversation = async () => {
    try {
      await axiosPrivate.post("/conversation", {
        senderId: auth?.user?._id,
        recieverId: user._id,
      });

      navigate("/chat");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center space-x-6 justify-between">
      <div className="flex items-center space-x-2">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={
            user.profileUrl ? `/uploads/${user.profileUrl}` : "/no-image.jpeg"
          }
          alt=""
        />

        <p className="text-sm font-bold">{user.username}</p>
      </div>

      <button
        className="bg-[#1775ee] flex items-center justify-center px-2 py-1 text-white rounded text-sm font-bold"
        onClick={createConversation}
      >
        Message
      </button>
    </div>
  );
};

export default User;
