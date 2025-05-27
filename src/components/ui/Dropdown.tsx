"use client"

import React from "react";

const DropdownContext = React.createContext<{
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const Dropdown: React.FC<{
  defaultTitle: string;
  children: React.ReactNode;
  onChange: (value: string) => void;
  value?: string;
  bgTransparent?: boolean;
  padding?: number
  marginBottom?: number
}> = ({ defaultTitle, children, onChange, value, bgTransparent = false, padding = 4, marginBottom = 3 }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string>("");
  const [currentValue, setCurrentValue] = React.useState<string>("");

  React.useEffect(() => {
    setSelected(value!);
    setCurrentValue(value!);
  }, [value]);

  React.useEffect(() => {
    if (!!currentValue?.length) {
      onChange(currentValue);
    }
    setOpen(false);
  }, [currentValue]);

  return (
    <DropdownContext.Provider
      value={{ selected, setSelected, setValue: setCurrentValue }}
    >
      <div className={`relative inline-block text-left w-full mb-${marginBottom}`}>
        <div>
          <button
            type="button"
            className={`inline-flex w-full justify-between items-center rounded-lg border-2 border-white ${bgTransparent ? "" : "bg-white"
              } p-${padding} text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-blue-500`}
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setOpen(!open)}
          >
            {selected?.length > 0 ? selected : defaultTitle}
            {/* <!-- Heroicon name: mini/chevron-down --> */}





            <svg
              className="h-[20px] w-[20px]  text-white "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* <!--
      Dropdown menu, show/hide based on menu state.
      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
        --> */}
        {open && (
          <div
            className="absolute overflow-y-scroll right-0 z-10 mt-2 w-full max-h-52 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <ul className="px-2 py-1" role="none">
              {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
              {children}
            </ul>
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownItem: React.FC<{ value: string; children: string }> = ({
  children,
  value,
}) => {
  const { selected, setSelected, setValue } =
    React.useContext(DropdownContext)!;

  const handleSelect = () => {
    setSelected(children);
    if (value.length > 0) {
      setValue(value);
    }
  };

  return (
    <li
      className={`rounded-xl ${selected === children ? "bg-gray-100 text-gray-900" : ""
        } text-gray-700 hover:bg-gray-100 hover:text-gray-900 block p-4 text-lg`}
      role="menuitem"
      tabIndex={-1}
      data-value={value}
      id="menu-item-0"
      onClick={handleSelect}
    >
      {children}
    </li>
  );
};
