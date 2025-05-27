import React from 'react'
import { Accordion } from './accordion'

export const IsThisYou = () => {
  return (
    <section className='bg-primary-sky-blue py-8 lg:py-12 w-full'>
        <h2 className='capitalize font-semibold mb-0'>Is this you?</h2>
        <h3 className='font-semibold'>then we&apos;ve got your back!</h3>
        <div className='mt-10 flex justify-center'>
          <div className='max-w-3xl text-left'>
            <Accordion />
          </div>
        </div>
    </section>
  )
}
