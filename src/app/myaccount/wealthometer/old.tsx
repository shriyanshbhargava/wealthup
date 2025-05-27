import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import WealthoMeterReport from "@/components/MyAccount/Dashboard/Others/WealthometerReport";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <WealthoMeterReport />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
