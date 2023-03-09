import React, { useEffect, useRef, useState } from "react";
import Conversation from "../components/Conversation";
import Nav from "../components/Nav";
import Message from "../components/Message";
import { BiHappyAlt } from "react-icons/bi";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../context/AuthProvider";
import { ArrivalProps, ConvoProps, MessageProps } from "../types";
import { useSocket } from "../context/SocketProvider";

const Chat = () => {
  const auth = useAuth();

  const mySocket = useSocket();

  const axiosPrivate = useAxiosPrivate();

  const [text, setText] = useState("");

  const [conversations, setConversations] = useState<ConvoProps[]>([]);

  const [messages, setMessages] = useState<any[]>([]);

  const [arrivalMessage, setArrivalMessage] = useState<ArrivalProps | null>(
    null
  );

  const [currentConvo, setCurrentConvo] = useState<ConvoProps | null>(null);

  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<any>();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      mySocket?.socket?.emit("sendmessage", {
        senderId: auth?.user?._id,
        reciverId: currentConvo?.members.find((id) => id !== auth?.user?._id),
        text,
      });

      await axiosPrivate.post("/messages", {
        conversationId: currentConvo?._id,
        senderId: auth?.user?._id,
        text,
      });

      setText("");

      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  useEffect(() => {
    mySocket?.socket?.on("getMessage", (data: any) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentConvo?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConvo]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchConverstations = async () => {
      try {
        const res = await axiosPrivate.get(`/conversation/${auth?.user?._id}`, {
          signal: controller.signal,
        });

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchConverstations();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    // const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        const res = await axiosPrivate.get(`/messages/${currentConvo?._id}`);

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();

    // return () => {
    //   controller.abort();
    // };
  }, [currentConvo, arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Nav />

      <div className="w-screen flex">
        <div className="w-20 md:w-60 lg:w-78 h-[calc(100vh-40px)] flex flex-col space-y-2 p-5 border border-l overflow-y-scroll overflow-x-hidden">
          {conversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              current={conversation._id === currentConvo?._id}
              setCurrentConvo={setCurrentConvo}
            />
          ))}
        </div>

        {currentConvo && (
          <div className="relative w-full h-[calc(100vh-40px)]">
            <div className="h-[calc(100vh-96px)] space-y-4 py-7 px-5 sm:px-7 overflow-y-scroll">
              {messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  myMessage={message.senderId === auth?.user?._id}
                />
              ))}

              <div ref={scrollRef} />
            </div>

            <div className="absolute bottom-0 w-full h-14">
              <form
                onSubmit={sendMessage}
                className="flex items-center space-x-2 px-2"
              >
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
                  className="hidden sm:inline font-semibold text-[#1775ee] disabled:cursor-not-allowed"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
