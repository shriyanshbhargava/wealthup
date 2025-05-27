import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import RentReceipt from "@/components/MyAccount/Dashboard/RentReceipt";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <RentReceipt />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
