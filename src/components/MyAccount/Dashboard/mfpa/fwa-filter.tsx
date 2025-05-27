'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TfiReload } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";

interface FWAFilterProps {
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  onApplyFilters: () => void;
  setPerformanceFilter: Dispatch<SetStateAction<string[]>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  performanceFilter: string[];
  sortBy: string;
}

const FWAFilter: React.FC<FWAFilterProps> = ({
  setIsFilterOpen,
  onApplyFilters,
  setPerformanceFilter,
  setSortBy,
  performanceFilter,
  sortBy,
}) => {
  const [performance, setPerformance] = useState<string[]>([]);
  const [localSortBy, setLocalSortBy] = useState<string>('');

  useEffect(() => {
    setPerformance(performanceFilter);
    setLocalSortBy(sortBy);
  }, [performanceFilter, sortBy]);

  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setList(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  const handleSortBy = (value: string) => {
    setLocalSortBy(value);
  };

  const handleApplyFilters = () => {
    setPerformanceFilter(performance);
    setSortBy(localSortBy);
    setIsFilterOpen(false);
  };

  return (
    <div className="space-y-4 border rounded-lg">
      <div className='flex gap-2 items-center justify-between px-4 border-b py-2'>
        <div className='flex gap-2 items-center text-lg font-semibold'>Filter <TfiReload className='hover:cursor-pointer' onClick={() => { setPerformance([]) }} /></div>
        <button className='text-2xl' onClick={() => setIsFilterOpen(prev => !prev)}><IoClose /></button>
      </div>
      <div className='px-4'>
        <h3 className="text-base font-semibold">Performance</h3>
        <div className="flex flex-wrap gap-2 mt-2 text-sm ">
          {['Under Performing', 'Average Performing', 'Out Performing'].map(item => (
            <button
              key={item}
              className={`px-3 py-1 border rounded-full  ${performance.includes(item) ? 'bg-blue-500 text-white' : 'border-gray-300'
                }`}
              onClick={() => handleToggle(performance, setPerformance, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* <div className='px-4'>
        <h3 className="text-base font-semibold">Asset Class</h3>
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          {['Equity', 'Debt', 'Hybrid', 'Others'].map(item => (
            <button
              key={item}
              className={`px-3 py-1 border rounded-full ${
                assetClass.includes(item) ? 'bg-blue-500 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleToggle(assetClass, setAssetClass, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div> */}

      <div>
        <h3 className="text-base font-semibold border-t border-b py-2 px-4 flex gap-2 items-center">Sort By <TfiReload className='hover:cursor-pointer' onClick={() => { setLocalSortBy('') }} /></h3>
        <div className="flex flex-wrap gap-2 mt-2 text-sm px-4">
          {[
            'Fund Name (A - Z)',
            'Current Value',
            'Annual Missed Gains',
            'Fund Performance',
            // 'Asset Class',
            // 'Risk & Volatility',
          ].map(item => (
            <button
              key={item}
              className={`px-3 py-1 border rounded-full ${localSortBy === item ? 'bg-blue-500 text-white' : 'border-gray-300'
                }`}
              onClick={() => handleSortBy(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className='px-4 py-2 border-t'>
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-full text-sm z-10 relative"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FWAFilter;
