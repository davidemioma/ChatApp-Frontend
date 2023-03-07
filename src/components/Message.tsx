import React from "react";

interface Props {
  myMessage?: boolean;
}

const Message = ({ myMessage }: Props) => {
  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`${
          myMessage
            ? "ml-auto rounded-tr-none bg-gray-100"
            : "rounded-tl-none bg-[#1775ee] text-white"
        } overflow-hidden rounded-lg px-4 py-2`}
      >
        <p className="max-w-[270px] sm:max-w-[300px] break-all">
          Hello <span className="text-xs">1 min</span>
        </p>
      </div>
    </div>
  );
};

export default Message;
