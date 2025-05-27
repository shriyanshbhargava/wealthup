import { ProfileContext } from "@/components/DashboardLayout";
import React from "react";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";


interface WealthometerReportProps {
  data: any;
  footer: boolean;
}
const WealthometerReport: React.FC<WealthometerReportProps> = ({  footer }) => {
  const { wealthometerData: data, wealthometerLoaded } =
    React.useContext(ProfileContext);

  const { push } = useRouter();

  React.useEffect(() => {
    console.log({ data, wealthometerLoaded });
    if (wealthometerLoaded && data === null) {
      push("/wealthometer");
    }
  }, [wealthometerLoaded, data, push]);

  if (!data) {
    if (!data) {
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="mb-0 text-xl">
              Your personalized report is being generated
            </p>
            <Spinner size="8" color="black" />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 pb-8">
        {data !== null && <WealthometerReport data={data} footer={false} />}
      </div>
    </div>
  );
};

export default WealthometerReport;
