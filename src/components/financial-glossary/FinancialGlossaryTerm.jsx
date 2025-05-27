import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { FinancialGlossaryContext } from "./FinancialGlossaryLayout";
import { FinancialGlossarySelectedTerm } from "./FinancialGlossarySelectedTerm";

const FinancialGlossary = ({ financialGlossary }) => {
  const disableScroll = () => {
    if (typeof window !== "undefined") {
      const scrollTop = document.documentElement.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft;

      window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
    }
  }

  const { data } = useContext(FinancialGlossaryContext);

  const selected = data.filter((it) => it.slug === financialGlossary.slug).pop();

  useEffect(() => {
    const selected = data.filter((it) => it.slug === financialGlossary.slug).pop();

    if (selected) {
      disableScroll();
    } else {
      window.onscroll = () => { }
    }

  }, [financialGlossary, data])

  return (
    <>
      <div className="min-h-screen container my-8 md:mt-24">
        <h1 className="text-secondary text-2xl md:text-4xl xl:text-6xl font-bold font-robo">
          School Of Finance
        </h1>
        <div className="my-4">
          <input
            className="bg-gray-200 placeholder:text-gray-800 rounded-lg px-6 py-4 w-full text-base"
            placeholder="Search by term"
          />
        </div>
        <div className="grid grid-cols-12 gap-6 relative">
          {selected && <div className="overflow-auto py-24 fixed top-0 right-0 bg-white/30 bd-blur col-span-12 w-screen h-screen flex justify-center items-center" style={{ zIndex: 2 }}>
            <FinancialGlossarySelectedTerm term={selected.term} layouts={selected.layout} />
          </div>}
          {data.length ? (
            data.map((item, index) => (
              <FinancialGlossaryTile
                key={index}
                term={item.term}
                description={""}
              />
            ))
          ) : (
            <div className="col-span-12">
              <p className="font-sans text-xl text-secondary">Nothing found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FinancialGlossary;

const FinancialGlossaryTile = ({ term, description }) => {
  const { selected } = useContext(FinancialGlossaryContext);
  const [isTap, setIsTap] = useState(selected === term ? true : false);
  const smallScreen = useMediaQuery({ maxWidth: 650 });

  const handleClick = () => {
    setIsTap(!isTap);
  };

  // Use motion component variables to avoid TypeScript errors
  const MotionDiv = motion.div;
  const MotionH2 = motion.h2;
  const MotionP = motion.p;

  // Define animations 
  const hoverAnimation = !isTap
    ? {
        rotateY: 25,
        transition: { duration: 0.75 },
      }
    : {};

  const cardAnimation = isTap
    ? {
        position: 'absolute',
        width: smallScreen ? 160 : 320,
        right: '50%',
        top: smallScreen ? 'auto' : '50%',
        marginRight: smallScreen ? -80 : -160,
        rotateY: 180,
        scale: smallScreen ? 1.5 : 2,
        zIndex: 3,
        transition: { duration: 0.75 },
      }
    : {};

  const titleAnimation = isTap
    ? {
        opacity: 0,
        transition: { duration: 0.75 },
      }
    : {
        opacity: 1,
        transition: { duration: 0.75 },
      };

  const descriptionAnimation = isTap
    ? {
        opacity: 1,
        transition: { duration: 0.75 },
      }
    : { 
        opacity: 0, 
        transition: { duration: 0.75 } 
      };

  return (
    <Link
      href="/financial-glossary"
      className="col-span-6 lg:col-span-4 xl:col-span-3 z-1 cursor-pointer w-full h-full"
    >
      <MotionDiv
        layout
        whileHover={hoverAnimation}
        initial={false}
        animate={cardAnimation}
        onClick={handleClick}
        className={`w-full h-full ${isTap ? '' : ''}`}
      >
        <div className="min-h-[280px] h-auto md:h-full rounded-xl p-4 glossary shadow-xl flex flex-col">
          <MotionH2
            layout
            className={`${isTap ? "hidden" : ""} order-first md:order-last text-xl md:text-2xl lg:text-3xl text-gray-100`}
            initial={false}
            animate={titleAnimation}
          >
            {term}
          </MotionH2>
          <MotionP
            layout
            className="font-sans text-sm sm:text-base h-full text-gray-100"
            style={{ rotateY: 180 }}
            initial={false}
            animate={descriptionAnimation}
          >
            {description}
          </MotionP>
        </div>
      </MotionDiv>
    </Link>
  );
};