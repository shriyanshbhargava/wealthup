import React from "react";

const colors = {
  green: "bg-green-600",
  yellow: "bg-yellow-400",
  orange: "bg-orange-400",
  red: "bg-red-500",
};

interface WealthometerRatingProps {
  score: number;
  totalScore: number;
}

export const WealthometerRating: React.FC<WealthometerRatingProps> = ({ score, totalScore }) => {
  const ratingRef = React.createRef<HTMLDivElement>();
  const [right, setRight] = React.useState<number>(0);
  const [remarkRight, setRemarkRight] = React.useState<number>(0);
  const [remark, setRemark] = React.useState<string>("");
  const [arrowColor, setArrowColor] = React.useState<string>("");

  React.useEffect(() => {
    const width = ratingRef.current?.clientWidth;

    if (!width) return console.log("Width not found");
    const totalWidth = width - 25;
    const equalWidthForTenParts = totalWidth / 10;
    let rightInPx = Math.round(totalWidth - equalWidthForTenParts * (score / totalScore) * 10) - 15;

    if (rightInPx < 0) {
      rightInPx = 0;
    } else if (rightInPx > totalWidth) {
      rightInPx = totalWidth;
    }

    console.log({ width, rightInPx });

    setRight(rightInPx);

    const singlePieceWidth = totalWidth / 4;
    const poorWidth = singlePieceWidth * 4 - 50;
    const excWidth = singlePieceWidth - 70;

    const percentage = (score / totalScore) * 100;

    switch (true) {
      case percentage <= 30:
        setRemark("Poor");
        setRemarkRight(poorWidth > totalWidth ? totalWidth : poorWidth);
        setArrowColor(colors.red);
        return;
      case percentage > 30 && percentage <= 70:
        setRemark("Average");
        setRemarkRight(singlePieceWidth * 3 - 60);
        setArrowColor(colors.orange);
        return;
      case percentage > 70:
        setRemark("Good");
        setRemarkRight(excWidth < 0 ? 0 : excWidth);
        setArrowColor(colors.green);
        return;
    }
  }, [score, totalScore, ratingRef]);

  return (
    <div className="flex items-center justify-center h-full">
      <div
        ref={ratingRef}
        className="relative flex w-full justify-center items-center"
      >
        <div
          className={`absolute text-md -bottom-8`}
          style={{ width: '100%' }}
        >
          {remark}
        </div>
        {/* <div
          className={`absolute -top-5 md:-top-6 rotate-180`}
          style={{ right }}
        >
          <div className="w-6 md:w-10 overflow-hidden inline-block">
            <div
              className={`h-4 md:h-6 w-4 md:w-6 ${arrowColor} rotate-45 transform origin-bottom-left`}
            ></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
