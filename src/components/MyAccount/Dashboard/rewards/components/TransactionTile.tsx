import React from "react";
import { format } from 'date-fns';
import { getIcon } from "../ProgressTab";

export type Task = {
  coins_earned: number;
  total_coins: number;
  title: string;
  completed_on: string;
  icon: string;
  complatedOn: string;
};

export const TransactionTile: React.FC<{
  title: string;
  amount: number;
  balance: number;
  isLast?: boolean;
  icon: string;
  completedOn: string;
}> = ({ title, amount, balance, isLast = false, icon, completedOn }) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="flex-shrink-0">
          <span className=" w-12 h-12 rounded-full bg-primary-new flex items-center justify-center text-white text-xl">
            {getIcon(icon)}
          </span>
        </div>
        <div className="flex justify-between items-center pl-8 w-full">
          <div className="flex flex-col">
            <span className="text-xl font-robo font-normal">{title}</span>
            <time>
              {format(Date.parse(completedOn), 'dd MMM yyyy')}
            </time>
          </div>
          <div className="flex items-end flex-col font-robo text-xl">
            <span
              className={`${amount < 0 ? "text-red-600" : "text-green-600"
                } font-bold`}
            >
              {amount < 0
                ? Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(amount)
                : `+${Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(amount)}`}
            </span>
            <span>
              Balance:{" "}
              {Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(balance)}
            </span>
          </div>
        </div>
      </div>
      {!isLast && (
        <div className="ml-5 flex flex-col gap-4">
          {Array(4)
            .fill(0)
            .map((_, index: number) => (
              <span
                key={index}
                className="w-2 h-2 rounded-full bg-gray-400 block"
              ></span>
            ))}
        </div>
      )}
    </div>
  );
};
