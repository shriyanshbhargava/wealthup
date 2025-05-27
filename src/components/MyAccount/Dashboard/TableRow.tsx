import { Button } from "@/components/ui/Button";
import Image from "next/legacy/image";
import React from "react";
import { WealthometerRating } from "./WealthometerRating";
import chatImage from "@/assets/images/wealthometer-report/2.png";
import idealImage from "@/assets/images/wealthometer-report/3.png";

export const TableRow: React.FC<{
  score: number;
  title: string;
  description: string;
  letters: string;
  imporveScoreText: string;
  helpfulTip: string;
}> = ({ score, title, description, letters, imporveScoreText, helpfulTip }) => {
  const [showDetails, setShowDetails] = React.useState<boolean>(false);

  const handleClick = () => setShowDetails(!showDetails);
  return (
    <>
      <tr
        className={`${showDetails ? "border-b-2" : "border-b-8"
          } hidden lg:flex w-full h-full`}
      >
        <td className="py-6 border-r-2 min-w-2/5 w-2/5">
          <div className="flex m-2 md:m-3 gap-2 md:gap-5">
            <div className="flex-shrink-0 w-8 md:w-16 h-8 md:h-16 bg-[#0082B2] rounded-full text-white flex items-center justify-center font-bold text-lg md:text-3xl font-robo">
              {letters}
            </div>
            <div className="w-full">
              <h2 className="text-lg md:text-3xl font-bold text-[#0082B2] mb-0 md:mb-4">
                {title}
              </h2>
              <p className="mb-0">{description}</p>
            </div>
          </div>
        </td>
        <td className="text-center text-2xl md:text-4xl font-bold border-r-2 py-6 w-[10%] flex items-center justify-center">
          {score}
        </td>
        <td className="py-6 border-r-2 w-2/5">
          <WealthometerRating score={score} totalScore={0}/>
        </td>
        <td className="items-center text-center py-6 w-[10%] flex justify-center">
          <Button
            custom
            onClick={handleClick}
          >
            {showDetails ? "Close" : "Details"}
          </Button>
        </td>
      </tr>
      {/* For mobile */}
      <tr className="border-b-2 lg:hidden w-full">
        <td className="py-6" colSpan={4}>
          <div className="flex m-2 md:m-3 gap-2 md:gap-5">
            <div className="flex items-start md:items-center gap-3">
              <div className="w-8 md:w-16 h-8 md:h-16 bg-[#0082B2] rounded-lg text-white flex items-center justify-center font-bold text-lg md:text-3xl font-robo">
                {letters}
              </div>
              <h2 className="hidden md:block text-lg md:text-3xl font-bold text-[#0082B2] mb-0 md:mb-4">
                {title}
              </h2>
            </div>
            <p className="hidden md:block mb-0 text-xl w-full">{description}</p>
            <div className="md:hidden w-full">
              <h2 className="text-lg md:text-3xl leading-tight font-bold text-[#0082B2] mb-0 md:mb-4">
                {title}
              </h2>
              <p className="mb-0">{description}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr
        className={`${showDetails ? "border-b-2" : "border-b-8"
          } w-full lg:hidden`}
      >
        <td className="py-6 border-r-2 w-3/5" colSpan={2}>
          <WealthometerRating score={score} totalScore={0}/>
        </td>
        <td className="text-center text-xl md:text-4xl font-bold border-r-2 py-6 flex flex-col items-center">
          <span className="uppercase text-sm font-robo">Score</span>
          {score}/10
        </td>
        <td className="items-center text-center py-6 w-1/5">
          <button
            className="rounded-full text-white font-bold bg-[#A63967] px-6 py-2 text-sm md:text-xl btn"
            onClick={handleClick}
          >
            {showDetails ? "Close" : "Details"}
          </button>
        </td>
      </tr>
      {showDetails && (
        <Details improveScoreText={imporveScoreText} helpfulTip={helpfulTip} />
      )}
    </>
  );
};

const Details: React.FC<{
  improveScoreText: string;
  helpfulTip: string;
}> = ({ improveScoreText, helpfulTip }) => {
  return (
    <tr className="wealthometer-box">
      <td colSpan={4}>
        <div className="w-full flex justify-between gap-2 flex-col md:flex-row lg:gap-4 py-8 px-6 lg:px-20">
          <div className="w-full md:w-2/5 flex gap-4">
            <div className="w-16 h-16">
              <Image src={chatImage} alt="chat" />
            </div>
            <div className="w-full">
              <h2 className="text-black text-2xl font-bold">
                Suggestions to improve your score
              </h2>
              <p className="mt-2">{improveScoreText}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex gap-4">
            <div className="w-16 h-16">
              <Image src={idealImage} alt="idea" />
            </div>
            <div className="w-full">
              <h2 className="text-black text-2xl font-bold">Helpful Tip</h2>
              <p className="mt-2">{helpfulTip}</p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
