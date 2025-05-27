"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserApi } from "@/api/services/user/UserApi";
import FinRiskResult from "./FinRiskResult";
import { Spinner } from "../../ui/Spinner";
import Storage from "@/utils/storage";

const RiskProfileResult = () => {
  const [name, setName] = useState<string>("");
  const [investor, setInvestor] = useState<string>("");
  const [data, setData] = useState<
    Array<{ title: string; description: string }>
  >([]);
  const [meterPercentage, setMeterPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [referral, setReferral] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const token = Storage.getToken()!;
    const userApiClient = new UserApi(token.access_token);

    const getRiskProfileData = async () => {
      setLoading(true);
      try {
        const res: Response = await userApiClient.getRiskprofile();

        if (res.status === 200) {
          const data: any = await res.json();

          const result = data[0] as { first_name: string; level: string };
          await userApiClient.compleRiskometerTask();

          setName(result?.first_name);
          setInvestor(result?.level);
          setMeterPercentage(data.meterPercentage);
          setToolData(result?.level);
          setLoading(false);
          setReferral(data?.token);
        } else if (res.status === 404) {
          router.push("/risk-profile");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRiskProfileData();
  }, [router]);

  const setToolData = (level: string) => {
    const displayData: { title: string; description: string }[] = [
      {
        title: "Why is checking your risk appetite important?",
        description:
          "Identifying your risk appetite is extremely important to understand which type of assets to invest in and how to allocate your funds across various asset classes or types.",
      },
      {
        title: "What is my risk appetite result?",
        description: "",
      },
      {
        title: "How should my investments be structured?",
        description: "",
      },
      {
        title: "Important Disclaimer:",
        description:
          "This report is for a user to check their RiskoMeter. Please do not consider this as investment advice. For guidance about how to invest as per your RiskoMeter please reach out to the Wealthup team or speak to a licensed professional.",
      },
    ];

    if (level === "Aggressive") {
      displayData[1].description =
        "You are an aggressive risk taker i.e. you are an investor who is comfortable with a higher level of risk in order to achieve potentially higher returns.";
      displayData[2].description =
        "Capital security is secondary to potential wealth accumulation for you. As a high-growth investor, you might expect your portfolio to be allocated up to 60% in growth assets for the long term.";
    } else if (level === "Moderate") {
      displayData[1].description =
        "You are an investor who would like to invest in both income and growth assets.";
      displayData[2].description =
        "You will be comfortable with calculated risks to achieve good returns; however, you require an investment strategy that adequately deals with the effects of inflation and tax. As a moderate investor, you might expect your portfolio to be allocated up to 35% in growth assets, with the remainder in defensive assets.";
    } else if (level === "Conservative") {
      displayData[1].description =
        "You're an investor who is prepared to accept lower returns with lower levels of risk in order to preserve your capital.";
      displayData[2].description =
        "The negative effects of taxation and inflation will not be a concern to you, provided your initial investment is protected. As a conservative investor, you might expect your portfolio to be allocated up to 20% in growth assets, with the remainder in defensive assets.";
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
      tool="RiskoMeter"
      meterPercentage={meterPercentage}
      referral={referral}
    />
  );
};

export default RiskProfileResult;