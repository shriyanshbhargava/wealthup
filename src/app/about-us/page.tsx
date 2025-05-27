import '@/styles/newstyles.css'

import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import { HeroSection } from './hero-section'
import Link from 'next/link'
import { Message } from './message'
import { OurTeam } from './our-team'
import React from 'react'
import { Value } from './value'
import { whatsappHelpLink } from '@/utils/constants'

const About = () => {
  return (
    <>
        <Header />
        <HeroSection /> 
        <OurTeam />
        {/* <Message /> */}
        <Value />
        <section className='bg-[#BAEFE6] py-10'>
            <div className='flex justify-center container'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-5 md:gap-10'>
                    <div className='bg-[#0DC3B0] px-4 py-6 rounded-2xl flex flex-col justify-between'>
                        <h3 className='text-2xl sm:text-xl font-semibold leading-6 text-left text-white'>Build your career with Wealthup.</h3>
                        <Link href="https://share.hsforms.com/1cahOE8nYQrCu_LIiBWsJDwbx5g4" className="bg-orange-500 h-[32px] w-fit px-4 flex items-center justify-center rounded-[8px] border-orange-500 shadow ">
                            <button className='text-center text-white text-sm font-semibold'>
                                Join Our Talent Pool
                            </button>
                        </Link>
                    </div>
                    <div className='bg-[#0DC3B0] px-4 py-6 rounded-2xl flex flex-col justify-between'>
                        <h3 className='text-2xl sm:text-xl font-semibold leading-6 text-left text-white'>Let&apos;s build something amazing together.</h3>
                        <Link href="mailto:hello@wealthup.me" className="bg-orange-500 h-[32px] w-fit px-4 flex items-center justify-center rounded-[8px] border-orange-500 shadow ">
                            <button className='text-center text-white text-sm font-semibold'>
                                Explore Partnership
                            </button>
                        </Link>
                    </div>
                    <div className='bg-[#0DC3B0] px-4 py-6 rounded-2xl flex flex-col justify-between'>
                        <h3 className='text-2xl sm:text-xl font-semibold leading-6 text-left text-white'>Take control of your financial future.</h3>
                        <Link href={whatsappHelpLink} className="bg-orange-500 h-[32px] w-fit px-4 flex items-center justify-center rounded-[8px] border-orange-500 shadow ">
                            <button className='text-center text-white text-sm font-semibold'>
                            Chat With A Pro
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default About
