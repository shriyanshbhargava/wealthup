import React from 'react'

const InvestedNumbers = () => {
    return (
        <div className="w-full flex flex-wrap justify-around">
            {/* <div className="w-16 h-16 md:w-24 md:h-24 rounded-full gradient-color flex items-center justify-center">
          <div className="text-xl md:text-3xl font-robo font-medium text-white">
            25K
          </div>
          </div>
          <p className="mb-0 text-[4vw] md:text-[2.75vw] lg:text-[1.5vw] font-sans font-light">
            in additonal tax savings
          </p> */}
            <div className='text-center flex flex-col items-center gap-2 w-1/2 sm:w-auto'>
                <h4 className='mb-0 text-2xl font-bold font-robo bg-[#F27A54] text-white w-24 h-24 rounded-full flex items-center justify-center'>1 K+</h4>
                <p className='text-base sm:text-lg md:text-xl'>Users</p>
            </div>
            <div className='text-center flex flex-col items-center gap-2 w-1/2 sm:w-auto'>
                <h4 className='mb-0 text-2xl font-bold font-robo bg-[#F27A54] text-white w-24 h-24 rounded-full flex items-center justify-center'>14 Cr+</h4>
                <p className='text-base sm:text-lg md:text-xl'>AUA</p>
            </div>
            <div className='text-center flex flex-col items-center gap-2 w-1/2 sm:w-auto'>
                <h4 className='mb-0 text-2xl font-bold font-robo bg-[#F27A54] text-white w-24 h-24 rounded-full flex items-center justify-center'>25 Cr+</h4>
                <p className='text-base sm:text-lg md:text-xl'>Total Life Coverage</p>
            </div>
            <div className='text-center flex flex-col items-center gap-2 w-1/2 sm:w-auto'>
                <h4 className='mb-0 text-2xl font-bold font-robo bg-[#F27A54] text-white w-24 h-24 rounded-full flex items-center justify-center'>2 Cr+</h4>
                <p className='text-base sm:text-lg md:text-xl'>Total Health Coverage</p>
            </div>
        </div>
    )
}

export default InvestedNumbers