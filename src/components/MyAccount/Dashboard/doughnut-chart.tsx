import { Investment, InvoiceDiscountingData, MutualFund } from '@/../src/components/MyAccount/Dashboard/investment-table';
import React, { useEffect, useState } from 'react';

import Button from '@/components/ui/ButtonNew';
import DoughnutComponent from './doughnut';
import { MdInfoOutline } from 'react-icons/md';
import PieChart from '@/components/MyAccount/Dashboard/PieChart';
import { UploadModal } from '@/components/MyAccount/Portfolio/components/UploadModal';
import { formatIndianNumber } from '@/components/MyAccount/Dashboard/mfpa/mfpa-static-table';

interface ChartProps {
  totalCurrent: number
  mutualFunds: MutualFund[]
  investmentData: Investment[]
  invoiceDiscountingData: InvoiceDiscountingData[]
}

const DoughnutChart: React.FC<ChartProps> = ({ totalCurrent = 0, mutualFunds = [], investmentData = [], invoiceDiscountingData = [] }) => {
  // Ensure mutualFunds and investmentData are arrays
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [fetchAgain, setFetchAgain] = useState(false)
  const mutualFundTotal = mutualFunds?.reduce((acc, fund) => acc + fund?.current_amount, 0);
  const invoiceDiscountingTotal = invoiceDiscountingData?.reduce(
    (acc, fund) => acc + (fund?.currentAmount ?? 0),
    0
  );
  const investmentFields = investmentData?.map((item) => item.name);
  const investmentValues = investmentData?.map((item) => item.invested);
  const currentValues = investmentData?.map((item) => item.current);
  const investmentFieldsTotal = investmentData?.reduce((acc, item) => acc + item.invested, 0);
  const currentFieldsTotal = investmentData?.reduce((acc, item) => acc + item.current, 0);

  const totalInvestment = mutualFundTotal + currentFieldsTotal + invoiceDiscountingTotal;
  // Safeguard for division by zero
  const chartLabels = ["Mutual Funds", "Invoice Discounting", ...investmentFields];
  const chartValues = [mutualFundTotal, invoiceDiscountingTotal, ...currentValues];
  const chartPercentages = chartValues?.map(value => (totalInvestment > 0 ? (value / totalInvestment) * 100 : 0));
  const chartLabelsWithPercentages = chartLabels?.map((label, index) => `${label}`);
  const dummyLabels = [
    "Mutual Funds",
    "Gold",
    "Stocks",
    "Leasing Assets"
  ];
  const dummyValues = [
    45.97966930264934,
    10.865665992345516,
    24.07733235250257,
    21.07733235250257
  ];

  const chartPercentagesValue = chartPercentages[0] === 0
    ? dummyValues
    : chartPercentages;

  const chartLabelsWithPercentagesValue = chartPercentages[0] === 0
    ? dummyLabels
    : chartLabelsWithPercentages;


  return (
    <div className="flex gap-12 items-center flex-col sm:flex-row p-4 md:px-8">
      <div className="w-full flex flex-col items-center">
        <h1 className='font-bold text-[#035782] w-full pb-4 flex gap-2 items-center text-xl'>
          Investments
          <div className='relative group'>
            <MdInfoOutline className='text-2xl' />
            <div className='hide ease-in-out hidden group-hover:block w-0 h-0 border-t-[15px] border-b-[15px] border-r-[15px] border-t-transparent border-b-transparent border-r-teal-500 absolute -top-1 left-[22px]'></div>
            <div className='hide ease-in-out hidden group-hover:block font-normal w-[350px] text-base text-white absolute left-10 -top-[4px] z-50'>
              <div className='w-full h-full p-4 relative bg-teal-500 rounded-lg rounded-tl-[4px]'>
                Details of all your investments across types of assets and from all platforms
              </div>
            </div>
          </div>
        </h1>
        <div className='relative w-[40%]'>
          <div className='relative' style={{ zIndex: 11 }}>
            {/* <DoughnutComponent
              color={['#39cef3', '#035782', '#01C8A9', '#2e87b9', '#38b8e5', '#0482a0', '#02b097', '#2578a4', '#4fcfe2', '#02648c', '#00bca0']}
              labels={chartLabelsWithPercentages}
              values={chartPercentages}
              gap={true}
              isPercentageSignificant={false}
              amounts={chartValues}
            /> */}
            <PieChart labels={chartLabelsWithPercentagesValue} values={chartPercentagesValue} colors={['#39cef3', '#035782', '#01C8A9', '#2e87b9', '#38b8e5', '#0482a0', '#02b097', '#2578a4', '#4fcfe2', '#02648c', '#00bca0']} />
          </div>
          {Number(formatIndianNumber(totalCurrent)) != 0 ?
            <div className='flex flex-col items-center font-bold text-lg absolute inset-0 justify-center z-0'>
              <span>Total</span>
              <span>₹ {formatIndianNumber(totalCurrent)}</span>
            </div>
            :
            <div className='flex flex-col items-center font-bold text-lg absolute inset-0 justify-center' style={{ zIndex: 20 }}>
              <Button size='small' padding={'p-2 max-w-fit'} boxShadow={true} onClick={() => setShowCaseModal(true)}>
                <span className='text-xs md:text-base px-2 md:px-8 text-center flex items-center font-medium'>Fetch Mutual<br />Fund Details</span>
              </Button>
            </div>
          }
        </div>
      </div>
      <div className="w-full space-y-4 mt-8">
        <Card title="How Do I Use This Tool?">
          <div className='space-y-4 text-[#035782] font-medium'>
            <div>Enter your investment details to simplify financial management by getting a complete view of all your investments in one place.</div>
            <div>Monitor performance, track progress and make informed decisions without switching between multiple platforms or accounts.</div>
          </div>
        </Card>
      </div>
      <UploadModal setFetchAgain={setFetchAgain} open={showCaseModal} onClose={() => setShowCaseModal(false)} />

    </div>
  );
};

export default DoughnutChart;


interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[#60a1c2] shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <div className="font-bold text-[#035782] text-lg">{title}</div>
      </div>
      {children}
    </div>
  );
};

interface CardItemProps {
  text: string;
}

export const CardItem: React.FC<CardItemProps> = ({ text }) => {
  return (
    <div className="flex gap-2 pl-1">
      <div className="w-[5px] h-[5px] bg-[#035782] rounded-full mt-2.5 flex-shrink-0"></div>
      <div className="text-base">{text}</div>
    </div>
  );
};
