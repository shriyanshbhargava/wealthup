"use client"

import "react-datepicker/dist/react-datepicker.css";

import React, { ChangeEvent, FocusEvent, useState } from 'react'

import Caution from "@/assets/icons/Caution.svg"
import DatePicker from "react-datepicker";
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Goal } from '@/app/myaccount/goals/page';
import Image from 'next/image'
import Storage from '@/utils/storage';
import { apiUrl } from '@/utils/constants';
import carIcon from "@/assets/goal/car.svg";
import customIcon from "@/assets/goal/custom.svg";
import deleteIcon from "@/assets/icons/deleteIcon.svg"
import editIcon from "@/assets/icons/editIcon.svg"
import educationIcon from "@/assets/goal/education.svg";
import homeIcon from "@/assets/goal/home.svg";
import likeIcon from "@/assets/icons/likeIcon.svg"
import retireIcon from "@/assets/goal/retire.svg";
import saveIcon from "@/assets/icons/saveIcon.svg"
import travelIcon from "@/assets/icons/travelIcon.svg"

interface GoalData {
    icon: any,
    currentValue: number,
    projectedValue: number,
    targetValue: number,
    goalName: string,
    timeLeft: string
}

interface UpdatedGoal {
    target_amount?: number;
    target_date?: string;
    investments_allocated?: number;
    sip_allocated?: number;
}

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
};


