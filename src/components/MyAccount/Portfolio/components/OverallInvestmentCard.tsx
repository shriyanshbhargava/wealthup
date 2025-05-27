import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { CashOrFD } from "./CashInBank";
import { FundsCard } from "./FundsCard";
import { OverallInvestment } from "../types";
import React from "react";

export const OverallInvestmentCard: React.FC<{ item: OverallInvestment, setFetchAgain: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  item,
  setFetchAgain
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleClick = () => {
    setShow(!show);
  };

  const getBgColor = (name: string) => {
    if (name === "Equity") {
      return "bg-[#e8f8f5]";
    } else if (name === "Debt") {
      return "bg-[#f9f3e4]";
    } else {
      return "bg-[#f4e2dd]";
    }
  };

  return (
    <>
      <div
        className={`rounded-xl ${getBgColor(
          item.name
        )} px-4 py-6 cursor-pointer mb-4`}
        onClick={handleClick}
      >
        <div className="flex justify-between">
          <span className="text-xl md:text-2xl font-bold font-robo">
            {item.name}
          </span>
          <div className="flex items-center text-2xl gap-4 md:gap-8">
            <div className="flex flex-col">
              <p className="mb-0 text-base md:text-xl">
                Current:{" "}
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(item.total_current)}
              </p>
              <p className="mb-0 text-base md:text-xl">
                Day:{" "}
                <span
                  className={`${item.day_change > 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(item.day_change)}
                </span>
              </p>
            </div>
            {show ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
          {/* <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="mb-0 text-base md:text-xl">
                Current:{" "}
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(item.total_current)}
              </p>
              <p className="mb-0 text-base md:text-xl">
                Day:{" "}
                <span className="text-green-600">
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(0)}
                </span>
              </p> */}
          {/* <p className="mb-0 text-base md:text-xl">
                Overall:{" "}
                <span className="text-green-600">
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(0)}
                </span>
              </p> */}
          {/* </div>
            <div className="flex justify-between"> */}
          {/* <p className="mb-0 text-base md:text-xl">
                Invested:{" "}
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(0)}
              </p> */}
          {/* <p className="mb-0 text-base md:text-xl">
                Day:{" "}
                <span className="text-green-600">
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(0)}
                </span>
              </p> */}
          {/* </div>
          </div> */}
        </div>
      </div>
      {show ? (
        <>
          {item.name === "Debt" && (
            <CashOrFD type="fixed_deposit" num={item?.fd ?? 0} setFetchAgain={setFetchAgain} />
          )}
          {item.results.map((it, index) => (
            <FundsCard fund={it} key={index} />
          ))}
        </>
      ) : null}
    </>
  );
};
