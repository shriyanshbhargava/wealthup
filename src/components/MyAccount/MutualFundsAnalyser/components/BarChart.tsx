import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: function (value: any, _index: any, _ticks: any) {
          return `${value}%`
        },
      },
      grid: {
        display: true,
      },
      border: {
        display: false,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            }).format(context.parsed.y);
          }
          label += '%'
          return label;
        },
      },
    },
  },
};

type barVal = [number, number]

export type Insight = { label: string; id: number; value: barVal };

export const BarChart: React.FC<{ insights: Insight[] }> = ({
  insights,
}) => {
  const labels = insights.map((e) => e.label);

  const data = {
    labels,
    datasets: [
      {
        label: "Your Portfolio",
        data: insights.map((e) => e.value[0]),
        backgroundColor: "#069",
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 15
      },
      {
        label: 'Category Avg',
        data: insights.map((e) => e.value[1]),
        backgroundColor: '#00B7B7',
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 15
      },
    ],
  };
  return (
    <div className="flex justify-center gap-6 pt-3 w-full relative">
      <Bar options={options} data={data} />
    </div>
  );
};
