import React, { FC, ReactNode, useState } from "react";

export const ToolTip: React.FC<{ text: string, top?: string; left?: string; }> = ({ text, top = 10, left = 0 }) => {
  return (
    <div className={`"fixed z-50 -top-${top} left-${left}`}>
      <div className="relative bg-white rounded-full px-3 py-1 flex justify-center items-center shadow-md">
        <span className="text-black text-base font-normal font-robo">
          {text}
        </span>
      </div>
    </div>
  );
};

type TooltipType = {
  message: string;
  children: ReactNode;
  className?: string;
}

export const TooltipV2: FC<TooltipType> = ({ message, children, className }) => {
  return (
    <>
      <div className={`group relative flex ${className}`}>
        {children}
        <div className="z-10 absolute top-10 scale-0 -left-[210px] transition-all rounded bg-gray-800 p-2 group-hover:scale-100 min-w-[240px]">
          <p className="text-xs text-white mb-0">{message}</p>
        </div>
      </div>
    </>
  )
}
