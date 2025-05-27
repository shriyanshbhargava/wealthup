import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  rotation: -90,
  circumference: 180,
  legend: {
    display: false,
  },
  tooltip: {
    enabled: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

export const PieChart: React.FC<{
  total: number;
  expenses: number;
}> = ({ total, expenses }) => {
  console.log({ total, expenses });
  const data = {
    labels: ["Expenses", "Total"],
    datasets: [
      {
        data: [expenses, total - expenses > 0 ? total - expenses : 0], // how much space each bar should take
        backgroundColor: [
          "rgb(195 70 106)",
          "white", // bar 2 is white
        ],
      },
    ],
  };
  return (
    <div className="relative flex gap-6 w-full">
      <Pie options={options} data={data} />
      <div className="absolute bg-primary-light top-[7.5rem] text-center text-white font-robo font-medium left-[2rem] block w-[80%] h-[80%] rounded-full">
        <p className="text-3xl mb-0 mt-[90px]">
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(expenses / 1000)}
          K/
          {Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(total / 1000)}
          K
        </p>
      </div>
    </div>
  );
};
