
"use client"
import React, { useContext } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import { PersonalInfo } from "./PersonalInfo";
import { ProfileContext } from "@/components/DashboardLayout";
import { SensitiveData } from "./SensitiveData";
import { Tab } from "./expenses/components/Tab";
import { profileCrumbs } from "@/utils/Breadcrumbs";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const { user } = useContext(ProfileContext)!;

  const handleChangeTab = (index: number) => {
    setSelectedTab(index);
  };
  return (
    <div className="h-full w-full">
      <HeaderNav whatsapp={false} showBtn={true} showNotification={true} title="My Profile" beta={false} />
      <div className="relative bg-primary-light w-full h-[25rem]">
        {/* <h1 className="text-white font-medium text-4xl font-robo py-4 md:py-0 mx-4">
          My Profile
        </h1> */}
        <div className="absolute right-10 top-20">
          <span className="w-36 md:w-44 h-36 md:h-44 rounded-full bg-gray-300 flex items-center justify-center text-7xl font-bold font-robo">
            {/* <Image
              src={profileImage}
              alt="Profile Pic"
              className="rounded-full"
            /> */}
            {user?.first_name?.split('')[0]}
          </span>
        </div>
        <div className="absolute bottom-5 md:bottom-10 w-full">
          <div className="flex w-full items-center justify-center gap-10">
            {Array("General Data", "Sensitive Data").map((i, index) => (
              <Tab
                key={index}
                title={i}
                selected={index === selectedTab}
                onClick={() => handleChangeTab(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 mt-4"><Breadcrumbs crumbs={profileCrumbs} /></div>
      <div className="px-6 pt-8 pb-16 flex justify-center">
        {[<PersonalInfo key="1" />, <SensitiveData key="2" />][selectedTab]}
      </div>
    </div>
  );
};

export default ProfilePage;
