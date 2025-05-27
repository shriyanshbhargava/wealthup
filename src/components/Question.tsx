import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export interface QuestionProps {
  question: string;
  options: Array<{
    content: string;
    points: number;
    num: string;
  }>;
  selected: string | null;
  handlePrevious: React.MouseEventHandler<SVGAElement>;
  handleNext: React.MouseEventHandler<SVGAElement>;
  handleOptionSelect: Function;
  questionsWithoutCondition?: Array<any>;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  options,
  selected,
  handlePrevious,
  handleNext,
  handleOptionSelect,
  
}) => {
  return (
    <div className="rounded-[30px] 'w-full' sm:w-[510px] md:w-[620px] mb-20  p-8 bg-white shadow-md">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-lg md:text-xl md:mx-20 text-secondary font-sans font-normal">
          {question}
        </h2>
        <div className="flex w-full items-center">
          <div className="hidden md:block mr-2 md:mr-8">
          </div>
          <div className="flex flex-col my-2 md:my-8 w-full">
            {options.map((op) => (
              <div
                key={op.num}
                className={`px-2 md:px-6 py-1 md:py-4 text-base md:text-xl border-2 rounded-md md:rounded-xl border-primary-new w-full my-1 md:my-2 cursor-pointer hover:bg-primary-lighter ${selected && op.num === selected ? "bg-primary-lighter" : ""
                  }`}
                onClick={() => handleOptionSelect(op.num)}
              >
                {op.content}
              </div>
            ))}
          </div>
          <div className="hidden md:block ml-2 md:ml-8">
            <IoIosArrowForward
              // size={40}
              onClick={handleNext}
              className="cursor-pointer hover:text-primary w-4 h-4 md:w-10 md:h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
