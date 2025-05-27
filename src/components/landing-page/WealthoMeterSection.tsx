import React, { useContext } from "react";
import { TypographyContext, handleChange } from "./TypographyContext";

import { Button } from "@/components/ui/Button";
import Image from "next/legacy/image";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import wealthometerImage from "@/assets/images/wealthometer/WealthoMeter Section Image.png";

export const WealthoMeterSection: React.FC<{ showWealthometer: boolean }> = ({ showWealthometer }) => {
  const { state, dispatch } = useContext(TypographyContext)!;

  return (
    <div className="h-screen min-h-[900px]">
      <div className="px-6 md:px-0 flex flex-col h-full items-center justify-center">
        {/* <h2 className="font-robo font-medium text-secondary leading-none text-[4vw] sm:text-[2.5vw] md:text-[2vw] text-center">
          Want To Check The Status Of Your Overall Finances?
        </h2> */}
        <Typography
          as="h2"
          size={state.heading}
          handleChange={(value) => handleChange(value, "heading", dispatch)}
        >
          Want To Check The Status Of Your Overall Finances?
        </Typography>
        {/* <p className="text-[3.5vw] sm:text-[2vw] lg:text-[1.5vw] font-sans text-secondary">
          WealthoMeter is a 3-minute tool that give a complete picture of your
          overall finances.
        </p> */}
        <Typography
          size={state.body}
          handleChange={(value) => handleChange(value, "body", dispatch)}
        >
          WealthoMeter is a 3-minute tool that give a complete picture of your
          overall finances.
        </Typography>
        <div className="my-8">
          <Image src={wealthometerImage} alt="Wealthometer" />
        </div>
        {/* <p className="text-[3.5vw] sm:text-[2vw] lg:text-[1.5vw] font-sans text-secondary">
          Want to know how you&apos;re managing your money? Or want to identify
          gaps?
        </p> */}
        <Typography
          size={state.body}
          handleChange={(value) => handleChange(value, "body", dispatch)}
        >
          Want to know how you&apos;re managing your money? Or want to identify
          gaps?
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
    </div>
  );
};
