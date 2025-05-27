import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Fund } from "../types";
import { SingleInvestmentCard } from "./SingleInvestmentCard";

export const FundsCard: React.FC<{ fund: Fund }> = ({ fund }) => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className="px-4 py-8 bg-white mb-4 rounded-xl">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-xl md:text-2xl font-bold font-robo">
          {fund.name}
        </span>
        <div className="flex items-center text-2xl gap-4 md:gap-8">
          <div className="flex flex-col">
            <p className="mb-0 text-base md:text-xl">
              Current:{" "}
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(fund.current)}
            </p>
            <p className="mb-0 text-base md:text-xl">
              Day:{" "}
              <span
                className={`${fund.day_change > 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(fund.day_change)}
              </span>
            </p>
          </div>
          {show ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </div>
      {show ? (
        <>
          {fund.investments.map((it, index) => (
            <SingleInvestmentCard
              investment={it}
              key={index}
              fundName={fund.name}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};
