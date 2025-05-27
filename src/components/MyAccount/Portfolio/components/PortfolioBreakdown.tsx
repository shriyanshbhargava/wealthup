import {
  ArcElement,
  Chart,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { OverallInvestment } from "../types";
import React from "react";
import { useMediaQuery } from "react-responsive";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioBreakdown: React.FC<{
  investmentsData?: OverallInvestment[];
  netWorth?: number;
}> = ({ investmentsData, netWorth = 1 }) => {
  const data = {
    labels: investmentsData?.map((it) => it.name),
    datasets: [
      {
        data: investmentsData?.map((it) =>
          Math.round((it.total_current / netWorth) * 100)
        ),
        backgroundColor: ["#e8cbd2", "#f9f3e4", "#f4e2dd", "#f4ff9f"],
        borderWidth: 0,
      },
    ],
  };

  const plugins: any = [
    {
      beforeDraw: function (chart: Chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        ctx.shadowColor = "black";
        var text =
          (netWorth / 100000).toLocaleString("en-IN", {
            maximumFractionDigits: 1,
          }) + "L",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const md = useMediaQuery({ minWidth: 760 });
  const lg = useMediaQuery({ minWidth: 980 });

  return (
    <div className="bg-white rounded-xl flex items-center justify-center py-4">
      <div className="w-1/2 lg:scale-75">
        <Doughnut
          data={data}
          plugins={plugins}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.parsed}%`;
                  },
                },
              },
            },
            cutout: lg ? 100 : md ? 50 : 40,
          }}
        />
      </div>
    </div>
  );
};
