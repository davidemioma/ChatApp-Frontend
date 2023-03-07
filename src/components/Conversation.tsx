import React from "react";

const Conversation = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center space-x-2 py-2 md:px-2 cursor-pointer md:hover:bg-gray-100 rounded-lg">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src="/no-image.jpeg"
          alt=""
        />

        <p className="w-[70px] md:w-full text-xs md:text-sm truncate whitespace-nowrap font-bold">
          John Doe
        </p>
      </div>
    </div>
  );
};

export default Conversation;
