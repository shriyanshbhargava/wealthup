import React, { useEffect, useState } from "react";

export const Insights: React.FC<{
  suggestions: { suggestion: string }[];
}> = ({ suggestions }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (suggestions.length - 1 === index) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [suggestions.length]);

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold font-robo">My insights</p>
      <div
        className={`flex flex-col justify-between p-4 rounded-xl ${
          index % 2 === 0 ? "bg-primary-new" : "bg-white"
        } h-36 md:h-32`}
      >
        <p
          className={`text-xl font-bold ${
            index % 2 !== 0 ? "text-primary-new" : "text-white"
          }`}
          key={index}
        >
          {suggestions[index].suggestion}
        </p>
        <div className="flex justify-center gap-2">
          {suggestions.map((it, currentIndex) => (
            <span
              className={`cursor-pointer block rounded-full w-4 h-4 ${
                currentIndex === index
                  ? "bg-gray-400 scale-100"
                  : "bg-gray-300 scale-50"
              }`}
              onClick={() => setIndex(currentIndex)}
              key={currentIndex}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};
