import { FaCoins, FaRupeeSign } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";

import GoldMember from "@/components/GoldMember";
import Image from "next/image";
import Link from "next/link";
import { ProfileContext } from "@/components/DashboardLayout";
import finknowmeterIcon from "@/assets/icons/Financial Literacy Icon White.png";
import heroImage from "@/assets/images/dashboard/Evening Journey.jpg";
import investmentIcon from "@/assets/icons/Investments_white.png";
import logo from "@/assets/logo/wealthup-bluelogo.png";
import phoneIcon from "@/assets/icons/phone.png";
import riskometerIcon from "@/assets/icons/Risk Profile Icon White.png";
import taxesIcon from "@/assets/icons/Taxes_white.png";
import { usePathname } from "next/navigation";
import wealthometerIcon from "@/assets/images/dashboard/wealthometerwhite.png";

export const DashboardHome = () => {
  const {
    user,
    taxSavingsData,
    wealthometerData,
    monthlyExpensesData,
    riskometer,
    finknowmeter,
    investments,
  } = useContext(ProfileContext);

  const pathname = usePathname();

  const [bookingLink, setBookingLink] = useState("https://topmate.io/wealthup_me/230755")

  useEffect(() => {
    if (pathname.includes("/demo") || (user?.tier === "silver" && 3 - (user?.calls_booked ?? 0) <= 0) || user?.tier === "base") {
      setBookingLink("https://topmate.io/wealthup_me");
    }
  }, [pathname, user])

  const demo = pathname.includes('/demo')


  return (
    <div className="w-full h-full">
      {/* Image */}
      <div className="block relative w-full h-[16rem] aspect-auto md:h-[35rem] bg-blue-300 overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Image"
          layout="fill"
          className="aspect-auto"
        />
        <div className="absolute top-10 left-4 md:left-10">
          <div className="lg:hidden -mt-9">
            <Link href="/">

              <Image
                src={logo}
                alt="Wealthup Logo"
                height="48"
                width="150" />

            </Link>
          </div>
          <span className="text-xl md:text-4xl font-robo font-medium">
            {demo ? 'Hi Guest,' : (
              <>
                {user?.first_name ? <>Hi {user?.first_name},</> : <>Hi,</>}
              </>
            )}
          </span>
          <p className="text-xl md:text-4xl font-robo font-normal">
            Welcome back!
          </p>
        </div>
        <Link href={`${demo ? '/demo' : ''}/dashboard/rewards`}>

          <div className="absolute top-10 right-16 md:right-10 text-xl md:text-4xl flex items-center font-normal font-robo gap-4 cursor-pointer">
            <FaCoins className="text-yellow-600" />
            <span>{user?.coins?.toLocaleString()}</span>
          </div>

        </Link>
        {/* <div className="absolute bottom-10 left-10">
          <div className="flex gap-4 items-center">
            {Array(3)
              .fill(0)
              .map((i, index) => (
                <span
                  key={index}
                  className="relative cursor-pointer rounded-full bg-primary-light w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white text-2xl sm:text-4xl"
                >
                  <FaCheck />
                </span>
              ))}
            {Array(2)
              .fill(0)
              .map((i, index) => (
                <span
                  key={index}
                  className="cursor-pointer rounded-full bg-primary-light w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-white text-2xl sm:text-4xl"
                >
                  <FaTrophy />
                </span>
              ))}

            <span className="text-white font-robo text-base sm:text-xl font-medium cursor-pointer">
              View More
            </span>
          </div>
        </div> */}
      </div>
      {/* Tiles */}
      <div className="px-6 pt-8 pb-12 md:pb-96">
        {/* <div className="mb-8 -ml-[25px] -mr-2 lg:hidden">
          <GoldMember />
        </div> */}
        <div className="flex flex-wrap gap-8 justify-center">
          <Tile
            text="Total Assets"
            link={`${demo ? '/demo' : ''}/dashboard/investments`}
            data={`${investments === null
              ? "No Investments"
              : Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(investments?.net_worth)
              }`}
          >
            <Image
              src={investmentIcon}
              alt="WealthoMeter Icon"
              height={30}
              width={30}
            />
          </Tile>
          <Tile
            text="Support Calls Left"
            rightText={user?.tier === "gold" ? "Unlimited" : user?.tier === "base" ? "0" : (3 - (user?.calls_booked ?? 0)).toString()}
            data={null}
            link={null}
          >
            <Image
              src={phoneIcon}
              alt="WealthoMeter Icon"
              height={30}
              width={30}
            />
            <a rel="noreferrer" href={bookingLink} target="_blank" referrerPolicy="no-referrer" className="btn">
              Book a Call
            </a>
          </Tile>
          <Tile
            text="Potential Tax Saving"
            link={`${demo ? '/demo' : ''}/dashboard/tax`}
            data={`${taxSavingsData === null
              ? "Check savings"
              : Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format((taxSavingsData?.first_tax_saving ?? 0) > 0 ? taxSavingsData?.first_tax_saving : 0)
              }`}
          >
            <Image
              src={taxesIcon}
              alt="WealthoMeter Icon"
              height={30}
              width={30}
            />
          </Tile>
          <Tile
            text="WealthoMeter"
            link={`${demo ? '/demo' : ''}/dashboard/wealthometer`}
            data={`${wealthometerData === null
              ? "Check your score"
              : wealthometerData?.result?.total + " / 100"
              }`}
          >
            <Image
              src={wealthometerIcon}
              alt="WealthoMeter Icon"
              height={30}
              width={30}
            />
          </Tile>
          <Tile
            text="RiskoMeter"
            link={`${demo ? '/demo' : ''}/dashboard/riskometer`}
            data={`${riskometer === null ? "Check Riskometer" : riskometer?.level
              }`}
          >
            <Image
              src={riskometerIcon}
              alt="WealthoMeter Icon"
              height={30}
              width={30}
            />
          </Tile>
          <Tile
            text="FinknowMeter"
            link={`${demo ? '/demo' : ''}/dashboard/finlit`}
            data={`${finknowmeter === null ? "Check Finknometer" : finknowmeter?.level
              }`}
          >
            <Image
              src={finknowmeterIcon}
              alt="WealthoMeter Icon"
              height={30}
              width={30}
            />
          </Tile>
        </div>
      </div>
    </div>
  );
};

