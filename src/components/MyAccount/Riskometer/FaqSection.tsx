import { Accordion, AccordionContainer } from "@/components/ui/Accordion";

import React from "react";

interface Accordation {
  title: string;
  details: React.ReactNode;
}

const accordationQuestions: Accordation[] = [
  {
    title: "There are no FREE lunches in the world. What’s the catch?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        There is no catch. If you like our free tool, you have the option of
        paying and getting access to our premium services.
      </p>
    ),
  },
  {
    title: "How much do the paid services cost?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        We offer a variety of services like personal finance consultations, tax
        planning etc. For more information you can write to{" "}
        <a
          className="text-blue-600 hover:underline hover:text-blue-900"
          href="mailto:hello@wealthup.me?body=Hi wealthup.me,  I am interested to learn more about you. Please send me information regarding... Thank you!&subject=New Message for wealthup.me!"
          target="__blank"
        >
          hello@wealthup.me
        </a>{" "}
        or call/WhatsApp at{" "}
        <a
          className="text-blue-600 hover:underline hover:text-blue-900"
          href="https://api.whatsapp.com/send?phone=+917704047770&text=Hi wealthup.me, Can you please call me back?"
          target="__blank"
        >
          +917704047770.
        </a>
      </p>
    ),
  },
  {
    title: "What is wealthup.me?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        wealthup.me helps individuals make smarter financial decisions and
        manage their money effortlessly. We are a FinTech platform that helps
        you painlessly perform financial tasks. You can join our waitlist to get
        early access to our platform{" "}
        <a
          className="text-blue-600 hover:underline hover:text-blue-900"
          href="https://wealthup.me/join-waitlist"
          target="__blank"
        >
          here
        </a>
        .
      </p>
    ),
  },
  {
    title: "My question is not listed here. Who do I contact?",
    details: (
      <p className="text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] font-sans font-normal">
        Our team will be happy to answer any queries you have. Please write to{" "}
        <a
          className="text-blue-600 hover:underline hover:text-blue-900"
          href="mailto:hello@wealthup.me?body=Hi wealthup.me,  I am interested to 
learn more about you. Please send me information regarding... Thank you!&
subject=New Message for wealthup.me!"
          target="__blank"
        >
          hello@wealthup.me
        </a>{" "}
        or call/WhatsApp at{" "}
        <a
          className="text-blue-600 hover:underline hover:text-blue-900"
          href="https://api.whatsapp.com/send?phone=
+917704047770&text=Hi wealthup.me, Can you please call me back?"
          target="__blank"
        >
          +917704047770.
        </a>
      </p>
    ),
  },
];
// {accordationQuestions.map((item, index) => (
//   <Accordion key={index} title={item.title} content={item.details} index={index} />
// ))}
export const FaqSection = () => {
  return (
    <div className='flex flex-col w-[1200px] text-white border-white items-center justify-center'>
    <AccordionContainer>
      <div className="md:w-3/5 sm:w-[500px] mx-6 md:mx-2 border-white">
        {accordationQuestions.map((item, index) => (
          <div key={index} className='flex justify-center items-baseline mb-[24px]'>
            <div className='w-72 sm:w-full text-xl sm:text-2xl flex items-center'>
              <Accordion title={item.title} content={item.details} index={index} />
            </div>
          </div>
        ))}
      </div>
    </AccordionContainer>
  </div>
    
  );
};
