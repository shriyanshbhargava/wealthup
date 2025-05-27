import Image, { StaticImageData } from "next/legacy/image";

import OtpImage from "@/assets/images/tax-saving/Step 3_ OTP.png";
import React from "react";
import phoneImage from "@/assets/images/tax-saving/Step 2_ Phone.png";
import taxImage from "@/assets/images/tax-saving/Upload.png";

const STEPS: { content: string; image: StaticImageData }[] = [
  {
    content: "Enter salary details from your payslip.",
    image: taxImage,
  },
  {
    content: "Enter your phone number to get an OTP.",
    image: phoneImage,
  },
  {
    content: "Enter OTP to check how much tax you can save.",
    image: OtpImage,
  },
];

export const HowDoesItWork = () => {
  return (
    <div className="flex px-6 sm:px-0 gap-0 sm:gap-[20px] md:gap-[30px] lg:gap-[100px] mt-8">
      {STEPS.map((step, i) => (
        <div
          key={i}
          className="flex items-center gap-0 sm:gap-[20px] md:gap-[30px] lg:gap-[80px]"
        >
          <div className="w-[100px] md:w-[180px] flex flex-col items-center justify-center">
            <div className="relative w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
              <Image src={step.image} alt="Step Image" layout="fill" />
            </div>
            <p className="text-[3.5vw] lg:text-[1.5vw] font-sans font-normal">
              Step {i + 1}
            </p>
            <p className="text-[3.25vw] lg:text-[1.25vw] font-sans font-light text-center">
              {step.content}
            </p>
          </div>
          {i != 2 && <Arrow />}
        </div>
      ))}
    </div>
  );
};

const Arrow: React.FC = () => {
  return (
    <svg
      width="144"
      height="33"
      viewBox="0 0 144 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 sm:w-16 md:w-24 lg:w-[144px]"
    >
      <path
        d="M143.061 22.0607C143.646 21.4749 143.646 20.5251 143.061 19.9393L133.515 10.3934C132.929 9.80761 131.979 9.80761 131.393 10.3934C130.808 10.9792 130.808 11.9289 131.393 12.5147L139.879 21L131.393 29.4853C130.808 30.0711 130.808 31.0208 131.393 31.6066C131.979 32.1924 132.929 32.1924 133.515 31.6066L143.061 22.0607ZM0 22.5H142V19.5H0V22.5Z"
        fill="black"
      ></path>
    </svg>
  );
};
