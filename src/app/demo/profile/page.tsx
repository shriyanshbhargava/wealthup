"use client"
import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import ProfilePage from "@/components/MyAccount/Dashboard/profile";
import { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <ProfilePage />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
