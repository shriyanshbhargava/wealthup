"use client"
import { AboutWealthoMeter } from "./AboutWealthoMeter";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { HeaderController } from "../../display/HeaderController";
import Image from "next/legacy/image";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import React from "react";
import { WealthoMeterQuestions } from "./WealthoMeterQuestions";
import { baseUrl } from "@/utils/constants";
import image4 from "@/assets/images/wealthometer/4. More about the WealthoMeter.jpeg";
import takeWelthometerTestImage from "@/assets/images/wealthometer/Right Side_ Take the wealthometer.jpg";
import { useRouter } from "next/navigation";
import whatIsWealthometerImage from "@/assets/images/wealthometer/Left side_ What is the wealthometer.jpg";

// import Header from "@/components/ui/header";

const WealthoMeter = () => {
  const [learnMore, setLearnMore] = React.useState<boolean>(false);
  const [showQuestions, setShowQuestions] = React.useState<boolean>(false);
  const [showSampleReport, setShowSampleReport] =
    React.useState<boolean>(false);

  const { query, pathname } = useRouter();

  const handleShowLearnMore = () => {
    setLearnMore(true);
  };

  const handleCloseLearnMore = () => setLearnMore(false);

  const handleShowQuestions = () => {
    setShowQuestions(true);
  };
  const handleCloseQuestions = () => setShowQuestions(false);

  return <>
    <HeaderController
      title="Hey! Check out this free-to-use tool and assess how well you’re managing your wealth!"
      description="Created by the financial experts at wealthup"
      embed={{ image: `${baseUrl}/assets/wealthometer.jpeg` }}
      additionalKeywords="wealthup, wealthometer, wealthup.me, finance, money, investment"
    />
    <div className="overflow-hidden">
      <Header />
      <AnimatePresence>
        <section className="overflow-x-hidden md:w-screen md:h-screen md:min-h-[900px] flex flex-col items-center justify-center py-16 md:py-0 mx-6 md:mx-0 md:px-6">
          <div className="mb-6 flex flex-col items-center">
            <h1 className="text-[4.8vw] sm:text-[3.4vw] mb-0 md:text-[3.4vw] lg:text-[2.8vw] xl:text-[2.4vw]">
              Welcome to WealthoMeter
            </h1>
            <p className="text-center text-[3.4vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.8vw] xl:text-[1.2vw]">
              A free, easy-to-use tool to understand the overall health of
              your finances.
              <br /> Unlock financial clarity and take control of your wealth!
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-24">
            <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center md:-order-last order-last">
              <div className="w-3/4 md:w-[35%] h-auto min-h-[1px] mb-2rem">
                <Image src={whatIsWealthometerImage} alt="wealthometer" />
              </div>
              <h2 className="font-robo font-medium my-2 text-[4.2vw] sm:text-[3vw] md:text-[3vw] lg:text-[2.2vw] xl:text-[2vw]">
                What is WealthoMeter?
              </h2>
              <span className="w-full md:w-[60%] text-center text-[3.4vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.8vw] xl:text-[1.2vw] font-robo font-normal pb-8 mt-4 mb-2">
                An assessment that gives you a scorecard about your financial
                health along with suggestions to take your wealth to the next
                level!
              </span>
              <Link href={`${pathname}/learn-more`}>

                <Button size="bigger" className="btn">Learn More</Button>

              </Link>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              <div className="w-3/4 md:w-[35%] h-auto min-h-[1px] mb-2rem">
                <Image src={takeWelthometerTestImage} alt="wealthometer" />
              </div>
              <h2 className="font-robo font-medium my-2 text-[4.2vw] sm:text-[3vw] md:text-[3vw] lg:text-[2.2vw] xl:text-[2vw]">
                Use WealthoMeter Now
              </h2>
              <span className="w-full md:w-1/2 text-center text-[3.4vw] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.8vw] xl:text-[1.2vw] font-robo font-normal pb-8 mt-4 mb-2">
                Check-out a{" "}
                <span
                  onClick={() => setShowSampleReport(true)}
                  className="text-blue-700 underline cursor-pointer"
                >
                  sample scorecard
                </span>{" "}
                to see what you get when you complete the WealthoMeter assessment.
              </span>
              <Link href={`${pathname}/questions`}>

                <Button size="bigger" className="btn">Start Now</Button>

              </Link>
            </div>
          </div>
        </section>
        <Footer />
        {learnMore && (
          <AboutWealthoMeter
            handleExit={handleCloseLearnMore}
            key="info"
            showQuestions={handleShowQuestions}
          />
        )}
        {showQuestions && <WealthoMeterQuestions key="questions" />}
        {showSampleReport && (
          <SampleReportModal onClose={() => setShowSampleReport(false)} />
        )}
      </AnimatePresence>
    </div>
  </>;
};

export default WealthoMeter;

const SampleReportModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <>
      <div className="fixed top-0 right-0 z-40 w-screen h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="h-4/5 w-full md:w-2/3 lg:w-1/2 md:h-5/6 bg-[#C3466A] md:rounded-xl shadow-2xl">
            <div className="flex justify-between p-4">
              <h3 className="text-white text-lg">Sample Report</h3>
              <IoIosCloseCircle
                // size={40}
                onClick={onClose}
                className="cursor-pointer w-8 h-8 md:w-10 md:h-10 text-white hover:text-gray-300"
              />
            </div>
            <div className="flex items-center justify-center h-4/5 w-full">
              <div className="h-[65%] w-full md:w-3/5 lg:w-[25%] absolute">
                <Image src={image4} alt="Sample Report" layout="fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
