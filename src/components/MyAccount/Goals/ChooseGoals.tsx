import React from 'react';
import carIcon from "@/assets/goal/car.svg";
import customIcon from "@/assets/goal/custom.svg";
import educationIcon from "@/assets/goal/education.svg";
import homeIcon from "@/assets/goal/home.svg";
import retireIcon from "@/assets/goal/retire.svg";
import travelIcon from "@/assets/goal/travel.svg";
import crossIcon from "@/assets/goal/cross.svg";
import Image from 'next/image';

interface ChooseGoalsProps {
    onClose: () => void;
    handleClick: (goalText: string) => void;
}

export default function ChooseGoals({ onClose, handleClick }: ChooseGoalsProps) {
    const goals = [
        { id: 1, img: retireIcon, text: 'Retire Early' },
        { id: 2, img: carIcon, text: 'Car' },
        { id: 3, img: travelIcon, text: 'Travel' },
        { id: 4, img: educationIcon, text: 'Education' },
        { id: 5, img: homeIcon, text: 'Home' },
        { id: 6, img: customIcon, text: 'Custom' },
    ];

    const handleGoalClick = (text: string) => {
        handleClick(text === 'Custom' ? '' : text);
    };

    return (
        <div className="w-full z-50 h-[50vh] px-4 py-10 sm:py-0 sm:px-0 sm:h-screen overflow-y-auto flex justify-center items-center bg-[#E7F9F2]">
            <div className="bg-[#035782] w-full max-w-[600px] p-4 md:p-6 text-center">
                <div className='flex justify-between items-center text-center w-full mb-6'>
                    <div />
                    <p className="text-2xl font-semibold text-white text-center flex items-center my-auto">Choose your goal</p>
                    <button onClick={onClose}>
                        <Image src={crossIcon} alt={'close'} width={25} height={25} />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center text-center">
                    {goals.map((item) => (
                        <button key={item.id} className="flex flex-col items-center justify-around h-full" onClick={() => handleGoalClick(item.text)}>
                            <Image src={item.img} alt={item.text} width={55} height={45} className='md:w-[85px] md:h-[85px]'/>
                            <p className="text-sm md:text-xl font-semibold text-white mt-2">{item.text}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
