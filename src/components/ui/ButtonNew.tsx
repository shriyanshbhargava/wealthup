import { Spinner } from "./Spinner"
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  size?: string;
  onClick?: () => void;
  boxShadow?: boolean;
  padding?: string;
  loading?: boolean;
  id?: string;
}

interface ExtendedButtonProps extends ButtonProps {
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ExtendedButtonProps> = ({
  children, 
  size="big", 
  onClick, 
  boxShadow=true, 
  padding='', 
  type='button', 
  loading=false, 
  id,
  ...props
}) => {
  return (
    <button
        {...props}
        type={type}
        id={id}
        className={`bg-[#FF7300] w-full ${size==="big" ? "px-[80px] py-2" : padding ? padding : "px-8 py-2"} sm:w-fit text-xl rounded-lg  text-white ${boxShadow ? 'buttonshadow' : ''}`}
        onClick={onClick}
        disabled={loading}
    >
      {loading ? <Spinner color="white" size="4" /> : children}
    </button>
  )
}

export default Button
