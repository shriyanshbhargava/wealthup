import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);




export const LineChart = ({labels, data}) => {
  const chartData =  {
    labels,
    datasets: [
      {
        label: "Asset Value",
        data: data,
        backgroundColor: (context) => {
          const bgColor = [
              'rgba(0,183,183,0.7344187675070029)',
              'rgba(255,255,255,0)'
          ]
          if(!context.chart.chartArea){
              return;
          }
          const {ctx, data, chartArea:{top,bottom}} = context.chart;
          const gradientBg = ctx.createLinearGradient(0,top,0,bottom);
          gradientBg.addColorStop(0.3, bgColor[0])
          gradientBg.addColorStop(1, bgColor[1])
          return gradientBg;
  
        },
        borderColor: "#00B7B7",
        pointBackgroundColor: "#00B7B7",
        tension: 0.3,
        fill: 'start',
        pointRadius	: useMediaQuery({ minWidth: 700 }) ? 2 : 1,
        borderWidth : useMediaQuery({ minWidth: 700 }) ? 3 : 1
      },
    ],
  };;
  return <Line 
    options={{
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks :{
            autoSkip:true,
            maxRotation: 0,
            font:{
              size: useMediaQuery({ minWidth: 700 }) ? 12 : 8
            }
          }
        },
        y: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            callback: (label) => label/100000 + 'L',
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "top" ,
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
    
              if (label) {
                label += ": ";
              }
              label += ' ₹ '
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    }} 
    data={chartData} 
  />;
};
