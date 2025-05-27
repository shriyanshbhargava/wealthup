import { AccordionContainer } from '@/components/ui/Accordion';
import Link from 'next/link';
import React from 'react';
import { TalkToUsForm } from '../landing-page/TalkToUsForm';

export const faqs = [
    {
        title: "What does Wealthup do?",
        details: (
            <p className="font-sans font-light text-[3.25vw] md:text-[1.75vw] lg:text-[1.25vw] px-4">
                Wealthup guides you in creating a comprehensive financial plan across financial goal planning, investment planning, insurance planning, tax saving etc.
                <br /><br />
                We start with understanding your current financial situation, identifying gaps and then guiding you in filling those gaps.
                <br /><br />
                After your personalised plan is created, your progress is regularly monitored and you receive prompts on what changes are needed so you can relax and focus on other things that matter to you.
            </p>
        ),
    },
    {
        title: "How does Wealthup make money?",
        details: `We don't charge anything to the clients because when you transact with us (e.g., invest in mutual funds) or buy financial products (e.g., insurance) we get a small fee from the mutual fund company or insurance company. This is how Wealthup makes money.`,
    },
    {
        title: "How do I know you will give unbiased financial advice and avoid conflict of interest?",
        details: (
            <p>
                Financial services are built on trust. We only suggest products that are best for you and do not offer any options that our team does not personally invest in.
                <br />
                Our clients are well educated and with access to the internet will easily find out if the products being sold to them are bad. It is in our interest to ensure their money is growing and they are buying the right products; otherwise, our business will not survive in the long term.
                <br />
                Wealthup&apos;s founders left their comfortable jobs abroad and came back to India with the vision of helping people live more prosperous and stress-free lives. They started the company so people get unbiased and personalised advice to reach their financial goals faster. You can read more about their story here.
            </p>
        ),
    },
    {
        title: "Is my money safe with Wealthup?",
        details: `Your money is 100% safe. All your investment amount goes directly to Bombay Stock Exchange and insurance premium goes directly to insurance companies. We only act as intermediary and cannot do any transactions on our behalf.`,
    },
    {
        title: "Who is Wealthup for?",
        details: (
            <p>
                Wealthup is for ambitious people who are serious about growing their wealth. On the work front, they are busy being exceptionally good at their job, and on the personal front, enjoying life with their friends and family. They want a trusted financial expert to help them plan and monitor all aspects of their finances under one roof.
                <br />
                There is no minimum amount to get started with us and no lock-ins, so you can get started with whatever amount you are comfortable with.
            </p>
        ),
    },
];

const FaqSection = () => {
    return (
        <section id="faq" className="py-12 sm:py-24 text-center">
            <div className="container">
                <div className='flex flex-wrap gap-12'>
                    <div className='w-full md:w-1/2'>
                        <div className="text-left">
                            <h2 className="mb-12 text-2xl text-primary-black leading-tight">FAQs</h2>
                        </div>
                        <div className="mb-12 flex justify-center">
                            <div className='text-left'>
                                <AccordionContainer>
                                    {faqs.map((item, i) => (
                                        <AccordionContainer.Item
                                            title={item.title}
                                            content={typeof item.details === "string" ? <p>{item.details}</p> : item.details}
                                            key={i}
                                            index={i}
                                        />
                                    ))}
                                </AccordionContainer>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Link href="/resources/faq">
                                <a className='btn'>Read more FAQs</a>
                            </Link>
                        </div>
                    </div>
                    <div className='w-full md:w-[45%]'>
                        <div className="text-left">
                            <h2 className="mb-12 text-2xl text-primary-black leading-tight">For answers to other questions, get in touch</h2>
                        </div>
                        <TalkToUsForm bg="bg-[#E8F8F5]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FaqSection;
