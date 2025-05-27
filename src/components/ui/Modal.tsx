import { cn } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal: React.FC<{
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  bg?: string;
  textColor?: string;
  titleClass?: string;
  modalClass?: string;
  showClose?: boolean;
}> = ({ show, onClose, title, children, width, bg, textColor, titleClass, modalClass, showClose = true }) => {
  return (
    <Transition.Root show={show} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-blur-md backdrop:blur-md">
          <div className="flex h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-2xl ${bg ? bg : "bg-primary-new"} text-left shadow-xl transition-all mx-auto sm:w-full ${modalClass} ${width ? width : "md:max-w-2xl"}`}>
                <div className={`${bg ? bg : 'bg-primary-new'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      {showClose && (
                        <div className={`flex justify-end ${bg ? 'text-black' : 'text-white'} text-4xl`}>
                          <AiOutlineClose
                            className="cursor-pointer"
                            onClick={onClose}
                          />
                        </div>
                      )}
                      {(title && title.length) && (
                        <Dialog.Title
                          className={`font-robo font-bold flex justify-between leading-none ${titleClass ? titleClass : 'md:text-4xl text-xl'} ${textColor ? textColor : 'text-white'}`}
                        >
                          {title}
                        </Dialog.Title>
                      )}
                      <div className={cn(`w-full ${textColor ? textColor : 'text-white'}`, title ? "mt-8" : "")}>
                        {children}
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

export default Modal;
