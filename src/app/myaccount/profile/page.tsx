import { DashboardLayout } from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/app/_app";
import ProfilePage from "@/components/MyAccount/Dashboard/profile";
import { ReactElement } from "react";
import UserProfile from "@/components/MyAccount/Dashboard/new-profile";

const Page: NextPageWithLayout = () => {
  return (
    <>
      {/* <ProfilePage /> */}
      <UserProfile />
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};



