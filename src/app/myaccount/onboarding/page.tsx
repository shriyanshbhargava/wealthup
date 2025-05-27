"use client"

import React, { useEffect, useState } from "react";

import Arrow from '@/assets/tapAndInvestment/left-arrow.svg';
import BankDetails from "@/components/Onboarding/steps/BankDetails";
import Image from "next/image";
import InitialStep from "@/components/Onboarding/steps/InitialStep";
import PersonalDetails from "@/components/Onboarding/steps/PersonalDetails";
import Storage from "@/utils/storage";
import SuccessPage from "@/components/Onboarding/steps/SuccessPage";
import { UserApi } from "@/api/services/user/UserApi";
import { apiUrl } from "@/utils/constants";
import { toast } from "react-toastify";

enum Step {
  InitialStep = 1,
  PersonalDetails = 2,
  BankDetails = 3,
  Success = 4,
}

interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  countryOfBirth: string;
  isPoliticallyExposed: boolean;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressPincode: string;
  aadharLast4Digit: string;
  pan?: string;
}

interface BankData {
  ifscCode: string;
  holderName: string;
  bankAccountNumber: string;
  reEnterBankAccountNumber: string;
  typeOfAccount: string;
  modeOfHolding: string;
}

interface FinalUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isd: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressPincode: string;
  gender: string;
  dateOfBirth: string;
  bankDetails: {
    accountNumber: string;
    accountHolderName: string;
    ifsc: string;
  };
  pan: string;
  aadharLast4Digit: string;
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.InitialStep);
  const [pan, setPan] = useState<string>("");
  const [userRes, setUserRes] = useState<any>();
  const [userData, setUserData] = useState<UserData>({
    firstName: userRes?.first_name || "",
    middleName: "",
    lastName: userRes?.last_name || "",
    email: '',
    phone: userRes?.phone || "",
    dateOfBirth: "",
    gender: "",
    countryOfBirth: "",
    isPoliticallyExposed: false,
    addressLine1: userRes?.address?.line1 || "",
    addressLine2: userRes?.address?.line2 || "",
    addressCity: userRes?.address?.city || "",
    addressPincode: userRes?.address?.pincode || "",
    aadharLast4Digit: "",
  });

  const [bankData, setBankData] = useState<BankData>({
    ifscCode: "",
    holderName: "",
    bankAccountNumber: "",
    reEnterBankAccountNumber: "",
    typeOfAccount: "",
    modeOfHolding: "",
  });

  const [mobile, setMobile] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [finalUserData, setFinalUserData] = useState<FinalUserData | null>(null);
  const [access_token, setAccessToken] = useState<string>('');
  const [shouldCallAPI, setShouldCallAPI] = useState<boolean>(false);
  const [aadhar, setAadhar] = useState<string>("");

  useEffect(() => {
    if (shouldCallAPI && finalUserData) {
      const submitData = async () => {
        try {
          await handleSubmit();
          setStep(Step.Success);
        } catch (error) {
          console.error("Submission failed:", error);
          toast.error("Submission failed. Please try again.");
        } finally {
          setShouldCallAPI(false);
        }
      };

      submitData();
    }
  }, [shouldCallAPI, finalUserData]);

  const handlePanSubmit = (submittedPan: string): void => {
    setPan(submittedPan);
  };

  const nextStep = async (): Promise<void> => {
    if (step === Step.InitialStep) {
      if (!pan || !aadhar) {
        toast.error("Please fill out both PAN and Aadhar details");
        return;
      }
      
      setUserData(prevData => ({
        ...prevData,
        pan: pan
      }));
    }

    if (step === Step.PersonalDetails) {
      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.phone ||
        !userData.dateOfBirth ||
        !userData.gender ||
        !userData.addressLine2 ||
        !userData.addressLine1 ||
        !userData.addressPincode ||
        !userData.addressCity
      ) {
        toast.error("Please fill out all required fields in Personal Details.");
        return;
      }
    }

    if (step === Step.BankDetails) {
      if (
        !bankData.ifscCode ||
        !bankData.holderName ||
        !bankData.bankAccountNumber ||
        !bankData.reEnterBankAccountNumber ||
        bankData.bankAccountNumber !== bankData.reEnterBankAccountNumber ||
        !bankData.typeOfAccount
      ) {
        toast.error("Please fill out all required fields in Bank Details.");
        return;
      }

      consolidateData();
      return;
    }

    setStep((prevStep) => Math.min(prevStep + 1, Step.Success));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/tapinvest/user/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(finalUserData),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data) {
        toast.success("Session created successfully!");
      } else {
        throw new Error(data?.message || "Failed to create session.");
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokens = Storage.getToken();
        if (tokens?.access_token) {
          setAccessToken(tokens.access_token);
          const userApiClient = new UserApi(tokens.access_token);
          const userRes: Response = await userApiClient.getAuthMe();

          if (userRes.ok) {
            const me = await userRes.json();
            setUserRes(me);
            setPan(me?.PAN);

            if (me?.phone?.length === 12) {
              const updatedPAN = me.phone.slice(2);
              setMobile(updatedPAN);
            }

            if (me?.bank_accounts[0]?.ifsc) {
              setBankData((prevData) => ({
                ...prevData,
                ifscCode: me.bank_accounts[0].ifsc,
                bankAccountNumber: me.bank_accounts[0].account_number,
                reEnterBankAccountNumber: me.bank_accounts[0].account_number,
              }));
            }

            setUserData((prev) => ({
              ...prev,
              firstName: me?.first_name || "",
              lastName: me?.last_name || "",
              email: me?.email || "",
              addressLine1: me?.address?.line1 || "",
              addressLine2: me?.address?.line2 || "",
              addressCity: me?.address?.city || "",
              addressPincode: me?.address?.pincode || "",
              phone: me?.phone || "",
              aadharLast4Digit: me?.aadharLast4Digit || "",
            }));
          }
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [handleSubmit]);

  const consolidateData = (): void => {
    const consolidatedData: FinalUserData = {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phone: mobile || "",
      isd: "+91",
      addressLine1: userData?.addressLine1 || "",
      addressLine2: userData?.addressLine2 || "",
      addressCity: userData?.addressCity || "",
      addressPincode: userData?.addressPincode || "",
      gender: userData?.gender || "",
      dateOfBirth: userData?.dateOfBirth || "",
      bankDetails: {
        accountNumber: bankData?.bankAccountNumber || "",
        accountHolderName: bankData?.holderName || "",
        ifsc: bankData?.ifscCode || "",
      },
      pan: pan || "",
      aadharLast4Digit: aadhar || ""
    };

    setFinalUserData(consolidatedData);
    setTimeout(() => {
      setShouldCallAPI(true);
    }, 2000);
  };

  const getStepSubtitle = (currentStep: Step): string => {
    switch (currentStep) {
      case Step.PersonalDetails:
        return "with some basic details about you.";
      case Step.BankDetails:
        return "and how you will be transacting.";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (step) {
      case Step.InitialStep:
        return (
          <InitialStep 
            aadhar={aadhar} 
            setAadhar={setAadhar} 
            nextStep={nextStep} 
            pan={pan} 
            setPan={handlePanSubmit} 
            mobileNo={mobile} 
          />
        );
      case Step.PersonalDetails:
        return (
          <PersonalDetails 
            nextStep={nextStep} 
            userRes={userRes} 
            userData={userData} 
            mobileNo={mobile} 
            setUserData={setUserData} 
          />
        );
      case Step.BankDetails:
        return (
          <BankDetails 
            nextStep={nextStep} 
            setBankData={setBankData} 
            bankData={bankData} 
          />
        );
      case Step.Success:
        return <SuccessPage />;
      default:
        return (
          <InitialStep 
            aadhar={aadhar} 
            setAadhar={setAadhar} 
            nextStep={nextStep} 
            pan={pan} 
            setPan={setPan} 
            mobileNo={mobile} 
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-[#bdefe6] flex justify-center items-center h-[70vh] w-full z-[999]">
        <div className="relative h-20 w-20 rounded-full">
          <div className="absolute inset-0 rounded-full bg-transparent border-[4px] border-transparent"></div>
          <div className="h-full w-full rounded-full border-[4px] border-transparent border-t-[#035782] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-[#E7F9F2] lg:py-4">
      <div className="bg-white rounded-lg shadow-lg lg:max-w-[500px] w-full">
        {step >= Step.PersonalDetails && step <= Step.BankDetails && (
          <div className="p-8 pb-0">
            <div className="flex gap-5">
              {step > Step.PersonalDetails && (
                <button
                  className="bg-[rgba(0,178,178,0.40)] w-10 h-10 rounded-full p-2 mb-4"
                  onClick={() => {
                    setStep(step - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Image src={Arrow} width={22} height={22} alt="arrow" />
                </button>
              )}
              <div className="flex flex-col mb-2">
                <p className="text-lg text-[#035782] font-semibold">Let&apos;s Get Started</p>
                <p className="text-base text-[##4A5151] font-normal -mt-5">
                  {getStepSubtitle(step)}
                </p>
              </div>
            </div>
            <div className="relative flex justify-around items-center mb-2 text-[#4A5151] text-center">
              <div
                className="flex flex-col items-center z-10 cursor-pointer"
                onClick={() => {
                  setStep(Step.PersonalDetails);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div
                  className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[20px] font-semibold ${
                    step === Step.PersonalDetails
                      ? "bg-[#2E87B9] text-white"
                      : "border bg-white border-[#035782] text-[#035782]"
                  }`}
                >
                  1
                </div>
                <p className="mt-2 text-sm">Personal<br /> Details</p>
              </div>

              <div className="absolute w-full transform top-5 flex justify-between px-10">
                <div className="border-t-2 border-dotted border-gray-300 w-[65%] text-center flex justify-center mx-auto"></div>
              </div>

              <div className="flex flex-col items-center z-10">
                <div
                  className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[20px] font-semibold ${
                    step === Step.BankDetails 
                      ? "bg-[#2E87B9] text-white" 
                      : "border bg-white border-[#035782] text-[#035782]"
                  }`}
                >
                  2
                </div>
                <p className="mt-2 text-sm">Bank<br /> Details</p>
              </div>
            </div>
          </div>
        )}
        <div className="text-[#4A5151]">{renderStep()}</div>
      </div>
    </div>
  );
};

export default Onboarding;
