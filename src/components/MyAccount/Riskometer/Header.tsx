import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosCopy } from "react-icons/io";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'

import Container from "../../ui/Container";
import { toast } from "react-toastify";
import HeaderNav from "../MutualFundsAnalyser/HeaderNav";
import Breadcrumbs from "@/components/Breadcrumbs";
import DonughtChart from "@/components/MyAccount/Dashboard/DonughtChart";

interface HeaderProps {
  name: string;
  result: string;
  shareUrl: string;
  tool: string;
  meterPercentage: number;
  title?: string;
  response?: any;
}

export const Header: React.FC<HeaderProps> = ({ 
  name, 
  result, 
  shareUrl, 
  tool, 
  meterPercentage, 
  title,
  response 
}) => {
  interface Crumb {
    label: string;
    path?: any;
  }
  const crumbs: Crumb[] = [
    { label: 'Home', path: '/' },
    { label: tool, path: null },
  ];
  const res = response ? Object.keys(response).length : 0;


  const [rotate, setRotate] = React.useState<string>("0deg");
  const [notDoneRiskTest, setNotDoneRiskTest] = React.useState<boolean>(false);

  const handleShare = (media: string) => { };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied");
  };

  useEffect(() => {
    let percentage = meterPercentage * 100;

    percentage = percentage > 180 ? 180 : percentage < 0 ? 0 : percentage;
    setRotate(`${percentage}deg`);
  }, []);

  useEffect(() => {
    if (!response || res === 0) {
      if (!result) {
        setNotDoneRiskTest(true);
      }
    }
  }, [res, response, result]);

  return (
    <>
      <HeaderNav whatsapp={false} showBtn={true} showNotification={true} title={`${tool} report for ${name}`} beta={false} />
      {/* <header className="h-24 w-full report-header">
        <Container>
          <div className="h-full flex justify-center items-center">
            <h1 className="text-lg md:text-3xl text-white mb-0 capitalize">
              {tool} report for {name}
            </h1>
          </div>
        </Container>
      </header> */}
      <div className="px-4 mt-4"><Breadcrumbs crumbs={crumbs} /></div>
      <Container>
        {notDoneRiskTest && <RiskPopUp />}
        <div className="md:my-6 flex lg:flex-row flex-col my-4 justify-between">
          <div className="my-8 flex w-full lg:w-1/2 items-center">
            <div className="flex flex-col gap-4">
              <p className="mb-0 text-lg md:text-2xl font-robo font-normal">
                Hey {name} <br />
                Here&apos;s your {tool} report. <br />
                If you find this tool helpful, share it with your friends and
                earn reward points!
              </p>
              <div className="flex w-full">
                <div className="flex items-center bg-slate-300 w-full px-6 py-2 overflow-x-auto">
                  <p className="mb-0">{shareUrl}</p>
                </div>
                <div
                  onClick={handleCopyLink}
                  className="bg-slate-400 px-4 cursor-pointer hover:bg-slate-500 py-2 text-white flex items-center justify-center"
                >
                  <IoIosCopy size={30} />
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title || '')} ${encodeURIComponent(shareUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 rounded-full p-2 hover:bg-green-600 transition-colors hover:scale-110"
                >
                  <FaWhatsapp color="white" size={28} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                 className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors hover:scale-110"
                >
                  <FaLinkedin color="white" size={28} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                 className="bg-blue-800 rounded-full p-2 hover:bg-blue-900 transition-colors hover:scale-110"
                >
                  <FaFacebook color="white" size={28} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl || '')}&text=${encodeURIComponent(title || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                 className="bg-blue-400 rounded-full p-2 hover:bg-blue-500 transition-colors hover:scale-110"
                >
                  <FaTwitter color="white" size={28} />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:mr-[3.5rem] flex flex-col py-6 md:py-0 items-center">
            <div className="relative four rischio3 mt-4">
              <div className="absolute top-0 flex justify-center w-full">
                <h2 className="text-2xl font-extrabold uppercase text-[#0082B2] ">
                  Risk Profile
                </h2>
              </div>
              <DonughtChart />
              <motion.div
                initial={{ rotate: "0deg" }}
                animate={{ rotate }}
                className="needle"
              ></motion.div>
              <div className="absolute bottom-0 w-full">
                {tool === "RiskoMeter" ? (
                  <p className="text-xl text-center leading-none font-bold text-[#0082B2] uppercase">
                    You&quot;re a <br />
                    {result} Risk Taker
                  </p>
                ) : (
                  <p className="text-xl text-center leading-none font-bold text-[#0082B2] uppercase">
                    You have a {result} <br />
                    level of knowledge
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const RiskPopUp: React.FC<{}> = ({ }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 99999999 }}>
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <p className="text-xl text-gray-600 ">You haven&apos;t taken the risk profile test yet.</p>
        <button
          onClick={() => { window.location.href = 'https://www.wealthup.me/risk-profile/test' }}
          className="mt-4 bg-[#FB7706] text-white px-4 py-2 rounded-lg"
        >
          Please take your risk profile test.
        </button>
      </div>
    </div>
  )
};