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


const DonughtChart = ({datapoints, color, circumference , rotation, labels=null, values=null ,spacing=4, tooltip=false}) => {
  const data = {
    // labels: labels,
    datasets: [
      {
        data: datapoints || [33.33, 33.33, 33.33],
        backgroundColor: color ||  ["#ef4444", "#fb923c", "#16a34a"],
        borderWidth: 0,
        circumference: circumference ||  360,
        rotation: rotation || 270,
        cutout: '90%',
        borderRadius:10,
        spacing: spacing
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top" ,
        display: false,
      },
      tooltip: {
        enabled: tooltip ,
        callbacks: {
          label: function (context) {
            let label = labels[context.dataIndex] || "";
  
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 1,
              }).format(context.parsed);
            }
            label += '%'

            let Amount;
            if(values){
              Amount = ' Amount :  ₹' + new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(values[context.dataIndex] );
            }
            
            return [label,Amount];
          },
        },
      },
    },
  }

  return (
    <Doughnut
      data={data}
      className="m-auto"
      options={options}
    />
  );
};

export default DonughtChart;