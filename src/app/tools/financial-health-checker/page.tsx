'use client';

import '@/styles/newstyles.css';

import React, { useState } from 'react';

import AboutPage from '@/components/wealthometer-new/About';
import Backings from '@/components/wealthometer-new/Backings';
import ClientCompanies from '@/components/wealthometer-new/ClientCompanies';
import Footer from '@/components/ui/footer';
import { GtmNoScript } from '@/components/GoogleTagManager';
import Header from '@/components/ui/header';
import HeaderIntro from '@/components/wealthometer-new/HeaderIntro';
import HowItWorks from '@/components/wealthometer-new/HowItWorks';
import Image from 'next/image';
import MobileFrame from '@/components/wealthometer-new/MobileFrame';
import SaleCoinSection from '@/components/wealthometer-new/SaleCoinSection';
import dynamic from 'next/dynamic';
import howitworksImg from '@/assets/images/wealthometer_main/howitworks.png';

const Testimonies = dynamic(() => import('@/components/wealthometer-new/Testimony'), {
  ssr: false
});

const VideoPlayerModal = dynamic(() => import('@/components/wealthometer-new/VideoPlayerModal'), {
  ssr: false
});

const NavBar = dynamic(() => import('@/components/Navbar'), {
  ssr: false
});

type HowItWorksData = {
  stepOne: {
    lineOne: string;
    lineTwo: string;
  };
  stepTwo: {
    lineOne: string;
    lineTwo: string;
  };
  stepThree: {
    lineOne: string;
    lineTwo: string;
  };
  img: any; // can be more strictly typed if you know the type of imported image
};

const howItWorksData: HowItWorksData = {
  stepOne: {
    lineOne: "Answer few",
    lineTwo: "questions"
  },
  stepTwo: {
    lineOne: "Register using",
    lineTwo: "phone and OTP"
  },
  stepThree: {
    lineOne: "Get report and",
    lineTwo: "personal roadmap"
  },
  img: howitworksImg
};

const Wealthometer: React.FC = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [videoLink, setVideoLink] = useState<string>('');

  function handleOpenVideoPlayer(link: string) {
    setVideoLink(link);
    setShowVideoPlayer(true);
  }

  function handleCloseVideoPlayer() {
    setVideoLink('');
    setShowVideoPlayer(false);
  }

  return (
    <>
      <main className="w-full text-white text-center primaryBackground min-h-fit">
        <GtmNoScript gtmId="GTM-5MF3NPV" />
        <Header />
        <div className="gradientbg1 pt-20 overflow-clip">
          <HeaderIntro isMfpa={false} scrollToForm={() => {}} />
          <MobileFrame isMfpa={false} />
          <div className="relative">
            <div className="relative z-20">
              <HowItWorks isMfpa={false} scrollToForm={() => {}} data={howItWorksData} />
            </div>
            <div className="absolute -top-[11rem] sm:-top-[15rem] md:-top-[18rem] w-full z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1501 790" fill="none">
                <path d="M1002.95 172C687.448 62 449.336 124 296.547 282C181.413 401.06 54.8946 419.449 -3.07864 413.383V790H1501V0C1269.24 187.2 1072.4 192.667 1002.95 172Z" fill="#0A5783" />
              </svg>
            </div>
          </div>
        </div>
        <Backings />
        <Testimonies handleOpenVideoPlayer={handleOpenVideoPlayer} loop={!showVideoPlayer} />
        <ClientCompanies />
        <AboutPage />
        <SaleCoinSection />
        <VideoPlayerModal isOpen={showVideoPlayer} onClose={handleCloseVideoPlayer} url={videoLink} />
      </main>
      <Footer />
    </>
  );
};

export default Wealthometer;
