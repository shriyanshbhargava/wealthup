import React from "react";
import serialize from "./serialize";

const RichText: React.FC<{ content: any; financialGlossary?: boolean }> = ({ content, financialGlossary = false }) => {
  if (!content) {
    return null;
  }

  return serialize(content, financialGlossary);
};

export default RichText;
