import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import Image, { StaticImageData } from "next/legacy/image";

import Input from "@/components/ui/Input";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const RedeemPopUp: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image: StaticImageData;
  title: string;
  coins: number;
}> = ({ open, setOpen, image, title, coins }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-10 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-primary-dark text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-primary-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h2"
                        className="text-xl text-white font-robo font-bold flex justify-between md:text-4xl leading-6"
                      >
                        Redeem Now
                        <IoIosCloseCircleOutline
                          className="cursor-pointer"
                          onClick={() => setOpen(false)}
                        />
                      </Dialog.Title>
                      <div className="mt-8 w-full">
                        <div className="flex items-start">
                          <span className="relative block w-24 h-24 bg-gray-200 flex-shrink-0">
                            <Image src={image} alt={title} layout="fill" />
                          </span>
                          <div className="ml-4">
                            <p className="text-3xl font-robo text-white font-bold mb-0">
                              {title}
                            </p>
                            <p className="text-3xl font-robo font-normal text-white mb-0">
                              Coins being used{" "}
                              {Intl.NumberFormat("en-IN").format(coins)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-10">
                          <Input
                            type="email"
                            bgLabel="bg-primary-dark"
                            placeholder="Email"
                            label="Email"
                            color="white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
