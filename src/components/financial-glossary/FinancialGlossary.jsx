"use client"
import React, { useContext, useEffect, useState } from "react";
import { CmsApi } from "@/api/services/content/CmsApi";
import { FinancialGlossaryContext } from "./FinancialGlossaryLayout";
import Link from "next/link";
import { Spinner } from "@/components/ui/Spinner";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const FinancialGlossary = () => {
  const [searchedData, setSearchedData] = useState([]);
  const [showing, setShowing] = useState(false);

  const cmsApiClient = new CmsApi();

  const search = async (searchTerm) => {
    const data = await cmsApiClient.searchFinacialGlossary(searchTerm);
    setSearchedData(data);
  };

  const disableScroll = () => {
    if (typeof window !== "undefined") {
      const scrollTop = document.documentElement.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft;
      window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
    }
  }

  useEffect(() => {
    if (showing) {
      disableScroll();
    } else {
      if (typeof window !== "undefined") {
        window.onscroll = () => { }
      }
    }
  }, [showing])

  const { data, loading } = useContext(FinancialGlossaryContext);

  return (
    <>
      <div className="min-h-screen container my-8 md:mt-24">
        <h1 className="text-secondary text-2xl md:text-4xl xl:text-6xl font-bold font-robo">
          Financial Glossary
        </h1>
        <div className="my-4">
          <input
            className="bg-gray-200 placeholder:text-gray-800 rounded-lg px-6 py-4 w-full text-base"
            placeholder="Search by term"
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-12 gap-6 relative">
          {loading && (
            <div className="col-span-12 flex items-center">
              <Spinner color="black" size="8" />
            </div>
          )}
          {!loading && data.length ? (
            data.map((item, index) => (
              <FinancialGlossaryTile
                key={index}
                term={item.term}
                slug={item.slug}
                setShowing={setShowing}
                showing={showing}
              />
            ))
          ) : !loading && !data.length ? (
            <div className="col-span-12">
              <p className="font-sans text-xl text-secondary">Nothing found</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FinancialGlossary;

const FinancialGlossaryTile = ({ setShowing, showing, slug, term }) => {
  const [isTap, setIsTap] = useState(false);
  const smallScreen = useMediaQuery({ maxWidth: 650 });

  const handleClick = () => {
    setShowing(!showing);
    setIsTap(!isTap);
  };

  // Define animation objects
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

  const textAnimation = isTap
    ? {
        opacity: 0,
        transition: { duration: 0.75 },
      }
    : {
        opacity: 1,
        transition: { duration: 0.75 },
      };

  const MotionDiv = motion.div;
  const MotionH2 = motion.h2;

  return (
    <Link
      href={`/financial-glossary/${slug}`}
      onClick={handleClick}
      className="col-span-6 lg:col-span-4 xl:col-span-3 z-1 cursor-pointer w-full h-full"
    >
      <MotionDiv
        layout
        whileHover={hoverAnimation}
        initial={false}
        animate={cardAnimation}
        className={`w-full h-full ${isTap ? '' : ''}`}
      >
        <div className="min-h-[280px] h-auto md:h-full rounded-xl p-4 glossary shadow-xl flex flex-col">
          <MotionH2
            layout
            className={`${isTap ? "hidden" : ""} order-first md:order-last text-xl md:text-2xl lg:text-3xl text-gray-100`}
            initial={false}
            animate={textAnimation}
          >
            {term}
          </MotionH2>
        </div>
      </MotionDiv>
    </Link>
  );
};