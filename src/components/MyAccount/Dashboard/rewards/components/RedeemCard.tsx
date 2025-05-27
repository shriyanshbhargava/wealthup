import { StaticImageData } from "next/legacy/image";
import React from "react";
import { RedeemPopUp } from "./RedeemPopUp";
import Image from "next/legacy/image";

export const RedeemCard: React.FC<{
  image: StaticImageData;
  title: string;
  coins: number;
}> = ({ image, title, coins }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <div className="bg-white shadow-md rounded-xl w-[512px] max-w-lg">
        <div className="flex p-4">
          <span className="relative block w-20 h-20 rounded-full shadow-md bg-gray-200 flex-shrink-0">
            <Image src={image} alt={title} layout="fill" />
          </span>
          <div className="ml-6 w-full flex flex-col">
            <p className="mb-0 flex font-robo font-medium text-xl">{title}</p>
            <span className="text-base">
              {Intl.NumberFormat("en-IN").format(coins)} coins
            </span>
            <div className="mt-4 flex items-center justify-between">
              <span>* T&amp;C</span>
              <span
                typeof="button"
                onClick={() => setOpen(true)}
                className="rounded-full py-1 px-2 cursor-pointer bg-primary-new text-base text-white font-robo font-noraml"
              >
                Redeem Now
              </span>
            </div>
          </div>
        </div>
      </div>
      <RedeemPopUp
        open={open}
        setOpen={setOpen}
        title={title}
        coins={coins}
        image={image}
      />
    </>
  );
};
