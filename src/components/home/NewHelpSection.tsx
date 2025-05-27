import Helpsec1 from '@/assets/images/help-section/Helpsec1.png'
import Helpsec2 from '@/assets/images/help-section/Helpsec2.png'
import Helpsec3 from '@/assets/images/help-section/Helpsec3.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NewHelpSection = () => {
  return (
    <section className='px-8 text-center flex flex-col gap-[10px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-12  w-full mt-0  bg-sky-800 sm:pt-12 sm:pb-12 xxsm: pt-16 pb-16'>
        <div className='flex flex-col items-center justify-center'>
            <h2 className=' text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10'>How We Can Help</h2>
            <p className='text-center text-white text-base sm:text-2xl lg:text-2xl font-normal'>We develop a personalised plan for you to achieve your financial aspirations</p>
        </div>

        <div className='flex flex-col lg:w-[1000px] xl:w-auto lg:justify-around lg:flex-row   justify-center items-center sm:gap-[40px] lg:gap-[30px]'>
            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[250px] lg:h-[350px] xl:h-[250px] lg bg-gradient-to-bl from-sky-800 to-teal-500 rounded-2xl border border-teal-500'>
              <div className='flex gap-[2rem]'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                  <Image src={Helpsec1} alt='helpsec1' width={25}/>
                </div>
                <h3 className=' text-white text-2xl sm:text-xl font-semibold leading-6 text-left'>Proactive investment management.</h3>
              </div>

              
              <div className="text-white text-left w-84 h-32 text-[1.15rem] scale-95 font-normal  mt-2 ">
                <p className='text-[1.3rem] xsm:text-xl'>
                We don&apos;t just set and forget your portfolio; we actively track, monitor, and adjust it to ensure it remains aligned with your financial aspirations.
                </p>
              </div>  
            </div>


            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[250px] lg:h-[350px] xl:h-[250px] lg bg-gradient-to-bl from-sky-800 to-teal-500 rounded-2xl border border-teal-500'>
              <div className='flex justify-center  gap-[2rem]'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                  <Image src={Helpsec2} alt='helpsec2' width={25}/>
                </div>
                <div className='flex items-center justify-center'>
                <h3 className=' text-white text-2xl sm:text-xl font-semibold leading-6 text-left'>Personalized insurance guidance.</h3>
                </div>
              </div>
              
              <div className="text-white text-left w-84 h-32 scale-95 font-normal mt-2 ">
                <p className='text-[1.3rem] xsm:text-xl'>
              We explain the benefits of various life and health insurance policies and help you choose the right option that best protects you and your loved ones.
              </p>
              </div>  
            </div>
            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[250px] lg:h-[350px] xl:h-[250px] lg bg-gradient-to-bl from-sky-800 to-teal-500 rounded-2xl border border-teal-500'>
              <div className='flex gap-[2rem]'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                <Image src={Helpsec3} alt='helpsec3' width={25}/>
                </div>
                <div className='flex justify-center items-center'>
                <h3 className=' text-white text-2xl sm:text-xl font-semibold leading-6 text-left'>Professional tax planning & filing.</h3>
                </div>
              </div>

              
              <div className="text-white text-left w-84 h-32 scale-95 font-normal mt-2 ">
                <p className='text-[1.3rem] xsm:text-xl'>
              We help you select the right tax regime and identify strategies to maximise your tax savings.
              </p>
              </div>  
            </div>
        </div>

        <div className="flex justify-center">
        <Link href="/wealthometer/questions" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Get Started
          </button>
        </Link>
      </div>


    </section>

  )
}

export default NewHelpSection
