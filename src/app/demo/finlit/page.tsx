import { DashboardLayout } from "@/components/DashboardLayout";
import FinancialLiteracyResult from "@/components/financial-literacy/FinancialLiteracyResult";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return <FinancialLiteracyResult />;
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
