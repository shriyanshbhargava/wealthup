import React, { useContext } from "react";
import { TypographyContext, handleChange } from "./TypographyContext";

import Image from "next/legacy/image";
import Typography from "@/components/ui/typography";
import moneyFlowImage from "@/assets/images/landing-page/money-flow.jpg";

export const MoneyFlowSection = () => {
  const { state, dispatch } = useContext(TypographyContext)!;

  return (
    <div className="md:h-screen py-24 md:py-0 px-[5%] md:px-0 md:min-h-[900px] flex items-center justify-center flex-col">
      <div className="w-[90%] mx-[5%] flex flex-col items-center justify-center">
        {/* <p className="text-[4vw] sm:text-[2.5vw] mb-[1vh] md:mb-0 md:text-4xl  lg:text-[2vw] font-medium font-robo text-secondary capitalize">
          This is how your money flows.
        </p> */}
        <Typography
          as="h2"
          size={state.heading}
          className="text-center"
          handleChange={(value) => handleChange(value, "heading", dispatch)}
        >
          This is how your money flows.
        </Typography>
        {/* <p className="text-[3.5vw]  sm:text-[2vw] md:text-3xl lg:text-[1.5vw] tracking-[0.0073em] w-[90vw] leading-tight text-center mb-6 font-robo text-secondary font-normal">
          It’s not about how much you make, it’s how you manage it.
          <br />
          Managing wealth boils down to a simple equation:
        </p> */}
        <Typography
          size={state.body}
          className="text-center"
          handleChange={(value) => handleChange(value, "body", dispatch)}
        >
          It’s not about how much you make, it’s how you manage it.
          <br />
          Managing wealth boils down to a simple equation:
        </Typography>
        <div className="relative w-[357px] h-[266px] sm:w-[535px] sm:h-[400px] lg:w-[742px] lg:h-[508px]">
          <Image src={moneyFlowImage} layout="fill" alt="Money Flow" />
        </div>
      </div>
    </div>
  );
};
