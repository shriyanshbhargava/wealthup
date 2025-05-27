import {
  MdAssessment,
  MdEqualizer,
  MdMoney,
  MdOutlineDashboard,
} from "react-icons/md";
import { useEffect, useState } from "react";

import { AiFillMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Goals from "@/../public/assets/bottom-bar/Goals.png"
import { IoIosExit } from "react-icons/io";
import PortfolioAnalyzer from "@/../public/assets/bottom-bar/PortfolioAnalyzer.svg"
import Storage from '@/utils/storage';
import { TbReportSearch } from "react-icons/tb"
import { UserApi } from "@/api/services/user/UserApi";
import dashboardIcon from '@/assets/sidebar/dashboard.png';
import expensesIcon from "@/assets/sidebar/expenses.png";
import financialLitIcon from "@/assets/sidebar/finknowmeter.png";
import goal from "@/../public/assets/bottom-bar/goals.svg"
import home from "@/../public/assets/bottom-bar/home.svg"
import investmentIcon from "@/assets/sidebar/investments.png";
import investments from "@/../public/assets/bottom-bar/investments.svg"
import investmentsIcon from '@/assets/sidebar/investments.png';
import portfolioAnalyserIcon from "@/assets/sidebar/portfolio-analyser.png";
import rentReceiptIcon from "@/assets/sidebar/rent-receipt.png";
import riskProfileIcon from "@/assets/sidebar/riskometer.png";
import taxesIcon from "@/assets/sidebar/taxes.png";
import transact from "@/../public/assets/bottom-bar/transact.png"
import wealthometerIcon from "@/assets/sidebar/wealthometer.png";

export const getMobileLinks = (demo: boolean, md: boolean) => {
  const data = [
    {
      name: "",
      items: [
        {
          title: "Dashboard",
          icon: home,
          link: `${demo ? '/demo' : '/myaccount'}/dashboard`,
          mobileLink: true,
          image: home,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false
        },

        {
          title: "Investment Portfolio",
          icon: investments,
          link: `${demo ? '/demo' : '/myaccount'}/portfolio`,
          mobileLink: true,
          image: investments,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false,
        },
        {
          title: "Transact",
          icon: transact,
          link: `${demo ? '/demo' : '/myaccount'}/transact/mutualfunds`,
          mobileLink: true,
          image: transact,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false,
        },
        {
          title: "MFPA",
          icon: MdOutlineDashboard,
          link: `${demo ? '/demo' : '/myaccount'}/mutualfundanalyser `,
          mobileLink: true,
          image: PortfolioAnalyzer,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false
        }
        ,
        {
          title: "Goals",
          icon: MdOutlineDashboard,
          link: `${demo ? '/demo' : '/myaccount'}/goals`,
          mobileLink: true,
          image: Goals,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false
        },
        // getSmDeviceItem(demo, md),
        // {
        //   title: "WealthoMeter (beta)",
        //   icon: MdMoney,
        //   link: `${demo ? '/demo' : '/myaccount'}/wealthometer`,
        //   mobileLink: true,
        //   image: wealthometerIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: true
        // },
        // {
        //   title: "Portfolio Analyser",
        //   icon: AiFillMessage,
        //   link: `${demo ? '/demo' : '/myaccount'}/investments/portfolio-analyser`,
        //   image: portfolioAnalyserIcon,
        //   mobileLink: true,
        //   invert: false,
        //   mobile: true,
        //   desktop: true,
        //   beta: true
        // },
        // {
        //   title: "Portfolio-analyser",
        //   icon: goals,
        //   link: `${demo ? '/demo' : '/myaccount'}/portfolio-analyser/summary`,
        //   image: goals,
        //   mobileLink: true,
        //   invert: false,
        //   mobile: true,
        //   desktop: true,
        //   beta: true
        // },
        // {
        //   title: "Taxes",
        //   icon: MdAssessment,
        //   link: `${demo ? '/demo' : '/myaccount'}/tax`,
        //   mobileLink: true,
        //   image: taxesIcon,
        //   invert: false,
        //   mobile: true,
        //   desktop: true,
        //   beta: false
        // },
        // {
        //   title: "Expenses",
        //   icon: MdEqualizer,
        //   link: `${demo ? '/demo' : '/myaccount'}/expenses`,
        //   mobileLink: false,
        //   image: expensesIcon,
        //   invert: false,
        //   mobile: false,
        //   desktop: false,
        //   beta: false
        // },
      ],
    },
    {
      name: "Tools",
      items: [
        // {
        //   title: "Expenses",
        //   icon: MdEqualizer,
        //   link: `${demo ? '/demo' : '/myaccount'}/expenses`,
        //   mobileLink: false,
        //   image: expensesIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: false
        // },
        // getSmDeviceToolsItem(demo, md),
        {
          title: "RiskoMeter",
          icon: MdMoney,
          link: `${demo ? '/demo' : '/myaccount'}/riskometer`,
          mobileLink: false,
          image: riskProfileIcon,
          invert: false,
          desktop: true,
          beta: false
        },
        // {
        //   title: "FinknowMeter",
        //   icon: MdMoney,
        //   link: `${demo ? '/demo' : '/myaccount'}/finlit`,
        //   mobileLink: false,
        //   image: financialLitIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: false
        // },
        {
          title: "Rent Receipt",
          icon: MdMoney,
          link: `${demo ? '/demo' : '/myaccount'}/rent-receipt`,
          mobileLink: false,
          image: rentReceiptIcon,
          invert: true,
          desktop: true,
          beta: false
        },
      ],
    },
  ]

  return { data }
}

export const getLinks = (demo: boolean, md: boolean) => {
  const data = [
    {
      name: "",
      items: [
        {
          title: "Dashboard",
          icon: MdOutlineDashboard,
          link: `${demo ? '/demo' : '/myaccount'}/dashboard`,
          mobileLink: true,
          image: dashboardIcon,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false
        },
        {
          title: "Investment Portfolio",
          icon: "",
          link: `${demo ? '/demo' : '/myaccount'}/portfolio`,
          mobileLink: true,
          image: investmentsIcon,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false,
        },
        {
          title: "Transact",
          icon: '',
          link: `${demo ? '/demo' : '/myaccount'}/transact/mutualfunds`,
          mobileLink: true,
          image: transact,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false,
        },
        {
          title: "Mutual Fund Analyzer",
          icon: MdOutlineDashboard,
          link: `${demo ? '/demo' : '/myaccount'}/mutualfundanalyser `,
          mobileLink: true,
          image: PortfolioAnalyzer,
          invert: false,
          mobile: false,
          desktop: true,
          beta: false
        }
        ,
        {
          title: "Goal Tracker",
          icon: MdOutlineDashboard,
          link: `${demo ? '/demo' : '/myaccount'}/goals`,
          mobileLink: true,
          image: Goals,
          invert: false,
          mobile: false,
          desktop: true,
          beta: false
        },
        {
          title: "Reports",
          icon: TbReportSearch,
          link: `${demo ? '/demo' : '/myaccount'}/reports`,
          mobileLink: true,
          invert: false,
          mobile: false,
          desktop: true,
          beta: false
        },
        // getSmDeviceItem(demo, md),
        // {
        //   title: "WealthoMeter (beta)",
        //   icon: MdMoney,
        //   link: `${demo ? '/demo' : '/myaccount'}/wealthometer`,
        //   mobileLink: true,
        //   image: wealthometerIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: true
        // },
        // {
        //   title: "Portfolio Analyser",
        //   icon: AiFillMessage,
        //   link: `${demo ? '/demo' : '/myaccount'}/investments/portfolio-analyser`,
        //   image: portfolioAnalyserIcon,
        //   mobileLink: true,
        //   invert: false,
        //   mobile: true,
        //   desktop: true,
        //   beta: true
        // },
        // {
        //   title: "Portfolio Analyser (beta)",
        //   icon: AiFillMessage,
        //   link: `${demo ? '/demo' : '/myaccount'}/portfolio-analyser/summary`,
        //   image: portfolioAnalyserIcon,
        //   mobileLink: true,
        //   invert: false,
        //   mobile: true,
        //   desktop: true,
        //   beta: true
        // },
        // {
        //   title: "Expenses",
        //   icon: MdEqualizer,
        //   link: `${demo ? '/demo' : '/myaccount'}/expenses`,
        //   mobileLink: false,
        //   image: expensesIcon,
        //   invert: false,
        //   mobile: false,
        //   desktop: false,
        //   beta: false
        // },
      ],
    },
    {
      name: "Tools",
      items: [
        // {
        //   title: "Expenses",
        //   icon: MdEqualizer,
        //   link: `${demo ? '/demo' : '/myaccount'}/expenses`,
        //   mobileLink: false,
        //   image: expensesIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: false
        // },
        // {
        //   title: "Taxes",
        //   icon: MdAssessment,
        //   link: `${demo ? '/demo' : '/myaccount'}/tax`,
        //   mobileLink: false,
        //   image: taxesIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: false
        // },
        // getSmDeviceToolsItem(demo, md),
        {
          title: "RiskoMeter",
          icon: MdMoney,
          link: `${demo ? '/demo' : '/myaccount'}/riskometer`,
          mobileLink: false,
          image: riskProfileIcon,
          invert: false,
          desktop: true,
          beta: false
        },
        // {
        //   title: "FinknowMeter",
        //   icon: MdMoney,
        //   link: `${demo ? '/demo' : '/myaccount'}/finlit`,
        //   mobileLink: false,
        //   image: financialLitIcon,
        //   invert: false,
        //   desktop: true,
        //   beta: false
        // },
        // {
        //   title: "Rent Receipt",
        //   icon: MdMoney,
        //   link: `${demo ? '/demo' : '/myaccount'}/rent-receipt`,
        //   mobileLink: false,
        //   image: rentReceiptIcon,
        //   invert: true,
        //   desktop: true,
        //   beta: false
        // },
      ],
    },
  ];

  const datafooter = [
    {
      name: "",
      items: [
        {
          title: "My Profile",
          icon: FaUser,
          link: `${demo ? '/demo' : '/myaccount'}/profile`,
          danger: false,
          desktopLink: true,
          image: false,
          invert: false,
        },
        {
          title: "Log Out",
          icon: IoIosExit,
          link: `${demo ? '#' : '/logout'}`,
          danger: true,
          desktopLink: true,
          image: false,
          invert: false,
        },
      ],
    },
  ];

  return { data, datafooter }
}

const getSmDeviceItem = (demo: boolean, sm: boolean) => {
  if (true) {
    return {
      title: "WealthoMeter",
      icon: MdMoney,
      link: `${demo ? '/demo' : '/myaccount'}/wealthometer/old`,
      mobileLink: true,
      image: wealthometerIcon,
      invert: false,
      desktop: true,
      beta: true
    }

  } else {
    return {
      title: "Investments",
      icon: AiFillMessage,
      link: `${demo ? '/demo' : '/myaccount'}/investments`,
      image: investmentIcon,
      mobileLink: true,
      invert: false,
      mobile: true,
      desktop: true,
      beta: false
    }
  }
}

const getSmDeviceToolsItem = (demo: boolean, sm: boolean) => {
  if (true) {
    return {
      title: "Investments",
      icon: AiFillMessage,
      link: `${demo ? '/demo' : '/myaccount'}/investments`,
      image: investmentIcon,
      mobileLink: false,
      invert: false,
      mobile: true,
      desktop: true,
      beta: false
    }
  } else {
    return {
      title: "WealthoMeter",
      icon: MdMoney,
      link: `${demo ? '/demo' : '/myaccount'}/wealthometer`,
      mobileLink: false,
      image: wealthometerIcon,
      invert: false,
      desktop: true,
      beta: true
    }
  }
}

