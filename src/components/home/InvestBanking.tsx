import AnkitPhotos from "@/assets/images/investbanking/Ankit Photos.jpg"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import linkedinLogo from "@/assets/images/linkedin.jpeg";
import logo1 from "@/assets/images/investbanking/1. Bits.png"
import logo2 from "@/assets/images/investbanking/UBS.png"
import logo3 from "@/assets/images/investbanking/PWC.png"

const InvestBanking = () => {
  return (
    <section 
  style={{
    background: "linear-gradient(180deg, rgba(1, 200, 169, 0.2) 16.15%, rgba(235, 250, 245, 0.2) 100%)"
  }} 
  className='px-8 w-full h-full'>
        
        <div className='flex flex-col justify-center items-center py-12'>
            {/* h-24 */}
            <h2 className=' text-[#035782] text-center  sm:text-4xl lg:text-[2.5rem] font-semibold '>Access to 14+ Years of Investment Experience</h2>
        </div>
        {/* md:mr-[150px] */}
        <div className=' flex flex-col gap-6 lg:gap-16 lg:flex-row lg:justify-center lg:items-center mx-auto pb-12 items-center '>
        {/* lg:ml-[300px] */}
            <div className='flex flex-col gap-4'>
                <Image src={AnkitPhotos} alt='Ankitphotos' className='w-80 h-80  sm:w-[300px] sm:h-[350px] lg:h-[350px] lg:w-[300px] rounded-2xl shadow'/>
                <div>
                <div className='flex items-center justify-center gap-2'>
                <h3 className='text-[1.75rem] text-center mb-0 text-[#035782] font-semibold'>Ankit Agrawal</h3>
                <Link href="https://www.linkedin.com/in/mrankitagrawal/" target='_blank'>
                <Image src={linkedinLogo} alt='linkedin' width={20} height={20}></Image>
                </Link>
                </div>
                <p className='text-xl text-[#035782] text-center'>Founder, Wealthup</p>
                </div>
            </div>

                <div className='flex  flex-row   w-full xxsm:gap-[0.5rem] md:w-[650px] lg:w-[450px] lg:flex-col sm:gap-[2.75rem] md:gap-[1rem]'>

                <div className='flex flex-col text-center lg:text-left w-[200px]  md:w-[210px] lg:w-full '>
                        <p  className='text-[#035782] mb-0 text-base sm:text-xl lg:text-xl font-normal   '>Achieved Financial Independence at the age of </p>
                        <h3 className ="text-[#035782] mb-0 text-base  sm:text-3xl md:text-3xl lg:text-3xl font-semibold">29 <span className='text-[#035782]'>Years</span></h3>
                    </div>

                    <div className='flex flex-col text-center lg:text-left w-[200px] md:w-[210px] lg:w-full justify-start'> 
                        <p className='text-[#035782] mb-0 text-base sm:text-xl lg:text-xl font-normal '>Proven Investing Experience of </p>
                        <h3 className ="text-[#035782] mb-0 text-base sm:text-3xl md:text-3xl lg:text-3xl font-semibold" >14+ <span className='text-[#035782]'>Years</span></h3>
                    </div>



                    <div  className='flex flex-col text-center lg:text-left w-[200px] md:w-[210px] lg:w-full justify-start'>
                        <p className='text-[#035782] mb-0  text-base sm:text-xl lg:text-xl font-normal'>Investment Banker, Swiss Bank (UBS) New York for</p>
                        <h3 className ="text-[#035782] mb-0 text-base  sm:text-3xl md:text-3xl lg:text-3xl font-semibold">6+ <span className='text-[#035782]' >Years</span></h3>
                    </div>

                     <div className=''>
                    <div className='w-full hidden lg:block h-px border border-[#035782] '></div>
                    </div>

                    <div className='lg:flex  items-center hidden gap-[27px]'>
                        <Image src={logo1} alt='logo1' className="w-20 h-20"/>
                        <Image src={logo2} alt='logo2' className="w-24 h-12"/>
                        <Image src={logo3} alt='logo3' className="w-16 h-16"/>
                    </div>
                </div>


                <div className='w-full mt-4 mx-auto md:w-full lg:hidden h-px border border-white '></div>
                    <div className='flex justify-center items-center lg:hidden -mt-[40px] gap-[27px]'>
                        {/* Images */}
                        <Image src={logo1} alt='logo1' className="w-16 h-16"/>
                        <Image src={logo2} alt='logo2' className=" w-20 h-12"/>
                        <Image src={logo3} alt='logo3' className="w-16 h-16"/>
                    </div>
        </div>

    </section>

    
  )
}

export default InvestBanking
