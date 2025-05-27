import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonughtChart = () => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [33.33, 33.33, 33.33],
        backgroundColor: ["#ef4444", "#fb923c", "#16a34a"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: '65%'
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false
          },
        },
      }}
    />
  );
};

export default DonughtChart;
