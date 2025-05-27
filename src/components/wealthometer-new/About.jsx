'use client'

import AboutMobile from './AboutMobile'
import Button from '@/components/ui/ButtonNew';
import Image from 'next/image';
import Link from 'next/link'
import Meter from './Meter';
import { useScreenType } from '@/hooks/useScreenType';

const About = () => {
  var screenSize = useScreenType();
  return (
    <>
        <section className={`p-4 md:p-8 pb-0 mt-4 md:mt-16 md:flex relative w-full md:w-11/12 lg:w-3/4  m-auto justify-between gradientbg3 md:bg-none overflow-clip`}>
            <div className="flex flex-col justify-center text-center md:text-left basis-1/2">
                <h2 className="pt-4 text-[2.5rem] md:text-[45px]">What Is <br /> WealthoMeter?</h2>
                <p className="md:w-4/5 text-xl sm:text-2xl font-light">WealthoMeter asks you a few questions to help you understand your current financial situation and predicts what age you will retire.</p>
            </div>
            <div className="md:hidden py-6">
              <Link href={'/wealthometer'}><Button>GET STARTED</Button></Link>
            </div>
            <div className="md:hidden pb-6">
              <Meter stopAt={screenSize === 'mobile' ? 3 : 7}/>
            </div>

            <div className='w-full md:w-2/4 max-w-xs lg:max-w-sm text-center m-auto relative flex'>
              <AboutMobile />
              <div className='absolute -bottom-4 w-full h-[40%] z-10 frame-gradient hidden md:block'></div>
            </div>

        </section>
        <div className='pt-8 px-8 hidden md:block'>
          <Meter stopAt={8}/>
        </div>
    </>
    
  )
}

export default About;