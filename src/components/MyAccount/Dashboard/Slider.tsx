import React, { useState } from 'react';

export const formatValue = (value: number, inputDisplay?: boolean, markerDisplay?: boolean) => {
  if (value >= 10000000) {
    return `${(value / 10000000).toLocaleString("en-IN", {
      maximumFractionDigits: inputDisplay ? 2 : markerDisplay ? 1 : 0
    })} Cr`;
  }
  else if (value >= 100000) {
    return `${(value / 100000).toLocaleString("en-In", {
      maximumFractionDigits: inputDisplay ? 2 : markerDisplay ? 1 : 0
    })}L`;
  } else if (value >= 1000) {
    return `${(value).toLocaleString("en-In", {
      maximumFractionDigits: inputDisplay ? 2 : markerDisplay ? 1 : 0
    })}`;
  }
  return value.toLocaleString("en-In", {
    maximumFractionDigits: inputDisplay ? 2 : 0
  });
};

const Slider = ({
  min,
  max,
  step,
  onChange,
  startValue,
  finalValue,
  answer,
  defaultValue,
  isRupee,
  numberOfMarkers = 5
}: {
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  startValue: number;
  finalValue: number;
  answer: number;
  defaultValue?: number;
  isRupee?: boolean;
  numberOfMarkers?: number;
}) => {
  const initialSliderValue = answer !== 0
    ? answer
    : defaultValue !== undefined
      ? defaultValue
      : min;

  const [value, setValue] = useState(initialSliderValue);

  const formatDisplayValue = (val: number) => {
    if (val === 0 && isRupee) return 'No EF';

    if (val > max) {
      return isRupee ? `Rs. ${formatValue(max, true)}+` : `${formatValue(max, true)}+`;
    }

    if (val < min) {
      return isRupee ? `Under Rs. ${formatValue(min, true)}` : `Under ${formatValue(min, true)}`;
    }

    return isRupee ? `Rs. ${formatValue(val, true)}` : formatValue(val, true);
  };

  const generateMarkers = () => {
    const markers = [];
    const range = finalValue - startValue;
    const increment = range / (numberOfMarkers - 1);

    for (let i = 0; i < numberOfMarkers; i++) {
      const markerValue = startValue + (increment * i);
      markers.push({
        value: markerValue,
        position: (markerValue - startValue) / (finalValue - startValue) * 100
      });
    }
    return markers;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    const newValue = parseFloat(inputValue);

    if (!isNaN(newValue)) {
      const clampedValue = Math.min(Math.max(newValue, min), max);
      setValue(clampedValue);
      onChange(clampedValue);
    }
  };

  const markers = generateMarkers();

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-center mb-6">
        <div className="bg-[#00B3B026] border border-[#035782] rounded-md text-[#035782] font-medium px- py-2">
          <input
            type="text"
            value={formatDisplayValue(value)}
            onChange={handleInputChange}
            className="w-auto text-center bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div className="relative w-full pt-8 pb-8"> {/* Increased padding */}
        {/* Scale markers container */}
        <div className="absolute w-full flex justify-between top-10">
          {markers.map((marker, index) => (
            <div
              key={index}
              className="flex flex-col items-center mt-9"
            >
              <div className="h-4 w-0.5 bg-gray-300"></div>
              <span className="text-xs text-gray-600 mt-2">
                {isRupee ? `Rs. ${formatValue(marker.value, false, true)}` : formatValue(marker.value, false, true)}
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            type="range"
            min={startValue}
            max={finalValue}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #035782 0%, #035782 ${((value - startValue) / (finalValue - startValue)) * 100}%, #E5E7EB ${((value - startValue) / (finalValue - startValue)) * 100}%, #E5E7EB 100%)`,
            }}
          />
        </div>
      </div>


      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          margin: 1rem 0;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #035782;
          cursor: pointer;
          margin-top: -9px;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          border: 2px solid white;
        }

        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #035782;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-ms-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #035782;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 2px;
          cursor: pointer;
          background: transparent;
          border-radius: 1px;
        }

        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 2px;
          cursor: pointer;
          background: transparent;
          border-radius: 1px;
        }

        input[type="range"]::-ms-track {
          width: 100%;
          height: 2px;
          cursor: pointer;
          background: transparent;
          border-radius: 1px;
        }
      `}</style>
    </div>
  );
};

export default Slider;
