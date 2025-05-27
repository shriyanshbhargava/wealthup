"use client"
import { Dialog, Transition } from "@headlessui/react";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { MonthlyExpensesContext, TransactionsContext } from "../SummaryTab";
import React, { Fragment, useRef } from "react";

import { Expense } from "./Expense";
import Input from "@/components/ui/Input";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { toast } from "react-toastify";

export const categoryDropdownList = [
  {
    text: "Rent",
    value: "rent",
  },
  {
    text: "Bills / Utilities",
    value: "bills",
  },
  {
    text: "Groceries / Supplies",
    value: "groceries",
  },
  {
    text: "Transport",
    value: "transport",
  },
  {
    text: "Medical / Insurance",
    value: "medical",
  },
  {
    text: "Domestic Help",
    value: "domestic",
  },
  {
    text: "EMI",
    value: "emi",
  },
  { text: "Other Needs", value: "other_needs" },
  {
    text: "Shopping",
    value: "shopping",
  },
  {
    text: "Gym / Salon",
    value: "gym",
  },
  {
    text: "Food / Entertainment",
    value: "entertainment",
  },
  {
    text: "Subscriptions",
    value: "subscription",
  },
  { text: "Other Wants", value: "other_wants" },
];

const initialState = {
  category: "",
  amount: null,
  body: "",
  date: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const AddExpenseForm: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const { transactions, setTransactions } =
    React.useContext(TransactionsContext)!;
  const { expenses, setExpenses } = React.useContext(MonthlyExpensesContext)!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update",
      payload: {
        [e.target.id]: e.target.value,
      },
    });
  };

  const handleSubmit = async () => {
    const data = state;
    data.date = Date.parse(data.date);
    data.type = "debit";
    if (data.body.length === 0) delete data.body;

    const res: Response = await userApiClient.addExpense(JSON.stringify(data));

    if (res.status === 201) {
      const resData = await res.json();

      toast.success("Expense added successfully.");
      dispatch({
        type: "update",
        payload: initialState,
      });

      const txns = transactions;
      txns.unshift(resData);
      setTransactions(txns);

      const expns = expenses;
      const item = expns.find((item) => item.category === resData.category)!;
      expns[expns.indexOf(item)].amount += parseInt(resData.amount);
      setExpenses(expns);
    } else {
      toast.error("Something went wrong.");
    }
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-10 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h2"
                        className="text-2xl font-medium leading-6 text-gray-900"
                      >
                        Add Expenses
                      </Dialog.Title>
                      <div className="mt-2 w-full">
                        <form className="w-full">
                          <Dropdown
                            defaultTitle="Category"
                            onChange={(value: string) => {
                              dispatch({
                                type: "update",
                                payload: {
                                  category: value,
                                },
                              });
                            }}
                          >
                            {categoryDropdownList.map((item, index: number) => (
                              <DropdownItem key={index} value={item.value}>
                                {item.text}
                              </DropdownItem>
                            ))}
                          </Dropdown>
                          <Input
                            type="number"
                            placeholder="Amount"
                            label="Amount"
                            value={state.amount}
                            id="amount"
                            onChange={handleChange}
                          />
                          <Input
                            type="date"
                            placeholder="Date"
                            label="Date"
                            value={state.date}
                            id="date"
                            onChange={handleChange}
                          />
                          <Input
                            type="text"
                            placeholder="Note"
                            label="Note"
                            textbox
                            value={state.body}
                            id="body"
                            onChange={handleChange}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center border border-transparent bg-primary-new rounded-full px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm btn"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
