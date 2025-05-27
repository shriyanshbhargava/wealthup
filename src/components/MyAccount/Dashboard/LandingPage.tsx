import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { HeroSection } from "../../Wealthometer/landing-page/HeroSection";
import Image from "next/legacy/image";
import InvestedNumbers from "@/components/InvestedNumbers";
import Link from "next/link";
import React from "react";
import TransformSection from "../../home/TransformSection";
import { WealthoMeterButton } from "./WealthoMeterButton";
import compareIcon from '@/assets/icons/compare-icon.png';
import gapIcon from '@/assets/icons/gap-icon.png';
import roadmapIcon from '@/assets/icons/roadmap-icon.png';
import { wealthometerCrumbs } from "@/utils/Breadcrumbs";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div id="use-wealthometer">
        <div className="md:pt-24 pt-20 lg:pb-0 pb-16 pl-4 md:pl-8 lg:pl-12">
          <Breadcrumbs crumbs={wealthometerCrumbs} />
        </div>
        <HeroSection />
      </div>
      {/* About */}
      <section id="wealthometer-section" className="pb-12 sm:pb-24">
        <div className="container bg-white pt-16 pb-12 md:-mt-32 rounded-2xl shadow-lg">
          <div className="flex flex-wrap items-start">
            <div className="w-full lg:w-1/2">
              <div className="mb-5 lg:mb-0">
                <h2
                  className="text-left mb-4 section-heading wow fadeInDown text-white"
                  data-wow-delay="0.3s"
                >
                  What is WealthoMeter?
                </h2>
                <p className="section-body font-normal text-left items-center max-w-2xl">
                  WealthoMeter is a free, 3-minute tool that calculates the performance score of your
                  overall finances and compares it with others.
                </p>
                <p className="section-body font-normal text-left items-center max-w-2xl">
                  It gives you a detailed scorecard and helps you identify gaps across various aspects
                  of personal finances.
                </p>
              </div>
              {/* Image on small devices */}
              <div className='lg:hidden relative w-[calc(100vw-4rem)] max-w-[450px] h-[230px] md:h-[300px]'>
                <Image layout="fill" src="/assets/img/wealthometer/wealthometer-report.jpg" alt="Wealthometer Report" />
              </div>
            </div>
            <div className="hidden lg:flex w-full lg:w-1/2 h-[300px]">
              <div className="mx-3 lg:mr-0 lg:ml-3 flex items-center justify-center" data-wow-delay="0.3s">
                <div className='relative w-[450px] h-[300px]'>
                  <Image layout="fill" src="/assets/img/wealthometer/wealthometer-report.jpg" alt="Wealthometer Report" />
                </div>
              </div>
            </div>
          </div>
          <p className="section-body font-bold mt-4 text-center items-center">
            Stop making costly mistakes - get a clear picture of your financial health now.
          </p>
          <div className="flex justify-center mt-4 w-full">
            <WealthoMeterButton />
          </div>
        </div>
      </section>
      <div className="mb-8">
        <TransformSection wealthometer />
      </div>
      {/* Why should you use wealthometer */}
      <div id="use-wealthometer" className="pt-16 pb-16 sm:pb-24">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="mb-5 lg:mb-0">
                <h2 className="section-heading mb-8 capitalize">
                  Why should you use <br className="hidden md:block" /> WealthoMeter?
                </h2>
                <div className="w-full lg:w-2/3">
                  <div className="flex gap-6 mb-4 items-center">
                    <div className='tick-mark'></div>
                    <p className="section-body font-normal ml-8 ">Identify mistakes in your financial plan</p>
                  </div>
                  <div className="flex gap-6 mb-4 items-center">
                    <div className='tick-mark'></div>
                    <p className="section-body font-normal ml-8">Get tips and suggestions to improve your financial health</p>
                  </div>
                  <div className="flex gap-6 mb-4 items-center">
                    <div className='tick-mark'></div>
                    <p className="section-body font-normal ml-8 ">Compare your financial health with others like you</p>
                  </div>
                  <p className="section-body font-bold mt-8">Get your FREE personalised financial scorecard.</p>
                  <div className="flex justify-center mt-4 w-full">
                    <WealthoMeterButton />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 h-[540px]">
              <div className="mx-3 lg:mr-0 lg:ml-3 flex justify-center" data-wow-delay="0.3s">
                <div className='relative w-[430px] h-[540px]'>
                  <Image layout="fill" src="/assets/img/wealthometer/why-use-wealthometer.jpg" alt="Why Use WealthoMeter" width={470} height={340} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* What is financial independence? */}
      <div id="" className="pt-16 pb-12">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full lg:w-1/2">
              <p className="text-center section-description font-bold">They are on their way to achieving<br />financial independence with us!</p>
              <div className="lg:mr-0 lg:ml-3 flex flex-col items-center justify-center" data-wow-delay="0.3s">
                <div className='relative w-[320px] h-[300px] sm:w-[430px] sm:h-[500px]'>
                  <Image layout="fill" src="/assets/img/wealthometer/financial-independance.jpg" alt="Financial independence" width={470} height={340} />
                </div>
                <p className="text-center section-description font-bold py-4">Don&apos;t leave your financial future to chance - take control with Wealthometer.</p>
                <div className="flex justify-center mt-4 w-full">
                  <WealthoMeterButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="use-wealthometer" className="pt-4 pb-16">
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="w-full text-center mt-16">
              <InvestedNumbers />
            </div>
            <p className="section-description mt-8 text-center font-bold">Take the first step to improve your financial health.</p>
            <div className="flex justify-center mt-4 w-full">
              <WealthoMeterButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
