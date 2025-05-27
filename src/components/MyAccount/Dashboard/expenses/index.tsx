"use client"

import Breadcrumbs from "@/components/Breadcrumbs";
import { BudgetTab } from "./BudgetTab";
import { Button } from "@/components/ui/Button";
import { InsightsTab } from "./InsightsTab";
import { IoIosCloseCircle } from "react-icons/io";
import { PieChart } from "./components/PIeChart";
import { ProfileContext } from "@/components/DashboardLayout";
import React from "react";
import { SummaryTab } from "./SummaryTab";
import { Tab } from "./components/Tab";
import { expensesCrumbs } from "@/utils/Breadcrumbs";

const ExpensesPage = () => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [showModal, setShowModal] = React.useState<boolean>(true);

  const { monthlyExpensesData } = React.useContext(ProfileContext);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeTab = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="relative bg-primary-light w-full h-[25rem]">
          <h1 className="text-white font-medium text-4xl font-robo mx-4">
            My Expenses
          </h1>
          <div className="absolute top-0 left-1/2 -ml-[75px] ">
            <PieChart
              expenses={
                monthlyExpensesData &&
                monthlyExpensesData.reduce(
                  (previous, expense) => previous + expense.amount,
                  0
                )
              }
              total={
                monthlyExpensesData &&
                monthlyExpensesData.reduce(
                  (previous, expense) =>
                    previous +
                    (expense.budget !== undefined ? expense.budget : 0),
                  0
                )
              }
            />
          </div>
          <div className="absolute bottom-5 w-full">
            <div className="flex w-full items-center justify-center gap-10">
              {Array("Summary", "Trends", "Budget").map((i, index) => (
                <Tab
                  key={index}
                  title={i}
                  selected={index === selectedTab}
                  onClick={() => handleChangeTab(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 px-4"><Breadcrumbs crumbs={expensesCrumbs} /></div>
        <div className="relative w-full h-full">
          {
            [
              <SummaryTab key="0" />,
              <InsightsTab key="1" />,
              <BudgetTab key="2" />,
            ][selectedTab]
          }
          {showModal && (
            <div className="z-20 absolute top-0 right-0 w-full h-full">
              <div className="flex justify-center h-full backdrop-blur-sm">
                <div className="mt-12 bg-whtie h-fit rounded-lg bg-primary-new shadow-lg p-6">
                  <div className="flex text-3xl justify-end text-white">
                    <IoIosCloseCircle
                      onClick={handleCloseModal}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-2xl text-white font-robo font-bold">
                    Automatically track your expenses
                  </p>
                  <div className="my-2 flex justify-center gap-8">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.wealthup.wealthupapp&pli=1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="bg-white rounded-full px-4 py-3 font-robo font-medium btn">
                        Download App on Play Store
                      </button>
                    </a>
                    {/* <Button color="secondary">Enter Manually</Button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpensesPage;
