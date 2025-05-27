'use client'

import Image from 'next/image';
import InfiniteLooper from '@/components/ui/InfiniteLooper'
import React from 'react';

const ClientCompanies = () => {

  const array = Array.from({ length: 43 }, (_, index) => index);

  return (
    <section className="pt-4  lg:flex items-center justify-between m-auto gradientbg2 md:px-16 px-8">
        <div className="lg:w-2/12">
          <h3
            className="font-semibold lg:font-semibold text-3xl lg:text-2xl md:p-2 pr-4 border-r-4 border-none lg:border-solid xl:text-left text-center mb-0"
          >
            Trusted By <br className='hidden xl:block'/> Clients From <br className='hidden xl:block'/> 60+ Companies
          </h3>
        </div>

        <div className='lg:w-[80%] px-4'>
          <InfiniteLooper direction='left' speed={70}>
            <div className="flex flex-wrap justify-center items-center">
                {array.map((_, i) => (
                  <div className="w-32 md:w-40 lg:w-56" key={i}>
                      <div className="m-2 wow relative w-28 h-24 mx-auto" data-wow-delay="0.6s">
                          <Image
                              fill
                              className=""
                              src={`/assets/img/clients/companies-new/${i + 1}.png`}
                              alt={`client logo ${i+1}`}
                              priority
                              style={{objectFit:'contain'}}
                          />
                      </div>
                  </div>
                ))}
            </div>
          </InfiniteLooper>
        </div>


    </section>
  )
}

export default ClientCompanies