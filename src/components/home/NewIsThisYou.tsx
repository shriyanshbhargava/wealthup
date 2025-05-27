import React from 'react';

const NewIsThisYou = () => {
  return (
    <section className='w-full flex flex-col items-center gap-4 bg-custom-gradient-Interestsection justify-center pb-6 pt-12'>

        <div className='flex flex-col text-center mb-[10px] lg:gap-[30px] '>
            <h2 className="text-[#035782] text-3xl sm:text-3xl lg:text-[2.5rem] font-semibold capitalize leading-10">Is This You?</h2>
        </div>

        <div className='flex mx-auto'>
                <div className=" border-white flex flex-col justify-center items-center">
                <div className='bg-white px-2 xsm:px-6 py-4 text-sky-800 flex items-center gap-2 xsm:gap-4 md:gap-8 w-4/5 sm:w-[90%] md:w-[100%] rounded-3xl shadow mb-4'>
                        <div className='block w-8 h-8 xsm:w-10 xsm:h-10 md:w-12 md:h-12  mx-2 my-3 aspect-square bg-sky-800 rounded-[100%]'/>
                        <div className='font-semibold md:text-xl text-base'>I want good returns but don&apos;t know how.</div>
                    </div>
                    <div className='bg-white px-2 xsm:px-6 py-4 text-sky-800 flex items-center gap-2 xsm:gap-4 md:gap-8 w-4/5 sm:w-[90%] md:w-[100%]  rounded-3xl shadow mb-4'>
                        <div className='block w-8 h-8 xsm:w-10 xsm:h-10 md:w-12 md:h-12  mx-2 my-3 aspect-square bg-sky-800 rounded-[100%]'/>
                        <div className='font-semibold md:text-xl text-base'>I want to invest regularly but need more discipline/ follow through.</div>
                    </div>
                    <div className='bg-white px-2 xsm:px-6 py-4 text-sky-800 flex items-center gap-2 xsm:gap-4 md:gap-8 w-4/5 sm:w-[90%] md:w-[100%]  rounded-3xl shadow mb-4'>
                        <div className='block w-8 h-8 xsm:w-10 xsm:h-10 md:w-12 md:h-12  mx-2 my-3 aspect-square bg-sky-800 rounded-[100%]'/>
                        <div className='font-semibold md:text-xl text-base'>I want to retire early but am not interested in finance.</div>
                    </div>
                    <div className='bg-white px-4 xsm:px-6 py-4 text-sky-800 flex items-center gap-2 xsm:gap-4 md:gap-8 w-4/5 sm:w-[90%] md:w-[100%] rounded-3xl shadow mb-4'>
                        <div className='block w-8 h-8 xsm:w-10 xsm:h-10 md:w-12 md:h-12  mx-2 my-3 aspect-square bg-sky-800 rounded-[100%]'/>
                        <div className='font-semibold md:text-xl text-base'>I&apos;m worried about being misled or cheated by a bad financial advisor.</div>
                    </div>
                </div>
        </div>
         <div>
         <p className=' text-teal-500  text-2xl sm:text-3xl lg:text-4xl font-semibold leading-1 capitalize flex items-center justify-center'>We&apos;ve got you</p>
         </div>
          
    </section>
  );
}

export default NewIsThisYou;
