import Communityimage from "@/assets/images/eventdetails/My Captain  - Ankit Photo.png"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventDetails = () => {
  return (
    <div className='bg-[#0A5783] px-8 py-12'>
   <div className="text-white text-center pb-4">
   <h1 className="sm:w-full text-4xl sm:text-4xl lg:text-[2.5rem] text-center font-semibold capitalize leading-tight  flex justify-center">
     “You are the average of the five people&nbsp;
       <br className='br-xl-show'/>
    You spend the most time with.” ~Jim Rohn
      </h1>
    
         <p className="text-xl sm:text-2xl ">
         So, why not spend time with others who are highly motivated to <br className='br-xl-show'/>
          make their financial aspirations a reality!
         </p>
       </div>
       <div className=' flex flex-col gap-16 lg:flex-row lg:justify-center lg:items-center mx-auto mt-[25px]  justify-evenly items-center '>
        {/* lg:ml-[300px] */}
            <Image src={Communityimage} alt='ankit photo' className='w-96 h-80  sm:w-[400px] sm:h-[400px] lg:h-[300px] lg:w-[300px] rounded-2xl shadow'></Image>

                <div className='flex flex-row sm:w-[384px] md:w-[650px] lg:w-[384px] lg:flex-col lg:gap-[0.75rem]'>
                <div className='mx-auto text-white  '>
          <p className="text-white font-semibold xsm:text-xl lg:text-2xl ">Apply to join - The Financial Freedom Circle on WhatsApp
          </p>
           <ul className="xsm:text-xl mt-4 ml-8">
           <li>Online and offline events</li>
           <li>Weekly Q&A sessions with Ankit</li>
           <li>Discussions with like-minded peers</li>
           <li>All our latest tools and resources</li>
         </ul>
        </div>
       </div>
        </div>
       <div className="flex justify-center mt-8 sm:mt-12">
        <Link href="https://tally.so/r/wd0WXy" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Apply Now
          </button>
        </Link>
      </div>
  </div>
  )
}

export default EventDetails
