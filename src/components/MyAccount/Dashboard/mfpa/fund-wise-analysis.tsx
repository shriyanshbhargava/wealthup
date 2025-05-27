'use client';

import React, { useState, useEffect } from 'react';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import FWAFilter from './fwa-filter';
import { UserApi } from '@/api/services/user/UserApi';
import Storage from '@/utils/storage';

interface FundData {
  fund_name: string;
  amount: number;
  relative_performance: string;
  investment_risk: string;
  volatilty_relative_to_market: string;
  oneYear: number;
  twoYear: number;
  threeYear: number;
}

interface ApiResponse {
  funds: FundData[];
}
const performanceSortOrder: { [key: string]: number } = {
  'Outperformer': 1,
  'Average': 2,
  'Underperformer': 3
};

const FundWiseAnalysis: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<FundData[]>([]);
  const [performanceFilter, setPerformanceFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [filteredData, setFilteredData] = useState<FundData[]>([]);


  const fetchData = async () => {
    try {
      const { access_token } = Storage.getToken()!;
      const userApiClient = new UserApi(access_token);
      const res = await userApiClient.getPortfolioAudit();
      if (res.ok) {
        const result: ApiResponse = await res.json();
        const validFunds = result.funds.filter((fund: FundData) => fund.fund_name && fund.fund_name !== "N/A");
        setData(validFunds);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatIndianNumber = (num: number) => {
    return num?.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const formatMobileNumber = (num: number) => {
    return num?.toLocaleString('en-IN').replace(/,/g, ', ');
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let filtered = [...data];

      // Apply Performance Filter
      if (performanceFilter.length > 0) {
        filtered = filtered.filter(fund =>
          performanceFilter.includes(
            fund.relative_performance === "Underperformer"
              ? "Under Performing"
              : fund.relative_performance === "Average"
                ? "Average Performing"
                : "Out Performing"
          )
        );
      }

      // Apply Sorting
      if (sortBy) {
        filtered.sort((a, b) => {
          switch (sortBy) {
            case 'Fund Name (A - Z)':
              return a.fund_name.localeCompare(b.fund_name);
            case 'Current Value':
              return b.amount - a.amount;
            case 'Annual Missed Gains':
              return (b.threeYear ?? 0) - (a.threeYear ?? 0);
            case 'Fund Performance':
              return (
                performanceSortOrder[a.relative_performance] -
                performanceSortOrder[b.relative_performance]
              );
            default:
              return 0;
          }
        });
      }

      setFilteredData(filtered);
    };

    applyFiltersAndSort();
  }, [performanceFilter, sortBy, data]);

  const totalCurrentValue = filteredData.reduce((acc, fund) => acc + fund.amount, 0);
  const totalMissedGains = filteredData?.reduce((acc, fund) => acc + (fund.relative_performance === "Outperformer" ? 0 : fund.threeYear), 0);

  return (
    <div className="mx-auto mt-8 p-4 md:p-8 bg-white rounded-xl shadow-[#60a1c2] shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Fund-wise Analysis</h2>
        <div className='relative'>
          <button
            className="px-4 py-1 text-[#035782] font-semibold border-2 shadow-sm flex gap-2 items-center border-[#1e739e] rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[#1e739e]"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <HiOutlineAdjustmentsHorizontal className='text-2xl text-gray-400' />
            <span className='pt-[2px]'>Filter</span>
          </button>
          {isFilterOpen && (
            <div className="w-[250px] xxsm:w-[270px] xs:w-[340px] xsm:w-[400px] p-6 bg-gray-100 rounded-md shadow-md mb-4 absolute right-0 top-100 mt-2">
              <FWAFilter
                setIsFilterOpen={setIsFilterOpen}
                onApplyFilters={fetchData}
                setPerformanceFilter={setPerformanceFilter}
                setSortBy={setSortBy}
                performanceFilter={performanceFilter}
                sortBy={sortBy}
              />
            </div>
          )}
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className='text-xs border-b-2 border-gray-500 md:text-sm'>
            <th className="py-2 font-semibold w-1/3 md:w-1/4">Fund Name</th>
            <th className="py-2 break-words font-semibold text-right w-1/3 md:w-1/4">Current Value</th>
            <th className="py-2 break-words font-semibold text-right w-1/3 md:w-1/4">Missed Gains (3-yr avg.)</th>
            <th className="py-2 font-semibold text-right hidden md:block w-auto">Fund Performance</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((fund, index) => (
            <React.Fragment key={index}>
              {fund.amount !== 0 && <tr className='border-b font-normal text-sm text-[#232323] text-right'>
                <td className="py-2 text-left max-w-[160px] align-top w-1/3 md:w-1/4">
                  <div className="flex items-center justify-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2  ${fund.relative_performance === 'Underperformer'
                        ? 'bg-red-500'
                        : fund.relative_performance === 'Average'
                          ? 'bg-yellow-500'
                          : 'bg-teal-500'
                        }`}
                    ></span>
                    <span className="flex-1 break-words">{fund.fund_name}</span>
                  </div>
                </td>
                <td className="py-2 align-top w-1/3 md:w-1/4">
                  <span className="hidden md:inline">₹ {formatIndianNumber((fund.amount))}</span>
                  <span className="md:hidden">₹ {formatIndianNumber(fund.amount)}</span>
                </td>
                <td className="py-2 align-top w-1/3 md:w-1/4">
                  <span className="hidden md:inline">₹ {fund.relative_performance === 'Outperformer' ? 0 : parseFloat((fund.threeYear)?.toFixed(0))?.toLocaleString('en-IN')}</span>
                  <span className="md:hidden">₹ {fund.relative_performance === 'Outperformer' ? 0 : parseFloat((fund.threeYear)?.toFixed(0))?.toLocaleString('en-IN')}</span>
                </td>
                <td className="py-2 hidden md:flex items-center justify-end align-top w-auto">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${fund.relative_performance === 'Underperformer'
                      ? 'bg-red-500'
                      : fund.relative_performance === 'Average'
                        ? 'bg-yellow-500'
                        : 'bg-teal-500'
                      }`}
                  ></span>
                  <span className='truncate'>
                    {fund.relative_performance === "Underperformer"
                      ? "Under Performing"
                      : fund.relative_performance === "Average"
                        ? "Average Performing"
                        : "Out Performing"
                    }
                  </span>
                </td>
              </tr>}
            </React.Fragment>
          ))}
          <tr className="font-bold border-t-2 text-gray-700 border-gray-500">
            <td className="py-2 w-1/3 md:w-1/4">Total</td>
            <td className="py-2 text-right align-top w-1/3 md:w-1/4">
              <span className="hidden md:inline">₹ {formatIndianNumber(totalCurrentValue)}</span>
              <span className="md:hidden whitespace-nowrap">₹ {formatIndianNumber(totalCurrentValue)}</span>
            </td>
            <td className="py-2 text-right align-top w-1/3 md:w-1/4">
              <span className="hidden md:inline">₹ {formatIndianNumber(totalMissedGains)}</span>
              <span className="md:hidden">₹ {formatIndianNumber(totalMissedGains)}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FundWiseAnalysis;
