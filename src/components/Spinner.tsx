import React from "react";

const Spinner = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-t border-l border-[#1775ee] animate-spin" />
    </div>
  );
};

export default Spinner;
