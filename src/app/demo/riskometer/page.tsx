import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import RiskProfileResult from "@/components/MyAccount/Riskometer/RiskProfileResult";

const Page: NextPageWithLayout = () => {
  return <RiskProfileResult />;
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
