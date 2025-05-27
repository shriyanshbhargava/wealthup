import React from 'react'

export const FinancialSuccess = () => {
  return (
    <section className='financial-freedom py-8 lg:py-12 w-full'>
        <div className='container'>
            <h2>Achieve Financial Success with 12+ <br/> Years of Investment Expertise</h2>
            <h3>Experience comprehensive financial solutions with our expert <br />guidance: investing, tax savings, insurance, and more.</h3>
            <div className='flex justify-between mt-24'>
                <div className='h-[565px] w-[452px] bg-gray-300 rounded-[20px]'></div>
                <div className='text-left flex flex-col items-between justify-between py-4'>
                    <div>
                        <p className='text-5xl my-0 leading-none'>13+ Years</p>
                        <p className='text-2xl my-0'>of Proven Investing Excellence</p>
                    </div>
                    <div>
                        <p className='text-5xl my-0 leading-none'>29 Years</p>
                        <p className='text-2xl my-0'>Attained Financial Independence</p>
                    </div>
                    <div>
                        <p className='text-5xl my-0 leading-none'>6+ Years</p>
                        <p className='text-2xl my-0'>As Investment Banker, Swiss Bank (UBS) New York</p>
                    </div>
                    <div className='h-1 bg-gray-100'></div>
                    <div className='flex gap-12'>
                        <div className='h-[81px] w-[81px] bg-gray-100'></div>
                        <div className='h-[81px] w-[81px] bg-gray-100 rounded-full'></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
