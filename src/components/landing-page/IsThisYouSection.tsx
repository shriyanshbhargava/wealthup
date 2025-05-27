import React, { useContext } from "react";
import { TypographyContext, handleChange } from "./TypographyContext";

import { Accordion } from "@/components/ui/Accordion";
import Typography from "@/components/ui/typography";

const IsThisYouSection = () => {
  const { state, dispatch } = useContext(TypographyContext)!;
  return (
    <div
      id="second-section"
      className="py-24 md:py-0 md:h-screen flex items-center justify-center bg-[#ecdfea] md:min-h-[900px]"
    >
      <div className="mx-6 md:mx-0 sm:w-[90%] md:w-3/5">
        {/* <h2 className="text-[4vw] sm:text-[2.5vw] md:text-[2vw] py-[2vh] font-robo text-secondary font-medium">
          Is This You?
        </h2> */}
        <Typography
          as="h2"
          size={state.heading}
          className="capitalize"
          handleChange={(value) => handleChange(value, "heading", dispatch)}
        >
          Is this you?
        </Typography>
        <Accordion
          title="Investing randomly with no structured plan."
          content="Overwhelmed by all the free resources and jargons. It’s an emotional roller coaster led by FOMO!"
        />
        <Accordion
          title="Making decent money still feeling poor."
          content="Salary disappears soon after hitting the account, where did it go?"
        />
        <Accordion
          title="Bank relationship manager disappears when you need them."
          content="Chases you to buy financial products but are unreachable when you need them - leaving you hanging out to dry."
        />
        <Accordion
          title="Talking to friends & family about money is a taboo."
          content="The struggle is real... fear of getting judged mixed with different mindsets due to generation gap."
        />
        <Accordion
          title="Intimidated by financial jargon."
          content="Don’t know how loans, banking or even interest rates work. Not sure how to secure my future!"
        />
        <Typography
          as="p"
          size={state.heading}
          className="capitalize text-[#892b64] font-medium"
          handleChange={(value) => handleChange(value, "heading", dispatch)}
        >
          Is this you?
        </Typography>
        {/* <p className="text-[4vw] sm:text-[2.5vw] mt-4 md:text-[2vw] py-[2vh] font-robo text-[#892b64] font-medium">
          We Feel You.
        </p> */}
      </div>
    </div>
  );
};

export default IsThisYouSection;
