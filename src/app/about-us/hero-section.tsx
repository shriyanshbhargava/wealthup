import Link from 'next/link'
import { whatsappHelpLink } from '@/utils/constants'

export const HeroSection = () => {
    return (
        <section className='h-full mt-[65px] xsm:pt-20 md:px-16 pb-8 bg-gradient-to-bl from-10% from-[#18A19A] to-[#0A5783] xxsm:px-8 pt-8 min-h-[70vh] flex items-center justify-center'>
      <div className='flex flex-col items-center xl:flex-row lg:w-auto justify-center sm:mx-auto sm:gap-[5px]  xl:gap-[16rem] xxsm:pb-2'>
        <div className='xxsm:mx-auto flex flex-col items-center  gap-[0.75rem]'>
          <h1 className=' text-white text-4xl md:text-6xl sm:text-5xl xsm:text-4xl xxsm:text-3xl font-semibold md:leading-[50px] text-center'>
            Meet Your Team Of Experts
          </h1>
          <div className='flex flex-col items-center justify-center'>
          <p className='text-white xl:ml-0 lg:flex text-3xl font-normal leading-tight md:mx-auto md:text-[1.60rem] xsm:text-[1.15rem]  xxsm:text-base ml-4 text-center'>
            Our team is obsessed with helping you reach<br className="br-xl-show" /> your financial goals ASAP
          </p>
          </div>
          <div className="flex justify-center">
        <Link href={whatsappHelpLink} className="bg-orange-500 h-16 w-fit px-8 flex justify-center items-center border-orange-500 shadow rounded-lg">

              <button className='text-center text-white text-2xl font-semibold '>
                Chat to Learn More
              </button>

            </Link>
          </div>
          </div>
      </div>
    </section>
    )
}
