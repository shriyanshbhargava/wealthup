import { ToolTip, TooltipV2 } from "@/components/ui/ToolTip";

import { BsInfoCircle } from "react-icons/bs";
import Input from "@/components/ui/Input";
import React from "react";
import { motion } from 'framer-motion'

type QuestionWithChoiceProps = {
  question: string;
  options: Array<{
    content: string;
    num: string;
    estimatevalue: string | number;
  }>;
  selected: string | null;
  handleOptionSelect: (estimatevalue: string) => void;
  multiple?: boolean;
  multipleSelect?: Array<string>;
  info?: string;
};

type QuestionWithInputProps = {
  question: string;
  handleAnswerQuestion: (estimatevalue: string, isEnter: boolean) => void;
  estimatevalue: string;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const QuestionWithChoice: React.FC<QuestionWithChoiceProps> = ({
  question,
  options,
  selected,
  handleOptionSelect,
  multiple = false,
  multipleSelect,
  info,
}) => {
  const [selectedOpts, setSelectedOpts] = React.useState<Array<string>>(
    multipleSelect ?? []
  );
  // const []

  const handleSelect = (selected: string) => {
    console.log("handle selcect");
    const answer: string = options.find((op) => op.num === selected)!.content;
    const arr = selectedOpts;
    if (arr.includes(answer)) {
      const newArr = arr.filter((e) => e !== answer);
      setSelectedOpts(newArr);
    } else {
      arr.push(answer);
      setSelectedOpts(arr);
    }
  };

  React.useEffect(() => {
    if (multipleSelect?.length) {
      setSelectedOpts(multipleSelect);
    }
  }, [selectedOpts]);

  return (
    <div className="h-3/5 w-full px-8 md:px-0 flex flex-col">
      <h2 className="flex items-center gap-2 text-base md:text-xl text-secondary font-sans font-normal">
        {question} {info && (
          <TooltipV2 message={info}>
            <BsInfoCircle className="inline cursor-pointer" />
          </TooltipV2>
        )}
      </h2>

      <div className="flex flex-col my-0 md:my-4 w-full h-4/6">
        {options.map((op) => (
          <div
            id="WOM_Q_BTN"
            key={op.num}
            className={`px-2 md:px-6 py-1 md:py-4 text-base md:text-xl border-2 rounded-md md:rounded-xl border-primary-new w-full my-1 md:my-2 cursor-pointer md:hover:bg-primary-lighter ${multiple === true && selectedOpts?.includes(op.content)
              ? "bg-primary-lighter"
              : selected && op.content === selected
                ? "bg-primary-lighter"
                : ""
              }`}
            onClick={() => {
              handleOptionSelect(op.num);
              if (multiple) {
                handleSelect(op.num);
              }
            }}
          >
            {op.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export const QuestionWithInput: React.FC<QuestionWithInputProps> = ({
  question,
  handleAnswerQuestion,
  estimatevalue,
  handleNext,
  handlePrevious
}) => {
  const [inputValue, setInputValue] = React.useState<string>(estimatevalue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handleAnswerQuestion(e.target.value, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnter = e.key === "Enter";
    if (isEnter) {
      handleAnswerQuestion(inputValue, isEnter);
    }
  };

  React.useEffect(() => {
    setInputValue(estimatevalue);
  }, [estimatevalue, question]);

  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, marginLeft: 200 }}
      animate={{ opacity: 1, marginLeft: 0 }}
      className='rounded-[30px] w-full md:w-[642px] h-[300px] md:h-[307px] p-8 bg-white shadow-md'>
      <div>
        {/* <div className='flex justify-end md:hidden'>
          <div className='flex mb-6'>
            <button onClick={handlePrevious} className="cursor-pointer text-[#B3B3B3] w-4 h-4 md:w-10 md:h-10 mr-4">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.575 19.4124L12.175 14.9999L16.575 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={handleNext} className="cursor-pointer text-[#B3B3B3] w-4 h-4 md:w-10 md:h-10 ml-4">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.425 19.4124L17.825 14.9999L13.425 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div> */}
        <h2 className='text-xl font-bold text-[#1E2939]'>{question}</h2>
        <div className=''>
          <input
            type="number"
            placeholder="Enter your age"
            name="age"
            className="border border-[#A4A4A4] rounded-full h-[50px] w-full text-black text-base placeholder:text-base placeholder:text-black px-8"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {inputValue && parseInt(inputValue) < 18 && <p className="text-red-700">Age cannot be lower than 18</p>}
          {/* <Input
            type="number"
            placeholder="Age"
            label="Age"
            bgLabel="bg-white"
            className="rounded-full"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={inputValue}
            key="input"
            error={
              inputValue && parseInt(inputValue) < 18
                ? "Age cannot be lower than 18."
                : ""
            }
          /> */}
        </div>
      </div>
    </motion.div>
  );
};
