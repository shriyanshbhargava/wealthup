import Button from '@/components/ui/ButtonNew'
import Link from 'next/link'
import React from 'react'

export const Blog = () => {
  return (
    <section className='bg-primary-sky-blue py-8 lg:py-12 w-full'>
        <h2 className='capitalize font-semibold mb-12'>Read our blog</h2>
        <div className='flex items-center justify-center gap-[66px]'>
            <Post title="Crypto Investing for Beginners: What to do & what not to do?" tag="cryptocurrency"/>
            <Post title="Crypto Investing for Beginners: What to do & what not to do?" tag="cryptocurrency"/>
            <Post title="Crypto Investing for Beginners: What to do & what not to do?" tag="cryptocurrency"/>
        </div>
        <div className='mt-14 flex justify-center'>
            <Link href='/resources/blog'>
                <Button size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false}>
                    <span className='text-sm sm:text-base font-medium'>View more</span>
                </Button>
            </Link>
        </div>
    </section>
  )
}

const Post: React.FC<{ 
    title: string,
    tag: string
}> = ({ title, tag }) => {
    return (
        <div className='w-[318px] bg-primary-blue rounded-xl text-left'>
            <div className='bg-gray-200 w-full h-[198px] rounded-t-xl'></div>
            <div className='text-left py-6 px-4'>
                <p className='text-xs mb-6'>By Medha Agarwal on April 5, 2023</p>
                <h5 className='text-2xl leading-tight mb-8'>{title}</h5>
                <span className='rounded-full px-2 py-1 text-primary-blue bg-[#C8F1EA] text-[8px]'>{tag}</span>
            </div>
        </div>
    )
}
