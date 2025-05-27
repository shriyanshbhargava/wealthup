
"use client"
import { DashboardLayout } from "@/components/DashboardLayout";
import ExpensesPage from "@/components/MyAccount/Dashboard/expenses";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <ExpensesPage />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
