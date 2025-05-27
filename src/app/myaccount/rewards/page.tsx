import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import RewardsPage  from "@/components/MyAccount/Dashboard/rewards";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <RewardsPage />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
