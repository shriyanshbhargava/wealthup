"use client"
import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface NetworthChartProps {
    goals: Array<{ name: string; total_investment_allocated: number }>;
    availableBalance: number;
}

const NetworthChart: React.FC<NetworthChartProps> = ({ goals, availableBalance }) => {
    const allocatedAmount = goals?.reduce((sum, goal) => sum + goal.total_investment_allocated, 0);
    const unallocatedAmount = Math.max(0, availableBalance - allocatedAmount);

    const goalColors = [
        '#39cef3', '#035782', '#01C8A9', '#2e87b9', '#38b8e5',
        '#0482a0', '#02b097', '#2578a4', '#4fcfe2', '#02648c',
        '#00bca0'
    ];

    const networthData: ChartData<'doughnut'> = {
        labels: [
            ...(goals?.map(goal => goal?.name) ?? []),
            "Unallocated"
        ],
        datasets: [
            {
                data: [
                    ...(goals?.map(goal => goal.total_investment_allocated) ?? []),
                    unallocatedAmount,
                ],
                backgroundColor: [
                    ...goalColors.slice(0, goals.length),
                    '#B5B5B5'
                ],
                borderWidth: 0,
                circumference: 360,
                rotation: 270,
                borderRadius: 10,
                spacing: 2,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw as number;
                        const percentage = ((value / availableBalance) * 100).toFixed(1);
                        return `${value?.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                        })} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '90%',
    };

    return (
        <div className='flex flex-col gap-4 items-center px-10'>
            <div className='relative'>
                <div className='max-w-[200px] xl:max-w-[200px] z-10 relative'>
                    <Doughnut data={networthData} options={options} />
                </div>
                <div className='flex flex-col m-auto items-center font-bold text-lg absolute inset-0 justify-center w-fit h-fit z-0 pointer-events-none'>
                    <span className='text-black font-medium text-3xl'>
                        {availableBalance.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                        })}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NetworthChart;
