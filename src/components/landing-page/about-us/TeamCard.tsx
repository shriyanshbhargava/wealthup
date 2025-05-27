import Image, { StaticImageData } from "next/legacy/image";

import Link from "next/link";
import React from "react";
import linkedinLogo from "@/assets/images/linkedin.jpeg";

interface TeamCardProps {
  image: StaticImageData;
  name: string;
  linkedinLink: string;
  designation: string;
  profession: string;
  others: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  image,
  name,
  linkedinLink,
  designation,
  profession,
  others,
}) => {
  return (
    <div className="shadow-lg mx-[5%] sm:mx-[1vw] bg-white sm:bg-transparent  overflow-hidden  sm:w-[20vw] sm:h-[32vw] md:w-[16vw] md:h-[25vw] flex sm:flex-col rounded-2xl">
      <div className="relative h-[18vh] sm:h-[151px] sm:w-[151px] w-40 md:w-full md:h-full">
        <Image
          src={image}
          alt={name}
          // width="100%"
          layout="fill"
          className="sm:rounded-t-2xl rounded-l-2xl h-80 w-80"
        />
      </div>
      <div className="flex flex-col px-4 sm:p-2  md:p-4">
        <div className="flex gap-2 mt-2 md:gap-4 sm:mb-2 items-center sm:items-end">
          <p className="text-lg md:text-xl mb-0 font-medium font-robo text-secondary">
            {name}
          </p>
          <Link
            href={linkedinLink}
            className="relative w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-5 lg:h-5 xl:w-6 xl:h-6 xxl:w-8 xxl:h-8 ">

            <Image src={linkedinLogo} layout="fill" alt="LinkedIn Logo" />

          </Link>
        </div>
        <p className="text-sm md:text-lg mb-1 leading-tight font-snas text-secondary font-normal">
          {designation}
        </p>
        <p className="text-[3.5vw] mb-1 leading-tight sm:text-[1.75vw] md:text-[1.25vw] font-snas text-secondary font-normal">
          {profession}
        </p>
        <p className="text-[3.25vw] mb-1 leading-tight sm:text-[1.25vw] md:text-[1vw] font-snas text-secondary font-normal">
          {others}
        </p>
      </div>
    </div>
  );
};
