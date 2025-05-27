import { useEffect, useState } from 'react';

import { BsArrowRight } from "react-icons/bs";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const NewBlogSection = () => {
  return (
    <section className='bg-teal-500 md:h-auto flex flex-col gap-8 justify-center items-center mb-0 pt-12 pb-12 '>
        <div className='flex justify-center items-center  text-white'>
            <h1 className='sm:w-full text-4xl sm:text-4xl lg:text-[2.5rem] text-center font-semibold capitalize leading-tight  flex justify-center'>Read Our Blog</h1>
        </div>

        <div>
            <div className='hidden md:flex md:flex-col lg:flex lg:flex-row justify-center items-center gap-[4rem]'>
                <div className=' w-80 h-96  bg-gradient-to-t from-sky-800 to-teal-500 rounded-xl shadow'>
                    <div>
                    <BlogComponent
                            title="The Ultimate Guide To Buying Life Insurance"
                            author="Ankit Agarwal"
                            date="Nov 22,2023"
                            link="https://www.wealthup.me/blog/the-ultimate-guide-to-buying-life-insurance"
                            bg="bg-[url('/assets/img/blog/life-insurance.png')]"
                            imageUrl="/assets/img/blog/life-insurance.png"
                        />

                    </div>
                </div>
                <div className='w-80 h-96 bg-gradient-to-t from-sky-800 to-teal-500 rounded-xl shadow'>

                    <BlogComponent
                                big
                                title="Financial Planning For Long Term Wealth Creation"
                                author="Ankit Agarwal"
                                date="Nov 22,2023"
                                link="https://www.wealthup.me/blog/financial-planning-for-long-term-wealth-creation"
                                bg="bg-[url('/assets/img/blog/tips-for-long-term-wealth-creation.png')]"
                                imageUrl="/assets/img/blog/tips-for-long-term-wealth-creation.png"
                    />

                </div>
                <div className='w-80 h-96 bg-gradient-to-t from-sky-800 to-teal-500 rounded-xl shadow'>
                    <BlogComponent
                            title="The Ultimate Guide To Buying Health Insurance"
                            link="https://www.wealthup.me/blog/the-ultimate-guide-to-buying-health-insurance"
                            author="Ankit Agarwal"
                            date="Nov 22,2023"
                            bg="bg-[url('/assets/img/blog/health-insurance.png')]"
                            imageUrl="/assets/img/blog/health-insurance.png"
                        />
                </div>
            </div>

            <div className='block md:hidden w-[400px] md:w-[650px]'>
                <Carousel showThumbs={false} showStatus={false} className='flex justify-center items-center'>
                    <div className='w-80 h-96 md:w-[400px] md:h-[480px] text-center mx-auto mb-[60px] bg-gradient-to-t from-sky-800 to-teal-500 rounded-xl shadow'>
                        <div className='mx-auto'> 
                        <BlogComponent
                                title="The Ultimate Guide To Buying Life Insurance"
                                author="Ankit Agarwal"
                                date="Nov 22,2023"
                                link="https://www.wealthup.me/blog/the-ultimate-guide-to-buying-life-insurance"
                                bg="bg-[url('/assets/img/blog/life-insurance.png')]"
                                imageUrl="/assets/img/blog/life-insurance.png"
                            />

                        </div>
                    </div>
                    <div className='w-80 h-96 md:w-[400px] md:h-[480px] mx-auto mb-[60px] bg-gradient-to-t from-sky-800 to-teal-500 rounded-xl shadow'>

                        <BlogComponent
                                    big
                                    title="Financial Planning For Long Term Wealth Creation"
                                    author="Ankit Agarwal"
                                    date="Nov 22,2023"
                                    link="https://www.wealthup.me/blog/financial-planning-for-long-term-wealth-creation"
                                    bg="bg-[url('/assets/img/blog/tips-for-long-term-wealth-creation.png')]"
                                    imageUrl="/assets/img/blog/tips-for-long-term-wealth-creation.png"
                        />

                    </div>
                    <div className='w-80 h-96 md:w-[400px] md:h-[480px] mx-auto mb-[60px] bg-gradient-to-t from-sky-800 to-teal-500 rounded-xl shadow'>
                        <BlogComponent
                                title="The Ultimate Guide To Buying Health Insurance"
                                link="https://www.wealthup.me/blog/the-ultimate-guide-to-buying-health-insurance"
                                author="Ankit Agarwal"
                                date="Nov 22,2023"
                                bg="bg-[url('/assets/img/blog/health-insurance.png')]"
                                imageUrl="/assets/img/blog/health-insurance.png"
                            />
                    </div>
                </Carousel>

            </div>
        </div>

        <div className="flex justify-center pt-4 ">
        <Link href="/resources/blog" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            View More
          </button>
        </Link>
      </div>
    </section>
  )
}

export default NewBlogSection;


const BlogComponent: React.FC<{
    big?: boolean;
    title: string;
    link: string;
    bg: string;
    author:string;
    date?:string|undefined;
    imageUrl: string;
}> = ({ big = false, title, link, bg, imageUrl,author,date }) => {
    return (
        (<Link
            href={link}
            className={`cursor-pointer ${big ? "col-span-2 lg:col-span-2" : "col-span-2 sm:col-span-1"
                }`}>

            <div className={`relative flex flex-col justify-end gap-4  h-72 text-left`}>
                <Image src={imageUrl}  width={300} height={200}  alt="Blog Image" className='rounded-tl-xl rounded-tr-xl absolute top-0 ' />
                <div className='flex flex-col absolute top-[180px] md:top-[180px] ml-[10px] gap-[5px] '>
                    <p className='text-emerald-50 text-xs font-normal  '> By {author} on {date}</p>
                    <p className=" text-white text-2xl h-[80px] font-medium leading-7">
                        {title}   
                    </p>
                {/* <div className='flex justify-start items-center  '>
                </div> */}
                {/* <div className="ml-[15px] -mt-[90px]">
                    
                    
                </div> */}
                {/* <BsArrowRight className="inline text-2xl ml-3" /> */}
                </div>
                
            </div>

        </Link>)
    );
};
