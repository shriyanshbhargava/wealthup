import React from "react";
import serialize from "./serialize";
import { usePathname } from 'next/navigation'

const RichText: React.FC<{ content: any; financialGlossary?: boolean }> = ({ content, financialGlossary = false }) => {
  const pathname = usePathname();
  const blog = pathname?.includes('/resources/blog') || false;

  if (!content) {
    return null;
  }

  return serialize(content, financialGlossary, blog);
};

export default RichText;
