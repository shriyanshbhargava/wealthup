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
          return value.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
            style: "currency",
            currency: "INR",
          });
        },
      },
      grid: {
        display: false,
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
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
};

export type Insight = { month: string; monthId: number; amount: number };

export const ExpenseTrendGraph: React.FC<{ insights: Insight[] }> = ({
  insights,
}) => {
  const labels = insights.map((e) => e.month);

  const data = {
    labels,
    datasets: [
      {
        label: "Total",
        data: insights.map((e) => e.amount),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="flex gap-6  w-full">
      <Bar options={options} data={data} />
    </div>
  );
};
