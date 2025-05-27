import React from "react";
import Container from "../../ui/Container";
import { DescriptionRow } from "./DescriptionRow";

import { Header } from "./Header";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { baseUrl } from "@/utils/constants";

const FinRiskResult: React.FC<{
  name: string;
  tool: string;
  result: string;
  data: Array<{ title: string; description: string }>;
  meterPercentage: number;
  referral: string;
}> = ({ name, tool, data, result, meterPercentage, referral }) => {
  const shareUrl =
    tool === "RiskoMeter"
      ? `${baseUrl}/risk-profile?ref=${referral}`
      : `${baseUrl}/financial-literacy?ref=${referral}`;

  const pathname = usePathname();
  const demo = pathname?.includes('/demo') || false;

  return (
    <div className="bg-gray-100">
      <Header
        name={demo ? 'Guest' : name}
        result={result}
        shareUrl={shareUrl}
        tool={tool}
        meterPercentage={meterPercentage}
        title="Financial Literacy"
      />
      {data.map((item, index) => (
        <DescriptionRow
          key={index}
          heading={item.title}
          description={item.description}
        />
      ))}
      <Container>
        <div className="pt-8 pb-16 text-center">
          {tool === "RiskoMeter" ? (
            <>
              <p className="text-xl md:text-3xl mb-2 text-primary-new font-sans font-medium">
                &quot;Successful investing is about managing risk, not avoiding
                it&quot;
              </p>
              <span className="text-xl md:text-3xl text-primary-new font-robo font-bold">
                - Benjamin Graham
              </span>
            </>
          ) : (
            <p className="text-xl md:text-3xl text-primary-new font-sans font-medium">
              Albert Einstein said it best, &quot;A little knowledge is a
              dangerous thing&quot;,
              <br />
              we would add, &quot;staying ignorant is worse!&quot;
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FinRiskResult;
