import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";


const StepLoader: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Verifying your account details" },
    { label: "Gathering your investment information" },
    { label: "Reviewing your portfolio investment" },
    { label: "Finalizing your report.... Almost done!" },
    { label: null },

  ];

  // useEffect(() => {
  //    if (activeStep === steps.length - 1) return;
  //   const interval = 25000 / steps.length; // 25 seconds divided by 4 steps
  //   const timer = setInterval(() => {
  //     setActiveStep((prevStep) => (prevStep + 1) % steps.length);
  //   }, interval);

  //   return () => clearInterval(timer); // Cleanup on unmount
  // }, [activeStep,steps.length]);

  useEffect(() => {
    if (activeStep === steps.length - 1) return; // Stop when last step is active

    const timeout = setTimeout(() => {
      setActiveStep((prevStep) => prevStep + 1);
    }, 31250 / 5); // Delay for each step

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [activeStep, steps.length]);

  console.log("acc", activeStep, steps)

  const styles = {
    backgroundImage: "url('/assets/ribbon.gif')",
    backgroundRepeat: "no-repeat",
    height: "100%",
    backgroundSize: "180",
    backgroundPosition: "center",
    position: "absolute",
    width: "150%"
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit bg-white ">
      <div className="space-y-8 w-5/10 ">
        {steps.map((step, index) => {
          if (step.label == null) {
            return null
          }
          let steppp = index + 1
          return <div
            key={index}
            className={`flex items-center p-4 font-semibold text-base rounded-md  ${index > activeStep ? "" : "shadow-lg"} transition-all duration-1000 ${activeStep === index
                ? "bg-white text-black animate-pulse-scale"
                : index < activeStep
                  ? "bg-white text-black"
                  : ""
              }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 text-center rounded-full font-semibold ${index < activeStep
                  ? "bg-green-400 text-white border-2 border-green-400"
                  : activeStep === index
                    ? "bg-gray-300 text-black border-2 border-white"
                    : index > activeStep ? "text-white" : ""
                }`}
            >
              {activeStep === index || index < activeStep ? "✔" : "0" + steppp}
            </div>
            <span className={`ml-4 border-l-2 pl-4 ${index < activeStep ? "border-black " : index > activeStep ? "border-white" : "border-green-600 "} ${index > activeStep ? "text-white" : ""} `}>{step.label}</span>
          </div>
        }
        )}
      </div>







      {activeStep === steps.length -
        1 ? (
        <div className="mt-10 w-[70%]  z-10  bg-[url('/assets/ribbon.gif')]">
          <div className="font-medium text-[23px] relative z-10">
            <p className="text-[23px] text-black mt-28 text-center font-semibold">Your Mutual Fund analysis is completed</p>
          </div>
        </div>)
        :
        (<div className="bottom  flex-col justify-center items-center">
          <p className="text-[23px] mt-28 text-center">A N A L Y Z I N G</p>
          <img className="w-32 h-16 object-cover ml-12 text-center  mt-[-9px]" src="/assets/Analyzing.gif" alt="" />

        </div>

        )}




    </div>

  );
};

export default StepLoader;
