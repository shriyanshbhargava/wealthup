import { FaCoins } from "react-icons/fa";
import Image from "next/legacy/image";
import { ProfileContext } from "@/components/DashboardLayout";
import { ProgressTab } from "./ProgressTab";
import React from "react";
import { RedeemTab } from "./RedeemTab";
import { Tab } from "../expenses/components/Tab";
import { TransactionsTab } from "./TransactionsTab";
import heroImage from "@/assets/images/dashboard/Evening Journey.jpg";

const RewardsPage = () => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const { user } = React.useContext(ProfileContext);

  const handleChangeTab = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="w-full h-full">
      <div className="relative h-[25rem] w-full">
        <Image src={heroImage} alt="Hero Image" layout="fill" />
        <div className="absolute top-0 left-0 w-full">
          <div className="p-10 flex justify-between items-center">
            <h1 className="text-xl md:text-4xl mb-0 font-robo">My Journey</h1>
            <div className="text-xl md:text-4xl flex font-normal font-robo gap-4 items-center">
              <FaCoins className="text-yellow-600" />
              <span>{user?.coins?.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 w-full">
          <div className="flex items-center justify-center gap-10">
            {Array("Roadmap", "Transactions").map((i, index) => (
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
      {
        [
          <ProgressTab key="1" />,
          <TransactionsTab key="2" />,
          // <RedeemTab key="3" />,
        ][selectedTab]
      }
    </div>
  );
};

export default RewardsPage;
