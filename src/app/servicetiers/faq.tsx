"use client"

import { Accordion, AccordionContainer } from "@/components/ui/Accordion";

import Link from 'next/link';
import React from 'react';

interface Accordation {
  title: string;
  details: React.ReactNode;
}

const accordationQuestions: Accordation[] = [
  {
    title: "What are transaction calls?",
    details: (
      <p className="font-sans font-light text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw]">
Transaction calls are done for making lump sum investments, setting up monthly
investments (SIPs), purchasing insurance etc. Prior to this call, we may ask you to
complete certain tasks to ensure a fruitful call. Please note: If the tasks are not
complete before joining the call, the call may be rescheduled. 
      </p>
    ),
  },
  {
    title: "What are On-Demand calls with POC?",
    details: (
      <p className="font-sans font-light text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw]">
When you initiate a call to speak with your POC (not for making a transaction) but
to seek assistance, clarify doubts, or get other financial guidance. Any unused
calls within a financial year will not be carried forward to subsequent periods.      </p>
    ),
  },
  {
    title: "Can I cancel and/or reschedule calls?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
Yes, you have the option to cancel or reschedule calls 2 hours before the
scheduled call time. Calls cancelled or rescheduled with insufficient notice will be
considered a no-show.        <br />
        <br/>
     <strong>In the event of a no-show</strong> i.e. if you don&rsquo;t  reschedule at least 2 hours in advance
or don&rsquo;t  join the call within 5 minutes, the call will be lost and you have to wait 15
days before booking the next call.      </p>
    ),
  },
  {
    title: "If I buy insurance for someone else in my family e.g. parents or siblings will it count towards my relationship value?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
Yes, it will. If this person is also a client of Wealthup the benefit can be added to
only one account of your choice.      </p>
    ),
  },
  {
    title: "How can I speak to Ankit if I don’t have any client-initiated calls left?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
      We are always here to support you. If you need to book additional calls with Ankit,
      you can book them
      <a
        href="https://topmate.io/wealthup_me"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-300 underline"
      >
        here
      </a>
      . Check with us for discounts that are running.
    </p>
    ),
  },
];

export const Faq = () => {
  return (
    <section className='w-full flex mb-[0px] flex-col items-center justify-center py-12 bg-gradient-to-tr from-[#0A5783] to-[#18A19A]'>
      <div className='flex flex-col text-center mb-[43px]'>
        <h2 className="w-96 sm:w-full md:w-[600px] lg:w-full text-3xl sm:text-3xl lg:text-[2.5rem] text-center text-white font-semibold">Frequently Asked Questions</h2>
      </div>
      <div className='flex flex-col text-white border-white items-center justify-center'>
        <AccordionContainer>
          <div className="md:w-3/5 sm:w-[500px] mx-6 md:mx-2 border-white">
            {accordationQuestions.map((item, index) => (
              <div key={index} className='flex justify-center items-baseline mb-[24px]'>
                <p className='text-emerald-50 text-xl sm:text-2xl font-semibold'>{index + 1}.</p>
                <div className='w-72 sm:w-full text-xl sm:text-2xl flex items-center'>
                  <Accordion title={item.title} content={item.details} index={index} />
                </div>
              </div>
            ))}
          </div>
        </AccordionContainer>
      </div>
    </section>
  )
}
