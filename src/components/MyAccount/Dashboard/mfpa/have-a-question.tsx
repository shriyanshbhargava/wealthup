'use client'

import Question from './question';

export const questions = [
  {
    question: 'What is CAS?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Where can I find CAS?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Is my information safe?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];


const HaveQuestions = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded-lg shadow-md shadow-[#60a1c2]">
      <h2 className="text-2xl font-semibold mb-6 text-center">Have Questions?</h2>
      {questions.map((item, index) => (
        <Question key={index} question={item.question} answer={item.answer} index={index} />
      ))}
    </div>
  );
};

export default HaveQuestions;
