import React, { useContext } from "react";
import { TypographyContext, handleChange } from "./landing-page/TypographyContext";

import { Button } from "@/components/ui/Button";
import { ClientCarousel } from "@/components/ClientCarousel";
import { CompanySection } from "@/components/CompanySection";
import Link from "next/link";
import Typography from "@/components/ui/typography";

export const ClientSection: React.FC<{ showWealthometer: boolean }> = ({ showWealthometer }) => {
  const { state, dispatch } = useContext(TypographyContext)!;

  return (
    <div className="w-full py-24 md:py-0 md:h-screen md:min-h-[1000px] flex items-center justify-center">
      <div className="w-full px-6 md:px-0 md:w-3/5">
        {/* <p className="text-center text-[4vw] sm:text-[2.5vw] lg:text-[2vw] leading-tight mb-4 text-secondary font-robo font-medium">
          For Too Long Only The Privileged 1% Benefitted From <br />
          Personalised Financial Advice.{" "}
          <span className="text-primary-dark">We Are Democratising This.</span>
        </p> */}
        <Typography
          as="h2"
          size={state.heading}
          className="text-center"
          handleChange={(value) => handleChange(value, "heading", dispatch)}
        >
          For Too Long Only The Privileged 1% Benefitted From <br />
          Personalised Financial Advice.{" "}
          <span className="text-primary-dark">We Are Democratising This.</span>
        </Typography>
        {/* <p className="text-[3.5vw] sm:text-[2vw] lg:text-[1.5vw] mt-[2vh] mb-[4vh] text-center text-secondary font-sans">
          Read what our clients are saying!
        </p> */}
        <Typography
          className="text-center"
          size={state.body}
          handleChange={(value) => handleChange(value, "body", dispatch)}
        >
          Read what our clients are saying!
        </Typography>
        <div className="w-auto mt-12 md:">
          <ClientCarousel />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Typography
            className="text-center"
            as="h2"
            size={state.heading}
            handleChange={(value) => handleChange(value, "heading", dispatch)}
          >
            Our Clients Work At Companies Like:
          </Typography>
          {/* <p className="text-[4vw] sm:text-[3.5vw] lg:text-[2vw] font-robo mb-0 text-secondary font-medium text-center">
            Our Clients Work At Companies Like:
          </p> */}
          <div className="w-full px-6">
            <CompanySection singleLine />
          </div>
        </div>
        {/* <p className="text-[3.5vw] sm:text-[2vw] lg:text-[1.5vw] mt-[2vh] mb-[4vh] font-[600] text-center text-secondary font-sans">
          Get started by checking where you stand.
        </p> */}
        <Typography
          className="text-center"
          size={state.body}
          handleChange={(value) => handleChange(value, "body", dispatch)}
        >
          Get started by checking where you stand.
        </Typography>
        <div className="flex justify-center mt-10">
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
      </div>
    </div>
  );
};
