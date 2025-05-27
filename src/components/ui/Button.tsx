import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Spinner } from "./Spinner";

const sizeClassnames = {
  bigger: "py-3 px-8 text-base md:text-xl",
  big: "py-2 px-6 text-sm",
  small: "px-2 py-1 text-sm",
  tiny: "px-1 text-sm",
};

const colorClassnames = {
  primary:
    "text-button bg-primary-new transition duration-200 ease-in-out hover:bg-primary-light",
  white: "bg-white text-secondary",
  secondary: "bg-secondary text-white",
  transparent: "text-button bg-transparent",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: ReactNode;
  transition?: boolean;
  custom?: boolean;
  border?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "big",
  color = "primary",
  disabled,
  loading,
  icon,
  className = "",
  transition,
  custom = false,
  border = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${border ? `w-full md:w-[180px] flex items-center justify-center font-bold h-full text-primary py-2 px-3 border-4 rounded-full border-primary ${className}` : `${custom
        ? "btn"
        : `md:max-w-[240px] w-full text-base md:text-xl md:h-[56px]`
        } flex outline-none focus:ring-4 focus:ring-${color} ${sizeClassnames[size]
        } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
        } font-bold flex items-center justify-center rounded-full ${className}`}`}
      data-testid="button"
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      ) : null}
    </button>
  );
};
