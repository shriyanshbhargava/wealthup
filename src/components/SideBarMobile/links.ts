import { FaCheck, FaCopy, FaTools, FaUser } from "react-icons/fa";
import {
  MdAssessment,
  MdEqualizer,
  MdMoney,
  MdOutlineDashboard,
} from "react-icons/md";

import { AiFillMessage } from "react-icons/ai";
import { IoIosExit } from "react-icons/io";
import expensesIcon from "@/assets/icons/Expenses.png";
import financialLitIcon from "@/assets/icons/Financial Literacy Icon.png";
import investmentIcon from "@/assets/icons/Investments.png";
import portfolioAnalyserIcon from "@/assets/icons/portfolio_analyser.png";
import rentReceiptIcon from "@/assets/icons/Rent_Receipt_Generator.png";
import riskProfileIcon from "@/assets/icons/Risk Profile Icon.png";
import taxesIcon from "@/assets/icons/Taxes.png";
import wealthometerIcon from "@/assets/images/dashboard/wealthometer.png";

export const getLinks = (demo: boolean, md: boolean) => {
  const data = [
    {
      name: "",
      items: [
        {
          title: "Dashboard",
          icon: MdOutlineDashboard,
          link: `${demo ? '/demo' : ''}/dashboard`,
          mobileLink: true,
          image: false,
          invert: false,
          mobile: true,
          desktop: true,
          beta: false
        },
        getSmDeviceItem(demo, md),
        {
          title: "Portfolio Analyser",
          icon: AiFillMessage,
          link: `${demo ? '/demo' : ''}/dashboard/investments/portfolio-analyser`,
          image: portfolioAnalyserIcon,
          mobileLink: true,
          invert: false,
          mobile: true,
          desktop: true,
          beta: true
        },
        {
          title: "Expenses",
          icon: MdEqualizer,
          link: `${demo ? '/demo' : ''}/dashboard/expenses`,
          mobileLink: false,
          image: expensesIcon,
          invert: false,
          mobile: false,
          desktop: false,
          beta: false
        },
      ],
    },
    {
      name: "Tools",
      items: [
        {
          title: "Expenses",
          icon: MdEqualizer,
          link: `${demo ? '/demo' : ''}/dashboard/expenses`,
          mobileLink: false,
          image: expensesIcon,
          invert: false,
          desktop: true,
          beta: false
        },
        {
          title: "Taxes",
          icon: MdAssessment,
          link: `${demo ? '/demo' : ''}/dashboard/tax`,
          mobileLink: false,
          image: taxesIcon,
          invert: false,
          desktop: true,
          beta: false
        },
        getSmDeviceToolsItem(demo, md),
        {
          title: "RiskoMeter",
          icon: MdMoney,
          link: `${demo ? '/demo' : ''}/dashboard/riskometer`,
          mobileLink: false,
          image: riskProfileIcon,
          invert: false,
          desktop: true,
          beta: false
        },
        {
          title: "FinknowMeter",
          icon: MdMoney,
          link: `${demo ? '/demo' : ''}/dashboard/finlit`,
          mobileLink: false,
          image: financialLitIcon,
          invert: false,
          desktop: true,
          beta: false
        },
        {
          title: "Rent Receipt",
          icon: MdMoney,
          link: `${demo ? '/demo' : ''}/dashboard/rent-receipt`,
          mobileLink: false,
          image: rentReceiptIcon,
          invert: true,
          desktop: true,
          beta: false
        },
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
          link: `${demo ? '/demo' : ''}/dashboard/profile`,
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
      link: `${demo ? '/demo' : ''}/dashboard/wealthometer`,
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
      link: `${demo ? '/demo' : ''}/dashboard/investments`,
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
      link: `${demo ? '/demo' : ''}/dashboard/investments`,
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
      link: `${demo ? '/demo' : ''}/dashboard/wealthometer`,
      mobileLink: false,
      image: wealthometerIcon,
      invert: false,
      desktop: true,
      beta: true
    }
  }
}