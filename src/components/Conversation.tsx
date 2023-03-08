import React from "react";
import { useAuth } from "../context/AuthProvider";
import { ConvoProps } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "../util/axios";

interface Props {
  conversation: ConvoProps;
}

const Conversation = ({ conversation }: Props) => {
  const auth = useAuth();

  const otherUserId = conversation.members.filter(
    (id) => id !== auth?.user?._id
  );

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get(`/users/${otherUserId}`).then((res) => {
        return res.data;
      });
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center space-x-2 py-2 md:px-2 cursor-pointer md:hover:bg-gray-100 rounded-lg">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={
            data?.profileUrl ? `/uploads/${data?.profileUrl}` : "/no-image.jpeg"
          }
          alt=""
        />

        <p className="w-[70px] md:w-full text-xs text-center md:text-left md:text-sm truncate whitespace-nowrap font-bold">
          {data?.username}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
