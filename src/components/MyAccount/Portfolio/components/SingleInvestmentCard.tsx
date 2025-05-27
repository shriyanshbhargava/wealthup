import { Investment } from "../types";
import React from "react";

export const SingleInvestmentCard: React.FC<{
  investment: Investment;
  fundName: "Shares" | "Mutual Funds";
}> = ({ investment, fundName }) => {
  return (
    <div className="flex justify-between p-4 pr-8  border-b-2">
      <div className="flex flex-col w-1/2">
        <span className="font-robo font-medium text-base md:text-xl">
          {investment.name}
        </span>
        <div className="flex justify-between">
          <p className="mb-0 text-sm md:text-lg text-secondary">
            Units:{" "}
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: fundName === "Shares" ? 0 : 3,
            }).format(investment.quantity)}
          </p>
          <p className="mb-0 text-sm md:text-lg text-secondary">
            Price:{" "}
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: fundName === "Shares" ? 2 : 4,
            }).format(investment.price)}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mb-0 text-sm md:text-xl">
          Current:{" "}
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(investment.current_day_price)}
        </p>
        <p className="mb-0 text-sm md:text-xl">
          Day:{" "}
          <span
            className={`${
              investment.day_change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(investment.day_change)}
          </span>
        </p>
      </div>
    </div>
  );
};
