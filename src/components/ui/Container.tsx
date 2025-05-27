import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className="container w-full h-full">{children}</div>;
};

export default Container;
