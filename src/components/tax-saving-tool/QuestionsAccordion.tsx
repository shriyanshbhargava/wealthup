import { AccordionContainer } from "@/components/ui/Accordion";
import React from "react";
import { whatsappLink } from "@/utils/constants";

const accordationQuestions = [
  {
    title: "There are no FREE lunches in the world. What’s the catch?",
    summary:
      "There is no catch. If you like our free tool, you have the option of paying and getting access to our premium services.",
  },
  {
    title: "How much do the paid services cost?",
    summary: (
      <p className="font-light text-[3vw] sm:text-[1.75vw] md:text-[1.5vw]">
        We offer a variety of services like personal finance consultations, tax
        planning etc. For more information you can write to{" "}
        <a
          className="text-blue-700 underline"
          href="mailto:hello@wealthup.me?body=Hi wealthup.me,  I am 
    interested to learn more about you. Please send me 
    information regarding... Thank you!&subject=New Message for 
    wealthup.me!"
          target="__blank"
        >
          hello@wealthup.me
        </a>{" "}
        or call/ WhatsApp at{" "}
        <a
          className="text-blue-700 underline"
          href={whatsappLink}
          target="__blank"
        >
          +918035864017.
        </a>
      </p>
    ),
  },
  {
    title: "Do you also provide one-on-one tax advice?",
    summary: (
      <p className="font-light text-[3vw] sm:text-[1.75vw] md:text-[1.5vw]">
        Absolutely! You can book a consultation call and get help on your entire
        tax planning process. You can write to{" "}
        <a
          className="text-blue-700 underline"
          href="mailto:hello@befinsavvy.
com?body=Hi wealthup.me,  I am interested to learn more about you. Please 
send me information regarding... Thank you!&subject=New Message for 
wealthup.me!"
          target="__blank"
        >
          hello@wealthup.me
        </a>{" "}
        or call/WhatsApp at
        <a
          className="text-blue-700 underline"
          href={whatsappLink}
          target="__blank"
        >
          +918035864017.
        </a>
      </p>
    ),
  },
  {
    title: "Do you also help with tax filing?",
    summary: (
      <p className="font-light text-[3vw] sm:text-[1.75vw] md:text-[1.5vw]">
        Yes! Our experts are here to ensure a hassle-free tax filing process.
        For queries, you can write to{" "}
        <a
          className="text-blue-700 underline"
          href="mailto:hello@wealthup.me?body=Hi 
wealthup.me,  I am interested to learn more about you. Please send me 
information regarding... Thank you!&subject=New Message for wealthup.me!"
          target="__blank"
        >
          hello@wealthup.me
        </a>{" "}
        or call/WhatsApp at{" "}
        <a
          className="text-blue-700 underline"
          href={whatsappLink}
          target="__blank"
        >
          +918035864017.
        </a>
      </p>
    ),
  },
  {
    title: "What happens to the information I share?",
    summary:
      "The information you share is not used by or shared with any 3rd party. It is only used by our team to calculate your tax savings and offer similar products.",
  },
  {
    title: "What is wealthup.me?",
    summary: (
      <p className="font-light text-[3vw] sm:text-[1.75vw] md:text-[1.5vw]">
        wealthup.me helps individuals make smarter financial decisions and
        manage their money effortlessly. We are a FinTech platform that helps
        you painlessly perform financial tasks. You can join our waitlist to get
        early access to our platform{" "}
        <a
          href="https://wealthup.me/join-waitlist"
          target="__blank"
          className="text-blue-700 underline"
        >
          {" "}
          here.
        </a>
      </p>
    ),
  },
  {
    title: "My question is not listed here. Who do I contact?",
    summary: (
      <p className="font-light text-[3vw] sm:text-[1.75vw] md:text-[1.5vw]">
        Our team will be happy to answer any queries you have. Please write to{" "}
        <a
          className="text-blue-700 underline"
          href="mailto:hello@wealthup.me?body=Hi wealthup.me,  I am interested to 
learn more about you. Please send me information regarding... Thank you!&
subject=New Message for wealthup.me!"
          target="__blank"
        >
          hello@wealthup.me
        </a>{" "}
        or call/WhatsApp at
        <a
          className="text-blue-700 underline"
          href={whatsappLink}
          target="__blank"
        >
          +918035864017.
        </a>
      </p>
    ),
  },
];

export const QuestionsAccordion = () => {
  return (
    <AccordionContainer>
      {accordationQuestions.map((item, i) => (
        <AccordionContainer.Item
          key={i}
          title={item.title}
          content={item.summary}
          index={i}
        />
      ))}
    </AccordionContainer>
  );
};
