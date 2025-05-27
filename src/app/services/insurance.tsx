import Helpsec1 from '@/assets/images/help-section/Helpsec1.png'
import Helpsec2 from '@/assets/images/help-section/Helpsec2.png'
import Helpsec3 from '@/assets/images/help-section/Helpsec3.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Insurance = () => {
  return (
    <section className='px-8 text-center flex flex-col gap-[10px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-12  w-full mt-0  bg-brand-blue sm:pt-12 sm:pb-12 xxsm: pt-16 pb-16'>
        <div className='flex flex-col items-center justify-center'>
            <h2 className=' text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10'>Insurance</h2>
            <p className='text-center text-white text-base sm:text-2xl lg:text-2xl font-normal max-w-5xl leading-tight'>Protecting your family and assets is paramount. We offer a wide range of insurance solutions to provide you with peace of mind and financial security.</p>
        </div>

        <div className='flex flex-col lg:w-[1000px] xl:w-auto lg:justify-around lg:flex-row justify-center items-center :gap-[40px] lg:gap-[30px]'>
            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[380px] bg-gradient-to-tr to-[#035782] from-[#0CBAB8] rounded-2xl backdrop-blur-sm drop-shadow-box'>
              <div className='flex gap-[2rem]'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                  <Image src={Helpsec1} alt='helpsec1' width={25}/>
                </div>
                <h3 className=' text-white text-2xl sm:text-xl font-semibold leading-6 text-left'>Life <br /> Insurance</h3>
              </div>

              
              <div className="text-white text-left w-84 sm:text-[1.15rem] scale-95 font-normal  mt-2 xxsm:text-[1.4rem]">
                Life insurance is a vital commitment to safeguard your family&apos;s financial security when you&apos;re no longer there. At Wealthup, we offer tailored life insurance solutions, assessing your unique needs and providing diverse coverage options, ensuring peace of mind and financial stability for your loved ones.
              </div>  
            </div>


            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[420px] md:h-[380px] bg-gradient-to-tr to-[#035782] from-[#0CBAB8] rounded-2xl backdrop-blur-sm drop-shadow-box'>
              <div className='flex gap-[2rem]'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                  <Image src={Helpsec2} alt='helpsec2' width={25}/>
                </div>
                <h3 className=' text-white text-2xl sm:text-xl font-semibold leading-6 text-left'>Health <br /> Insurance</h3>
                {/* <div className='flex items-center'>
                </div> */}
              </div>
              
              <div className="text-white text-left w-84 sm:text-[1.15rem] scale-95 font-normal mt-2 xxsm:text-[1.4rem]">
              Your health is invaluable, and Wealthup understands the importance of protecting it. The way medical costs are rising, it’s not enough to rely on your employer’s health coverage. We suggest the best plans to meet your healthcare needs, providing comprehensive coverage for hospitalization, outpatient care, prescriptions, and more.
              </div>  
            </div>
            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[380px] bg-gradient-to-tr to-[#035782] from-[#0CBAB8] rounded-2xl backdrop-blur-sm drop-shadow-box'>
              <div className='flex gap-[2rem]'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                <Image src={Helpsec3} alt='helpsec3' width={25}/>
                </div>
                <div className='flex justify-center items-center'>
                <h3 className=' text-white text-2xl sm:text-xl font-semibold leading-6 text-left'>Asset <br /> Protection</h3>
                </div>
              </div>

              
              <div className="text-white text-left w-84 sm:text-[1.15rem] scale-95 font-normal mt-2 xxsm:text-[1.4rem]">
              Preserving and protecting your assets is paramount. Wealthup offers asset protection plans to shield your wealth from unforeseen risks. We assess your financial situation to secure your assets, offering peace of mind and enabling you to focus on your financial goals.
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
