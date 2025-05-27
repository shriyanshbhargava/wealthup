"use client";

import React, { useState, useEffect } from 'react';

export const formatValue = (value: number) => {
    if (value >= 10000000) {
        return `${(value / 10000000).toLocaleString("en-In", {
            maximumFractionDigits: 0
        })}Cr`;
    } else if (value >= 100000) {
        return `${(value / 100000).toLocaleString("en-In", {
            maximumFractionDigits: 0
        })}L`;
    } else if (value >= 1000) {
        return `${(value).toLocaleString("en-In", {
            maximumFractionDigits: 0
        })}`;
    }
    return value.toString();
};

interface MobileSliderProps {
    min: number;
    max: number;
    step: number;
    startValue: number;
    finalValue: number;
    answer: number;
    defaultValue?: number;
    isRupee?: boolean;
    setSliderValue: (value: number) => void; // Added this prop
}


const MobileSlider = ({
    min,
    max,
    step,
    startValue,
    finalValue,
    answer,
    defaultValue,
    isRupee,
    setSliderValue
}: MobileSliderProps) => {
    const initialSliderValue = answer !== 0
        ? answer
        : defaultValue !== undefined
            ? defaultValue
            : min;

    const [value, setValue] = useState(initialSliderValue);
    const [isEditing, setIsEditing] = useState(false);

    const handleSliderChange = (e: any) => {
        const newValue = parseFloat(e.target.value);
        setValue(newValue);
        setSliderValue(newValue);
    };

    const displayValue = (val: number) => {
        if (val < min) return `Under ${formatValue(min)}`;
        if (val > max) return `${formatValue(max)}+`;
        return formatValue(val);
    };

    useEffect(() => {
        if (value < min) setValue(min);
        if (value > max) setValue(max);
    }, [min, max]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d]/g, '');
        const newValue = parseFloat(inputValue);

        if (!isNaN(newValue)) {
            setValue(newValue);
            setSliderValue(newValue);
        } else {
            setValue(0);
            setSliderValue(0)
        }
    };

    const formatSliderValue = (val: number, min: number, max: number, isRupee: boolean) => {
        if (!isRupee) {
            return `${val}`;
        } else {
            if (val > max) {
                let formattedValue = '';
                if (val >= 10000000) {
                    formattedValue = `${(val / 10000000).toFixed(0)}Cr+`;
                } else if (val >= 100000) {
                    formattedValue = `${(val / 100000).toFixed(0)}L+`;
                }
                return `Rs. ${formattedValue}`;
            } else {
                return `Rs. ${val.toLocaleString("en-In", {
                    maximumFractionDigits: 0
                })}`;
            }
        }
    };

    return (
        <div className="w-full px-2 py-4">
            {/* Value display */}
            <div className="w-full mb-4">
                <div className='flex justify-center'>
                    <div className='bg-[#00B3B026] border border-[#035782] rounded-lg text-[#035782] font-medium px-4 w-fit h-12 flex justify-center items-center shadow-sm'>
                        <input
                            type={`${isRupee ? 'text' : 'number'}`}
                            min={min}
                            max={max}
                            value={formatSliderValue(value, min, max, isRupee ? isRupee : false)}
                            onChange={handleInputChange}
                            onFocus={() => setIsEditing(true)}
                            onBlur={() => setIsEditing(false)}
                            className="w-auto text-center bg-transparent focus:outline-none focus:border-transparent text-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="relative w-full px-1">
                <input
                    type="range"
                    min={startValue}
                    max={finalValue}
                    step={step}
                    value={value}
                    onChange={handleSliderChange}
                    className="w-full h-3 bg-gray-300 rounded-full appearance-none cursor-pointer touch-none"
                    style={{
                        background: `linear-gradient(to right, #035782 0%, #035782 ${((value - startValue) / (finalValue - startValue)) * 100}%, #E5E7EB ${((value - startValue) / (finalValue - startValue)) * 100}%, #E5E7EB 100%)`,
                    }}
                />
            </div>

            {/* Min/Max labels */}
            <div className="flex justify-between w-full mt-2 px-1">
                <span className="text-xs text-gray-600 font-medium">
                    {displayValue(startValue)}
                </span>
                <span className="text-xs text-gray-600 font-medium">
                    {displayValue(finalValue)}
                </span>
            </div>

            <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #035782;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #035782;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        input[type="range"]:active::-webkit-slider-thumb {
          transform: scale(1.1);
        }

        input[type="range"]:active::-moz-range-thumb {
          transform: scale(1.1);
        }
      `}</style>
        </div>
    );
};

export default MobileSlider;
