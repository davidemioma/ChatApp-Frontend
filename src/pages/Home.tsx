import React from "react";
import { useQuery } from "@tanstack/react-query";
import Nav from "../components/Nav";
import axios from "../util/axios";
import { UserProps } from "../types";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";
import User from "../components/User";

const Home = () => {
  const auth = useAuth();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get("/users").then((res) => {
        return res.data;
      });
    },
  });

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <p className="mt-10 text-lg font-bold text-center tracking-wider">
        Something went wrong!
      </p>
    );

  return (
    <>
      <Nav />

      <div className="w-screen flex">
        <div className="w-full h-[calc(100vh-40px)] flex flex-col space-y-4 p-5 overflow-y-scroll overflow-x-hidden">
          {data
            ?.filter((user: UserProps) => user._id !== auth?.user?._id)
            .map((user: UserProps) => (
              <User key={user._id} user={user} />
            ))}
        </div>

        <div className="hidden md:inline bg-black w-full h-[calc(100vh-40px)]"></div>
      </div>
    </>
  );
};

export default Home;
