import Image from 'next/image'
import React from 'react'
import SliderCarousel from '@/components/Slider';
import categories from './categories'

const IconCarousel = () => {
  return (
    <div className='w-full px-12 md:w-4/5 max-w-[1030px] m-auto'>
        <SliderCarousel>
            {categories.map(item => 
                <div className=' justify-center items-center ' key={item.title}>
                    <div className='salecoin m-0 mx-auto bg-[#E7F9F2] w-20 h-20'>
                      <Image src={item.icon} alt="category icon" />
                    </div>
                    <p className='font-normal text-lg pt-2'>{item.title}</p>
                </div>
            )}
            
            
        </SliderCarousel>
    </div>
  )
}

export default IconCarousel