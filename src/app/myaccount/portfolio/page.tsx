'use client'

import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import { ReactElement } from "react";
import Investments from "@/components/MyAccount/Portfolio/Investments";
const Page: NextPageWithLayout = () => {
  return <Investments />;
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
