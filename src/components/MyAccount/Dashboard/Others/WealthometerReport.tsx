"use client"

import { baseUrl, whatsappHelpLink } from "@/utils/constants";

import Breadcrumbs from "@/components/Breadcrumbs";
import { BsInfoCircle } from "react-icons/bs";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import DonughtChart from "../DonughtChart";
import Footer from "@/components/ui/footer";
import Image from "next/legacy/image";
import Link from "next/link";
import { PercentilePopup } from "../PercentilePopup";
import PopOver from "@/components/ui/PopOver";
import React from "react";
import { Spinner } from "@/components/ui/Spinner";
import { TableRow } from "../TableRow";
import icon1 from "@/assets/icons/human-emoji.png";
import icon2 from "@/assets/icons/20-39 percentile.png";
import icon3 from "@/assets/icons/40-59 percentile.png";
import icon4 from "@/assets/icons/60-79 percentile.png";
import icon5 from "@/assets/icons/80-100 percentile.png";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { wealthometerReportCrumbs } from "@/utils/Breadcrumbs";

function ordinarySuffixOf(i: number) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

const WealthometerReport: React.FC<{ data?: any; footer?: boolean }> = ({
  data,
  footer = true,
}) => {


  const [rotate, setRotate] = React.useState<string>("0deg");
  const [showPercentileInfo, setShowPercentileInfo] =
    React.useState<boolean>(false);

  const pathname = usePathname();

  const handleShare = (platform: string) => { 
    // Implement sharing logic if needed 
  };

  React.useEffect(() => {
    const percentScore = 100 / data.result.total;
    setRotate(`${180 / percentScore}deg`);
  }, [data]);

  const label =
    data.result.total < 30
      ? "Financially Vulnerable"
      : data.result.total < 70
        ? "Financially Coping"
        : "Financially Healthy";

  const color = data.result.total < 30
    ? "text-[#ef4444]"
    : data.result.total < 70
      ? "text-[#fb923c]"
      : "text-[#16a34a]";

  let retiermentAgeColor = data.retiermentAge < 45 ? "text-[#16a34a]" : data.retiermentAge < 65 ? "text-[#fb923c]" : "text-[#ef4444]"
  if (color === "text-[#ef4444]" && retiermentAgeColor === "text-[#16a34a]") {
    retiermentAgeColor = "text-[#fb923c]";
  }

  const demo = pathname.includes('/demo');

  return (
    <div className="bg-white">
      <header className="report-header h-24 w-full">
        <Container >
          <div className="h-full flex items-center">
            <h1 className="text-base md:text-2xl text-left text-white mb-0 mr-2 capitalize">
              Free WealthoMeter report for <br className="sm:hidden" /> {demo ? 'Guest' : data.name}
            </h1>
          </div>
        </Container>
      </header>
      <div className="mt-4 px-4 flex justify-between w-full">
        <Breadcrumbs crumbs={wealthometerReportCrumbs} />
        {/* <Link href="/myaccount/wealthometer/pro">
          <a className="text-primary underline">Try WealthoMeter PRO!</a>
        </Link> */}
      </div>
      <Container>
        <div className="md:my-4 flex lg:flex-row flex-col my-4 justify-between">
          <div className="my-8 flex w-full lg:w-3/5 items-center">
            <div className="flex flex-col gap-4">
              <p className="mb-0 text-lg md:text-2xl font-robo font-normal">
                Hi {data.name} <br />
                Based on your responses, you are
                {" "}<span className={`${color} font-bold`}>
                  {label}
                </span>.
              </p>
              <p className="mb-0 text-lg md:text-2xl font-robo font-normal">You are expected to retire at <span className={`${retiermentAgeColor} font-bold`}>{data.retiermentAge ?? 32}</span></p>
              <p className="mb-0 text-lg md:text-2xl mt-4 font-robo font-normal">Improve your financial health by following your personalised journey.</p>
              <div className="flex gap-4 w-full">
                <Link href='rewards' className="w-full">

                  <button
                    className="w-full md:w-fit bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl"
                    onClick={() => handleShare("WhatsApp")}>
                    Go To Roadmap
                  </button>

                </Link>
              </div>
              {/*<div className="flex gap-4">
                <WhatsappShareButton url={shareUrl}>
                  <button onClick={() => handleShare("WhatsApp")}>
                    <WhatsappIcon size={40} round />
                  </button>
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <button onClick={() => handleShare("LinkedIn")}>
                    <LinkedinIcon size={40} round />
                  </button>
                </LinkedinShareButton>
                <FacebookShareButton url={shareUrl}>
                  <button onClick={() => handleShare("Facebook")}>
                    <FacebookIcon size={40} round />
                  </button>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <button onClick={() => handleShare("Twitter")}>
                    <TwitterIcon size={40} round />
                  </button>
                </TwitterShareButton>
              </div>*/}
            </div>
          </div>
          <div className="lg:mr-[3.5rem] flex flex-col my-6 md:my-0 items-center">
            <div className="relative four rischio3 mt-4">
              <h2 className="w-full text-center absolute top-10 text-2xl font-extrabold uppercase text-[#0082B2] -mb-4">
                Financial Health
              </h2>
              <DonughtChart />
              <motion.div
                initial={{ rotate: "0deg" }}
                animate={{ rotate }}
                className="needle"
              ></motion.div>
              <div className="absolute bottom-0 w-full">
                <p className={`text-xl text-center leading-none font-bold ${color} uppercase`}>
                  {data.result.total}/100 <br /> {label}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-16">
          <p className="flex gap-2 items-center text-2xl md:text-4xl text-[#0082B2] font-bold">
            Your Percentile Rank{" "}
            <BsInfoCircle
              className="cursor-pointer"
              onClick={() => setShowPercentileInfo(true)}
            />
          </p>
          <div className="flex gap-4">
            {Array.from([
              icon1,
              icon1,
              icon2,
              icon2,
              icon3,
              icon3,
              icon4,
              icon4,
              icon5,
              icon5,
            ]).map((icon, index) => (
              <div key={index} className="relative">
                <Image src={icon1} alt="Icon" width="50" height="50" />
                {Math.floor(Math.abs(data.percentile) * 0.8 * 10) === index ? (
                  <div className="absolute -bottom-[64px] w-52">
                    <PopOver
                      flip={index >= 7}
                      label={
                        data.percentileLabel ??
                        `You are in the ${ordinarySuffixOf(
                          Math.floor(Math.abs(data.percentile) * 0.8 * 100)
                        )} percentile`
                      }
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="my-6">
          <table className="w-full">
            <thead className="hidden lg:flex border-b-2">
              <th className="w-2/5 text-lg md:text-2xl font-bold py-6">
                Factor
              </th>
              <th className="w-[10%] text-lg md:text-2xl font-bold py-6">
                Score
                <p className="test-md">(Out of 10)</p>
              </th>
              <th className="w-2/5 text-lg md:text-2xl font-bold py-6">
                Rating
              </th>
              <th className="w-[10%] py-6"></th>
            </thead>
            <tbody>
              <TableRow
                score={data.result.Sa}
                letters={"SA"}
                title="Savings"
                description="The portion of income not spent on monthly expenditures. It's the money set aside for future use."
                imporveScoreText={
                  data.result.Sa >= 0 && data.result.Sa < 8
                    ? "Set aside/invest at least 20% of your monthly income soon after receiving salary and spend only what is left."
                    : "Good job with your savings!"
                }
                helpfulTip={
                  data?.result.Sa >= 0 && data?.result.Sa < 8
                    ? "Your savings are on the lower side. Aim to save at least 20% of your income. Consider cutting back on discretionary spending like eating out, shopping, or subscriptions you don't need."
                    : data?.result.Sa >= 8 && data?.result.Sa < 18
                        ? "You're saving a good portion of your income. Consider saving more than 50% by controlling expenses as your income grows. Setting up automated investments can help make saving easier."
                        : "You are doing a great job at saving! Continue saving well and invest the savings properly to generate good returns."
                }
              />
              <TableRow
                score={data.result.L}
                letters="L"
                title="Liquidity"
                description="Expenses vary every month. This is the amount you should keep in your savings bank account for day-to-day expenses."
                imporveScoreText={
                  data.result.L >= 0 && data.result.L < 8
                    ? "Maintain approx. 2 months of your monthly expense in your savings account to conveniently manage expenses."
                    : "Good job you're maintaining adequate funds for managing your expenses!"
                }
                helpfulTip={
                  data.result.L >= 0 && data.result.L < 8
                    ? "Keeping too little amount can cause you trouble in case you need cash. Keeping too much, you lose the opportunity to make good returns."
                    : "Maintaining an adequate amount helps you conveniently make expenses without losing the potential of generating higher returns through investments."
                }
              />
              <TableRow
                score={data.result.E}
                letters="E"
                title="Emergency Fund"
                description="A financial safety net for future mishaps and/or unexpected expenses. You can fall back on this fund at the hour of crisis."
                imporveScoreText={
                  data.result.E >= 0 && data.result.E < 8
                    ? "Maintain 3-12 times of your monthly expenses, depending on your situation, in emergency fund."
                    : "You're well prepared for an emergency. Good job with creating your emergency fund!"
                }
                helpfulTip={
                  data.result.E >= 0 && data.result.E < 8
                    ? "Keeping too little amount can cause you trouble in case you need cash. Keeping too much, you lose the opportunity to make good returns."
                    : "Instead of keeping the emergency fund in your savings account or fixed deposit, diversify to maintain easy access but still make better returns than a fixed deposit."
                }
              />
              <TableRow
                score={data.result.Co}
                letters="CO"
                title="Coverage"
                description="Health and life insurance to cover your risk and protect you and your loved ones in unforeseen mishaps."
                imporveScoreText={
                  data.result.Co >= 0 && data.result.Co < 8
                    ? "Get sufficient coverage both for health and life insurance."
                    : "Good job you're adequately covered with your insurance policies!"
                }
                helpfulTip={
                  data.result.Co >= 0 && data.result.Co < 8
                    ? "Insufficient or bad policies puts you and your family at risk and can disrupt your financial plan."
                    : "Make sure the details of your nominees are updated and they are aware of all your policies."
                }
              />
              <TableRow
                score={data.result.In}
                letters="IN"
                title="Investments"
                description="This includes all your investments across stocks, mutual funds, bonds, gold (excluding jewellery), real estate, emergency fund, bank balance and cash."
                imporveScoreText={
                  data.result.In >= 0 && data.result.In < 8
                    ? "Invest your savings properly so that they can grow at a faster rate than inflation."
                    : "Good job with your investments!"
                }
                helpfulTip={
                  data.result.In >= 0 && data.result.In < 8
                    ? "Building a diversified portfolio and monitoring it are extremely important to building an investment portfolio that can keep you ahead of the curve. Contact an expert if you need help."
                    : "Building a diversified portfolio and monitoring it are extremely important to building an investment portfolio that can keep you ahead of the curve. Contact an expert if you need help."
                }
              />
            </tbody>
          </table>
        </div>
      </Container>
      <div className="flex flex-col justify-center items-center mt-4 pb-8">
        <p className="mb-2 text-lg md:text-2xl mt-4">Explore your personalised journey</p>
        <div>
          <Link href='rewards' legacyBehavior>
            <button
              className="w-full md:w-fit bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl"
              onClick={() => handleShare("WhatsApp")}>
              Go To Roadmap
            </button>
          </Link>
        </div>
      </div>
      {footer && <Footer />}
      <PercentilePopup
        show={showPercentileInfo}
        onClose={() => setShowPercentileInfo(false)}
      />
      <div className="fixed flex z-10 bottom-28 lg:bottom-5 right-2">
        <div className="px-3 py-1 md:py-2 rounded-full bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200">
          <a href={whatsappHelpLink} className="flex items-center gap-2" >
            <p className="text-xs md:text-sm text-white mb-0 leading-tight">To fix your finances</p>
            <div className="cursor-pointer">
              <Image
                src="/assets/img/whatsapp.png"
                alt="Whatsapp Logo"
                width={40}
                height={40}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WealthometerReport;
