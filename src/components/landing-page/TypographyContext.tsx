import React, { createContext, useReducer } from "react";

type State = {
  main: string;
  heading: string;
  body: string;
};

const initialState: State = {
  main: "text-[8vw] sm:text-[5vw] lg:text-[4vw] leading-[1.6]",
  heading: "text-[6vw] sm:text-[3.5vw] lg:text-[2.5vw]",
  body: "text-[4.5vw] sm:text-[2vw] lg:text-[1.5vw]",
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };

    default:
      return initialState;
  }
};

export const handleChange = (value: number, name: string, dispatch: React.Dispatch<any>) => {
  if (isNaN(value)) value = 0;
  dispatch({
    type: "update",
    payload: {
      [name]: `${value}rem`,
    },
  });
};

export const TypographyContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
} | null>(null);

export const TypographyContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TypographyContext.Provider value={{ state, dispatch }}>
      {children}
    </TypographyContext.Provider>
  );
};

export const TypographyTools: React.FC<{
  handleChange: (value: number) => void;
}> = ({ handleChange }) => {
  return (
    <div className="bg-gray-200 rounded-lg border-2 absolute top-0 right-0">
      <div className="p-2 flex gap-2">
        <div className="flex items-center justify-center">
          <label className="text-black">Size (in rem): </label>
          <input
            type="number"
            className="border-2 rounded-xl px-2 py-1"
            onChange={(e) => handleChange(e.target.valueAsNumber)}
          />
        </div>
      </div>
    </div>
  );
};
