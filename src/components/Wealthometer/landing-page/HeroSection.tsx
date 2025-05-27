import { Check } from "lucide-react";
import Image from "next/legacy/image";
import Link from 'next/link';
import React from 'react';
import { WealthoMeterButton } from '@/components/MyAccount/Dashboard/WealthoMeterButton';
import wealthometerReport from '@/assets/images/wealthometer/wealthometer-new-report.png';
import { IoMdCheckboxOutline } from "react-icons/io";

export const HeroSection = ({ questions = false }: { questions?: boolean }) => {
    return (
        <section id="hero-area-wealthometer" className={`md:pt-8 ${questions ? 'md:pb-4 pb-0' : 'md:pb-64'}`}>
            <div className="container relative bottom-10 max-md:w-full">
                <div className="flex justify-between ">
                    <div className="w-full text-center">
                        <h1
                            className="text-white mb-0 text-4xl sm:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-bolder leading-tight font-poppins capitalize"
                        >
                            Check your financial health
                        </h1>
                        <p className="text-xl md:text-2xl lg:mb-0 mb-4 md:mb-12 lg:text-[22px] font-normal leading-snug text-white ">
                            Get a free report card for your finances - within minutes!
                        </p>

                        {questions ? (
                            <div className='hidden lg:flex w-full items-center justify-center '>
                                <ul className='list-none w-full relative top-8 flex justify-center flex-row flex-now-wrap xl:gap-20 max-lg:gap-20 max-sm:gap-10  max-sm:items-center max-sm:flex max-sm:flex-row max-xsm:flex-col max-xsm:gap-5  '>
                                    <div className='mr-2 '>
                                    <li className='text-left font-normal text-white lg:text-[1.25rem] max-md:text-base max-lg:text-xl text-sm mb-2 max-lg:list-disc'>
                                            <div className='hidden lg:inline-block'>
                                            <IoMdCheckboxOutline width={25} height={25} />
                                            </div>
                                            <span className="max-lg:relative max-lg:top-0 text-left lg:ml-3 relative bottom-2  pr-9 max-md:pr-8 max-lg:pr-12 max-xsm:pr-6">Expected Retirement Age
                                                {/* <span className="absolute left-0 right-0 bottom-0  top-0 h-0.5 bg-white mt-8"></span> */}
                                            </span>
                                        </li>
                                        <li className='text-left font-normal text-white lg:text-[1.25rem] max-md:text-base max-lg:text-xl text-sm mb-2 max-lg:list-disc'>
                                            <div className='hidden lg:inline-block'>
                                            <IoMdCheckboxOutline width={25} height={25} />

                                            </div>
                                            <span className="max-lg:relative max-lg:top-0 text-left lg:ml-3 relative bottom-2  pr-9 max-md:pr-8 max-lg:pr-12 max-xsm:pr-6">Identify Mistakes
                                                {/* <span className="absolute left-0 right-0 bottom-0  top-0 h-0.5 bg-white mt-8"></span> */}
                                            </span>
                                        </li>
                                    </div>
                                    <div className='max-xsm:relative max-xsm:right-2'>
                                        <li className='text-left font-normal text-white lg:text-[1.25rem] max-md:text-base max-lg:text-xl text-sm mb-2 max-lg:list-disc'>
                                            <div className='hidden lg:inline-block'>
                                            <IoMdCheckboxOutline width={25} height={25} />

                                            </div>
                                            <span className="max-lg:relative max-lg:top-0 text-left lg:ml-3 relative bottom-2  pr-9 max-md:pr-8 max-lg:pr-12 max-xsm:pr-6">Personalized Roadmap
                                                {/* <span className="absolute left-0 right-0 bottom-0  top-0 h-0.5 bg-white mt-8"></span> */}
                                            </span>
                                        </li>

                                        <li className='text-left font-normal text-white lg:text-[1.25rem] max-md:text-base max-lg:text-xl text-sm mb-2 max-lg:list-disc'>
                                            <div className='hidden lg:inline-block'>
                                            <IoMdCheckboxOutline width={25} height={25} />

                                            </div>
                                            <span className="text-left lg:ml-3 relative bottom-2  pr-32 max-md:pr-24 max-sm:pr-20 max-lg:pr-29 max-lg:relative max-lg:top-0">Tips To Improve
                                                {/* <span className="absolute left-0 right-0 bottom-0  top-0 h-0.5 bg-white mt-8"></span> */}
                                            </span>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <div className='flex lg:flex-row lg:items-center flex-col'>
                                    <div className='lg:order-2 shadow-2xl'>
                                        <Image src={wealthometerReport} alt="WealthoMeter Report" className='shadow-lg' />
                                    </div>
                                    <div className="lg:hidden flex justify-center mt-4 sm:mt-8 w-full mb-8">
                                        <WealthoMeterButton />
                                    </div>
                                    <div className='lg:order-1 mx-4'>
                                        <ul className='lg:list-none flex lg:gap-6 justify-between flex-wrap'>
                                            <li className='lg:w-full w-[49%] text-left font-semibold text-white lg:text-2xl text-sm'>
                                                <div className='hidden lg:block'>
                                                    <Image src={tickImage} width={40} height={40} alt="Tick Mark" />
                                                </div>
                                                <span className="lg:ml-8">Identify gaps</span>
                                            </li>
                                            <li className='lg:w-full w-[49%] text-left font-semibold text-gray-700 lg:text-2xl text-sm'>
                                                <div className='hidden lg:block'>
                                                    <Image src={tickImage} width={40} height={40} alt="Tick Mark" />
                                                </div>
                                                <span className="lg:ml-8">Personalised roadmap</span>
                                            </li>
                                            <li className='lg:w-full w-[49%] text-left font-semibold text-gray-700 lg:text-2xl text-sm'>
                                                <div className='hidden lg:block'>
                                                    <span className='tick-mark'></span>
                                                </div>
                                                <span className="lg:ml-8">Compare with others</span>
                                            </li>
                                            <li className='lg:w-full w-[49%] text-left font-semibold text-gray-700 lg:text-2xl text-sm'>
                                                <div className='hidden lg:block'>
                                                    <span className='tick-mark'></span>
                                                </div>
                                                <span className="lg:ml-8">Tips to improve</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="lg:flex relative bottom-10 hidden justify-center mt-4 sm:mt-8 w-full mb-8">
                                    <WealthoMeterButton />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
