import { Card, CardItem } from '@/components/MyAccount/Dashboard/doughnut-chart';

import DoughnutComponent from '@/components/MyAccount/Dashboard/doughnut';
import { MdInfoOutline } from "react-icons/md";
import { MfpaDataItem } from './mfpa-static-table';
import PieChart from '@/components/MyAccount/Dashboard/PieChart';
import { useEffect } from 'react';

interface PerformanceGraphProps {
  performance_count: number | null;
  mfpaData: MfpaDataItem[];
  isPending: boolean;
  total_funds: number
  outPerformingFunds: number | null
}

const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ performance_count, isPending, mfpaData, total_funds, outPerformingFunds }) => {

  const validPercentagesCount = mfpaData.filter(data => data.percentage !== 0 && data.percentage !== null).length;
  const isPercentageSignificant = validPercentagesCount >= 2;
  const totalPercentage = mfpaData.reduce((acc, curr) => acc + (curr.percentage ?? 0), 0)
  const doughnutPercentageValues = mfpaData.map(data => (data.percentage) ?? 0);
  const doughnutThirdYearValues = mfpaData?.[0]?.threeYear;
  const doughnutAmountValues = mfpaData.map(data => (data.amount) ?? 0)
  const doughnutValue = {
    color: totalPercentage === 0 ? ["#7393B3"] : ['#dc2626', '#eab308', '#22c55e'],
    labels: ["Under Performing", "Average Performing", "Out Performing"],
    values: totalPercentage === 0 ? [100] : doughnutPercentageValues,
  };

  const totalMissedGains = mfpaData?.reduce((acc, fund) => acc + (fund.title === "Outperformer" ? 0 : fund.threeYear), 0);

  const [underPerforming, averagePerforming, overPerforming] = doughnutPercentageValues;

  let insightText = '';
  if (underPerforming > 20) {
    insightText = `${Math.round((underPerforming * 100) * 10) / 10}% of your mutual fund portfolio is underperforming.`;
  } else if (underPerforming + averagePerforming > 20) {
    insightText = `${Math.round(((underPerforming + averagePerforming) * 100) * 10) / 10}% of your MF portfolio is either underperforming or average performing.`;
  } else {
    insightText = `Your portfolio is in great shape! ${Math.round((overPerforming * 100) * 10) / 10}% of your mutual fund portfolio is outperforming.`;
  }


  const missedGains = doughnutThirdYearValues.toFixed(0);

  const actionItems: string[] = [];

  if ((underPerforming + averagePerforming) * 100 > 20) {
    actionItems.push("Review your funds and consider selling some of your underperforming or average performing funds in line with your investment strategy and tax efficiency on capital gains.");
    actionItems.push("You should contact your finance partner immediately to learn what changes to make in your portfolio so that your portfolio can give you better returns.");
  }

  if (total_funds > 10) {
    actionItems.push("You should consider consolidating your portfolio by reducing the number of funds in your portfolio as your portfolio is overdiversified as of now.");
  }

  if (total_funds > 20) {
    insightText += ` You have ${total_funds} funds in your portfolio, which is too many for your portfolio size.`;
  }

  if (outPerformingFunds && outPerformingFunds >= (Math.round((80 / 100) * total_funds))) {
    actionItems.push("Congrats! You are doing a good job at managing your investments.");
  }

  useEffect(() => {
    console.log('actionItems', actionItems, underPerforming + averagePerforming, total_funds)
  })

  return (
    <div className="flex gap-12 flex-col sm:flex-row">
      <div className="w-full flex flex-col items-center">
        <h1 className='font-bold text-[#035782] w-full pb-4 flex gap-2 items-center text-xl'>
          Performance
          <div className='relative group'>
            <MdInfoOutline className='text-2xl' />
            <div className='hide ease-in-out hidden group-hover:block w-0 h-0 border-t-[15px] border-b-[15px] border-r-[15px] border-t-transparent border-b-transparent border-r-teal-500 absolute -top-1 left-6'></div>
            <div className='hide ease-in-out hidden group-hover:block font-normal w-[350px] text-base text-white absolute left-10 -top-[4px] z-50'>
              <div className='w-full h-full p-4 relative bg-teal-500 rounded-lg rounded-tl-[4px]'>
                Overview of how your mutual funds are performing compared to the category average of the respective funds
              </div>
            </div>
          </div>
        </h1>
        <div className='relative w-[40%]'>
          <div className='z-10 relative'>
            <PieChart colors={doughnutValue.color} labels={doughnutValue.labels} values={doughnutValue.values} />
          </div>
          <div className='flex flex-col items-center font-bold text-lg absolute inset-0 justify-center z-0'>
            <div className='text-xl text-[#035782] rounded-full aspect-square flex items-center justify-center p-2 shadow-md bg-[#E7F9F2]'>
              {performance_count === null ? 0 : Math.round((overPerforming * 100) * 10) / 10 >= 100 ? 100 : performance_count}/100
            </div>
          </div>
        </div>
      </div>
      <div className="w-full space-y-8">
        <Card title="Insights">
          <CardItem text={insightText} />
          <CardItem text={`You are missing ₹ ${parseFloat(totalMissedGains?.toFixed(0))?.toLocaleString('en-IN')} of additional gains per year from your investments due to underperforming investments.`} />
          <CardItem text={`You have ${total_funds} funds in your portfolio${total_funds > 20 ? " , which is too many funds for your portfolio size." : '.'} `} />
        </Card>
        <Card title="Action Items">
          {actionItems.map((item, index) => (
            <CardItem key={index} text={item} />
          ))}
        </Card>
      </div>
    </div>
  );
}

export default PerformanceGraph;
