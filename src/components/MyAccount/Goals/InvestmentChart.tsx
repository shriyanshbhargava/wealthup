import React from 'react';
import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Goal {
    _id: string;
    name: string;
    total_sip_allocated: number;
    target_amount: number;
    total_projected_amount: number;
}

interface InvestmentChartProps {
    goals: Goal[];
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ goals }) => {
    const totalSIP = goals?.reduce((sum, goal) => sum + goal.total_sip_allocated, 0);

    const colors = ['#39cef3', '#035782', '#01C8A9', '#2e87b9', '#38b8e5', '#0482a0', '#02b097', '#2578a4', '#4fcfe2', '#02648c', '#00bca0'];

    const chartData: ChartData<'doughnut'> = {
        labels: goals?.map(goal => goal.name) ?? [],
        datasets: [
            {
                data: totalSIP === 0 ? [1] : goals?.map(goal => goal.total_sip_allocated) ?? [],
                backgroundColor: totalSIP === 0
                    ? ['#E0E0E0']
                    : goals?.map((_, index) => colors?.[index % colors.length]) ?? [],
                borderWidth: 0,
                circumference: 360,
                rotation: 270,
                borderRadius: 10,
                spacing: 4,
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
                        const goal = goals[context.dataIndex];
                        return `${goal?.total_sip_allocated.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                        })}`;
                    },
                },
            },
        },
        cutout: '90%',
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="relative">
                <div className="max-w-[200px] xl:max-w-[200px] z-10 relative">
                    <Doughnut data={chartData} options={options} />
                </div>
                <div className="flex flex-col m-auto w-fit h-fit items-center font-bold text-lg absolute inset-0 justify-center z-0 pointer-events-none">
                    <span className="text-black font-medium text-3xl">₹{totalSIP?.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default InvestmentChart;
