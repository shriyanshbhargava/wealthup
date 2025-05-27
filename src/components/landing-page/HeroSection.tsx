import React, { useContext, useEffect, useState } from "react";
import { TypographyContext, handleChange } from "./TypographyContext";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MovingImageCarosal } from "./MovingImageCarosal";

// const logos = [
//   `${baseUrl}/img/brands/Amazon.jpg`,
//   `${baseUrl}/img/brands/Microsoft.jpg`,
//   `${baseUrl}/img/brands/HSBC.jpg`,
//   `${baseUrl}/img/brands/LT.jpg`,
//   `${baseUrl}/img/brands/chaipoint.jpeg`,
//   `${baseUrl}/img/brands/practo.jpeg`,
// ];


// const texts = [
//   "expenses",
//   "investments",
//   "taxes",
//   "loans",
//   "insurance",
//   "retirement",
// ];

// const TextRevel = () => {
//   const [textIndex, setTextIndex] = React.useState<number>(0);

//   React.useEffect(() => {
//     const timeOut = setTimeout(() => {
//       setTextIndex((textIndex) => textIndex + 1);
//     }, 3000);

//     return () => {
//       clearTimeout(timeOut);
//     };
//   }, [textIndex]);

//   return (
//     <ReactTextTransition
//       // children={texts[textIndex % texts.length]}
//       // text={texts[textIndex]}
//       direction="up"
//       springConfig={presets.default}
//       className="font-bold text-primary-dark"
//       inline
//     >
//       {texts[textIndex % texts.length]}
//     </ReactTextTransition>
//   );
// };

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const HeroSection: React.FC<{ showWealthometer: boolean }> = ({ showWealthometer }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(interval);
  })

  const { state, dispatch } = useContext(TypographyContext)!;

  return (
    <div className="min-h-[460px] flex items-center justify-center sm:h-screen sm:min-h-[900px] md:min-h-[700px] lg:min-h-[960px] relative">
      {/* <div className="md:grid md:grid-cols-2 h-full py-16 md:py-0"> */}
      <div className="md:pl-4 lg:pl-0 md:h-full flex flex-col items-center justify-center mb-10 md:mb-10">
        {/* <Typography
          as="h1"
          size={state.main}
          fontStyle="capitalize"
          handleChange={(value) => handleChange(value, "main", dispatch)}
        >
          Create Wealth Faster.
        </Typography>

        <Typography
          size={state.heading}
          handleChange={(value) => handleChange(value, "heading", dispatch)}
        >
          Make smarter decisions across <TextRevel />!
        </Typography>
        <Typography
          size={state.body}
          handleChange={(value) => handleChange(value, "body", dispatch)}
        >
          Start by checking where you stand
        </Typography>
        */ }
        <h1 className="text-[8vw] sm:text-[5vw] lg:text-[4vw] font-robo leading-[1.6] capitalize text-center text-secondary font-medium">
          Create Wealth Faster.
        </h1>
        <p className="text-[6vw] sm:text-[3.5vw] lg:text-[2.5vw] lg:pb-[2vh] mb-[6vh] text-center leading-tight font-normal font-sans text-secondary">
          Make smarter decisions across!
        </p>
        <p className="text-[4.5vw] sm:text-[2vw] lg:text-[1.5vw] font-normal leading-5 mb-[3vh] font-sans text-secondary">
          Start by checking where you stand
        </p>
        {showWealthometer ? (
          (<Link href="/wealthometer">

            <Button size="bigger" className="btn">Use WealthoMeter</Button>

          </Link>)
        ) : (
          (<Link href="/myaccount/dashboard">

            <Button size="bigger" className="btn">Go To Dashboard</Button>

          </Link>)
        )}
        <div className="mt-8 flex flex-col">
          <p className="mb-0 capitalize font-bold text-xl md:text-2xl lg:text-4xl z-1 text-center leading-tight font-sans text-secondary">
            Our client work at companies like:
          </p>
          <MovingImageCarosal />
        </div>
      </div>
      <div className="hidden md:block absolute bottom-0 left-[48%]">
        <Link href="#second-section">

          <MdOutlineKeyboardArrowDown color="#5d1d52" size={80} />

        </Link>
      </div>
    </div>
  );
};
