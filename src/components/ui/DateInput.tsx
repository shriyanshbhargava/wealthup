import React, { forwardRef } from "react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input";

const DateInput: React.FC<{
  label: string;
  value?: Date | null;
  bgLabel?: string;
  onChange: (
    date: Date | null,
    event?: React.SyntheticEvent<any, Event>
  ) => void;
}> = ({ label, value, bgLabel, onChange }) => {
  return (
    <ReactDatePicker
      isClearable
      clearButtonClassName="bg-gray-300 h85"
      selected={value}
      dateFormat="dd/MM/yyyy"
      onChange={onChange}
      placeholderText={label}
      customInput={
        <Input label={label} placeholder={label} bgLabel={bgLabel} />
      }
    />
  );
};

export default DateInput;
