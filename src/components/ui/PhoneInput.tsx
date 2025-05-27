"use client"

import { E164Number } from "libphonenumber-js/types";
import React, { useState } from "react";
import PhoneNumberInput, { CountryData } from "react-phone-input-2";
import PhoneInputNumber from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { SubmissionInput } from "./Input";
import { usePathname } from "next/navigation";

const PhoneInput: React.FC<{
  required?: boolean;
  error?: string;
  value: string;
  label?: string;
  onClick?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    data: {} | CountryData
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (value?: string, data?: {} | CountryData) => void;
  color?: string;
  bgLabel?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}> = ({
  error,
  label,
  onClick,
  value,
  onChange,
  required = false,
  color = "blue-500",
  bgLabel = "bg-white",
  onKeyDown,
  disabled = false,
  autoFocus = false
}) => { 
    return (
      <div className="phone-input relative flex flex-col gap-2 w-full mb-3">
        <label
          className={`absolute text-base md:text-xl transform scale-75 -translate-y-3 md:-translate-y-4 ml-3 z-10 px-1 py-0 ${bgLabel} text-${color} top-0 rounded-lg px-4 origin-0 duration-300 font-robo mb-0 font-normal`}
        >
          Phone Number {required && <span className="text-red-700">*</span>}
        </label>
        <PhoneNumberInput
          placeholder=""
          countryCodeEditable={false}
          country={"in"}
          specialLabel={""}
          disabled={disabled}
          value={value}
          onChange={onChange}
          enableSearch={true}
          onClick={onClick}
          
          onKeyDown={onKeyDown}
          inputClass={`w-full border-2 input-padding ${error ? "border-red-700" : "border-gray-600"
            } placeholder:text-gray-800 rounded-lg bg-transparent focus-within:border-blue-500 p-2 md:p-4 text-gray-800`}
          inputProps={{ autoComplete: "tel", autoFocus, type: "tel", }}
        />
        {error && <p className="text-left text-red-700">{error}</p>}
      </div>
    );
  };

export default PhoneInput;


export const PhoneInputV2 = ({ value, onChange, required, rightComponent, error,setOtpSent}: { value: E164Number | undefined, onChange: (value: E164Number | undefined) => void; required: boolean; rightComponent?: React.ReactNode, error?: string,setOtpSent:(value:boolean)=>void}) => {
  const pathname = usePathname();
  const login = pathname?.includes('/login');
  const [prevValue,setPrevValue]=useState(" ");
  if(value!==prevValue){
  setOtpSent(false);
  let num=value?.toString();
  num?setPrevValue(num):null;
  }
  return (
    <div>
      <div className="flex justify-between">
      {/* dark:text-white */}
        <label className={`flex items-start mb-3 mt-2 text-2xl font-medium ${login ? "text-white" : "text-sky-800"} `}>Phone Number{required && <span className="text-base"> *</span>}</label>
        {rightComponent}
      </div>
      <PhoneInputNumber
        value={value}
        name={value}
        onChange={onChange}
        autoComplete="tel"
        // border-gray-300  focus:border-blue-500  focus:ring-blue-500  text-white
        className={`bg-transparent border ${login ? "border-white focus:border-white text-white" : "border-sky-800 focus:border-sky-800 text-sky-800"} focus:outline-none text-sm rounded-lg block w-full p-2.5  dark:border-gray-600dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        defaultCountry="IN"
      />
      {error && <p className="text-xl text-red-700 mb-0 mt-4">{error}</p>}
    </div>
  )
}
