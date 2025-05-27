import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ActionCard, ValueSection } from "./ValueSection";

import { AboutusCrumbs } from "@/utils/Breadcrumbs";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import HeaderController from "@/components/display/HeaderController";
import Image from "next/legacy/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import React from "react";
import { TeamCard } from "./TeamCard";
import ankitCartoon from "@/assets/images/about-us/Ankit Cartoon.jpg";
import ankitImage from "@/assets/images/about-us/Ankit Agrawal.jpg";
import medhaCartoon from "@/assets/images/about-us/Medha Cartoon.jpg";
import medhaImage from "@/assets/images/about-us/Medha Agarwal.jpg";

const AboutPage = () => {
  return <>

    <HeaderController
      title="About the Wealthup team, values &amp; philosophy"
      description="We'll be there for you - for all your financial needs"
    />
    <div className="hero-section-height px-6 md:px-0 background">
    <div className="pt-20 md:pt-24 pl-2 md:pl-8">
      <Breadcrumbs crumbs={AboutusCrumbs} />
    </div>
      <div className="h-full md:px-6 lg:px-0 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl md:text-3xl text-center font-robo font-medium">
        Our team is obsessed with helping you reach your financial goals ASAP.
        </h2>
        <p className="text-xl md:text-2xl text-center font-sans font-normal">
        Learn more about us.
        </p>
        <div className="hidden md:block absolute bottom-0 animate-bounce left-1/2 -ml-10 right-1/2">
          <Link href="/about#second-section">

            <MdOutlineKeyboardArrowDown color="#fff" size={80} />

          </Link>
        </div>
      </div>
    </div>
    <div
      id="second-section"
      className="h-screen md:min-h-[900px] flex items-center justify-center bg-[#E8F8F5]"
    >
      <div className="w-[90%] mx-6 md:mx-0 flex items-center justify-center flex-col">
        <h2 className="text-2xl md:text-3xl font-robo font-[600] mb-6 text-secondary">
          Our Team
        </h2>
        <p className="text-lg md:text-xl font-sans font-normal pt-[2vh] pb-[3vh] text-secondary">
          We’re on a mission to help you improve your chemistry with money.
        </p>
        <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row sm:justify-evenly sm:px-[2%] my-8 w-full">
          <TeamCard
            image={ankitImage}
            name="Ankit"
            designation="Co-Founder"
            profession="The Finance Guy"
            others="Ex-UBS, Ex-PwC"
            linkedinLink="https://www.linkedin.com/in/mrankitagarwal"
          />
          <TeamCard
            image={medhaImage}
            name="Medha"
            designation="Co-Founder"
            profession=" The Marketing Nerd"
            others="Ex-EI, Ex-Ashoka University"
            linkedinLink="https://www.linkedin.com/in/medha-agarwal"
          />
        </div>
        <p className="text-lg md:text-xl mb-4 md:mb-8 py-[2vh] font-sans text-secondary font-normal">
          Do you have what it takes to join us?
        </p>
        <Link href="https://share.hsforms.com/1cahOE8nYQrCu_LIiBWsJDwbx5g4">

          <Button size="bigger" className="btn">Apply Now!</Button>

        </Link>
      </div>
    </div>
    <div className="h-screen min-h-[980px] md:min-h-[900px] flex items-center justify-center">
      <div className="mx-6 md:mx-0 md:px-6 lg:px-0 lg:w-3/4 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-robo font-medium text-secondary">
          How it All Started
        </h2>
        <p className="text-lg md:text-xl mt-[2vh] mb-[3vh] font-robo font-light text-secondary">
          Ankit and Medha were totally opposite!
        </p>
        <div className="flex flex-col md:flex-row w-full md:justify-between items-center gap-10 md:gap-24">
          <div className="w-1/2 flex items-center justify-center">
            <Image
              src={medhaCartoon}
              alt="Medha Cartoon"
              height={267}
              width={200}
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-base md:text-xl text-center font-sans font-normal text-secondary">
              Medha is a globetrotter. Her superpowers are making friends and
              communicating (even the most complex) ideas easily!
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full md:justify-between items-center gap-10 md:gap-24 mt-8">
          <div className="md:w-1/2 order-last">
            <p className="text-base md:text-xl text-center font-sans font-normal text-secondary">
              Ankit is an engineer-turned investment banker who worked on Wall
              Street with UBS (Swiss Bank). He likes travelling, and achieved
              financial independence at the tender age of 29!
            </p>
          </div>
          <div className="w-1/2 md:order-last flex items-center justify-center">
            <Image
              src={ankitCartoon}
              alt="Ankit Cartoon"
              height={267}
              width={200}
            />
          </div>
        </div>
      </div>
    </div>
    {/* Plan */}
    <div className="py-24 md:px-6 lg:py-0 lg:px-0 lg:h-screen lg:min-h-[800px] flex items-center justify-center bg-[#E8F8F5]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-base md:text-2xl leading-tight text-center mb-12 mx-4 text-secondary font-sans font-normal">
            Ankit helped Medha change her mindset about money and <br />
            helped her kickstart her journey toward financial freedom!
          </p>
          <p className="text-base md:text-2xl leading-tight text-center text-[#006699] font-sans  font-bold">
            They teamed up to help professionals avoid
            <br />
            expensive financial mistakes and make
            <br />
            smarter financial decisions!
          </p>
        </div>
    </div>
    {/* Piggy bank */}
    <div className="py-24 px-4 md:px-6 lg:py-0 lg:px-0 lg:h-screen lg:min-h-[800px] flex items-center justify-center bg-[#006699] text-white">
        <div className="flex flex-col items-center justify-center w-6/10 sm:w-8/10 md:w-3/4 lg:w-1/2">
          <h2 className="text-2xl md:text-3xl text-center font-robo font-bold">
          What Is Wealthup?
          </h2>
          <p className="text-base md:text-xl mt-4 text-center font-sans font-medium">
          Wealthup is a platform that understands your current financial
          situation, helps you identify the gaps and guides you in filling
          these gaps.
          </p>
        <p className="text-base md:text-xl mt-4 text-center font-sans font-medium">
          It gathers insights about your finances and offers the right
          financial products for you -​​ personalised to your needs.
        </p>
        <p className="text-base md:text-xl mt-4 text-center font-sans font-medium">
        But we are not just another AI platform. Our experts are invested in your journey and help you achieve your financial goals ASAP.
        </p>
        </div>
    </div>
    <ValueSection />
    <div className="bg-white py-8 flex justify-center items-center">
      <div className="flex w-[80%] flex-col flex-wrap justify-center md:flex-row gap-6 md:gap-20 mx-6 md:mx-0">
        <ActionCard
          title="Ready to start your journey of financial freedom?"
          linkTitle="Chat with us now"
          link="https://api.whatsapp.com/send?phone=+918035864017&text=Hi%20wealthup.me,%20Can%20you%20please%20call%20me%20back?"
        />
        <ActionCard
          title="Still have more questions?"
          linkTitle="View FAQs page"
          link="/resources/faq"
        />
        <ActionCard
          title="Want to join us in our mission? Think you have what it takes?"
          linkTitle="Apply to join us."
          link="https://share.hsforms.com/1cahOE8nYQrCu_LIiBWsJDwbx5g4 "
        />
      </div>
    </div>
  </>;
};

export default AboutPage;
