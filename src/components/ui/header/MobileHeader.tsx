import { Dialog, Transition } from "@headlessui/react";
import { resourcesPages, toolsPages } from ".";

import { Button } from "../Button";
import Image from "next/legacy/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import React from "react";
import { motion } from "framer-motion";

const MobileHeader: React.FC<{
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoggedIn: boolean;
}> = ({ show, onClose, isLoggedIn, onOpen }) => {
  return (
    <Transition.Root show={show}>
      <Dialog onClose={onClose} as="div">
        <motion.div
          className="w-screen h-screen fixed top-0 z-50 bg-white px-4 py-8"
          initial={{ right: -400 }}
          animate={{ right: 0 }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center text-3xl">
              <Link href="/">

                <Image
                  src="/assets/img/wealthup-bluelogo.png"
                  alt="wealthup.me logo"
                  height={26}
                  width={100}
                  className="cursor-pointer"
                />

              </Link>
              <div className="">
                <MdClose onClick={onClose} />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <Link
                href="/about"
                className="font-bold hover:underline text-lg transition ease-in-out">
                
                  About Us
                
              </Link>

              <p className="font-bold text-lg text-secondar mb-0">Tools:</p>
              <div className="px-2">
                <ul>
                  {toolsPages.map((tool, index) => (
                    <li
                      key={index}
                      className="text-[18px] leading-[20px] h-10 px-[8px] flex items-center rounded-[5px] hover:bg-[#eaeaea]"
                    >
                      <Link
                        href={tool.to}
                        className="font-robo font-normal font-sm leading-[20px] transition ease-in-out">

                        {tool.name}

                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-lg text-secondar mb-0">Resources:</p>
              <div className="px-2">
                <ul>
                  {resourcesPages.map((resource, index) => (
                    <li
                      key={index}
                      className="text-[18px] leading-[20px] h-10 px-[8px] flex items-center rounded-[5px] hover:bg-[#eaeaea]"
                    >
                      <Link
                        href={resource.to}
                        className="font-robo font-normal font-sm leading-[20px] transition ease-in-out">

                        {resource.name}

                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="cursor-pointer font-bold hover:underline text-lg transition ease-in-out" onClick={() => onOpen()}>
                  Join Referral Program
                </span>
              </div>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/myaccount/dashboard"
                    className="font-bold hover:underline text-lg transition ease-in-out">
                    
                      My Dashboard
                    
                  </Link>
                  <Link
                    href="/logout"
                    className="font-bold hover:underline text-lg transition ease-in-out text-red-700">
                    
                      Logout
                    
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="font-bold hover:underline text-lg transition ease-in-out">
                  
                    Login / Register
                  
                </Link>
              )}
              <div className="flex justify-center">
                <Link href="/wealthometer" className="hidden md:block">

                  <Button
                    size="bigger"
                    transition
                    className="btn"
                  >
                    Use WealthoMeter
                  </Button>

                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileHeader;