const GoalCard = ({ goal,
    isExpanded,
    toggleExpand,
    handleDone
}: {
    goal: Goal;
    isExpanded: boolean;
    toggleExpand: () => void;
    handleDone: () => void;
}) => {
    const [showTable, setShowTable] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(goal.target_date ? new Date(goal.target_date) : null);
    const [isLoading, setIsLoading] = useState(false)
    const projectedPercentage = Math.round((goal?.total_projected_amount / goal?.target_amount) * 100).toFixed(0)
    const currentPercentage = Math.round((goal?.total_investment_allocated / goal?.target_amount) * 100).toFixed(0)
    const differenceInProjectAndCurrent = (parseFloat(projectedPercentage) - parseFloat(currentPercentage));
    const tokenData = Storage.getToken();
    const access_token = tokenData?.access_token;
    const [targetAmount, setTargetAmount] = useState(goal?.target_amount || 0);
    const [targetAmountDisplay, setTargetAmountDisplay] = useState(formatCurrency(goal?.target_amount || 0));
    const [investmentsAllocated, setInvestmentsAllocated] = useState(goal?.total_investment_allocated || 0);
    const [investmentsAllocatedDisplay, setInvestmentsAllocatedDisplay] = useState(formatCurrency(goal?.total_investment_allocated || 0));
    const [sipAllocated, setSipAllocated] = useState(goal?.total_sip_allocated || 0);
    const [sipAllocatedDisplay, setSipAllocatedDisplay] = useState(formatCurrency(goal?.total_sip_allocated || 0));

    const [isEdit, setEdit] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleInputChange = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        setDisplay: React.Dispatch<React.SetStateAction<string>>
    ) => (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = Number(e.target.value.replace(/[^0-9]/g, ''));
        if (!isNaN(numericValue)) {
            setter(numericValue);
            setDisplay(formatCurrency(numericValue));
        }
    };

    const handleBlur = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        setDisplay: React.Dispatch<React.SetStateAction<string>>,
        value: number
    ) => (e: FocusEvent<HTMLInputElement>) => {
        setDisplay(formatCurrency(value));
    };

    const handleFocus = (
        setDisplay: React.Dispatch<React.SetStateAction<string>>,
        value: number
    ) => (e: FocusEvent<HTMLInputElement>) => {
        setDisplay(formatCurrency(Number(value.toString())));
    };


    const formatValue = (value: number): string => {
        const formatWithSuffix = (val: number, suffix: string): string => {
            const formatted = (val).toFixed(1);
            return parseFloat(formatted).toString() + suffix; // Removes trailing ".0"
        };

        if (value >= 10000000) {
            return formatWithSuffix(value / 10000000, "Cr");
        } else if (value >= 100000) {
            return formatWithSuffix(value / 100000, "L");
        } else if (value >= 1000) {
            return formatWithSuffix(value / 1000, "K");
        }
        return value.toString();
    };


    const handleDelete = async () => {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/api/v1/goals/${goal?._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
        });
        if (res.ok) {
            handleDone();
        } else {
            console.error('Failed to delete the goal');
        }
        setIsLoading(false);
    };


    const handleUpdate = async () => {
        setIsLoading(true);
        setEdit(false)

        const updatedData: UpdatedGoal = {};

        const currentTargetAmount = Number(goal?.target_amount);

        if (currentTargetAmount !== Number(targetAmount)) {
            updatedData.target_amount = Number(targetAmount);
        }
        if (startDate && startDate.toISOString().slice(0, 7) !== goal.target_date) {
            updatedData.target_date = startDate.toISOString().slice(0, 7);
        }
        if (goal?.total_investment_allocated !== Number(investmentsAllocated)) {
            updatedData.investments_allocated = Number(investmentsAllocated);
        }
        if (Number(sipAllocated) !== goal?.total_sip_allocated) {
            updatedData.sip_allocated = Number(sipAllocated);
        }

        if (Object.keys(updatedData)?.length === 0) {
            console.log("No changes to update.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${apiUrl}/api/v1/goals/${goal?._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                handleDone();
            } else {
                console.error('Failed to update the goal');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setEdit(!isEdit)
            setIsLoading(false);
        }
    };


    const calculateTimeRemaining = (targetDate?: string | null): string | null => {
        if (!targetDate) return null;

        const target = new Date(targetDate);
        const now = new Date();

        let years = target.getFullYear() - now.getFullYear();
        let months = target.getMonth() - now.getMonth();
        let days = target.getDate() - now.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const parts = [];
        if (years > 0) parts.push(`${years} years`);
        if (months > 0) parts.push(`${months} months`);

        return parts.join(', ');
    };

    const goals = [
        { id: 1, img: retireIcon, text: 'Retire Early' },
        { id: 2, img: carIcon, text: 'Car' },
        { id: 3, img: travelIcon, text: 'Travel' },
        { id: 4, img: educationIcon, text: 'Education' },
        { id: 5, img: homeIcon, text: 'Home' },
        { id: 6, img: customIcon, text: 'Custom' },
    ];

    const getImageById = (id: number) => {
        const goal = goals.find(goal => goal.id === id);
        return goal ? goal.img : null;
    };

    function calculateAdditionalMonths(goal: Goal): number {
        const { total_sip_allocated, total_projected_amount, target_amount, rate, time_left } = goal;

        // Validate inputs
        if (!rate || !total_sip_allocated || !total_projected_amount || !target_amount || rate <= 0) {
            return 0;
        }

        const monthlyRate = rate / 12 / 100; // Convert annual rate to monthly
        const futureValue = target_amount - total_projected_amount; // Shortfall amount

        if (futureValue <= 0) {
            // No shortfall, no additional months required
            return 0;
        }

        // Calculate additional months needed
        const rawAdditionalMonths = Math.log(1 + (futureValue * monthlyRate) / total_sip_allocated) / Math.log(1 + monthlyRate);

        // Round up to the nearest whole number
        const additionalMonths = Math.ceil(rawAdditionalMonths);

        // Subtract time left, ensure non-negative result
        const remainingMonths = Math.max(additionalMonths - (time_left || 0), 0);
        if (remainingMonths >= 0) {
            return remainingMonths;
        } else {
            return 0;
        }
    }

    // Round shortfall amount to nearest 1000
    const shortfallAmountValue = Math.round(Number(goal?.shortfall_amount?.sip) / 1000) * 1000
    // Round lumpsum amount to nearest 1000 (NEW)
    const lumpsumAmountValue = Math.round(Number(goal?.shortfall_amount?.lumpsum) / 1000) * 1000

    return (
        <>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-32" >
                        <div className="loader"></div>
                    </div >
                ) : (
                    <div className={`flex flex-col gap-8 bg-white rounded-2xl p-4 border border-[#035782] w-full ${!isEdit ? 'hover:cursor-pointer' : ''} ${isExpanded ? 'shadow-md' : ''}`} onClick={!isEdit ? toggleExpand : undefined}>
                        <div className={`flex flex-col gap-4 w-full justify-between ${isEdit ? "" : ""}`}>
                            <div className='flex gap-4'>
                                <div className='rounded-full h-20 w-24 xl:h-32 xl:w-36 flex justify-center items-center bg-[#F6F5F5]'>
                                    <div className='relative h-14 xl:h-20 w-14 xl:w-20 flex justify-start items-start'>
                                        <Image
                                            src={getImageById(goal?.goal_image ?? 5)}
                                            alt={goal?.name || 'Goal'}
                                            fill
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between w-10/12'>
                                    <div className='flex justify-between items-start'>
                                        <p className='m-0 text-base sm:text-xl font-semibold whitespace-nowrap text-black'>{goal?.name}</p>
                                        {<div className='flex flex-col gap-1 items-end w-full'>
                                            <div className='flex items-center'>
                                                <button className='relative h-6 w-6'>
                                                    {goal?.total_projected_amount < goal?.target_amount ?
                                                        <Image src={Caution} alt='' fill />
                                                        :
                                                        <Image src={likeIcon} alt='' fill />
                                                    }
                                                </button>
                                            </div>
                                            <p className='m-0 whitespace-nowrap text-[10px] sm:text-sm text-black'>
                                                Time left: {calculateTimeRemaining(goal?.target_date)}
                                            </p>
                                        </div>}
                                    </div>
                                    {showDeleteConfirmation && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                                                <h3 className="text-lg font-semibold">Are you sure you want to delete this goal?</h3>
                                                <div className="flex justify-center gap-4 mt-4">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(); setShowDeleteConfirmation(false); }}
                                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                                    >
                                                        Yes, Delete
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setShowDeleteConfirmation(false); }}
                                                        className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!isEdit && <div className='flex flex-col w-full gap-1 mt-1'>
                                        <p className='text-[10px] sm:text-sm text-black m-0 text-right'>{formatValue(goal?.target_amount)}</p>
                                        <div className='w-full bg-white border border-[#B5B5B5] h-4 rounded-lg relative'>
                                            <div
                                                className='absolute left-0 top-0 h-full bg-[#B5B5B5] rounded-lg'
                                                style={{ width: `${Math.min(Number(projectedPercentage), 100)}%` }}
                                            ></div>
                                            <div
                                                className='absolute left-0 top-0 h-full bg-[#01C8A9] rounded-lg'
                                                style={{ width: `${Math.min(Number(currentPercentage), 100)}%` }}
                                            ></div>
                                        </div>

                                        <div className='flex w-full'>
                                            <p className='text-right text-black text-[10px] sm:text-sm m-0 p-0' style={{ width: `${currentPercentage}%` }}>{formatValue(goal?.total_investment_allocated)}</p>
                                            {goal?.total_projected_amount !== goal?.target_amount && <p className='text-right text-black text-[10px] sm:text-sm m-0' style={{ width: `${differenceInProjectAndCurrent}%` }}>{formatValue(goal?.total_projected_amount)}</p>}
                                        </div>
                                    </div>}
                                    <div className="flex justify-end items-center mt-1">
                                        <button 
                                            className="text-center mr-2 text-base flex items-center"
                                            onClick={(e) => {e.stopPropagation(); isEdit ? handleUpdate() : setEdit(!isEdit)}}
                                        >
                                            {!isEdit ? "Edit" : "Save"}
                                        </button>
                                        <button
                                            className="flex items-center gap-2"
                                            onClick={(e) => {e.stopPropagation(); isEdit ? handleUpdate() : setEdit(!isEdit)}}
                                        >
                                            <span className="relative h-5 w-5 flex items-center">
                                                <Image src={isEdit ? saveIcon : editIcon} alt="edit-icon" fill />
                                            </span>
                                            <span className="text-black font-medium text-lg"></span>
                                        </button>
                                        <button
                                            className="flex items-center justify-center relative h-6 w-6 ml-2"
                                            onClick={(e) => {e.stopPropagation(); setShowDeleteConfirmation(true)}}
                                        >
                                            <Image src={deleteIcon} alt="delete-icon" fill />
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {isEdit && (
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 w-full mt-4'>
                                    <div className='flex flex-col'>
                                        <label className='text-gray-700 text-sm mb-1'>Target Amount</label>
                                        <input
                                            type='text'
                                            className='p-2 border border-[#D9D9D9] rounded-md text-black text-sm w-full h-9 placeholder-gray-500'
                                            placeholder='Enter target amount'
                                            value={targetAmountDisplay}
                                            onChange={handleInputChange(setTargetAmount, setTargetAmountDisplay)}
                                            onFocus={handleFocus(setTargetAmountDisplay, targetAmount)}
                                            onBlur={handleBlur(setTargetAmount, setTargetAmountDisplay, targetAmount)}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='text-gray-700 text-sm mb-1'>Due Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            placeholderText="Select due date"
                                            customInput={
                                                <div className='p-2 border border-[#D9D9D9] rounded-md text-black text-sm w-full h-9 placeholder-gray-500 flex items-center'>
                                                    {startDate
                                                        ? startDate.toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })
                                                        : "mm-yyyy"}
                                                </div>
                                            }
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='text-gray-700 text-sm mb-1'>Investments Allocated</label>
                                        <input
                                            type='text'
                                            className='p-2 border border-[#D9D9D9] rounded-md text-black text-sm w-full h-9 placeholder-gray-500'
                                            placeholder='Enter allocated investments'
                                            value={investmentsAllocatedDisplay}
                                            onChange={handleInputChange(setInvestmentsAllocated, setInvestmentsAllocatedDisplay)}
                                            onFocus={handleFocus(setInvestmentsAllocatedDisplay, investmentsAllocated)}
                                            onBlur={handleBlur(setInvestmentsAllocated, setInvestmentsAllocatedDisplay, investmentsAllocated)}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='text-gray-700 text-sm mb-1'>SIP Allocated</label>
                                        <input
                                            type='text'
                                            className='p-2 border border-[#D9D9D9] rounded-md text-black text-sm w-full h-9 placeholder-gray-500'
                                            placeholder='Enter SIP allocation'
                                            value={sipAllocatedDisplay}
                                            onChange={handleInputChange(setSipAllocated, setSipAllocatedDisplay)}
                                            onFocus={handleFocus(setSipAllocatedDisplay, sipAllocated)}
                                            onBlur={handleBlur(setSipAllocated, setSipAllocatedDisplay, sipAllocated)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {isExpanded && !isEdit &&
                            <div className='flex flex-col gap-4 transition-all duration-300 ease-in-out'>
                                <table className='w-full border-none border-transparent'>
                                    <thead>
                                        <tr className='border-b border-[#748484]'>
                                            <th className='text-[#232323] w-1/3 text-right text-[10px] xsm:text-sm sm:text-base pb-2'>Current Value</th>
                                            <th className='text-[#232323] w-1/3 text-right text-[10px] xsm:text-sm sm:text-base pb-2'>Monthly Investments</th>
                                            <th className='text-[#232323] w-1/3 text-right text-[10px] xsm:text-sm sm:text-base pb-2'>Projected Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b border-[#748484]'>
                                            <td className='text-[#232323] w-1/3 text-right text-sm font-semibold py-3'>
                                                {(goal?.total_investment_allocated)?.toLocaleString('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </td>
                                            <td className='text-[#232323] w-1/3 text-right text-sm font-semibold py-3'>
                                                {(goal?.total_sip_allocated)?.toLocaleString('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </td>
                                            <td className='text-[#232323] w-1/3 text-right text-sm font-semibold py-3'>
                                                {(goal?.total_projected_amount)?.toLocaleString('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {goal?.total_projected_amount < goal?.target_amount ? (
                                    <div className='flex gap-2 bg-red-50 p-3 rounded-lg'>
                                        <div className='flex gap-2 items-start'>
                                            <ExclamationTriangleIcon className='min-h-[24px] sm:min-h-[32px] min-w-[24px] sm:min-w-[32px] text-[#DA2B2B] mt-0.5' />
                                            <p className='m-0 flex-grow text-black text-xs sm:text-sm'>
                                                To reach your goal on time, increase your SIP by&nbsp;
                                                {shortfallAmountValue?.toLocaleString('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}
                                                &nbsp;
                                                or invest a lump sum of&nbsp;
                                                {lumpsumAmountValue?.toLocaleString('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })}.
                                                Else you will need {calculateAdditionalMonths(goal)} additional months to reach your goal.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex gap-2 items-center bg-green-50 p-3 rounded-lg'>
                                        <button className='relative h-6 w-6'>
                                            <Image src={likeIcon} alt='' fill />
                                        </button>
                                        <p className='m-0 flex-grow text-black text-xs sm:text-sm'>Congrats! You are well prepared to meet your goal.</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                )
            }
        </>
    )
}

export default GoalCard