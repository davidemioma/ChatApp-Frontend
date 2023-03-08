import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { UserProps } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "../util/axios";
import { useAuth } from "../context/AuthProvider";

interface Props {
  user: UserProps;
}

const User = ({ user }: Props) => {
  const auth = useAuth();

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const { isLoading, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () => {
      return axios
        .get(`/conversation/check?myId=${auth?.user?._id}&userId=${user._id}`)
        .then((res) => {
          return res.data;
        });
    },
  });

  const createConversation = async () => {
    try {
      if (!data) {
        await axiosPrivate.post("/conversation", {
          senderId: auth?.user?._id,
          recieverId: user._id,
        });

        navigate("/chat");
      }

      navigate("/chat");
    } catch (err) {}
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
        className="bg-[#1775ee] flex items-center justify-center px-2 py-1 text-white rounded text-sm font-bold disabled:cursor-not-allowed"
        disabled={isLoading}
        onClick={createConversation}
      >
        Message
      </button>
    </div>
  );
};

export default User;
