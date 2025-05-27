import React from "react";
import { IoMdArrowDropup } from "react-icons/io";

const PopOver: React.FC<{ label: string; flip: boolean }> = ({ label, flip }) => {
  return (
    <>
      <div className="text-6xl text-[#00B2B2] -mb-7">
        <IoMdArrowDropup />
      </div>
      <div className={`bg-[#00B2B2] py-2 px-4 text-white font-robo text-xl font-medium rounded-xl leading-tight ${flip ? "-ml-36 mr-32" : ""}`}>
        {label}
      </div>
    </>
  );
};

export default PopOver;
