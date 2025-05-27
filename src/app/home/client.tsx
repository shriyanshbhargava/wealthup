import React from 'react'

export const Client = () => {
  return (
    <section className='bg-primary-blue py-8 lg:py-12 w-full'>
        <div className='container flex items-center'>
            <h2 className='text-[32px] capitalize text-left'>Trusted by <br/> clients from <br /> 50+ companies</h2>
            <div className='pl-12 ml-12 border-l border-white flex gap-12'>
                <div className='flex flex-col'>
                    <div className='w-[282px] h-[151px] rounded-2xl mb-5 bg-white'></div>
                    <p className='mb-0 text-xl'>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className='flex flex-col'>
                    <div className='w-[282px] h-[151px] rounded-2xl mb-5 bg-white'></div>
                    <p className='mb-0 text-xl'>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className='flex flex-col'>
                    <div className='w-[282px] h-[151px] rounded-2xl mb-5 bg-white'></div>
                    <p className='mb-0 text-xl'>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    </section>
  )
}
