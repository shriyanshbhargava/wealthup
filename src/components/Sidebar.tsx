"use client"

import { FaCheck, FaCopy, FaTools, FaUser } from "react-icons/fa";
import Image, { StaticImageData } from "next/legacy/image";
import {
  MdAssessment,
  MdEqualizer,
  MdMoney,
  MdOutlineDashboard,
} from "react-icons/md";
import React, { useContext } from "react";
import { getLinks, getMobileLinks } from "@/components/ui/Sidebar/items";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import { AiFillMessage } from "react-icons/ai";
import { IconType } from "react-icons";
import { IoIosExit } from "react-icons/io";
import Link from "next/link";
import { ProfileContext } from "./DashboardLayout";
import expensesIcon from "@/assets/icons/Expenses.png";
import financialLitIcon from "@/assets/icons/Financial Literacy Icon.png";
import investmentIcon from "@/assets/icons/Investments.png";
import logo from "@/assets/logo/wealthup-bluelogo.png";
import portfolioAnalyserIcon from "@/assets/icons/portfolio_analyser.png";
import rentReceiptIcon from "@/assets/icons/Rent_Receipt_Generator.png";
import riskProfileIcon from "@/assets/icons/Risk Profile Icon.png";
import taxesIcon from "@/assets/icons/Taxes.png";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import wealthometerIcon from "@/assets/images/dashboard/wealthometer.png";

// const getSmDeviceItem = (demo: boolean, sm: boolean) => {
//   if (true) {
//     return {
//       title: "WealthoMeter",
//       icon: MdMoney,
//       link: `${demo ? '/demo' : ''}/dashboard/wealthometer`,
//       mobileLink: true,
//       image: wealthometerIcon,
//       invert: false,
//       desktop: true,
//       beta: true
//     }

//   } else {
//     return {
//       title: "Investments",
//       icon: AiFillMessage,
//       link: `${demo ? '/demo' : ''}/dashboard/investments`,
//       image: investmentIcon,
//       mobileLink: true,
//       invert: false,
//       mobile: true,
//       desktop: true,
//       beta: false
//     }
//   }
// }

// const getSmDeviceToolsItem = (demo: boolean, sm: boolean) => {
//   if (true) {
//     return {
//       title: "Investments",
//       icon: AiFillMessage,
//       link: `${demo ? '/demo' : ''}/dashboard/investments`,
//       image: investmentIcon,
//       mobileLink: false,
//       invert: false,
//       mobile: true,
//       desktop: true,
//       beta: false
//     }
//   } else {
//     return {
//       title: "WealthoMeter",
//       icon: MdMoney,
//       link: `${demo ? '/demo' : ''}/dashboard/wealthometer`,
//       mobileLink: false,
//       image: wealthometerIcon,
//       invert: false,
//       desktop: true,
//       beta: true
//     }
//   }
// }

// const getDemoLinks = (demo: boolean) => {
//   if (demo) {
//     return [
//       {
//         title: "Portfolio Analyser New",
//         icon: AiFillMessage,
//         link: '/demo/portfolio-analyser/summary',
//         image: portfolioAnalyserIcon,
//         mobileLink: true,
//         invert: false,
//         mobile: false,
//         desktop: true,
//         beta: false
//       },
//       {
//         title: "WealthoMeter New",
//         icon: MdMoney,
//         link: '/demo/dashboard/wealthometer/new',
//         mobileLink: true,
//         image: wealthometerIcon,
//         invert: false,
//         desktop: true,
//         beta: false
//       }
//     ]
//   }
//   return []
// }

// const getLinks = (demo: boolean, md: boolean) => {
//   const data = [
//     {
//       name: "",
//       items: [
//         {
//           title: "Dashboard",
//           icon: MdOutlineDashboard,
//           link: `${demo ? '/demo' : ''}/dashboard`,
//           mobileLink: true,
//           image: false,
//           invert: false,
//           mobile: true,
//           desktop: true,
//           beta: false
//         },
//         getSmDeviceItem(demo, md),
//         {
//           title: "Portfolio Analyser",
//           icon: AiFillMessage,
//           link: `${demo ? '/demo/dashboard/investments/portfolio-analyser' : '/dashboard/investments/portfolio-analyser'}/`,
//           image: portfolioAnalyserIcon,
//           mobileLink: true,
//           invert: false,
//           mobile: true,
//           desktop: true,
//           beta: true
//         },
//         ...getDemoLinks(demo),
//         {
//           title: "Expenses",
//           icon: MdEqualizer,
//           link: `${demo ? '/demo' : ''}/dashboard/expenses`,
//           mobileLink: false,
//           image: expensesIcon,
//           invert: false,
//           mobile: false,
//           desktop: false,
//           beta: false
//         },
//       ],
//     },
//     {
//       name: "Tools",
//       items: [
//         {
//           title: "Expenses",
//           icon: MdEqualizer,
//           link: `${demo ? '/demo' : ''}/dashboard/expenses`,
//           mobileLink: false,
//           image: expensesIcon,
//           invert: false,
//           desktop: true,
//           beta: false
//         },
//         {
//           title: "Taxes",
//           icon: MdAssessment,
//           link: `${demo ? '/demo' : ''}/dashboard/tax`,
//           mobileLink: false,
//           image: taxesIcon,
//           invert: false,
//           desktop: true,
//           beta: false
//         },
//         getSmDeviceToolsItem(demo, md),
//         {
//           title: "RiskoMeter",
//           icon: MdMoney,
//           link: `${demo ? '/demo' : ''}/dashboard/riskometer`,
//           mobileLink: false,
//           image: riskProfileIcon,
//           invert: false,
//           desktop: true,
//           beta: false
//         },
//         {
//           title: "FinknowMeter",
//           icon: MdMoney,
//           link: `${demo ? '/demo' : ''}/dashboard/finlit`,
//           mobileLink: false,
//           image: financialLitIcon,
//           invert: false,
//           desktop: true,
//           beta: false
//         },
//         {
//           title: "Rent Receipt",
//           icon: MdMoney,
//           link: `${demo ? '/demo' : ''}/dashboard/rent-receipt`,
//           mobileLink: false,
//           image: rentReceiptIcon,
//           invert: true,
//           desktop: true,
//           beta: false
//         },
//       ],
//     },
//   ];

