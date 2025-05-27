import Helpsec1 from '@/assets/images/help-section/Helpsec1.png'
import Helpsec2 from '@/assets/images/help-section/Helpsec2.png'
import Helpsec3 from '@/assets/images/help-section/Helpsec3.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const TaxPlanning = () => {
  return (
    <section className='px-8 text-center flex flex-col gap-[10px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-12  w-full mt-0 bg-gradient-to-tr from-brand-blue to-brand-sky-blue sm:pt-12 sm:pb-12 xxsm: pt-16 pb-16'>
        <div className='flex flex-col items-center justify-center'>
            <h2 className=' text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10'>Tax Planning</h2>
            <p className='text-center text-white text-base sm:text-2xl lg:text-2xl font-normal max-w-4xl leading-tight'>Don&apos;t pay a penny more in taxes than necessary. Our tax experts will help you optimize your tax strategy, finding legitimate ways to reduce your tax liability and keep more of your hard-earned money.</p>
        </div>

        <div className='flex flex-col lg:w-[1000px] xl:w-auto lg:justify-around lg:flex-row   justify-center items-center sm:gap-[40px] lg:gap-[30px]'>
            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[380px] lg bg-[#00B3B0] rounded-2xl border border-brand-sky-blue'>
              <div className='flex items-center gap-[2rem] mb-6'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                  <Image src={Helpsec1} alt='helpsec1' width={25}/>
                </div>
                <h3 className=' text-white text-2xl sm:text-xl md:text-3xl font-semibold leading-6 text-left mb-0'>Tax Saving</h3>
              </div>

              
              <div className="text-white text-left w-84 sm:text-[1.15rem] scale-95 font-normal  mt-2 xxsm:text-[1.4rem]">
                Tax planning is about optimizing your financial decisions to legally reduce your tax burden. At Wealthup, we craft personalized tax strategies that align with your financial goals. Our proactive approach ensures you&apos;re prepared for tax season, and we work continuously to identify opportunities for tax savings throughout the year.
              </div>  
            </div>


            <div className='w-[450px] xl:w-[375px] lg:w-[275px]  scale-75 p-10 sm:scale-100 h-[430px] md:h-[380px] lg bg-[#00B3B0] rounded-2xl border border-brand-sky-blue'>
              <div className='flex items-center gap-[2rem] mb-6'>
                <div className='w-12 h-12 flex justify-center items-center scale-125 aspect-square bg-teal-100 rounded-full'>
                  <Image src={Helpsec2} alt='helpsec2' width={25}/>
                </div>
                <h3 className=' text-white text-2xl sm:text-xl md:text-3xl font-semibold leading-6 text-left mb-0'>Tax Filing</h3>
                {/* <div className='flex items-center'>
                </div> */}
              </div>
              
              <div className="text-white text-left w-84 sm:text-[1.15rem] scale-95 font-normal mt-2 xxsm:text-[1.4rem]">
                At Wealthup, we simplify tax filing, ensuring it&apos;s a smooth and efficient process for you. Our expert team stays updated on tax regulations to maximize your eligible deductions and credits, helping you meet your tax obligations while minimizing your tax liability. With our support, you can file your taxes accurately and on time, avoiding unnecessary hassles and penalties.
              </div>  
            </div>
        </div>

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
