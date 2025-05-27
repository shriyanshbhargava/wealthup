import { useEffect, useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import Chat from '@/assets/images/Chat.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import tick from "@/assets/images/tick.png"

const InterestSection = () => {
  return (
    <section className='px-8 flex flex-col bg-custom-gradient-Interestsection justify-center items-center py-12  gap-[1.5rem] lg:gap-0' >
        <div className='flex flex-col text-center items-center justify-center '>
            <h2 className='text-center text-[#0A5783] text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold capitalize xxsm:leading-12'>Here’s why our interests <br className='br-xl-show'/> are aligned with yours</h2> 
        </div>
        <div>
            <div className='flex lg:flex-row justify-evenly gap-[50px] lg:gap-[5px] xl:gap-[40px] items-center xxsm:flex flex-col'>
                
                <div className="h-[auto] w-[325px]  xsm:w-[420px]   
                lg:w-[350px] lg:h-[375px]
                p-8 lg:scale-75 xl:scale-90  flex flex-col gap-[0.2rem] bg-gradient-to-b from-teal-500 to-teal-500 rounded-2xl border border-teal-500">
                    <h5 className='text-white xsm:text-2xl font-semibold xsm:leading-9 leading-6 text-[1.25rem] '>We make more money when your investments grow  with us.</h5>
                   <p className='text-white xxsm:text-[1rem] xsm:text-xl font-normal'>Our fee increases when the value of your investments increase. This happens in two ways: when your investments generate great returns, their value rises, and when you see great returns, you choose to invest more money with us.</p>
                </div>

                <div className="h-[auto] w-[325px]  xsm:w-[420px]  
                lg:w-[350px] lg:h-[350px]  p-8 lg:scale-75 xl:scale-90  flex flex-col gap-[0.2rem] bg-gradient-to-b from-teal-500 to-teal-500 rounded-2xl border border-teal-500">
                    <h5 className='text-white xsm:text-2xl font-semibold xsm:leading-9 leading-6 text-[1.25rem] '>
                    We only suggest options that we personally invest in.
                    </h5>
                    <p className='text-white xxsm:text-[1rem] xsm:text-xl font-normal'>
                    We only recommend products that are best for you, not because they pay us more. We will not offer any options that our team does not personally invest in.
                    </p>
                </div>

                <div className=" h-[auto] w-[325px]  xsm:w-[420px]  
                lg:w-[350px] lg:h-[350px]  p-8 lg:scale-75 xl:scale-90 flex flex-col gap-[0.2rem] bg-gradient-to-b from-teal-500 to-teal-500 rounded-2xl border border-teal-500">
                    <h5 className='text-white xsm:text-2xl font-semibold xsm:leading-9 leading-6 text-[1.25rem] '>We want you to spread the word about us!</h5>
                    <p className='text-white  xsm:text-xl font-normal'>
                    When you are happy with us, you tell people about Wealthup, and we grow without spending money on expensive ads!
                    </p>
                    <div className='ml-[120px] -mb-[20px] '>
                        <Image width={250}  src={Chat} alt='chatimg'/>
                    </div>
                </div>
            </div>
        </div>  
          <div className=" lg:text-black text-xl font-semibold  mt-8  text-center "> If you have any concerns, write to Ankit directly at&nbsp;
          <span className='text-[#035782]'>ankit@wealthup.me </span>
      </div>

    </section>
  )
}

export default InterestSection
