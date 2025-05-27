"use client"

import { Accordion, AccordionContainer } from "@/components/ui/Accordion";

import Image from 'next/image';
import React from 'react';
import aggressiveWealth from '@/assets/images/agressive-wealth.png'
import childrenEducation from '@/assets/images/children-education.png'
import financialFreedom from '@/assets/images/financial-freedom.png'
import firstCrore from '@/assets/images/first-crore.png'
import investmentfaq from '@/assets/images/investment-faq.png'
import shortTerm from '@/assets/images/short-term.png'

const images = [
  investmentfaq,
  financialFreedom,
  childrenEducation,
  firstCrore,
  shortTerm,
  aggressiveWealth
]

interface Accordation {
  title: string;
  details: React.ReactNode;
}

const accordationQuestions: Accordation[] = [
  {
    title: "Emergency Fund",
    details: (
      <div className="md:hidden">
        <Image src={images[0]} alt="Investment Faq" />
      </div>
    ),
  },
  {
    title: "Financial Freedom Fund",
    details: (
      <div className="md:hidden">
        <Image src={images[1]} alt="Investment Faq" />
      </div>
    ),
  },
  {
    title: "Children's Education",
    details: (
      <div className="md:hidden">
        <Image src={images[2]} alt="Investment Faq" />
      </div>
    ),
  },
  {
    title: "My First Crore",
    details: (
      <div className="md:hidden">
        <Image src={images[3]} alt="Investment Faq" />
      </div>
    ),
  },
  {
    title: "Short-term Travel Fund",
    details: (
      <div className="md:hidden">
        <Image src={images[4]} alt="Investment Faq" />
      </div>
    ),
  },
  {
    title: "Aggressive Wealth Creation",
    details: (
      <div className="md:hidden">
        <Image src={images[1]} alt="Investment Faq" />
      </div>
    ),
  },
];

export const InvestmentsFaq = () => {
  const [selected, setSelected] = React.useState(0)
  return (
    <div className='flex flex-col md:flex-row container justify-center items-start gap-24'>
          <div className='max-w-2xl w-full'>
            <section className='w-full flex mb-[0px] flex-col items-center justify-center'>
      <div className='flex flex-col text-white border-white items-center justify-center w-full'>
        <AccordionContainer>
          <div className="w-full mx-6 md:mx-2 border-white">
            {accordationQuestions.map((item, index) => (
              <div key={index} className='flex justify-center items-baseline mb-[24px]' onClick={() => setSelected(index)}>
                <p className='text-emerald-50 text-xl sm:text-2xl font-semibold'>{index + 1}.</p>
                <div className='w-full text-xl sm:text-2xl flex items-center'>
                  <Accordion title={item.title} content={item.details} index={index} />
                </div>
              </div>
            ))}
          </div>
        </AccordionContainer>
      </div>
    </section>
          </div>
          <div className="hidden md:block">
            <Image src={images[selected]} alt="Investment Faq" />
          </div>
        </div>
  )
}