//   const datafooter = [
//     {
//       name: "",
//       items: [
//         {
//           title: "My Profile",
//           icon: FaUser,
//           link: `${demo ? '/demo' : ''}/dashboard/profile`,
//           danger: false,
//           desktopLink: true,
//           image: false,
//           invert: false,
//         },
//         {
//           title: "Log Out",
//           icon: IoIosExit,
//           link: `${demo ? '#' : '/logout'}`,
//           danger: true,
//           desktopLink: true,
//           image: false,
//           invert: false,
//         },
//       ],
//     },
//   ];

//   return { data, datafooter }
// }

export function Sidebar({ showUser = true }: { showUser?: boolean }) {
  const [active, setActive] = useState(false);
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [copied, setCopied] = useState(false);

  const md = useMediaQuery({ maxWidth: 992 });

  const pathname = usePathname();
  const demo = pathname?.includes('/demo');
  const { data } = getMobileLinks(demo ?? false, md)

  useEffect(() => {
    const interval = setInterval(() => {
      setCopied(false);
    }, 300)

    return () => clearInterval(interval);
  }, [copied])

  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();

  const { user } = useContext(ProfileContext);

  const handleCopyReferral = () => {
    const link = "https://www.wealthup.me?ref=" + (user?.token ?? '');
    navigator.clipboard.writeText(link);
    setCopied(true);
  }

  const showMore = () => {
    controls.start({
      width: "27  0px",
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 1,
      display: "block",
      transition: { delay: 0.3 },
    });
    controlTitleText.start({
      opacity: 1,
      transition: { delay: 0.3 },
    });

    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: "55px",
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 0,
      display: "none",
    });

    controlTitleText.start({
      opacity: 0,
    });

    setActive(false);
  };

  useEffect(() => {
    showMore();
  }, []);

  return <>
    <div className="fixed overflow-y-auto lg:block top-0 left-0 font-robo font-medium hidden w-[19.5rem] bg-white">
      <motion.div
        animate={controls}
        className="max-w-[270px] h-screen animate duration-300 relative flex flex-col justify-between pt-6 overflow-y-auto group"
      >
        <div>
          <div className="mx-4">
            <Link href="/">

              <Image
                src={logo}
                alt="Wealthup Logo"
                height="48"
                width="150"
              />

            </Link>
          </div>
          <div className="grow">
            {data.map((group, index) => (
              <div key={`desktop-group-${index}-${group.name}`} className="my-2">
                <motion.p
                  animate={controlTitleText}
                  className="mb-2 ml-4 text-xl font-robo font-bold text-secondary"
                >
                  {group.name}
                </motion.p>
                {group.items.map((item, index2) => (
                  <React.Fragment key={`desktop-item-${index}-${index2}-${item.title}`}>
                    {item.desktop && (
                      (<Link
                        href={item.link}
                        className={`flex mx-4 pl-2 my-1 py-2 cursor-pointer hover:bg-gray-300 rounded-lg items-center ${pathname === item.link ? "bg-gray-300" : ""
                          }`}>

                        {item.image ? (
                          <div
                            className={`${item.title === "Taxes" || item.title === "Expenses"
                              ? "pt-1"
                              : ""
                              }`}
                          >
                            <Image
                              src={item.image as StaticImageData}
                              alt="WealthoMeter Icon"
                              className={`${item.invert ? "invert" : ""}`}
                              width={20}
                              height={20}
                            />
                          </div>
                        ) : (
                          <item.icon className="text-xl text-secondary" />
                        )}
                        <motion.p
                          animate={controlText}
                          className="mb-0 ml-2 text-lg font-bold text-secondary"
                        >
                          {item.title} {item?.beta && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Beta</span>
                          )}
                        </motion.p>

                      </Link>)
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Add the referral link */}
          <div className="ml-4 mb-0">
            <h4 className="mb-0">Refer a Friend</h4>
            <p>Earn vouchers from your favourite brands like Myntra, Swiggy, Dominos, etc.</p>
            <div className="flex justify-between bg-gray-300 rounded-lg items-center mb-2 h-10">
              <span className="p-2 text-sm text-truncate">https://www.wealthup.me?...</span>
              <button onClick={handleCopyReferral} className="bg-gray-700 p-1 w-8 h-8 flex justify-center items-center rounded-md text-white hover:bg-gray-900 ml-2">
                {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
              </button>
            </div>
          </div>

          {/* <GoldMember /> */}
          {/* <div className="mx-4 my-2">
            {active && (
              <BsFillArrowLeftSquareFill
                onClick={showLess}
                className="text-2xl text-black cursor-pointer"
              />
            )}
            {!active && (
              <BsFillArrowRightSquareFill
                onClick={showMore}
                className="text-2xl text-black cursor-pointer top-10"
              />
            )}
          </div> */}
        </div>
      </motion.div>
    </div>
    <div className="lg:hidden fixed bottom-0 border-t w-screen left-0 bg-white z-[100]">
      <div className="flex justify-between w-full">
        {data.map((group, index) => (
          <React.Fragment key={`mobile-group-${index}-${group.name}`}>
            {group.items.map((item, index2) => (
              <React.Fragment key={`mobile-item-${index}-${index2}-${item.title}`}>
                {item.mobileLink ? (
                  (<Link
                    href={item.link}
                    className={`flex px-2 py-2 cursor-pointer hover:bg-gray-300 items-center ${pathname === item.link ? "" : "opacity-50"
                      } w-1/3 items-center justify-center`}>

                    <div className="flex flex-col gap-2 items-center">
                      {item.image ? (
                        <Image
                          src={item.image as StaticImageData}
                          alt="WealthoMeter Icon"
                          className={`invert`}
                          width={25}
                          height={25}
                        />
                      ) : (
                        <item.icon className="text-3xl text-secondary" />
                      )}
                      <p className="mb-0 text-sm text-center">{item.title.replace('(beta)', '')}</p>
                    </div>

                  </Link>)
                ) : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        {/* <div
          className="flex px-2 py-2 cursor-pointer flex-col gap-2 items-center w-1/4 justify-center"
          onClick={() => setShowTools(!showTools)}
        >
          <FaTools className="text-3xl text-secondary" />
          <p className="mb-0 text-sm">Tools</p>
        </div> */}
        {/* <span className="block w-16"></span> */}
        {/* {datafooter.map((group, index) => (
          <React.Fragment key={index}>
            {group.items.map((item, index2) => (
              <Link href={item.link} key={index2}>
                <a
                  className={`flex mx-4 px-2 py-2 cursor-pointer items-center rounded-lg ${
                    item.danger
                      ? "hover:bg-red-300 text-red-800"
                      : "hover:bg-gray-300 text-secondary"
                  } ${pathname === item.link ? "bg-gray-300" : ""}`}
                >
                  <item.icon className="text-3xl" />
                </a>
              </Link>
            ))}
          </React.Fragment>
        ))} */}
      </div>
    </div>
    {/* {showUser && (
      <div className="fixed top-0 right-0 lg:hidden text-2xl z-40">
        <div className="relative p-4 w-full">
          <span
            className="bg-white shadow-lg w-10 h-10 flex items-center justify-center rounded-full"
            onClick={() => setShowSmallMenu(!showSmallMenu)}
          >
            <FaUser className="text-secondary" />
          </span>
        </div>
      </div>
    )} */}
    {showTools && (
      <ToolsPopOver
        data={data.filter((it) => it.name === "Tools")[0].items}
        setShowTools={setShowTools}
        pathname={pathname ?? ''}
      />
    )}
  </>;
}

const ToolsPopOver: React.FC<{
  data: Array<{
    title: string;
    icon: IconType;
    link: string;
    mobileLink: boolean;
    image: boolean | StaticImageData;
    invert: boolean;
  }>;
  setShowTools: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
}> = ({ data, setShowTools, pathname }) => {
  return (
    <motion.div className="fixed bottom-[70px] right-0 z-20">
      <div className="bg-white rounded-t-md shadow-md h-[180px] w-[200px]">
        <div className="p-4 rounded rounded-t-md">
          <div className="flex flex-col gap-2">
            <p className="mb-0 text-lg font-bold font-robo">Tools</p>
            <div className="flex flex-col gap-2">
              {data.map((it, index) => (
                (<Link href={it.link} key={`tool-${index}-${it.title}`} onClick={() => setShowTools(false)}>

                  <div
                    className={`flex gap-2 items-center p-2 rounded-md hover:bg-gray-300 ${pathname === it.link ? "bg-gray-300" : ""
                      }`}
                  >
                    {it.image ? (
                      <Image
                        src={it.image as StaticImageData}
                        alt="WealthoMeter Icon"
                        className={`invert`}
                        width={20}
                        height={20}
                      />
                    ) : (
                      <it.icon className="flex-shrink-0 text-xl" />
                    )}
                    <p className="mb-0 text-base">{it.title}</p>
                  </div>

                </Link>)
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};