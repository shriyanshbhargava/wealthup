import "react-datepicker/dist/react-datepicker.css";

import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import React, { useReducer, useState } from 'react'

import ReactDatePicker from 'react-datepicker';
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { toast } from 'react-toastify';

const initialState = {
    monthly_expense: undefined,
    monthly_savings: undefined,
    value_of_investments: undefined,
    return_pre_retierment: undefined,
    dob: undefined,
}

const reducer = (state: any, action: any) => {
    switch (action.action) {
        case "update":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export const CalculationTable = ({ setAge }: { setAge: React.Dispatch<React.SetStateAction<number | null>> }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleDateChange = async (date: Date) => {
        dispatch({
            action: "update",
            payload: {
                dob: date.toISOString()
            }
        })

        let fetchData = true;
        const data = { ...state };
        data['dob'] = date
        Object.values(data).forEach(value => {
            if (value === undefined) fetchData = false;
        })

        if (fetchData) {
            const { access_token } = Storage.getToken()!;
            const api = new UserApi(access_token);
            const res: Response = await api.storeRetirementAge(data);

            if (res.ok) {
                const json = await res.json()
                setAge(json.age)
            } else {
                toast.error(await res.json())
            }
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value

        value = parseFloat(value.replace(/,/g, '').replace('%', ''));
        if (isNaN(value)) {
            value = 0
        }

        let percentage = 0

        if (e.target.name === "return_pre_retierment") {
            if (value.toString().length > 2) {
                if (value.toString().includes('.')) {
                    value = parseFloat(value.toString()).toFixed(1) as unknown as number
                } else {
                    value = (parseFloat(value.toString()) / 10).toFixed(1) as unknown as number
                }
            }
            percentage = value
            value = value / 100
        }


        dispatch({
            action: "update",
            payload: {
                [e.target.name]: e.target.name === "return_pre_retierment" ? percentage : value
            }
        })

        let fetchData = true;
        const data = { ...state };
        data[e.target.name] = value
        if (e.target.name !== "return_pre_retierment") {
            data['return_pre_retierment'] = parseFloat(data['return_pre_retierment'].toString().replace(/,/g, '').replace('%', '')) / 100
        }
        Object.values(data).forEach(value => {
            console.log({ value })
            if (value === undefined) fetchData = false;
        })

        if (fetchData) {
            const { access_token } = Storage.getToken()!;
            const api = new UserApi(access_token);
            const res: Response = await api.storeRetirementAge(data);

            if (res.ok) {
                const json = await res.json()
                setAge(json.age)
            } else {
                toast.error(await res.json())
            }
        }
    }

    const handleChangeDropdown = async (dropdownValue: string) => {
        let value = 0.11;

        if (dropdownValue === "conservative") {
            value = 0.10
        } else if (dropdownValue === "agressive") {
            value = 0.12
        }

        dispatch({
            action: "update",
            payload: {
                return_pre_retierment: value * 100
            }
        })

        let fetchData = true;
        const data = state;
        data.return_pre_retierment = value
        Object.values(data).forEach(value => {
            if (value === undefined) fetchData = false;
        })

        if (fetchData) {
            const { access_token } = Storage.getToken()!;
            const api = new UserApi(access_token);
            const res: Response = await api.storeRetirementAge(data);

            if (res.ok) {
                const json = await res.json()
                setAge(json.age)
            } else {
                toast.error(await res.json())
            }
        }
    }

    return (
        <table className='w-full'>
            <thead className='bg-primary-blue text-white'>
                <tr className="">
                    <th className="text-base lg:text-lg p-4 text-left">Factors</th>
                    <th className="text-base lg:text-lg p-4 text-right">Value (in INR)</th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white">
                    <td className="text-base lg:text-lg p-4">Monthly Expense</td>
                    <td className="text-base p-4 text-right">
                        <input type="text" placeholder='Input value' inputMode='numeric' value={indiaFormat(state.monthly_expense)} onChange={handleChange} name="monthly_expense" className="w-[160px] text-base text-right p-2 bg-transparent border text-zinc-800 border-zinc-800 rounded-lg" />
                    </td>
                </tr>
                <tr className="bg-[#00b7b799]">
                    <td className="text-base lg:text-lg p-4">Monthly Savings</td>
                    <td className="text-base p-4 text-right">
                        <input type="text" placeholder='Input value' inputMode='numeric' value={indiaFormat(state.monthly_savings)} onChange={handleChange} name="monthly_savings" className="w-[160px] text-base text-right p-2 bg-transparent border text-zinc-800 border-zinc-800 rounded-lg" />
                    </td>
                </tr>
                <tr className="bg-white">
                    <td className="text-base lg:text-lg p-4">Current Value of Investments</td>
                    <td className="text-base p-4 text-right">
                        <input type="text" placeholder='Input value' inputMode='numeric' value={indiaFormat(state.value_of_investments)} onChange={handleChange} name="value_of_investments" className="w-[160px] text-base text-right p-2 bg-transparent border text-zinc-800 border-zinc-800 rounded-lg" />
                    </td>
                </tr>
                <tr className="bg-[#00b7b799]">
                    <td className="text-base lg:text-lg p-4">Risk Profile</td>
                    <td className="flex justify-end p-4">
                        <div className='w-[160px]'>
                            <Dropdown
                                onChange={handleChangeDropdown}
                                padding={2}
                                marginBottom={0}
                                defaultTitle='Select'
                            >
                                <DropdownItem value="conservative">Conservative</DropdownItem>
                                <DropdownItem value="moderate">Moderate</DropdownItem>
                                <DropdownItem value="agressive">Agressive</DropdownItem>
                            </Dropdown>
                        </div>
                    </td>
                </tr>
                <tr className="bg-white">
                    <td className="text-base lg:text-lg p-4">Expected Return Before Retirement</td>
                    <td className="text-base p-4 text-right">
                        <div className="relative">
                            <input type="text" placeholder='Input value' inputMode='numeric' value={state.return_pre_retierment} onChange={handleChange} name="return_pre_retierment" className="w-[160px] text-base text-right p-2 pr-4 bg-transparent border text-zinc-800 border-zinc-800 rounded-lg" />
                            <span className='absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none'>%</span>
                        </div>
                    </td>
                </tr>
                <tr className="bg-[#00b7b799]">
                    <td className="text-base lg:text-lg p-4">Date of Birth</td>
                    <td className="text-base p-4 text-right">
                        <ReactDatePicker
                            selected={state.dob && new Date(state.dob)}
                            onChange={handleDateChange}
                            showYearDropdown
                            showMonthDropdown
                            className="w-[160px] text-base text-right p-2 bg-transparent border text-zinc-800 border-zinc-800 rounded-lg"
                        />
                        
                        {/* <input type="date" placeholder='Input value' inputMode='numeric' value={state.dob} onChange={handleChange} name="dob" className="w-[160px] text-base text-right p-2 pr-4 bg-transparent border text-zinc-800 border-zinc-800 rounded-lg" /> */}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const indiaFormat = (amt: number) => {
    return amt?.toLocaleString('en-IN')
}

const formatPercentage = (num: number) => {
    if (num) {
        const result = `${num * 100}%`
        return result
    }
}
