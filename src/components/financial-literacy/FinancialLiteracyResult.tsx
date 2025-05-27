"use client"

import React, { useEffect, useState } from "react";

import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { useRouter } from "next/navigation";
import FinRiskResult from "../MyAccount/Riskometer/FinRiskResult";

const FinancialLiteracyResult = () => {
  const [name, setName] = useState<string>("");
  const [investor, setInvestor] = useState<string>("");
  const [data, setData] = useState<
    Array<{ title: string; description: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [meterPercentage, setMeterPercentage] = useState<number>(0);
  const [referral, setReferral] = useState<string>('');

  const { push } = useRouter();

  useEffect(() => {
    const token = Storage.getToken()!;
    const userApiClient = new UserApi(token.access_token);

    const getFinLitData = async () => {
      setLoading(true);
      try {
        const res: Response = await userApiClient.getFinancialLiteracy();

        if (res.status === 200) {
          const data: any = await res.json();

          const result = data[0] as { name: string; level: string };
          await userApiClient.compleFinknowmeterTask();

          setName(result?.name);
          setInvestor(result?.level);
          setToolData(result?.level);
          setMeterPercentage(data.meterPercentage);
          setReferral(data?.token);
          setLoading(false);
        } else if (res.status === 404) {
          push("/financial-literacy");
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    getFinLitData();
  }, [push]);

  const setToolData = (level: string) => {
    console.log({ level });
    const displayData: { title: string; description: string }[] = [
      {
        title: "Why is checking your level of financial knowledge important?",
        description:
          "Understanding your level of financial knowledge is critical for making sound financial decisions. Knowing the result can help you decide whether you can  manage your own finances or need support to make sound financial decisions.",
      },
      {
        title: "What is my financial knowledge result?",
        description: "",
      },
      {
        title: "What does my result mean?",
        description: "",
      },
      {
        title: "Important Disclaimer:",
        description:
          "This report is for a user to check their RiskoMeter. Please do not consider this as investment advice. For guidance about how to invest as per your RiskoMeter please reach out to the Wealthup team or speak to a licensed professional.",
      },
    ];

    if (level === "Beginner") {
      displayData[1].description =
        "You have a beginner level of financial knowledge. You may not be able to take financial decisions without proper guidance, which may cost you dearly in the long term.";
      displayData[2].description =
        "As an individual with a beginner level of understanding, you might want to consult an expert who can help you with most financial decisions while you grow your knowledge.";
    } else if (level === "Intermediate") {
      displayData[1].description =
        "You have an intermediate level of financial knowledge. You can take some financial decisions on your own, but mostly the result may be a mixture of sound decision-making and luck.";
      displayData[2].description =
        "As an individual with an intermediate level of understanding, you might want to consult an expert who can fill any gap in your understanding and help you avoid costly mistakes, particularly for decisions involving large sums of money.";
    } else if (level === "Advanced") {
      displayData[1].description =
        "You have an advanced level of financial knowledge. You can take most financial decisions on your own after careful analysis and research.";
      displayData[2].description =
        "As an individual with an advanced level of understanding, you are already doing a good job. However, you might want to consult an expert for the latest products as well as their suitability for you. After all, overconfidence is an enemy when it comes to knowledge!";
    }
    setData(displayData);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner color="black" size="8" />
      </div>
    );
  }

  return (
    <FinRiskResult
      name={name}
      result={investor}
      data={data}
      tool="FinknowMeter"
      meterPercentage={meterPercentage}
      referral={referral}
    />
  );
};

export default FinancialLiteracyResult;
