import { Accordion, AccordionContainer } from "@/components/ui/Accordion";

import Link from 'next/link';
import React from 'react';

interface Accordation {
  title: string;
  details: React.ReactNode;
}

const accordationQuestions: Accordation[] = [
  {
    title: "What does Wealthup do?",
    details: (
      <p className="font-sans font-light text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw]">
        Wealthup guides you in creating a comprehensive financial plan across financial goal planning, investment planning, insurance planning, tax saving etc.
        <br />
        <br />
        We start with understanding your current financial situation, identifying gaps and then guiding you in filling those gaps.
        <br />
        <br />
        After your personalised plan is created, your progress is regularly monitored and you receive prompts on what changes are needed so you can relax and focus on other things that matter to you.
      </p>
    ),
  },
  {
    title: "How does Wealthup make money?",
    details: (
      <p className="font-sans font-light text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw]">
        We don&apos;t charge anything to the clients because when you transact with us (e.g., invest in mutual funds) or buy financial products (e.g., insurance) we get a small fee from the mutual fund company or insurance company. This is how Wealthup makes money.
      </p>
    ),
  },
  {
    title: "How do I know you will give unbiased financial advice and avoid conflict of interest?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        Financial services are built on trust. We only suggest products that are best for you and do not offer any options that our team does not personally invest in.
        <br />
        <br/>
        Our clients are well educated and with access to the internet will easily find out if the products being sold to them are bad. It is in our interest to ensure their money is growing and they are buying the right products; otherwise, our business will not survive in the long term.
        <br />
        <br/>
        Wealthup&apos;s founders left their comfortable jobs abroad and came back to India with the vision of helping people live more prosperous and stress-free lives. They started the company so people get unbiased and personalized advice to reach their financial goals faster. You can read more about their story <Link href="/about" style={{ textDecoration: 'underline' }}>here</Link> .
      </p>
    ),
  },
  {
    title: "Is my money safe with Wealthup?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        Your money is 100% safe. All your investment amount goes directly to Bombay Stock Exchange and insurance premium goes directly to insurance companies. We only act as an intermediary and cannot do any transactions on our behalf.
      </p>
    ),
  },
  {
    title: "Who is Wealthup for?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        Wealthup is for ambitious people who are serious about growing their wealth. On the work front, they are busy being exceptionally good at their job, and on the personal front, enjoying life with their friends and family. They want a trusted financial expert to help them plan and monitor all aspects of their finances under one roof.
        <br />
        There is no minimum amount to get started with us and no lock-ins, so you can get started with whatever amount you are comfortable with.
      </p>
    ),
  },
];

const NewFaqSection = () => {
  return (
    <section className='w-full flex bg-sky-800 mb-[0px] flex-col items-center justify-center py-12 border-b-2 border-white'>
      <div className='flex flex-col text-center mb-[43px]'>
        <h2 className="w-96 sm:w-full md:w-[600px] lg:w-full text-3xl sm:text-3xl lg:text-[2.5rem]text-center text-white font-semibold">Frequently Asked Questions</h2>
      </div>
      <div className='flex flex-col w-[1200px] text-white border-white items-center justify-center'>
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

export default NewFaqSection;
