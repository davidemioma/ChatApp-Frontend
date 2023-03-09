import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "../util/axios";
import { UserProps } from "../types";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";
import User from "../components/User";

const Home = () => {
  const auth = useAuth();

  const [users, setUsers] = useState<UserProps[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchConverstations = async () => {
      setLoading(true);

      setError(false);

      try {
        const res = await axios.get("/users");

        setUsers(res.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);

        setError(true);
      }
    };

    fetchConverstations();
  }, []);

  if (loading) return <Spinner />;

  if (error)
    return (
      <p className="mt-10 text-lg text-red-500 font-bold text-center tracking-wider">
        Something went wrong!
      </p>
    );

  return (
    <>
      <Nav />

      {users && (
        <div className="w-screen flex">
          <div className="w-full h-[calc(100vh-40px)] flex flex-col space-y-4 p-5 overflow-y-scroll overflow-x-hidden">
            {users
              ?.filter((user: UserProps) => user._id !== auth?.user?._id)
              ?.map((user: UserProps) => (
                <User key={user._id} user={user} />
              ))}
          </div>

          <div className="hidden md:inline relative w-full h-[calc(100vh-40px)]">
            <img
              className="absolute top-0 w-full h-full object-cover"
              src="/banner.jpeg"
              alt=""
            />

            <div className="absolute top-0 bg-black/50 w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
