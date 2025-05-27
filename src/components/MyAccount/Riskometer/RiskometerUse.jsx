import Button from "@/components/ui/ButtonNew";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Riskometerphone from "@/assets/images/risk-profile/Riskometerphone.png";
import Riskometersmallscreenphone from "@/assets/images/risk-profile/Riskometersmallscreenphone.png"

const RiskometerUse = () => {
  return (
    <div className='bg-[#0A5783] py-12 px-8 flex flex-col justify-center items-center'>
      <h1 className='text-white text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10 text-center'>Why you should use Riskometer?</h1>
      <div className='relative xsm:mt-[-4rem] xsm:ml-20'>
        <div className='hidden xsm:block'>
        <Image src={Riskometerphone} alt='phoneimg'  layout="intrinsic" className='w-[300px] h-[300px] xsm:w-[325px] xsm:h-[325px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px]'/>
        </div>
        <div className='block xsm:hidden'>
        <Image src={Riskometersmallscreenphone} alt='phoneimage' layout="intrinsic" className='w-[250px] h-[250px]'/>
        </div>
        {/* First white container */}
        <div className="absolute top-[15%] xsm:top-[25%] left-[8rem] xsm:left-[10rem] sm:left-[14rem] md:left-[18rem] w-[68%] xsm:w-[60%] sm:w-[55%] bg-white text-[#035782] font-semibold py-3 px-2 xsm:px-5 rounded-xl text-[0.7rem] sm:text-sm md:text-[1.05rem]">
        Helps you decide in what proportion to allocate your funds across your investments.
        </div>
        {/* Second white container */}
        <div className="absolute top-[41%] xsm:top-[47%] left-[-2rem] xsm:left-[-4rem] sm:left-[-6rem] md:left-[-8rem] w-[68%] xsm:w-[60%] sm:w-[55%] bg-white text-[#035782] font-semibold py-3 px-2 xsm:px-5 rounded-xl text-[0.7rem] sm:text-sm md:text-[1.05rem]">
        Helps you understand what kind of investments you can make.
        </div>
        {/* Third white container */}
        <div className="absolute top-[65%] xsm:top-[69%] left-[8rem] xsm:left-[10rem] sm:left-[14rem] md:left-[18rem] w-[68%] xsm:w-[60%] sm:w-[55%] bg-white text-[#035782] font-semibold py-3 px-2 xsm:px-5 rounded-xl text-[0.7rem] sm:text-sm md:text-[1.05rem]">
        Helps reduce the effect of financial and emotional stress you face in case of a loss
        </div>
      </div>
      <div className="mt-12">
        <Link href="/risk-profile/test">
          <Button onClick={() => {}} size="bigger">Check your profile</Button>
        </Link>
      </div>
    </div>
  );
}

export default RiskometerUse;
