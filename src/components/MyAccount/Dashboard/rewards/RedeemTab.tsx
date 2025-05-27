import React from "react";
import { RedeemCard } from "./components/RedeemCard";
import amazonLogo from "@/assets/images/rewards/Amazon.png";
import myntraLogo from "@/assets/images/rewards/Myntra.png";
import wealthupLogo from "@/assets/images/rewards/wealthup.png";

export const RedeemTab = () => {
  return (
    <div className="pt-10 pb-16 px-8">
      <h2 className="text-2xl font-robo">Redeem your coins below.</h2>
      <div className="flex flex-wrap gap-10">
        <RedeemCard
          image={wealthupLogo}
          title="30-Min Call With Expert"
          coins={10000}
        />
        <RedeemCard
          image={amazonLogo}
          title="500 Aamzon Coupon"
          coins={10000}
        />
        <RedeemCard
          image={myntraLogo}
          title="500 Myntra Coupon"
          coins={10000}
        />
      </div>
    </div>
  );
};
