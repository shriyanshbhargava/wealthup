import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  [
    {
      name: "Aishwarya Chaturvedi",
      review:
        "...if I wasn't reminded and pushed aggressively, I would have kept procrastinating",
    },
    {
      name: "Ishan Roy",
      review:
        "...they not only support people with big net-worth but also people starting out",
    },
  ],
  [
    {
      name: "Simrin Sirur",
      review:
        "...would recommend to anyone needing clarity on saving better... with them there's no question silly enough",
    },
    {
      name: "Pooja Srivatsav",
      review:
        "...friendly and non-judgmental discussion was a huge plus for me",
    },
  ],
  [
    {
      name: "Apurva Vurity",
      review:
        "...gave me advice not only based on my income and financial goals, but also on my financial personality",
    },
    {
      name: "Saketh Ramachandran",
      review:
        "...it has changed how I manage my finances to an extent I didn’t think possible",
    },
  ],
  [
    {
      name: "Sarthak Jha",
      review:
        "...would be losing time and making mistakes, which would cost me in long term",
    },
    {
      name: "Aditya Kamboj",
      review:
        "...was an eye-opener and gave me an entirely new perspective on my finances",
    },
  ],
];

export const Slider = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={false}
      showStatus={false}
      showThumbs={false}
    >
      {testimonials.map((item, key) => (
        <Testimonials items={item} key={key} />
      ))}
    </Carousel>
  );
};

const Testimonials: React.FC<{ items: { name: string; review: string }[] }> = ({
  items,
}) => {
  return (
    <div className="flex w-full items-center gap-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <h2 className="font-sans font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1.5vw]">
            {item.name}
          </h2>
          <p className="font-robo font-normal text-[3.5vw] sm:text-[1.75vw] lg:text-[1vw]">
            {item.review}
          </p>
        </div>
      ))}
    </div>
  );
};
