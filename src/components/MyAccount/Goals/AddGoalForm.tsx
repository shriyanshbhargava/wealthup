"use client";

import "react-datepicker/dist/react-datepicker.css";

import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import Button from "@/components/ui/ButtonNew";
import DatePicker from "react-datepicker";
import Image from "next/image";
import Storage from '@/utils/storage';
import { apiUrl } from '@/utils/constants';
import calendarIcon from "@/assets/icons/calendarIcon.svg";
import carIcon from "@/assets/goal/car.svg";
import customIcon from "@/assets/goal/custom.svg";
import educationIcon from "@/assets/goal/education.svg";
import homeIcon from "@/assets/goal/home.svg";
import retireIcon from "@/assets/goal/retire.svg";
import travelIcon from "@/assets/goal/travel.svg";

export interface IGoalData {
    target_amount: number
    target_date: string
    name: string
    investments_allocated: number
    sip_allocated: number
    goal_image: number
}


const AddGoalForm = ({ onClose, handleDone, availableBalance, selectedGoal }: { onClose: () => void, handleDone: () => void, availableBalance?: number, selectedGoal: string, goal_image?: number }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [goalValue, setGoalValue] = useState<string>(selectedGoal);
    const [targetAmtValue, setTargetAmtValue] = useState<string>('');
    const [invAllocatedValue, setInvAllocatedValue] = useState<string>('');
    const [sipAllocatedValue, setSipAllocatedValue] = useState<string>('');
    const [invAllocatedError, setInvAllocatedError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const avlBalance = availableBalance || 0
    const tokenData = Storage.getToken();
    const access_token = tokenData?.access_token;

    const goals = [
        { id: 1, img: retireIcon, text: 'Retire Early' },
        { id: 2, img: carIcon, text: 'Car' },
        { id: 3, img: travelIcon, text: 'Travel' },
        { id: 4, img: educationIcon, text: 'Education' },
        { id: 5, img: homeIcon, text: 'Home' },
        { id: 6, img: customIcon, text: 'Custom' },
    ];

    const selectedGoalObj = goals.find(goal => goal.text === goalValue);
    const goal_image = selectedGoalObj?.id;


    const addGoal = async () => {
        setIsLoading(true);
        const data: IGoalData = {
            target_amount: Number(targetAmtValue),
            target_date: startDate ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}` : '',
            name: goalValue,
            investments_allocated: Number(invAllocatedValue),
            sip_allocated: Number(sipAllocatedValue),
            goal_image: goal_image || 5,
        };

        const res = await fetch(`${apiUrl}/api/v1/goals/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(data),
        });
        handleDone();
        setIsLoading(false);

    }


    const handleGoalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value?.length <= 20) {
            setGoalValue(value);
        }
    };

    const formatToINR = (value: string) => {
        const number = Number(value.replace(/[^0-9]/g, ''));
        if (isNaN(number)) return '';
        return `₹ ${number.toLocaleString('en-IN')}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value?.length <= 8) {
            if (setState === setInvAllocatedValue && Number(value) > Number(availableBalance)) {
                setInvAllocatedError('Investments allocated cannot be greater than the available balance.');
                return;
            }
            setInvAllocatedError('');
            setState(value);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-[80vh] sm:h-screen">
            <div className="bg-[#035782] py-8 px-4 sm:px-12 rounded-xl relative flex flex-col gap-8 items-center w-11/12 max-w-[650px]">
                <button onClick={onClose} className="absolute right-8 top-6">
                    <CrossCircledIcon className="text-white font-bold h-10 w-10" />
                </button>
                <p className="text-2xl font-semibold text-white mt-8">
                    Enter Goal Details
                </p>
                <form className="flex flex-col gap-6 w-full items-center">
                    <div className="bg-white rounded-md flex px-2 py-2 justify-between items-center gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Goal Name"
                            value={goalValue}
                            onChange={handleGoalValueChange}
                            className="placeholder:text-[#B5B5B5] xsm:font-medium px-0 xsm:px-2 outline-none border-none flex-grow text-lg placeholder:text-lg text-black"
                        />
                        <div className="flex flex-col items-end">
                            <p className="text-[#B5B5B5] text-[10px] xsm:text-xs m-0 font-semibold">
                                {goalValue?.length}/20
                            </p>
                            <p className="text-[#B5B5B5] text-[10px] xsm:text-xs m-0 font-semibold text-nowrap">
                                Max. 20 characters
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-md flex px-2 py-3 justify-between items-center gap-2 w-full hover:cursor-pointer">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MM/yyyy"
                            minDate={new Date()}
                            showMonthYearPicker
                            placeholderText="Target Date"
                            customInput={
                                <div className="flex justify-between items-center w-full">
                                    <p className="ml-2 m-0 text-black font-medium text-lg">
                                        {startDate
                                            ? startDate.toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })
                                            : "Target Date"}
                                    </p>
                                    <div className="flex gap-1 items-center">
                                        <div className="relative h-10 w-10">
                                            <Image src={calendarIcon} alt="" fill />
                                        </div>
                                        <ChevronDownIcon className="h-7 w-7 text-[#035782]" />
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="bg-white rounded-md flex px-2 py-3 justify-between items-center gap-2 w-full">
                        <input
                            type="text"
                            value={targetAmtValue ? formatToINR(targetAmtValue) : ''}
                            onChange={(e) => handleInputChange(e, setTargetAmtValue)}
                            placeholder="Target Amount"
                            className="placeholder:text-[#B5B5B5] font-medium px-0 xsm:px-2 outline-none border-none flex-grow text-lg placeholder:text-lg text-black"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-white self-end m-0 text-xs">
                            Available Balance {availableBalance?.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumFractionDigits: 0,
                            })}
                        </p>
                        <input
                            type="text"
                            value={invAllocatedValue ? formatToINR(invAllocatedValue) : ''}
                            onChange={(e) => handleInputChange(e, setInvAllocatedValue)}
                            placeholder="Investments Allocated"
                            className="bg-white w-full rounded-md placeholder:text-[#B5B5B5] px-2 xsm:px-4 py-3 outline-none border-none text-lg placeholder:text-lg font-medium text-black"
                        />
                        {invAllocatedError && (
                            <p className="text-red-500 self-start m-0 text-sm">
                                {invAllocatedError}
                            </p>
                        )}
                    </div>
                    <div className="bg-white rounded-md flex px-2 py-3 justify-between items-center gap-2 w-full">
                        <input
                            type="text"
                            value={sipAllocatedValue ? formatToINR(sipAllocatedValue) : ''}
                            onChange={(e) => handleInputChange(e, setSipAllocatedValue)}
                            placeholder="Monthly SIP invested for this goal"
                            className="placeholder:text-[#B5B5B5] font-medium px-0 xsm:px-2 outline-none border-none flex-grow text-lg placeholder:text-lg text-black"
                        />
                    </div>
                    <Button onClick={addGoal} loading={isLoading}>Add Goal</Button>
                </form>
            </div>
        </div>
    );
};

export default AddGoalForm;
