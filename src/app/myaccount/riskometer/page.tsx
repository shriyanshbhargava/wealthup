import { DashboardLayout } from "@/components/DashboardLayout";
import { ReactElement } from "react";
import RiskProfileResult from "@/components/MyAccount/Riskometer/RiskProfileResult";
import { NextPageWithLayout } from "@/app/_app";

const Page: NextPageWithLayout = () => {
  return <RiskProfileResult />;
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
