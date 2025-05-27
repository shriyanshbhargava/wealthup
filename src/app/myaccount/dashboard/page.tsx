import { DashboardHome } from "@/components/MyAccount/Dashboard/home";
import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import { Sidebar } from "@/components/Sidebar";
import WealthoMeterPage from '@/components/Wealthometer/new'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <WealthoMeterPage />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
