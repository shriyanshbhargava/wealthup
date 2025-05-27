'use client'

import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import { formatIndianNumber } from '@/components/MyAccount/Dashboard/mfpa/mfpa-static-table';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutComponentProps {
  color: string[];
  labels: string[];
  values: number[];
  gap: boolean;
  isPercentageSignificant: boolean;
  amounts:number[]
}

const DoughnutComponent: React.FC<DoughnutComponentProps> = ({ color, labels, values, gap, isPercentageSignificant,amounts }) => {
  const data: ChartData<'doughnut'> = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: color,
        borderWidth: 0,
        circumference: 360,
        rotation: 270,
        borderRadius: isPercentageSignificant ? 0 : 10,
        spacing: isPercentageSignificant ? 0 : 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Investment Doughnut Chart',
      },
      tooltip: {
        enabled: gap, 
        callbacks: {
          label: function (tooltipItem) {
            if (!gap) {
              return '';
            }
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const currentValue = dataset.data[tooltipItem.dataIndex] as number;
            const label = data.labels ? data.labels[tooltipItem.dataIndex] : '';
            const currentAmount = amounts[tooltipItem.dataIndex]
            return ` ₹${formatIndianNumber(currentAmount)} (${(currentValue * 100)?.toFixed(1)}%)`;
          },
        },
      },
    },
    cutout: '90%',
  };

  return (
    <div className='h-full max-h-[200px]'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutComponent;
