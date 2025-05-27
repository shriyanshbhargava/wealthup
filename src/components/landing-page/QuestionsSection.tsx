import React, { useContext } from "react";
import { TypographyContext, handleChange } from "./TypographyContext";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { TalkToUsForm } from "./TalkToUsForm";
import Typography from "@/components/ui/typography";

export const QuestionsSection = () => {
  const { state, dispatch } = useContext(TypographyContext)!;

  return (
    <div className="px-6 py-12 md:px-0 md:py-0 md:h-screen md:min-h-[960px] bg-[#ecdfea]">
      <div className="md:flex h-full">
        <div className="h-full md:w-1/2 md:ml-[5%] md:mr-[2.5%] flex flex-col  justify-center">
          {/* <h2 className="text-[4vw] sm:text-[3.5vw] lg:text-[2vw] py-[1vh] leading-tight text-secondary font-robo font-medium">
            Here Are Answers To Some Common Questions.
          </h2> */}
          <Typography
            as="h2"
            size={state.heading}
            handleChange={(value) => handleChange(value, "heading", dispatch)}
          >
            Here Are Answers To Some Common Questions.
          </Typography>
          <Accordion
            title="What is Wealthup? What do you do?"
            content={
              <>
                <p className="text-sm sm:text-xl md:text-xl lg:text-2xl mb-4 text-secondary font-robo font-normal">
                  Wealthup is a platform that understands your current financial
                  situation, helps you identify the gaps and guides you in
                  filling these gaps.
                </p>
                <p className="text-sm sm:text-xl md:text-xl lg:text-2xl mb-4 text-secondary font-robo font-normal">
                  It gathers insights about your finances and offers the right
                  financial products for you -​​ personalised to your needs.
                </p>
                <p className="text-sm sm:text-xl md:text-xl lg:text-2xl text-secondary font-robo font-normal">
                  We can help you achieve your financial goals sooner than
                  expected.
                </p>
              </>
            }
          />
          <Accordion
            title="Who is it for?"
            content={
              <p className="text-sm sm:text-xl md:text-xl lg:text-2xl text-secondary font-robo font-normal">
                Professionals who want to better manage their money and make
                better financial decisions but don’t know where to get started
                and/or who to ask.
              </p>
            }
          />
          <Accordion
            title="What are your fees?"
            content={
              <>
                <p className="text-sm sm:text-xl md:text-xl lg:text-2xl mb-4 text-secondary font-robo font-normal">
                  We don’t charge any upfront fees. We get paid via our partners
                  when you invest via us or buy financial products like
                  insurance from us.
                </p>
              </>
            }
          />
          {/* <p className="text-[4vw] sm:text-[3.5vw] lg:text-[2vw] py-[1vh] font-medium text-secondary font-robo mt-4">
            For answers to other questions, get in touch!
          </p> */}
          <Typography
            size={state.body}
            handleChange={(value) => handleChange(value, "body", dispatch)}
          >
            For answers to other questions, get in touch!
          </Typography>
        </div>
        <div className="md:w-1/2 md:ml-[2.5%] md:mr-[5%] mt-16 md:mt-0 h-full flex flex-col items-start justify-center">
          {/* <h2 className="text-[4vw] sm:text-[3.5vw] lg:text-[2vw] py-1vh capitalize leading-tight text-secondary font-robo font-medium">
            Talk to us to find out <br /> how we can help you.
          </h2> */}
          <Typography
            as="h2"
            size={state.heading}
            handleChange={(value) => handleChange(value, "heading", dispatch)}
          >
            Talk to us to find out <br /> how we can help you.
          </Typography>
          {/* <p className="text-[3.5vw] sm:text-[3vw] lg:text-[1.5vw] py-[1vh] text-secondary font-robo font-normal">
            We promise we won&apos;t spam your inbox :&#41;
          </p> */}
          <Typography
            size={state.body}
            handleChange={(value) => handleChange(value, "body", dispatch)}
          >
            We promise we won&apos;t spam your inbox :&#41;
          </Typography>
          <TalkToUsForm />
        </div>
      </div>
    </div>
  );
};
