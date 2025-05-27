"use client"
import React from "react";
import { UserApi } from "@/api/services/user/UserApi";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import Storage from "@/utils/storage";
import { categoryDropdownList } from "./components/AddExpenseForm";
import { ExpenseTrendGraph, Insight } from "./components/ExpenseTrendGraph";

export const InsightsTab = () => {
  const [insights, setInsights] = React.useState<Insight[]>([]);
  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const getInsights = async (category?: string) => {
    const res: Response = await userApiClient.getInsights(category);

    if (res.status === 200) {
      const data = await res.json();

      data.forEach((e: any) => (e.month = e.month.substr(0, 3)));

      setInsights(data);
    }
  };

  React.useEffect(() => {
    getInsights();
  }, [getInsights]);

  return (
    <div className="pt-8 pb-16 px-6">
      <div className="flex flex-col md:flex-row gap-8 justify-around">
        <div className="w-full md:w-2/5 rounded-xl bg-white p-6">
          <div className="flex justify-between">
            <h2 className="mb-0 text-2xl"> Expense Trend</h2>
            <div className="w-40 sm:w-52">
              <Dropdown
                onChange={(value) => {
                  getInsights(value);
                }}
                defaultTitle="All"
              >
                {categoryDropdownList.map((item, index: number) => (
                  <DropdownItem key={index} value={item.value}>
                    {item.text}
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>
          </div>
          <div className="my-6">
            <ExpenseTrendGraph insights={insights} />
          </div>
        </div>
        {/* <div className="w-full md:w-2/5 rounded-xl bg-white p-6">
          <h2 className="text-2xl">Savings Trend</h2>
          <LineChartSavings />
        </div> */}
      </div>
    </div>
  );
};
