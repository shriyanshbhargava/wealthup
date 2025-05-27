import React from 'react'

export const Reasons = () => {
  return (
    <section className="bg-primary-blue py-8 lg:py-12 w-full">
        <h2 className='capitalize font-semibold'>More reasons to choose wealthup</h2>
        <h3 className='my-3'>Simplify your financies, amplify your life</h3>
        <div className='container mt-12'>
            <div className='grid grid-cols-3 space-x-6'>
                <div className='bg-primary-sky-blue py-[48px] px-[34px] text-left rounded-2xl'>
                    <h4 className='text-2xl font-semibold'>Complete financial solution</h4>
                    <p className='text-xl'>We&apos;ve got your back, everything from enhancing your investments to securing your savings, making smart tax choices, and more.</p>
                    <div className='bg-primary-light w-full h-[136px] rounded-2xl mb-4'></div>
                    <p className='text-xl'>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className='bg-primary-sky-blue py-[48px] px-[34px] text-left rounded-2xl'>
                    <h4 className='text-2xl font-semibold'>Ongoing expert support & monitoring</h4>
                    <p className='text-xl'>Our experts guide you while keeping an eye on your finances, so you&apos;re free to focus on what truly matters.</p>
                    <div className='bg-white text-primary-blue w-full py-2 px-4 rounded-2xl mb-4'>Lorem ipsum dolor sit amet consectetur</div>
                    <div className='bg-white text-primary-blue w-max py-2 px-4 rounded-2xl mb-4 ml-auto'>Lorem ipsum dolor</div>
                    <div className='bg-white text-primary-blue w-full py-2 px-4 rounded-2xl mb-4'>Lorem ipsum dolor sit amet consectetur</div>
                    <p className='text-xl'>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className='bg-primary-sky-blue py-[48px] px-[34px] text-left rounded-2xl'>
                    <h4 className='text-2xl font-semibold'>Start small, dream big</h4>
                    <p className='text-xl'>Begin at your own pace, with no hefty commitments and let us help you reach your financial goals.</p>
                    <div className='bg-primary-light w-full h-[136px] rounded-2xl mb-4'>
                        <div className='flex items-center justify-center h-full w-full gap-4'>
                            <span className='block bg-primary-blue rounded-md h-8 w-8'></span><p className='text-xs mb-0'>Buy Health Insurance xyz text + 30%</p>
                        </div>
                    </div>
                    <p className='text-xl'>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    </section>
  )
}