const Tile: React.FC<{
  text: string;
  rightText?: string;
  children: React.ReactNode;
  link: string | null;
  data: string | React.ReactNode;
}> = ({ text, children, data, link, rightText }) => {
  return <>
    {link === null ? (
      <div>
        <div className="bg-primary-light rounded-2xl p-6 w-[calc(100vw-1.5rem)] min-w-[300px] sm:w-[360px] h-[120px]">
          <div className="flex justify-between">
            <p className="text-white text-xl text-robo font-bold">{text}</p>
            {rightText && <p className="text-white text-xl text-robo font-bold">{rightText}</p>}
          </div>
          <div className="flex items-end justify-between">
            {children}
            {typeof data === "string" && (
              <span className="text-xl text-white font-robo font-bold">
                {data}
              </span>
            )}
          </div>
        </div>
      </div>
    ) : (
      (<Link href={link === null ? "#" : link}>

        <div className="bg-primary-light rounded-2xl p-6 w-[calc(100vw-1.5rem)] sm:w-[360px] h-[120px]">
          <div className="flex justify-between">
            <p className="text-white text-xl text-robo font-bold">{text}</p>
            {rightText && <p className="text-white text-xl text-robo font-bold">{rightText}</p>}
          </div>
          <div className="flex items-end justify-between">
            {children}
            {typeof data === "string" && (
              <span className="text-xl text-white font-robo font-bold">
                {data}
              </span>
            )}
          </div>
        </div>

      </Link>)
    )}
  </>;
};
