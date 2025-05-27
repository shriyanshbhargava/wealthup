import { FC, useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

interface QuestionProps {
  question: string;
  answer: string;
  index: number;
}

const Question: FC<QuestionProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 ">
      <button
        className="w-full text-left flex justify-between items-center py-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{index + 1}. {question}</span>
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}><FaChevronDown /></span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="mt-2 text-base text-blue-900 pl-4">{answer}</p>
      </div>
    </div>
  );
};

export default Question;
