import { Dialog, Transition } from "@headlessui/react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "@/components/ui/Input";
import React from "react";

export const PercentilePopup: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  return (
    <Transition.Root show={show} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
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
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-primary-new text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-primary-new px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-end text-white text-4xl">
                        <AiOutlineCloseCircle
                          className="cursor-pointer"
                          onClick={onClose}
                        />
                      </div>
                      <Dialog.Title
                        as="h2"
                        className="text-xl text-white font-robo font-bold flex justify-between md:text-4xl leading-6"
                      >
                        What is percentile rank?
                      </Dialog.Title>
                      <div className="text-white  mt-8 w-full">
                        <p className="text-xl">
                          Your percentile rank indicates how well you manage
                          your finances compared to others who used
                          WealthoMeter.
                        </p>
                        <p className="text-xl">
                          E.g. if you score at the 35th percentile, you are
                          better than 35 per cent of people in managing your
                          finances.
                        </p>
                        <p className="text-xl">
                          Alternatively, it also means that 65 per cent of
                          people are better than you at managing their wealth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
