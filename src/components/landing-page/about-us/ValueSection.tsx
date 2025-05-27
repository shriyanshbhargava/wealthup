import { Accordion } from "@/components/ui/Accordion";
import Link from "next/link";
import React from "react";

const data = [
  {
    summary: "Reliability",
    details:
      "A friend who will be with you through market’s ups and downs and your changing situations.",
  },
  {
    summary: "Simplicity",
    details:
      "A friend who will breakdown your problems and suggest solutions in a jargon-free manner.",
  },
  {
    summary: "Approachability",
    details: "A friend you can talk to easily via multiple channels.",
  },
];

export const ValueSection = () => {
  const [current, setCurrent] = React.useState<number>(0);

  return (
    <div className="py-16 md:py-16 px-6 lg:px-0 md:h-screen md:min-h-[1200px] flex flex-col items-center justify-center bg-white">
      <h2 className="text-2xl md:text-3xl font-robo font-medium text-secondary">
        Our Values
      </h2>
      <p className="text-base md:text-xl text-center lg:text-[1.5vw] mt-8 font-sans font-normal text-secondary">
        &quot;Values are like fingerprints. Nobody&apos;s are the same, but you
        leave them all over everything you do.&quot;
      </p>
      <p className="text-base md:text-xl font-sans font-medium lg:text-[1.5vw]">
        ~ Elvis Prestley
      </p>
      <div className="hidden lg:block w-[80%] my-16">
        <div className="flex justify-evenly h-full">
          <div className="flex flex-col gap-4">
            {data.map((ele, index) => (
              <div
                key={ele.summary}
                className={`hover-values-section rounded-2xl cursor-pointer hover:text-white shadow-xl lg:w-[15vw] lg:h-[8vw] text-secondary text-base md:text-xl font-sans font-normal ${
                  index == current ? "values-section" : ""
                }`}
                onClick={() => setCurrent(index)}
              >
                {ele.summary}
              </div>
            ))}
          </div>
          {/* <div className="flex items-center justify-center"> */}
          <div className="values-section w-[30vw] h-full text-white ml-[10vw] rounded-3xl flex flex-col items-center justify-center px-8 ">
            <p className="text-base md:text-xl font-medium font-sans mb-6">
              {data[current].summary}
            </p>
            <p className="text-base md:text-xl text-center font-normal font-sans">
              {data[current].details}
            </p>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="lg:hidden">
        {data.map((e, i) => (
          <Accordion key={i} title={e.summary} content={e.details} />
        ))}
      </div>
    </div>
  );
};

export const ActionCard: React.FC<{
  title: string;
  linkTitle: string;
  link: string;
}> = ({ title, linkTitle, link }) => {
  return (
    (<Link href={link}>

      <div className="cursor-pointer flex flex-col items-center justify-center action-card text-white rounded-2xl py-3 px-4 min-h-fit md:w-[22vw] md:h-[22vh]">
        <p className="text-base md:text-xl text-center text-sans font-normal mb-6">
          {title}
        </p>
        <p className="text-base md:text-xl text-robo font-medium">
          {linkTitle}
        </p>
      </div>

    </Link>)
  );
};
