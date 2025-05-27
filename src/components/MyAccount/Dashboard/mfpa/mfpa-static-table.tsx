'use client';

import React from 'react';

export interface MfpaDataItem {
  title: string;
  amount: number;
  percentage: number | null;
  oneYear: number;
  twoYear: number;
  threeYear: number;
}

export const formatIndianNumber = (num: number) => {
  return num?.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

export interface MutualFundTableProps {
  mfpaData: MfpaDataItem[];
  isPending: boolean;
}

const MutualFundTable: React.FC<MutualFundTableProps> = ({ mfpaData, isPending }) => {
  const totalCurrentValue = mfpaData?.reduce((acc, fund) => acc + fund.amount, 0);
  const totalMissedGains = mfpaData?.reduce((acc, fund) =>acc + (fund.title === "Outperformer" ? 0 : fund.threeYear), 0);
  const totalPercentage = mfpaData?.reduce((acc, fund) => acc + (fund.percentage ?? 0), 0);

  return (
    <div className="mx-auto my-8 p-4 md:p-8 bg-white rounded-xl shadow-[#60a1c2] shadow-md">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Mutual Fund Performance Analysis</h2>
      <table className="w-full text-left border-collapse text-sm md:text-base">
        <thead>
          <tr className='text-xs md:text-sm'>
            <th className="border-b-2 py-2 font-semibold border-gray-500 whitespace-normal w-1/3 md:w-1/4">Fund Performance</th>
            <th className="border-b-2 py-2 font-semibold border-gray-500 text-right w-1/3 md:w-1/4">
              <span className='whitespace-nowrap text-left'>
                Current Value
                <span className='md:hidden'> | </span>
              </span>
              <div className='md:hidden'>% of Portfolio</div>
            </th>
            <th className="border-b-2 py-2 font-semibold border-gray-500 text-right w-1/3 md:w-1/4">Missed Gains <span>&#40;3-yr avg.&#41;</span></th>
            <th className="border-b-2 py-2 font-semibold border-gray-500 text-right hidden-value w-1/3 md:w-1/4">% of Mutual Fund Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {mfpaData.map((fund, index) => (
            <tr key={index} className={`border-b font-normal text-sm text-[#232323]`} >
              <td className="py-2 flex items-center text-left w-full">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0 ${fund.title === 'Underperformer'
                    ? 'bg-red-500'
                    : fund.title === 'Average'
                      ? 'bg-yellow-500'
                      : 'bg-teal-500'
                    }`}
                ></span>
                {fund.title === "Underperformer"
                  ? "Under Performing"
                  : fund.title === "Average"
                    ? "Average Performing"
                    : "Out Performing"
                }
              </td>
              <td className="py-2 text-right">
                <span className="hidden md:inline">₹ {parseFloat(fund.amount?.toFixed(0))?.toLocaleString('en-IN')}</span>
                <span className="md:hidden whitespace-nowrap">₹ {parseFloat(fund.amount?.toFixed(0))?.toLocaleString('en-IN')} | {fund.percentage === null ? "0.00" : (fund.percentage * 100)?.toFixed(1)}%</span>
              </td>
              <td className="py-2 text-right">
              <span className="hidden md:inline">₹ {fund.title === 'Outperformer' ? 0 : parseFloat((fund.threeYear)?.toFixed(0))?.toLocaleString('en-IN')}</span>
              <span className="md:hidden">₹ {fund.title === 'Outperformer' ? 0 : parseFloat((fund.threeYear)?.toFixed(0))?.toLocaleString('en-IN')}</span>
              </td>
              <td className="py-2 text-right hidden-value">
                {fund.percentage === null ? "0.00" : (fund.percentage * 100)?.toFixed(1)}%
              </td>
            </tr>
          ))
          }
          <tr className="font-medium text-base md:font-bold border-t-2 text-[#232323] border-gray-500">
            <td className="py-2 w-1/3 md:w-1/4">Total</td>
            <td className="py-2 text-right whitespace-nowrap hidden-value w-1/3 md:w-1/4">₹ {parseFloat(totalCurrentValue?.toFixed(0))?.toLocaleString('en-IN')}</td>
            <td className="py-2 text-right whitespace-nowrap md:hidden w-1/3 md:w-1/4">₹ {parseFloat(totalCurrentValue?.toFixed(0))?.toLocaleString('en-IN')} | {(totalPercentage * 100)?.toFixed(1)}%</td>
            <td className="py-2 text-right whitespace-nowrap hidden-value w-1/3 md:w-1/4">₹ {parseFloat(totalMissedGains?.toFixed(0))?.toLocaleString('en-IN')}</td>
            <td className="py-2 text-right whitespace-nowrap md:hidden w-1/3 md:w-1/4">₹ {parseFloat(totalMissedGains?.toFixed(0))?.toLocaleString('en-IN')}</td>
            <td className="py-2 text-right hidden-value w-1/3 md:w-1/4">{(totalPercentage * 100)?.toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MutualFundTable;
