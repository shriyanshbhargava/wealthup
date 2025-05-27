import Link from 'next/link'
import React from 'react'
import { InvestmentsFaq } from './investments-faq'

export const Investments = () => {
  return (
    <section className='px-8 text-center flex flex-col gap-[10px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-12  w-full mt-0 bg-gradient-to-b from-brand-blue to-brand-sky-blue sm:pt-12 sm:pb-12 xxsm: pt-16 pb-16'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className=' text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10 mb-8'>Investments</h2>
        <p className='text-center text-white text-base sm:text-2xl lg:text-2xl font-normal max-w-4xl leading-tight mb-0'>Investing wisely is key to building wealth. Our experienced team will help you navigate the complex world of investments. We offer a diverse range of investment options across mutual funds, invoice discounting and asset leasing to suit your preferences (financial goals).</p>
      </div>
      <InvestmentsFaq />
      <div className="hidden md:flex justify-center">
        <Link href="/wealthometer/questions" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  )
}
