import React, { useState } from 'react';
import travelIcon from "@/assets/icons/travelIcon.svg";
import carIcon from "@/assets/icons/carIcon.svg";
import educationIcon from "@/assets/icons/educationIcon.svg";
import GoalCard from './GoalCard';
import { Goal } from '@/app/myaccount/goals/page';

const Goals = ({ allGoals, availableBalance, handleDone, isLoading }: { allGoals?: Goal[], availableBalance?: number, handleDone: () => void, isLoading: boolean }) => {
  const [expandedGoalId, setExpandedGoalId] = useState<number | null>(null);

  const toggleGoalCard = (goalId: number) => {
    setExpandedGoalId(prevId => (prevId === goalId ? null : goalId));
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='h-5 w-5 rounded-full bg-[#01C8A9]'></div>
          <p className='m-0 text-black text-xs xl:text-lg font-medium'>Current Value</p>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='h-5 w-5 rounded-full bg-[#B5B5B5]'></div>
          <p className='m-0 text-black text-xs xl:text-lg font-medium'>Projected Value</p>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='h-5 w-5 rounded-full bg-white border border-[#B5B5B5]'></div>
          <p className='m-0 text-black text-xs xl:text-lg font-medium'>Target Value</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader"></div>
        </div>
      ) : (
        allGoals && allGoals?.length >= 1 ?
          allGoals?.map((goal, index) => (
            <GoalCard
              key={index}
              goal={goal}
              isExpanded={expandedGoalId === index}
              toggleExpand={() => toggleGoalCard(index)}
              handleDone={handleDone}
            />
          ))
          :
          <div className='w-full text-center'>
            Start adding your goals to track your future
          </div>
      )}
    </div>
  );
}

export default Goals;
