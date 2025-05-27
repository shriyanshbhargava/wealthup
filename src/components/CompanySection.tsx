import Image from "next/legacy/image";
import React from "react";
import _1 from "@/assets/logo/landing-page/1.png"
import _10 from "@/assets/logo/landing-page/10.png"
import _11 from "@/assets/logo/landing-page/11.png"
import _12 from "@/assets/logo/landing-page/12.png"
import _13 from "@/assets/logo/landing-page/13.png"
import _14 from "@/assets/logo/landing-page/14.png"
import _15 from "@/assets/logo/landing-page/15.png"
import _16 from "@/assets/logo/landing-page/16.png"
import _17 from "@/assets/logo/landing-page/17.png"
import _18 from "@/assets/logo/landing-page/18.png"
import _19 from "@/assets/logo/landing-page/19.png"
import _2 from "@/assets/logo/landing-page/2.png"
import _20 from "@/assets/logo/landing-page/20.png"
import _21 from "@/assets/logo/landing-page/21.png"
import _22 from "@/assets/logo/landing-page/22.png"
import _23 from "@/assets/logo/landing-page/23.png"
import _24 from "@/assets/logo/landing-page/24.png"
import _25 from "@/assets/logo/landing-page/25.png"
import _26 from "@/assets/logo/landing-page/26.png"
import _27 from "@/assets/logo/landing-page/27.png"
import _28 from "@/assets/logo/landing-page/28.png"
import _29 from "@/assets/logo/landing-page/29.png"
import _3 from "@/assets/logo/landing-page/3.png"
import _30 from "@/assets/logo/landing-page/30.png"
import _31 from "@/assets/logo/landing-page/31.png"
import _4 from "@/assets/logo/landing-page/4.png"
import _5 from "@/assets/logo/landing-page/5.png"
import _6 from "@/assets/logo/landing-page/6.png"
import _7 from "@/assets/logo/landing-page/7.png"
import _8 from "@/assets/logo/landing-page/8.png"
import _9 from "@/assets/logo/landing-page/9.png"
import amazonLogo from "@/assets/images/risk-profile/brands/Amazon.jpg";
import hsbcLogo from "@/assets/images/risk-profile/brands/HSBC.jpg";
import larsenLogo from "@/assets/images/risk-profile/brands/LT.jpg";
import microsoftLogo from "@/assets/images/risk-profile/brands/Microsoft.jpg";
import rubrikLogo from "@/assets/images/risk-profile/brands/practo.jpeg";
import sketchersLogo from "@/assets/images/risk-profile/brands/chaipoint.jpeg";
import { useMediaQuery } from "react-responsive";

const logos = [
  _1, _10, _11, _12, _13,
  _14, _15, _16, _17, _18,
  _19, _2, _20, _21, _22,
  _23, _24, _25, _26, _27,
  _28, _29, _3, _30, _31,
  _4, _5, _6, _7, _8,
  _9
]

export const images = [
  amazonLogo,
  microsoftLogo,
  hsbcLogo,
  larsenLogo,
  sketchersLogo,
  rubrikLogo,
];

export const CompanySection: React.FC<{ singleLine?: boolean; moving?: boolean; }> = ({
  singleLine = false,
  moving = false
}) => {
  const smallScreen = useMediaQuery({ maxWidth: 580 });
  const mediumScreen = useMediaQuery({ maxWidth: 980 });

  if (moving) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex gap-3 sm:gap-6 md:gap-10">
          {logos.slice(0, 15).map((logo, index) => (
            <div
              key={index}
              className={`flex justify-center items-center`}
            >
              <Image src={logo} alt="Logo" width={smallScreen ? 80 : mediumScreen ? 110 : 200} height={smallScreen ? 30 : mediumScreen ? 40 : 70} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 sm:gap-6 gap-10">
          {logos.slice(15).map((logo, index) => (
            <div
              key={index}
              className={`flex justify-center items-center`}
            >
              <Image src={logo} alt="Logo" width={smallScreen ? 80 : mediumScreen ? 110 : 200} height={smallScreen ? 30 : mediumScreen ? 40 : 70} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full grid grid-cols-12 ${moving ? "" : "my-8"}`}>
      {images.map((logo, index) => (
        <div
          key={index}
          className={`${singleLine ? `col-span-4 md:col-span-2 ${moving ? "" : "gap-4"}` : "col-span-4"
            } ${singleLine && index === 2 ? "pb-4" : ""} ${singleLine && index === 0 ? "md:pt-4" : ""
            } flex justify-center items-center`}
        >
          <Image src={logo} alt="Logo" />
        </div>
      ))}
    </div>
  );
};
