import React, { Dispatch, SetStateAction } from "react";
import { useAuth } from "../context/AuthProvider";
import { ConvoProps } from "../types";
import { useQuery } from "@tanstack/react-query";
import axios from "../util/axios";

interface Props {
  conversation: ConvoProps;
  current: boolean;
  setCurrentConvo: Dispatch<SetStateAction<ConvoProps | null>>;
}

const Conversation = ({ conversation, current, setCurrentConvo }: Props) => {
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
    <div
      className={`${
        current && "md:bg-gray-100"
      } w-full flex flex-col md:flex-row items-center gap-2 py-2 md:px-2 cursor-pointer md:hover:bg-gray-100 rounded-lg`}
      onClick={() => setCurrentConvo(conversation)}
    >
      <img
        className="w-7 h-7 rounded-full object-cover"
        src={
          data?.profileUrl ? `/uploads/${data?.profileUrl}` : "/no-image.jpeg"
        }
        alt=""
      />

      <p
        className={`${
          current && "text-[#1775ee]"
        } w-[70px] md:w-full text-xs text-center md:text-left md:text-sm truncate whitespace-nowrap font-bold`}
      >
        {data?.username}
      </p>
    </div>
  );
};

export default Conversation;
