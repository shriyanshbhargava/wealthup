'use client'

import Button from '@/components/ui/ButtonNew';
import Image from "next/image";
import Link from 'next/link';
import howitworksImg from '@/assets/images/wealthometer_main/howitworks.png'
import { useScreenType } from '@/hooks/useScreenType';

const HowItWorks = ({ data,isMfpa,scrollToForm }) => {
  const screenSize = useScreenType();
  return (
    <div className={`w-full m-auto relative  md:p-0 md:mb-3 ${screenSize === '1-cols' ? '' : ''} primaryBackground lg:bg-transparent overflow-clip`}>

      <h2 className='relative z-10 '>How It Works?</h2>
      <div className='relative z-10 px-4 primaryBackground md:bg-transparent m-auto'>
        <div className="md:w-2/3 m-auto max-w-[864px]">
          <Image src={data.img} alt='working steps' className="m-auto" quality={100} />
          <div className="flex items-start">
            <p className="md:mx-4 text-base md:text-xl basis-1/3 relative right-4 md:right-20">{data.stepOne.lineOne} <br className='hidden md:block' /> {data.stepOne.lineTwo}</p>
            <p className="md:mx-4 text-base md:text-xl basis-1/3">{data.stepTwo.lineOne} <br className='hidden md:block' /> {data.stepTwo.lineTwo}</p>
            <p className="md:mx-4 text-base md:text-xl basis-1/3 relative left-4 md:left-20">{data.stepThree.lineOne} <br className='hidden md:block' /> {data.stepThree.lineTwo}</p>
          </div>
        </div>
      </div>
      <div className='primaryBackground pt-8 pb-12 relative z-10 px-4'>
      {isMfpa ? <Button onClick={scrollToForm}>Check Now</Button> : <Link href={'/wealthometer'}><Button>GET STARTED</Button></Link>}
      </div>

    </div>
  )
}

export default HowItWorks