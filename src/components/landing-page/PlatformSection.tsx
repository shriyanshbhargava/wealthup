import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useContext } from "react";
import { TypographyContext, handleChange } from "./TypographyContext";

import { Button } from "@/components/ui/Button";
import { Carousel } from "react-responsive-carousel";
import Image from "next/legacy/image";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import platformImage1 from "@/assets/images/landing-page/platform/Expenses.jpg";
import platformImage2 from "@/assets/images/landing-page/platform/Investments.jpg";
import platformImage3 from "@/assets/images/landing-page/platform/Taxes.jpg";

export const PlatformSection: React.FC<{ showWealthometer: boolean }> = ({ showWealthometer }) => {
  const { state, dispatch } = useContext(TypographyContext)!;

  return (
    <div className="md:h-screen py-24 px-6 md:py-0 md:px-0 md:min-h-[860px] lg:min-h-[960px] bg-[#ecdfea]">
      <div className="h-full md:grid md:grid-cols-2">
        <div className="md:pl-4 lg:pl-[10%] lg:pr-[5%] w-auto h-full flex flex-col items-center justify-center">
          {/* <p className="text-[4vw] sm:text-[2.25vw] lg:text-[1.75vw] text-center leading-tight font-medium mb-6 font-robo text-secondary">
            Our Platform Will Track Your Every Rupee From <br /> Expenses To
            Investments To Even Taxes!
          </p> */}
          <Typography
            as="h2"
            size={state.heading}
            className="text-center"
            handleChange={(value) => handleChange(value, "heading", dispatch)}
          >
            Our Platform Will Track Your Every Rupee From <br /> Expenses To
            Investments To Even Taxes!
          </Typography>
          {/* <p className="text-center text-[3.5vw] sm:text-[1.75vw] lg:text-[1.5vw] lg:py-[3vh] lg:mb-0 mb-8 leading-tight  font-sans text-secondary">
            With this insight, we help you navigate your money to <br /> achieve
            your financial goals faster.
          </p> */}
          <Typography
            size={state.body}
            className="text-center"
            handleChange={(value) => handleChange(value, "body", dispatch)}
          >
            With this insight, we help you navigate your money to <br /> achieve
            your financial goals faster.
          </Typography>
          {/* <p className="text-[3.5vw] sm:text-[2vw] lg:text-[1.5vw] lg:py-[3vh] lg:mb-0 mb-8 font-sans text-secondary">
            Get started by checking where you stand.
          </p> */}
          <Typography
            size={state.body}
            className="text-center"
            handleChange={(value) => handleChange(value, "body", dispatch)}
          >
            Get started by checking where you stand.
          </Typography>
          {showWealthometer ? (

            (<Link href="/wealthometer">

              <Button size="bigger" className="btn">Use WealthoMeter</Button>

            </Link>)
          ) : (
            (<Link href="/myaccount/dashboard">

              <Button size="bigger" className="btn">Go To Dashboard</Button>

            </Link>)
          )}
        </div>
        <div className="mt-12 md:mt-0 flex flex-col items-center justify-center">
          <div className="md:w-9/12 flex items-center justify-center">
            <Carousel
              autoPlay
              className="w-1/2 h-full"
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={false}
            // renderIndicator={()}
            >
              {[platformImage1, platformImage2, platformImage3].map(
                (img, index) => (
                  <div key={index} className="w-full h-full mb-12">
                    <Image key={index} src={img} alt="Image" />
                  </div>
                )
              )}
            </Carousel>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.wealthup.wealthupapp&pli=1"
            target="_blank"
            rel="noreferrer"
          >
            <button className="bg-primary-new hover:bg-primary-dark text-white rounded-full px-4 py-3 font-robo font-medium">
              Download App on Play Store
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
