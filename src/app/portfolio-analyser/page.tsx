import Backings from '@/components/wealthometer-new/Backings'
import ClientCompanies from '@/components/wealthometer-new/ClientCompanies'
import Header from '@/components/ui/header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Testimonials } from '../services/testimonials'
import { WhatToExpect } from './what-to-expect'
import heroImage from '@/assets/images/portfolio-analyser-hero-img.png'
import mainImage from '@/assets/images/main-image-pa.png'
import pfForm from '@/assets/images/pf-form.png'

const PortfolioAnalyserPage = () => {
  return (
    <>
      <Header />    
      <section className='bg-[linear-gradient(122deg,#0A5783_25.03%,#18A19A_78.64%)]'>
        <div className='mt-16 pt-16 relative'>
            <h1 className='text-white text-[60px] leading-[normal] font-semibold text-center mb-0'>Free Portfolio Health Check</h1>
            <p className='text-white text-[32px] leading-[normal] font-normal text-center'>Get a detailed analysis of your portfolio</p>
            <div className='flex justify-center mt-12'>
                <Link href="/wealthometer/questions">
                    <button className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 rounded-xl text-center text-white text-xl sm:text-2xl font-semibold">
                        Start Health Check Now
                    </button>
                </Link>
            </div>
            <div className='flex justify-center ml-[260px]'>
                <Image src={mainImage} alt="Main Image" />
            </div>
            <div className='-mt-[350px] w-full relative'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1501" height="685" viewBox="0 0 1501 685" fill="none" className='w-full'>
                    <path d="M1003.93 149.139C689.06 53.7595 451.419 107.519 298.933 244.519C184.028 347.755 57.7601 363.699 -0.0982962 358.44V685H1501V0C1269.7 162.319 1073.25 167.059 1003.93 149.139Z" fill="#0A5783"/>
                </svg>
                <div className='absolute top-52 flex flex-col items-center justify-center w-full'>
                    <h2 className='text-white font-semibold text-[52px]'>How it works?</h2>
                    <div className='flex justify-center relative'>
                      <Image src={heroImage} alt="Main Image" />
                      <div className='absolute text-white text-xl bottom-4 left-4'>
                        <span>Upload CAS</span>
                      </div>
                      <div className='absolute text-white text-xl bottom-4 left-1/2 -translate-x-1/2'>
                        <span>Enter PAN</span>
                      </div>
                      <div className='absolute text-white text-xl bottom-4 right-6'>
                        <span>Check Result</span>
                      </div>
                    </div>
                    <div className='flex justify-center mt-12'>
                      <Link href="/wealthometer/questions">
                        <button className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 rounded-xl text-center text-white text-xl sm:text-2xl font-semibold">
                          Start Health Check Now
                        </button>
                      </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <div className="text-white text-center">
        <Backings />
      </div>
      <Testimonials />
      <div className="text-white">
        <ClientCompanies />
      </div>
      <section className='bg-brand-sky-blue py-16'>
        <div className='container'>
          <div className='flex items-center'>
            <div className=''>
              <h2 className='text-white font-bold'>Check your portfolio&apos;s health now</h2>
              <div className='flex flex-col gap-4 mb-4'>
                <label className='text-white font-semibold text-2xl'>Phone Number *</label>
                <input type="number" className='rounded-lg border border-white p-2 bg-transparent text-white text-xl w-2/3' />
              </div>
              <div className='flex flex-col gap-4'>
                <label className='text-white font-semibold text-2xl'>OTP</label>
                <input type="number" className='rounded-lg border border-white p-2 bg-transparent text-white text-xl w-2/3' />
                <p className='text-xl text-white'>Didn&apos;t receive code? <span className='font-semibold'>Request again</span></p>
              </div>
            <div className='mt-8'>
              <button className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 rounded-xl text-center text-white text-xl sm:text-2xl font-semibold">
                Update CAS
              </button>
            </div>
            </div>
            <div>
              <Image src={pfForm} alt="Form" />
            </div>
          </div>
        </div>
      </section>
      <WhatToExpect />
      <section className='bg-[linear-gradient(128deg,#159C98_28.05%,#138F9E_68.12%)] py-16 flex flex-col items-center'>
        <h2 className='text-white text-bold text-center'>Your  information is safe with us</h2>
        <p className='text-2xl text-white max-w-3xl text-center'>Your security and trust are important to us and we use the highest standards of security available.</p>
      </section>
    </>
  )
}

export default PortfolioAnalyserPage
