'use client'

import '@/styles/newstyles.css'
import '@/styles/globals.css'

import React, { useState } from "react";

import Backings from "@/components/wealthometer-new/Backings";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/ui/ButtonNew";
import ClientCompanies from "@/components/wealthometer-new/ClientCompanies";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Testimonies from "@/components/wealthometer-new/Testimony";
import { baseUrl } from "@/utils/constants";
import { riskometerCrumbs } from "@/utils/Breadcrumbs";
import { FaqSection } from "@/components/MyAccount/Riskometer/FaqSection";

const RiskProfilePage = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  function handleOpenVideoPlayer(link: React.SetStateAction<string>) {
    setVideoLink(link);
    setShowVideoPlayer(true);
  }

  function handleCloseVideoPlayer() {
    setVideoLink('');
    setShowVideoPlayer(false);
  }

  const handleVideoClick = (e: any) => {
    e.target.controls = true;
    e.target.style.width = "";
  };
  
  return <>
    <Header />
    {/* <NavBar headerSolid={true} backgroundColor="rgb(3, 87, 130)" /> */}
    <div className="pt-8 pl-4 md:pl-8 lg:pl-12 text-white " style={{ backgroundColor: "rgb(3, 87, 130,100%)" }}>
      <Breadcrumbs crumbs={riskometerCrumbs} />
    </div>
    {/*  */}
    {/* <div className="lg:h-screen md:px-6 lg:px-0 md:py-4 lg:py-0 bg-primary-lighter lg:min-h-[600px] py-4 ">
      <div className="h-full mx-[5%] flex flex-col items-center justify-center relative">
        <h2 className="text-xl md:text-2xl text-center capitalize font-sans font-medium text-secondary">
          “Successful investing is about managing risk, not avoiding it...”
        </h2>
        <p className="text-xl md:text-2xl font-sans text-secondary font-medium">
          ~ Benjamin Graham
        </p>
        <div className="mt-12 flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center items-center lg:w-1/2">
            <p className="text-lg md:text-xl leading-tight font-robo font-normal text-secondary text-center mb-8">
              A RiskoMeter identifies the level of risk you are prepared or
              willing and able to accept.{" "}
              <span className="font-medium">
                It is important to know this before you start investing.
              </span>
            </p>
            <Link href="/risk-profile/test">

              <button className="btn">Check Your Risk Profile</button>

            </Link>
          </div>
          <div className="flex items-center justify-center lg:w-1/2 mt-8 lg:mt-0">
            <div className="lg:w-[600px] lg:h-[337px]">
              <video
                poster={`${baseUrl}/assets/risk-profile/risk-profile-thumbnail.jpg`}
                onClick={handleVideoClick}
                width="100%"
                height="100%"
                className="cursor-pointer"
              >
                <source
                  src={`${baseUrl}/assets/risk-profile/risk-profile.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-0 animate-bounce left-1/2 right-1/2">
          <Link href="/risk-profile#second-section">

            <MdOutlineKeyboardArrowDown className="text-primary" size={80} />

          </Link>
        </div>
      </div>
    </div> */}
    {/*  */}

    <div className="w-full text-center px-8 pb-12 lg:pb-32 flex flex-col items-center" style={{ backgroundColor: "rgb(3, 87, 130)" }}>
      <h1
        className="text-white mb-4 text-4xl lg:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-bolder leading-tight font-poppins capitalize"
      >
        Check your risk profile now !
      </h1>
      <p className=" lg:w-[40%] lg:m-auto text-center text-white text-base sm:text-xl lg:text-2xl font-normal">
        A RiskoMeter identifies the level of risk you are prepared or willing and able to accept. It is important to know this before you start investing.
      </p>
      <div className="mt-4 lg:mt-12">
        <Link href="/tools/risk-profile/test"  >
          <Button onClick={() => {}} size="bigger">Check your profile</Button>
        </Link>
      </div>
      <div className="lg:w-[850px] lg:h-[480px]">
        <video
          poster={`${baseUrl}/assets/risk-profile/risk-profile-thumbnail.jpg`}
          onClick={handleVideoClick}
          width="100%"
          height="100%"
          className="cursor-pointer mt-10  border-black rounded-xl border-[15px]"
        >
          <source
            src={`${baseUrl}/assets/risk-profile/risk-profile.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
    <div className="text-center text-white">
      <Backings />
    </div>

    <div className="text-center text-white" style={{ backgroundColor: "rgb(3, 87, 130)" }}>
      <Testimonies handleOpenVideoPlayer={handleOpenVideoPlayer} loop={!showVideoPlayer} />
    </div>

    <div className='text-white'>
    <ClientCompanies />
    </div> 
    <div className="flex jusitify-center items-center flex-col p-12  successful-gradient" >
      <h2 className="text-xl lg:max-w-3xl md:text-4xl text-center font-sans font-medium text-secondary text-white">
        “Successful investing is about managing risk, not avoiding it...”
      </h2>
      <p className="text-xl md:text-2xl font-sans text-secondary font-medium text-white">
        ~ Benjamin Graham
      </p>
    </div>
{/*  */}
    {/* <div
      id="second-section"
      className="flex mx-6 lg:mx-0 flex-col items-center justify-center py-16 overflow-hidden"
    >
      <h2 className="text-lg md:text-2xl font-robo text-secondary font-medium text-center">
        Wealthup Is Helping People Make Progress In Their Financial
        Journey!
      </h2>
      <div className="lg:w-3/5 mt-16 mb-24 w-full">
        <ClientCarousel />
      </div>
      <h2 className="text-lg md:text-2xl font-robo text-secondary font-medium text-center">
        Our Clients Work At Companies Like:
      </h2>
      <div className="w-full px-6 lg:w-1/2">
        <CompanySection />
      </div>
      <div className="flex flex-col items-center justify-center min-h-fit md:py-32 lg:py-0 my-16 md:my-0 lg:h-screen">
        <h2 className="text-lg md:text-2xl font-robo text-secondary font-bold text-center">
          Why You Should Use RiskoMeter?
        </h2>
        <div className="flex flex-col mt-12 mb-16">
          {riskProfileChecks.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 md:gap-6 items-center mb-8"
            >
              <div className='tick-mark'></div>
              <p className="mb-0 ml-8 leading-tight text-base md:text-lg lg:text-[1.5vw] font-sans text-secondary">
                {item}
              </p>
            </div>
          ))}
        </div>
        <Link href="/risk-profile/test">

          <Button onClick={{}} size="bigger">Use RiskoMeter</Button>

        </Link>
      </div>
    </div> */}
    {/*  */}
    {/* <RiskometerUse/> */}
    <div className=" py-16 " style={{ backgroundColor: "rgba(28, 172, 166, 1)" }}>
      <div className="h-full flex  flex-col items-center justify-center text-white">
        <h2 className="text-3xl sm:text-3xl lg:text-[2.5rem] font-robo text-secondary mb-8 text-center text-white font-semibold">
          Frequently Asked Questions
        </h2>
        <FaqSection />
      </div>
    </div>
    <Footer />
  </>;
};

export default RiskProfilePage;
