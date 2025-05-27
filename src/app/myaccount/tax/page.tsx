import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import TaxPage from "@/components/MyAccount/Dashboard/TaxPage";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <TaxPage />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
