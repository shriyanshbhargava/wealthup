import { IoIosClose, IoLogoWhatsapp } from "react-icons/io";

import { Button } from "@/components/ui/Button";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import exitPopupImage from "@/assets/images/landing-page/Exit Box - Leaving Already.jpeg";

export const ExitPopup: React.FC<{
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  open: boolean;
  exitbox: boolean;
}> = ({ onClose, open, exitbox = true }) => {
  return <>
    {open && (
      <div className="fixed top-0 right-0 w-full h-full z-50">
        <div className="flex w-full h-full justify-center items-center">
          <div className="bg-white w-3/5 h-4/5 rounded-md backdrop-blur-md shadow-md">
            <div className="w-full h-full flex">
              <div className="w-1/2 h-full rounded-l-md flex items-center justify-center bg-primary-new">
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={exitPopupImage}
                    alt="Exit Popup Image"
                    layout="fill"
                    className="rounded-tl-md"
                  />
                </div>
              </div>
              <div className="w-1/2 h-full">
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center bg-primary-new hover:bg-primary-dark text-white rounded-tr-md"
                  >
                    <IoIosClose size={30} />
                  </button>
                </div>
                <div className="h-full py-4 px-8">
                  <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="font-robo font-medium">
                      Leaving Already?
                    </h2>
                    <p className="font-robo font-normal text-xl py-8 text-center">
                      Take just 3 minutes to understand your current financial
                      situation by using WealthoMeter!
                    </p>
                    <Link href="/wealthometer">

                      <Button className="btn">Use WealthoMeter</Button>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>;
};
