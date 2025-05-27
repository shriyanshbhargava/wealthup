import { AddExpenseForm } from "./components/AddExpenseForm";
import { BsPlusCircleFill } from "react-icons/bs";
import { Expense } from "./components/Expense";
import { ProfileContext } from "@/components/DashboardLayout";
import React from "react";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";

const needs = [
  "rent",
  "bills",
  "groceries",
  "transport",
  "medical",
  "domestic",
  "emi",
  "other_needs",
];
const wants = [
  "shopping",
  "gym",
  "entertainment",
  "subscription",
  "other_wants",
];

export const SummaryTab = () => {
  const [transactions, setTransactions] = React.useState<Expense[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [expenses, setExpenses] = React.useState<
    Array<{
      label: string;
      category: string;
      amount: number;
      budget?: number;
    }>
  >([]);

  const { monthlyExpensesData } = React.useContext(ProfileContext);

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const getAllExpenses = async () => {
    const res: Response = await userApiClient.getTransactions();

    if (res.status === 200) {
      const data = await res.json();
      setTransactions(data);
    }
  };

  React.useEffect(() => {
    setExpenses(monthlyExpensesData);
    getAllExpenses();
  }, [monthlyExpensesData, getAllExpenses]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      <MonthlyExpensesContext.Provider value={{ expenses, setExpenses }}>
        <div className="relative px-6 pt-8 pb-16">
          <div className="flex flex-col md:flex-row gap-8 justify-around">
            <div className="bg-white rounded-xl py-4 px-8 w-full md:w-[48%] xl:w-2/5">
              <h2 className="text-2xl mb-0">Category-Wise Expenses</h2>
              <div className="flex gap-8 mb-4 justify-center">
                <div className="flex gap-4 items-center">
                  <span className="block w-6 h-6 bg-primary rounded-md"></span>
                  <p className="mb-0 text-xl">Needs</p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="block w-6 h-6 bg-primary-light rounded-md"></span>
                  <p className="mb-0 text-xl">Wants</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {expenses.map((expense, index: number) => (
                  <ExpenseProgress
                    key={index}
                    name={expense.label}
                    budget={expense.budget ?? 0}
                    expense={expense.amount}
                    id={expense.category}
                    color="#79djd00"
                  />
                ))}
              </div>
            </div>
            <div className="relative bg-white rounded-xl p-4 w-full md:w-[48%] xl:w-2/5 max-h-[850px] overflow-y-scroll">
              <h2 className="text-2xl">My Transactions</h2>
              {transactions.length > 0 &&
                transactions.map((transaction: Expense, index: number) => (
                  <Expense
                    key={index}
                    amount={transaction.amount}
                    date={transaction.date}
                    body={transaction.body}
                    merchant={transaction.merchant}
                    category={transaction.category}
                    id={transaction.id}
                    type={transaction.type}
                    apiClient={userApiClient}
                  />
                ))}
              {transactions.length === 0 && (
                <div className="flex items-center justify-center">
                  <p>No transactions found.</p>
                </div>
              )}
            </div>
          </div>
          <div className="fixed bottom-[5rem] lg:bottom-5 left-1/2 -ml-6 lg:ml-[7.5rem]">
            <div className="bspluscirclefill text-4xl md:text-6xl">
              <BsPlusCircleFill
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
          <AddExpenseForm open={open} setOpen={setOpen} />
        </div>
      </MonthlyExpensesContext.Provider>
    </TransactionsContext.Provider>
  );
};

const ExpenseProgress: React.FC<{
  name: string;
  budget: number;
  expense: number;
  id: string;
  color: string;
}> = ({ name, budget, expense, color, id }) => {
  const [width, setWidth] = React.useState<number>();
  const ref = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    const divWidth = ref.current?.clientWidth;
    let remaining = expense / budget > 1 ? 1 : expense / budget;
    remaining = budget > 0 ? remaining : 1;

    if (!divWidth) return;

    setWidth(divWidth * remaining);
  }, [expense, budget, ref.current?.clientWidth]);

  return (
    <>
      <div className="flex gap-6 items-center overflow-hidden">
        <div className="w-[27%]">
          <p className="mb-0 mt-2 md:mt-3 text-xs sm:text-sm md:text-base">
            {name === "Food /\n Entertainment" ? (
              <>
                <span className="md:hidden">Food / Entertain...</span>
                <span className="hidden md:block">Food / Entertainment</span>
              </>
            ) : name === "Subscription" ? (
              <>
                <span className="md:hidden">Subscripti...</span>
                <span className="hidden md:block">Subscription</span>
              </>
            ) : (
              name
            )}
          </p>
        </div>
        <div ref={ref} className="block relative w-full h-full">
          <span
            className={`${
              needs.includes(id)
                ? "bg-primary"
                : wants.includes(id)
                ? "bg-primary-light"
                : "bg-orange-500"
            } shadow-md absolute top-0 left-0 block h-4 w-full text-right font-robo font-bold text-white pr-1 text-xs md:text-sm rounded-l-full rounded-r-full bg-opacity-50`}
          >
            {budget.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
          {expense > 0 && (
            <span
              style={{ width }}
              className={`${
                needs.includes(id)
                  ? "bg-primary"
                  : wants.includes(id)
                  ? "bg-primary-light"
                  : "bg-orange-500"
              } shadow-md absolute top-0 left-0 block h-4 text-right font-robo font-bold text-white pr-1 text-xs md:text-sm rounded-l-full rounded-r-full`}
            >
              {expense.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export const TransactionsContext = React.createContext<{
  transactions: Expense[];
  setTransactions: React.Dispatch<React.SetStateAction<Expense[]>>;
} | null>(null);
export const MonthlyExpensesContext = React.createContext<{
  expenses: {
    label: string;
    category: string;
    amount: number;
    budget?: number | undefined;
  }[];
  setExpenses: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        category: string;
        amount: number;
        budget?: number | undefined;
      }[]
    >
  >;
} | null>(null);
