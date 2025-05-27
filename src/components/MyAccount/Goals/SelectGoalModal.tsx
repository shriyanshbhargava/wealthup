import Image from 'next/image'
import React from 'react'
import carIcon from "@/assets/icons/carIcon.svg"
import travelIcon from "@/assets/icons/travelIcon.svg"
import homeIcon from "@/assets/icons/homeIcon.svg"
import retireIcon from "@/assets/icons/retireIcon.svg"
import customIcon from "@/assets/icons/customIcon.svg"
import educationIcon from "@/assets/icons/educationIcon.svg"
import { Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons'

const goals = [
    { icon: retireIcon, title: "Retire Early" },
    { icon: carIcon, title: "Car" },
    { icon: travelIcon, title: "Travel" },
    { icon: educationIcon, title: "Education" },
    { icon: homeIcon, title: "Home" },
    { icon: customIcon, title: "Custom" },]

const SelectGoalModal = () => {
    return (
        <div className='flex justify-center items-center w-full min-h-[80vh]'>
            <div className='bg-[#035782] py-8 px-6 sm:px-12 rounded-xl relative flex flex-col gap-4 sm:gap-8 items-center w-11/12 max-w-[650px]'>
            <button className='absolute right-8 top-6'>
                <CrossCircledIcon className='text-white font-bold h-10 w-10'/>
            </button>
                <p className='text-2xl font-semibold text-white mt-8'>Choose your goal</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6'>
                    {goals.map((goal, index) => {
                        return (
                            <div className='flex flex-col items-center gap-4 sm:gap-2 hover:cursor-pointer p-4 hover:bg-slate-400 rounded-lg' key={index}>
                                <div className='relative h-[60px] sm:h-[90px] w-[90px] sm:w-[120px]'>
                                    <Image src={goal.icon} alt='' fill />
                                </div>
                                <p className='text-white text-base sm:text-xl font-semibold'>{goal.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SelectGoalModal
