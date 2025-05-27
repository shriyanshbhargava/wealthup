import React from "react";
import { SpacerType } from "@/types/block";

const HEIGHTS = {
  tiny: "1.11rem",
  small: "2.22rem",
  medium: "7.77rem",
  large: "10.1rem",
};

const Spacer: React.FC<SpacerType> = ({ size }) => {
  return <div style={{ height: HEIGHTS[size] }} />;
};

export default Spacer;
