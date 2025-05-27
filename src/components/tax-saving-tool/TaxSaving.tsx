"use client"
import { AiFillStar } from "react-icons/ai";
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from "@/components/ui/Button";
import { CompanySection } from "@/components/CompanySection";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { HeaderController } from "../../components/display/HeaderController";
import { HowDoesItWork } from "./HowDoesItWork";
import Image from "next/legacy/image";
import Link from "next/link";
import { QuestionsAccordion } from "./QuestionsAccordion";
import React from 'react';
import { Slider } from "./Slider";
import { TaxSavingTool } from "./TaxSavingTool";
import sakethImage from "@/assets/images/tax-saving/SakethRamachandra.jpg";
import { taxsavingtoolCrumbs } from '@/utils/Breadcrumbs';

const TaxSaving = () => {

  return <>
    <HeaderController title="Tax Saving Tool" />
    <Header />
    <div className="relative top-20 md:top-24 left-4"><Breadcrumbs crumbs={taxsavingtoolCrumbs} /></div>
    <div
      id="tax-saving-tool"
      className="py-24 md:py-0 md:h-screen flex items-center justify-center flex-col md:min-h-[980px]"
    >
      <TaxSavingTool />
    </div>
    <div className="flex mt-32 sm:mt-0 justify-center items-center">
      <div className="w-4/5 flex flex-col justify-center items-center">
        <h2 className="text-2xl text-center md:text-[3vw] lg:text-[2vw] mb-7 sm:mb-[1.7vw] font-robo font-medium">
          How Saketh saved over Rs. 20,000 in taxes!
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 items-center mb-[4vw]">
          <div className="flex flex-col items-center">
            <div className="relative h-[8vw] w-[8vw]">
              <Image
                src={sakethImage}
                alt="Saketh Image"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <p className="text-[4vw] md:text-[3vw] lg:text-[2vw] font-sans font-normal">
              Saketh
            </p>
            <div className="flex">
              {Array.from({ length: 5 }, (v, i) => (
                <AiFillStar key={i} color="#FDC408" size={30} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[4vw] md:text-[2.75vw] lg:text-[1.5vw] font-sans font-light">
              There’s no better feeling in the world than getting a tax refund
              when you least expect it!{" "}
            </p>
            <br />
            <p className="text-[4vw] md:text-[2.75vw] lg:text-[1.5vw] font-sans font-light">
              That’s what happened with many of our clients including Saketh.
              He thought his advisors had already maximised his tax savings.
              He just wanted us to file his taxes. He had zero expectations,
              so you can imagine how happy he was when we were able to get him
              a refund of over Rs. 20,000!
            </p>
          </div>
        </div>
        <Link href="/tax-saving#tax-saving-tool">

          <Button size="bigger" className="btn">Use Free Tax Tool!</Button>

        </Link>
        <div className="mt-16 w-full flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-[3vw] lg:text-[2vw] font-robo font-medium">
            How does it work?
          </h2>
          <HowDoesItWork />
          <div className="mt-16 md:mt-52 flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-[3vw] lg:text-[2vw] font-robo font-medium">
              Why our tax tool?
            </h2>
            <div className="flex flex-col my-8 gap-8">
              {[
                "It’s the only tool of it’s kind that exists!",
                "It’s comprehensive & customised!",
                "It’s super easy to use!",
                "It gives you a variety of tax-saving options!",
              ].map((line, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className='tick-mark'></div>
                  <p className="mb-0 ml-8 leading-tight text-[4vw] md:text-[2.75vw] lg:text-[1.5vw] font-sans font-light">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="my-16 flex flex-col sm:flex-row justify-evenly">
      <div className="flex flex-col items-center">
        <h4 className='mb-0 text-2xl font-bold font-robo gradient-color text-white w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center font-bold'>25 K+</h4>
        <p className='text-lg sm:text-xl md:text-2xl'>Avg. tax saved per client</p>
      </div>
      <div className="flex flex-col items-center">
        <h4 className='mb-0 text-2xl font-bold font-robo gradient-color text-white w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center'>98%</h4>
        <p className='text-lg sm:text-xl md:text-2xl'>Clients refer us to friends & family</p>
      </div>
    </div>
    <div className="mb-64 flex justify-center">
      <Link href="/tax-saving#tax-saving-tool">

        <Button size="bigger" className="btn">Use Free Tax Tool!</Button>

      </Link>
    </div>
    <div className="flex flex-col items-center justify-center">
      <p className="text-[4vw] md:text-[3vw] lg:text-[2vw] font-sans text-center mt-4">
        Where some of our clients are from
        <br />
        <span className="text-primary">and what they are saying...</span>
      </p>
      <div className="my-16 px-6 md:px-0 w-full">
        <div className="ml-[5vw] mr-[2.5vw] flex flex-col items-center justify-center gap-10 md:gap-0 md:flex-row">
          <div className="w-full md:w-1/2 md:mr-16">
            <CompanySection />
          </div>
          <div className="w-full md:w-1/2">
            <Slider />
          </div>
        </div>
      </div>
      <div className="h-screen  bg-[#e8f8f5] min-h-[960px] flex flex-col items-center justify-center">
        <h2 className="text-[4vw] md:text-[3vw] lg:text-[2vw] font-robo font-medium text-center">
          Got more questions?
          <br /> We have answers!
        </h2>
        <div className="w-full h-auto px-6 sm:px-0 sm:w-2/3 mt-16">
          <QuestionsAccordion />
        </div>
      </div>
    </div>
    <Footer />
  </>;
};

export default TaxSaving;
