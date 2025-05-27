import HeroMobileSection from "@/assets/images/HeroPhone.png"
import Image from 'next/image'
import Link from 'next/link'
import MobileFrameNew from "@/assets/images/wealthometer_main/mobileframenew.png"
import React from 'react'

const NewHeroSection = () => {
  return (
    // lg:text-green-800 md:text-yellow-600 md:text-center md:text-red-300 md:mt-[65px]
    <section className='h-full md:mt-[65px] mt-[65px] xsm:pt-20 md:px-16 pb-8 bg-gradient-to-b from-sky-800 to-teal-600 xxsm:px-8 pt-8 p-4'>
      {/* justify-evenly */}
      <div className='flex flex-col xl:flex-row lg:w-auto justify-between sm:mx-auto sm:gap-[5px] xxsm:pb-2'>
        <div className='flex flex-col gap-[0.75rem] '>
          <h1 className=' xl:text-left text-white text-4xl sm:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-semibold capitalize md:leading-[50px]'>
            Simple & stress-free <br className='br-xl-show'/> Financial Planning
          </h1>
          <div className='flex flex-col items-center justify-center'>
          <p className='text-white xl:ml-0 xl:text-left lg:flex font-normal leading-tight md:mx-auto md:text-[1.60rem]  text-[1.2rem] ml-4'>
            For people who are serious <br className='br-xl-show'/> about their financial success
          </p>
          <div className='text-white ml-8 mb-8 md:text-[1.2rem] md:mx-auto xxsm:text-base sm:text-[1rem]'>
            <ul>
              <li>Knowledgable experts whose interests are <br className='br-xl-show'/> aligned with yours</li>
              <li>Ditch procrastination, take action</li>
              <li>We monitor and update your plan - you do <br className='br-xl-show'/> what you love</li>
            </ul>
          </div>
          </div>
          {/* <Link href="/wealthometer/questions" className="w-96 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto shadow">

            <button className='w-full h-full flex justify-center items-center text-center text-white text-3xl font-semibold '>
                Get Started
            </button>

        </Link> */}

          <div className='xl:flex gap-[24px] hidden xl:justify-start xl:items-center'>
            <Link href="/wealthometer/questions" className="bg-orange-500 h-16 w-48 md:flex justify-center  rounded-[0.2rem] border-orange-500 shadow ">

              <button className='text-center text-white text-2xl font-semibold '>
                Get Started
              </button>

            </Link>
            <Link href="/demo/dashboard">
            <button className='bg-teal-500 w-48 h-16 flex justify-center items-center shadow-xl bg-opacity-0  rounded-[0.2rem] border border-white'>
              <span className='text-center  text-white text-2xl font-semibold '>
                See Demo
              </span>
            </button>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-around items-end">
        <Image src={HeroMobileSection} alt="mobile-image" className="w-[32em]"/>
        </div>

        <div className='xl:hidden gap-[24px] flex xsm:flex-row items-center justify-start flex-col lg:flex-row xxsm:mx-auto'>
          <Link href="/wealthometer/questions" className="bg-orange-500 h-12 sm:h-16 sm:w-64 w-64  flex justify-center rounded-[0.2rem] border-orange-500 shadow">
            <button className="text-center text-white text-xl sm:text-2xl font-semibold">
              Get Started
            </button>
          </Link>

          <Link href="/demo/dashboard">
          <button className='bg-teal-500 h-12 sm:h-16   sm:w-64 w-64 flex justify-center rounded-[0.2rem] items-center shadow-xl bg-opacity-0  border border-white'>
              <span className='text-center text-white text-xl sm:text-2xl font-semibold'>
                See Demo
              </span>
            </button>
            </Link>        
        </div>

      </div>
    </section>


  )
}

export default NewHeroSection
