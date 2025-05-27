"use client"

import React, { forwardRef, useRef, useState } from "react";

// type Props = {
//   label?: string;
//   // type?: string;
//   // placeholder?: string;
//   className?: string;
//   // onChange?: React.ChangeEventHandler<HTMLInputElement>;
//   // onClick?: React.MouseEventHandler<HTMLInputElement>;
//   error?: string;
//   // name?: string;
//   // value?: string | number | readonly string[];
//   // autoComplete?: string;
//   required?: boolean;
//   // onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
// };

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
  label?: string;
  bgLabel?: string;
  textbox?: boolean;
  color?: string;
  inputClass?: string;
  focusWithin?: string;
  otp?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      textbox = false,
      color = "white-600",
      bgLabel = "bg-white",
      focusWithin = "blue-500",
      required = false,
      className,
      inputClass,
      ...props
    },
    ref
  ) => {
    const labelRef = React.createRef<HTMLLabelElement>();

    const handleFocusInput = (
      e: React.MouseEvent<HTMLLabelElement, MouseEvent>
    ) => {
      const prev = labelRef.current?.previousSibling;
      if (prev) {
        (prev as any).focus();
      }
    };

    const textColor = `text-${color}`;
    return (
      <div className={`${className ? className : "mb-2 w-full"}`}>
        <div
          className={`material relative rounded-lg border-2 focus:shadow-sm mb-1 ${error
            ? "border-red-700 focus-within:border-red-700"
            : `border-${color} focus-within:border-${focusWithin} focus-within:text-${focusWithin}`
            }`}
        >
          {textbox ? (
            <textarea
              ref={ref}
              {...(props as any)}
              className={`resize-none placeholder:text-transparent focus:placeholder:${textColor} ${textColor} font-robo font-noraml block p-2 md:p-4 w-full text-base md:text-lg appearance-none focus:outline-none bg-transparent ${inputClass}`}
            />
          ) : (
            <input
              ref={ref}
              {...(props as any)}
              className={`${inputClass} placeholder:text-transparent focus:placeholder:${textColor} ${textColor} font-robo font-noraml block p-2 md:p-4 w-full text-base md:text-lg appearance-none focus:outline-none bg-transparent`}
            />
          )}
          <label
            htmlFor={props.name}
            ref={labelRef}
            onClick={handleFocusInput}
            className={`font-robo font-normal absolute left-0 top-0 text-base md:text-xl ${bgLabel} rounded-lg text-${color} px-4 pt-2 md:pt-4 pb-1 md:pb-3 cursor-text duration-300 origin-0 ${error ? "error" : ""
              }`}
          >
            {label} {required && <span className="text-red-700">*</span>}
          </label>
        </div>
        {error && <p className="text-[#FF7300] lg:text-lg mb-0 text-left text-base font-bold">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

export const InputRow: React.FC<{
  name: string;
  disabled: boolean;
  id?: string;
  value: number;
  onChange?: (value: number, id: string) => void;
}> = ({ name, disabled, id, value, onChange }) => {
  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(
      e.target.value?.replaceAll(",", "").replaceAll("\u20B9", "") ?? "0"
    );

    if (isNaN(value)) value = 0;
    console.log({ value: e.target.value, newValue: value });
    onChange!(value, e.target.id);
  };

  return (
    <div className="overflow-hidden flex justify-between border-b border-gray-400 mb-8">
      <span className="flex-shrink-0 text-base md:text-xl font-robo font-medium">
        {name}
      </span>
      <input
        type="text"
        name={name.toLowerCase()}
        placeholder="₹ 0"
        disabled={disabled}
        id={id}
        value={value?.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
          style: "currency",
          currency: "INR",
        })}
        onChange={customOnChange}
        className="w-1/2 focus:outline-none text-xl font-robo text-black font-normal text-right"
      />
    </div>
  );
};

export const SubmissionInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required = false,
      className,
      otp = false,
      ...props
    },
    ref
  ) => {
    const lastTimeInputChangeRef = useRef(Date.now());
    const [value, setValue] = useState(props.value ?? '');

    const handleClick = () => {
      lastTimeInputChangeRef.current = Date.now();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentTime = Date.now();

      const timeSinceLastChange = currentTime - lastTimeInputChangeRef?.current;
      lastTimeInputChangeRef.current = currentTime;

      const inputLength = e.target.value.length;
      const previousInputLength = value.toString().length;
      const lengthDiff = inputLength - previousInputLength;

      console.log(timeSinceLastChange)

      if (timeSinceLastChange < 1000 && lengthDiff > 4) {
        // Input value changed quickly and length increased, likely auto-completed
        console.log('Input auto-completed');
      } else {
        // Input value changed with a delay or length did not increase significantly, likely manually typed
        console.log('Input manually typed');
      }

      if (props.onChange) {
        props.onChange(e);
      }

      setValue(e.target.value)
    }

    return (
      <div>
        <label htmlFor={props.name} className=" block mb-3 text-lg  font-medium text-white-900 dark:text-white mt-2">{label}{required && <span className="text-red-700 pl-1">*</span>}</label>
        <input
          ref={ref}
          value={otp ? (props.value && props.value.toString().length > 6 ? parseInt(props.value?.toString().slice(0, 6)) : props.value) : props.value}
          {...props}
          // text-white
          className={`bg-transparent border rounded-lg placeholder-white block w-full p-3 text-sky-800 ${className}`} />
        {error && <p className="text-[#FF7300] lg:text-lg mb-0 text-left  text-base font-bold">{error}</p>}
      </div>
    )
  });
  //Input styling earlier
  // w-full bg-[#F2F4F4] placeholder:text-[#B3B3B3] text-gray-800 text-lg px-4 py-2 rounded-md 
  
SubmissionInput.displayName = "Input";
