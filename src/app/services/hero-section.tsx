import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ankit from "@/assets/images/investbanking/Ankit Photos.jpg"

export const HeroSection = () => {
  return (
    <section className='h-full mt-[65px] xsm:pt-20 md:px-16 pb-12 bg-gradient-to-tr from-brand-blue to-brand-sky-blue xxsm:px-8 pt-12 md:min-h-[95vh]'>
      {/* justify-evenly */}
      <div className='flex flex-col xl:flex-row lg:w-auto justify-between sm:mx-auto sm:gap-[5px] xl:gap-[14rem] xxsm:pb-2 max-w-[1200px]'>
        <div className='flex flex-col justify-center gap-[0.75rem] '>
          <h1 className='xl:text-left text-white text-4xl sm:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-semibold capitalize md:leading-[40px] mb-8 w-fit'>
            One Stop Solution For<br /> Your Personal Finance Needs
          </h1>
          <div className='hidden md:flex flex-col items-center justify-center max-w-lg'>
          <p className='text-white xl:ml-0 xl:text-left text-3xl font-normal leading-tight md:mx-auto xsm:text-[1.15rem]  xxsm:text-base ml-4 mb-12'>
            Our dedicated experts work hard to grow your investments, protect your finances and plan your taxes - <span className='font-bold'>so you can spend time on things you love.</span>
          </p>
          </div>
           <Link href="/wealthometer/questions" className="hidden bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 md:flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Get Started
          </button>
        </Link>
        </div>

        <div className="relative flex justify-end md:justify-center items-end">
            <div className="bg-[#D9D9D9] h-[400px] w-[280px] md:w-[360px] rounded-2xl relative flex flex-col justify-end">
            <Image src={ankit} alt="Medha" fill className="rounded-2xl"  objectFit="cover" objectPosition="top center" />
                        <div className="max-w-[180px] md:max-w-[240px] w-full absolute top-6 -left-24 md:-left-40 bg-[linear-gradient(240.34deg,#035782_2.27%,rgba(12,186,184,0.8)_95.63%)] p-4 rounded-xl shadow-md backdrop:blur-sm drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                            <h3 className="text-white text-xl font-medium mb-0 text-center">
                                <span className="text-3xl">6+</span> Years
                            </h3>
                            <p className="text-white text-center text-xs md:text-sm mb-0">As Investment Banker, Swiss <br /> Bank (UBS) New York </p>
                        </div>
                        <div className="max-w-[180px] md:max-w-[240px] w-full absolute top-36 md:top-40 -left-24 md:-left-40 bg-[linear-gradient(240.34deg,#035782_2.27%,rgba(12,186,184,0.8)_95.63%)] p-4 rounded-xl shadow-md backdrop:blur-sm drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                            <h3 className="text-white text-xl font-medium mb-0 text-center">
                                <span className="text-3xl">14+</span> Years
                            </h3>
                            <p className="text-white text-center text-xs md:text-sm mb-0">of Proven Investing Excellence</p>
                        </div>
                        <div className="max-w-[180px] md:max-w-[240px] w-full absolute top-[230px] md:top-[240px] -left-24 md:-left-40  bg-[linear-gradient(240.34deg,#035782_2.27%,rgba(12,186,184,0.8)_95.63%)] p-4 rounded-xl shadow-md backdrop:blur-sm drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                            <h3 className="text-white text-xl font-medium mb-0 text-center">
                                <span className="text-3xl">29</span> Years
                            </h3>
                            <p className="text-white text-center text-xs md:text-sm mb-0">Attained Financial Freedom</p>
                        </div>
                        <div className="p-4 flex gap-2 items-center">
                            <p className="text-[#035782] font-medium mb-0">Ankit Agarwal</p>
                        </div>
                    </div>
                    </div>

        <div className='flex md:hidden flex-col items-center justify-center max-w-lg mt-6'>
          <p className='text-white xl:ml-0 xl:text-left text-3xl font-normal leading-tight md:mx-auto md:text-[1.60rem]  xsm:text-[1.15rem]  xxsm:text-base ml-4 text-center'>
            Our dedicated experts work hard to grow your investments, protect your finances and plan your taxes - <span className='font-bold'>so you can spend time on things you love.</span>
          </p>
          </div>
          <div className='md:hidden flex justify-center w-ful'>
            <Link href="/wealthometer/questions" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Get Started
          </button>
        </Link>
          </div>
      </div>
    </section>
  )
}
