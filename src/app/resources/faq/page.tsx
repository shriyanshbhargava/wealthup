'use client'

import '@/styles/newstyles.css'
import { AccordionContainer } from "@/components/ui/Accordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { HeaderController } from "@/components/display/HeaderController";
import React from "react";
import { faqCrumbs } from "@/utils/Breadcrumbs";
import { whatsappLink } from "@/utils/constants";

// Move the faqs array inside the component or to a separate file
const faqsData = [
  {
    title: "1. What is Wealthup?",
    details: (
      <p className="font-sans font-light text-base md:text-lg mb-0">
        Wealthup is a platform that understands your current financial
        situation, helps you identify the gaps and guides you in filling these
        gaps.
        <br />
        It gathers insights about your finances and offers the right financial
        products for you - personalised to your needs.
        <br />
        We can help you achieve your financial goals sooner than expected.
      </p>
    ),
  },
  {
    title: "2. Who is it for?",
    details: `Professionals who want to manage their money or make better financial decisions but don't know where to get started and/or who to ask.`,
  },
  {
    title: "3. What is your vision?",
    details: `Wealthup's vision is to be a reliable financial friend to every Indian and help them achieve their financial goals sooner than expected.`,
  },
  {
    title: "4. Why is Wealthup unique?",
    details: (
      <p className="font-sans font-light text-base md:text-lg mb-0">
        Wealthup brings every aspect of personal finance on a single dashboard.
        <br />
        We help you with your entire financial planning i.e. tax saving,
        investing, insurance etc.
        <br />
        Now get personalised financial guidance which traditionally was reserved
        for the top 0.1% of the world.
      </p>
    ),
  },
  {
    title: "5. How do we help you?",
    details: (
      <p className="font-sans font-light text-base md:text-lg mb-0">
        First, we analyse your financial situation using our proprietary
        WealthoMeter tool which identifies gaps in your finances.
        <br />
        Then our AI-powered technology creates a plan to fill these gaps while a
        relationship manager (RM) helps you execute the plan.
        <br />
        Finally, our platform tracks your progress and sends alerts to you and
        the RM to course-correct.
      </p>
    ),
  },
  {
    title: "6. Is Wealthup for me?",
    details: (
      <p className="font-sans font-light text-base md:text-lg mb-0">
        Yes!
        <br />
        We&apos;ve had clients who have been professionals in their fields for
        20 years and we&apos;ve also had clients who are just starting their
        first jobs.
        <br />
        To make the most of the power of compounding, the earlier you start
        planning your finances the better!
      </p>
    ),
  },
  {
    title: "7. Do I need to have some financial knowledge to talk to you?",
    details: (
      <p className="font-sans font-light text-base md:text-lg mb-0">
        Not at all!
        <br />
        Whether you are new to the financial world or a seasoned investor, we
        will have a subscription plan that will work for you.
      </p>
    ),
  },
  {
    title: "8. I have more questions.",
    details: (
      <p className="font-sans font-light text-base md:text-lg mb-0 ">
        Amazing! We applaud your thoroughness.
        <br />
        Having your questions answered before you avail of any financial service
        is very important.
        <br />
        Write to us at{" "}
        <a
          className="text-white underline"
          href="mailto:hello@wealthup.me"
        >
          hello@wealthup.me
        </a>{" "}
        or text us on{" "}
        <a className="text-white underline" href={whatsappLink}>
          WhatsApp
        </a>
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <HeaderController title="Get answers to your frequently asked questions" />
      <Header />
      <main className="faq-gradient">
      <Breadcrumbs crumbs={faqCrumbs} />
        <div className="pb-10">
          <h1 className="text-2xl md:text-3xl text-center font-robo font-medium max-lg:mt-32 max-md:mt-0 text-white">
            Frequently Asked Questions
          </h1>
          <div className="w-full flex justify-center">
            <div className="w-full px-4 lg:w-2/3 text-white">
              <AccordionContainer>
                {faqsData.map((item, i) => (
                  <AccordionContainer.Item
                    title={item.title} 
                    content={item.details}
                    key={i}
                    index={i}
                  />
                ))}
              </AccordionContainer>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}