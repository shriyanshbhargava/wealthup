import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Testimonial, testimonials } from "./testimonail-data";

import { Carousel } from "react-responsive-carousel";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import linkedinLogo from "@/assets/images/linkedin.jpeg";

export const ClientCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        return (
          <li
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
            className={`${isSelected ? "bg-[#1C2660] scale-150" : "bg-primary-black"
              } inline-block w-3 h-3 rounded-full ml-5`}
          ></li>
        );
      }}
    >
      {testimonials.map((item, index) => (
        <Testimonail key={index} item={item} />
      ))}
    </Carousel>
  );
};

const Testimonail: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div className="flex flex-col mb-10">
      <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
        <div className="mb-6 md:mb-0 flex flex-col text-center items-center md:items-start md:text-left order-last md:order-1">
          <div className="flex gap-4 items-end">
            <p className="text-secondary text-xl md:text-2xl font-bold mb-0">
              {item.name}
            </p>
            <Link href={item.linkedin} className="">

              <Image width={20} height={20} src={linkedinLogo} alt="LinkedIn Logo" />

            </Link>
          </div>
          <p className="mb-0 text-base font-light">
            {item.designation}
          </p>
          <p className="text-base text-secondary font-light">
            {item.company}, {item.location}
          </p>
        </div>
        <div className="w-24 h-24 md:w-28 md:h-28 pl-2 md:order-last">
          <Image src={item.img} alt={item.name} className="rounded-full" />
        </div>
      </div>
      <p className="text-lg md:text-xl text-left text-secondary font-normal mb-0">
        &quot;{item.review}&quot;
      </p>
    </div>
  );
};
