import { IoIosArrowDown, IoIosArrowUp, IoIosTrash } from "react-icons/io";
import { MonthlyExpensesContext, TransactionsContext } from "../SummaryTab";

import { FaAd } from "react-icons/fa";
import React from "react";
import { UserApi } from "@/api/services/user/UserApi";
import { categoryDropdownList } from "./AddExpenseForm";
import { toast } from "react-toastify";

export type Expense = {
  amount: number;
  body: string;
  category: string;
  merchant: string;
  type: "credit" | "debit";
  date: number;
  id: string;
  apiClient: UserApi;
};

export const Expense: React.FC<Expense> = ({
  amount,
  body,
  category,
  merchant,
  type,
  date,
  id,
  apiClient,
}) => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const { transactions, setTransactions } =
    React.useContext(TransactionsContext)!;
  const { expenses, setExpenses } = React.useContext(MonthlyExpensesContext)!;

  const handleDelete = async () => {
    const res: Response = await apiClient.deleteTransaction(id);
    if (res.status === 200) {
      const remainingTxns = transactions.filter((txn: any) => txn.id != id);
      setTransactions(remainingTxns);

      const expns = expenses;
      const item = expns.find((item: any) => item.category === category)!;
      expns[expns.indexOf(item)].amount -= amount;
      setExpenses(expns);
      toast.success("Transaction Deleted Sucessfully");
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      onClick={() => setShowMore(!showMore)}
      className={`cursor-pointer group relative w-full bg-gray-100 rounded-xl p-4 items-center mb-4 border-2 ${
        type === "credit" ? "border-green-600" : "border-red-600"
      }`}
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-xl text-4xl flex items-center justify-center text-white">
              <FaAd />
            </div>
            <div className="flex flex-col">
              <p className="mb-0 font-robo font-medium text-2xl md:text-3xl">
                {categoryDropdownList.find((e) => e.value === category)?.text}
              </p>
              <p className="mb-0 font-robo font-normal text-xl md:text-2xl">
                {merchant}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="mb-0 font-robo font-medium text-2xl md:text-3xl text-primary-light">
              {Intl.NumberFormat("en-IN", {
                currency: "INR",
                style: "currency",
                maximumFractionDigits: 0,
              }).format(amount)}
            </p>
            <p className="mb-0 font-robo font-normal text-xl md:text-2xl text-secondary">
              {Intl.DateTimeFormat("en-IN", {
                day: "2-digit",
                month: "short",
              }).format(date)}
            </p>
          </div>
        </div>
        {showMore && (
          <div className="flex flex-col border-t border-gray-400 mt-2 pt-2">
            <div className="flex justify-end">
              <div className="flex gap-4 text-4xl">
                <IoIosTrash className="text-red-600" onClick={handleDelete} />
              </div>
            </div>
            <p className="text-lg font-robo mb-2 text-center">Body</p>
            <p className="text-lg font-sans">{body}</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full hidden group-hover:block">
        <div className="flex items-center justify-center text-2xl">
          {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
    </div>
  );
};
