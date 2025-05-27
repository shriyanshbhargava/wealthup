// components/myaccount/onboarding/Onboarding.tsx
"use client";

import React, { useEffect, useState } from "react";

import Arrow from '@/assets/tapAndInvestment/left-arrow.svg';
import BankDetails from "@/components/Onboarding/steps/BankDetails";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import Image from "next/image";
import InitialStep from "@/components/Onboarding/steps/InitialStep";
import NomineeDetails from "@/components/Onboarding/steps/NomineeDetails";
import PersonalDetails from "@/components/Onboarding/steps/PersonalDetails";
import Storage from "@/utils/storage";
import SuccessPage from "@/components/Onboarding/steps/SuccessPage";
import TaxDetails from "@/components/Onboarding/steps/TaxDetails";
import { UserApi } from "@/api/services/user/UserApi";
import { apiUrl } from "@/utils/constants";
import axios from 'axios';
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

enum Step {
    InitialStep = 1,
    PersonalDetails = 2,
    TaxDetails = 3,
    NomineeDetails = 4,
    BankDetails = 5,
    Success = 6,
}

const BankVerificationPopup: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 w-80">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-gray-800 text-center">
                    Fetching your bank verification status...
                </p>
            </div>
        </div>
    );
};


const Onboarding: React.FC = () => {
    const [step, setStep] = useState<Step>(Step.InitialStep);
    const [pan, setPan] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [updatingBankAccount, setUpdatingBankAccount] = useState<boolean>(false);
    const [userRes, setUserRes] = useState<any>();
    const [userData, setUserData] = useState({
        firstName: "",
        middleName: "",
        father_name: "",
        mother_name: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        countryOfBirth: "India",
        isPoliticallyExposed: false,
        maritalStatus: "",
        addressLine1: "",
        addressLine2: "",
        addressCity: "",
        addressPincode: "",
        aadharLast4Digit: "",
        signature: null,
        photo: null,
    });

    const [taxData, setTaxData] = useState({
        occupation: "",
        taxCategory: "",
        taxStatus: "",
        income_slab: "",
        source_of_wealth: "",
        isTaxResidentOtherThanIndia: false,
        tAndC: false,
    });

    const [bankData, setBankData] = useState({
        ifscCode: "",
        holderName: "",
        bankAccountNumber: "",
        reEnterBankAccountNumber: "",
        typeOfAccount: "",
        modeOfHolding: "",
    });

    const [mobile, setMobile] = useState<string>('');
    const [bankVerifyId, setBankVerifyId] = useState<string>('');
    const [bankVerifyStatus, setBankVerifyStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [finalUserData, setFinalUserData] = useState<any>({});
    const [access_token, setAccessToken] = useState('');
    const [shouldCallAPI, setShouldCallAPI] = useState(false);
    const [isUpdating, setisUpdating] = useState(false);
    const [isKYCDone, setIsKYCDone] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [isFetchingBankAccount, setIsFetchingBankAccount] = useState(false);
    const [KYCStatus, setKYCStatus] = useState('');
    const [needDemographic, setNeedDemographic] = useState(true);
    const [aadhar, setAadhar] = useState("");
    const POLLING_INTERVAL = 3000; // Poll every 3 seconds
    const TIMEOUT_LIMIT = 60000;

    const searchParams = useSearchParams()

    const requestType = searchParams?.get('requestType');
    const queryKYCStatus = searchParams?.get('KYCStatus');

    if (userRes?.cybrilla?.kyc?.status === "SUCCESSFUL" && userRes?.cybrilla?.investor_profile?.id && userRes?.cybrilla?.mf_investment_accout?.id) {
        setNeedDemographic(false);
    }

    console.log('ishdbfsdhbsdh', finalUserData)

    useEffect(() => {
        const fetchData = async () => {
            if (queryKYCStatus === 'ESIGN_REQUIRED') {
                const status = await handleESign();
            }
        };
        fetchData();
    }, [requestType]);

    useEffect(() => {
        const fetchData = async () => {
            const status = KYCStatus === 'ALREADY_EXISTS' || KYCStatus === 'SUCCESSFUL';
            if (status) {
                setIsKYCDone(true);
            } else {
                setIsKYCDone(false);
            }
        }
        fetchData();
    }, [KYCStatus])

    useEffect(() => {
        if (shouldCallAPI) {
            const submitData = async () => {
                try {
                    if (isUpdating) {
                        await updateData();
                    }
                    else {
                        await handleSubmit();
                    }
                } catch (error) {
                    console.error("Submission failed:", error);
                    toast.error("Submission failed. Please try again.");
                } finally {
                    setShouldCallAPI(false);
                }
            };

            submitData();
        }
    }, [shouldCallAPI]);

    const saveToLocalStorage = () => {
        const dataToSave = {
            userData,
            taxData,
            bankData,
            pan,
            dateOfBirth,
            aadhar,
            mobile,
            step,
        };
        localStorage.setItem('onboardingData', JSON.stringify(dataToSave));
    };

    const validatePersonalDetails = () => {
        const requiredFields = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            father_name: userData.father_name,
            mother_name: userData.mother_name,
            gender: userData.gender,
            addressLine1: userData.addressLine1,
            addressLine2: userData.addressLine2,
            addressCity: userData.addressCity,
            addressPincode: userData.addressPincode,
            maritalStatus: userData.maritalStatus,
            signature: userData.signature,
            photo: userData.photo
        };

        const emptyFields = Object.entries(requiredFields)
            .filter(([key, value]) => {
                if (key === "signature" || key === "photo") {
                    return !value || !(value as any instanceof File);
                }
                return !value || value?.trim() === "";
            })
            .map(([key]) => key);

        if (emptyFields.length > 0) {
            const fieldNames = emptyFields
                .map(field => field.replace(/([A-Z])/g, " $1").toLowerCase())
                .join(", ");
            toast.error(`Please fill out the following required fields: ${fieldNames}`);
            return false;
        }


        if (!isValidEmail(userData.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!isValidPincode(userData.addressPincode)) {
            toast.error("Please enter a valid 6-digit pincode");
            return false;
        }

        return true;
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const checkStatus = async () => {
        const body = {
            pan: pan,
            aadhar_number: aadhar,
            date_of_birth: dateOfBirth,
        }
        try {
            const tokens = Storage.getToken();
            const response = await axios.post('https://api.wealthup.me/api/v1/cybrilla/kyc/status', body, {
                headers: {
                    Authorization: `Bearer ${tokens?.access_token}`
                },
            });

            if (response?.data?.status) {
                return true;
            }
        } catch (error) {
            console.error("Error checking KYC status:", error);
            toast.error("Failed to verify KYC status. Please try again.");
            return false;
        }
    }

    const checkBankStatus = async () => {
        try {
            const tokens = Storage.getToken();
            const response = await axios.get('https://api.wealthup.me/api/v1/cybrilla/details/user/bank_account_verification', {
                headers: {
                    Authorization: `Bearer ${tokens?.access_token}`
                },
            });
            return response?.data?.data?.status;
        } catch (error) {
            console.error("Error checking Bank status:", error);
            toast.error("Failed to verify Bank status. Please try again.");
            return false;
        }
    }

    const updateBankAccountDetail = async () => {
        const body = {
            "account_holder_name": bankData?.holderName,
            "account_number": bankData?.bankAccountNumber,
            "account_type": bankData?.typeOfAccount,
            "ifsc_code": bankData?.ifscCode,
        }
        try {
            const tokens = Storage.getToken();
            const response = await axios.post('https://api.wealthup.me/api/v1/cybrilla/details/user/bank_account/update', { body }, {
                headers: {
                    Authorization: `Bearer ${tokens?.access_token}`
                }
            });

            if (response && response?.status >= 200 && response?.status < 300) {
                const status = await checkBankStatus();
                setBankVerifyStatus(status);
                setUpdatingBankAccount(false);
            }

        } catch (error) {
            console.error("Error while updating bank detail:", error);
            toast.error("Failed");
            return;
        }
    }

    const handleESign = async () => {
        try {
            const tokens = Storage.getToken();
            const response = await axios.post('https://api.wealthup.me/api/v1/kyc/kyc_esign', {
            }, {
                headers: {
                    Authorization: `Bearer ${tokens?.access_token}`
                }
            });

            if (response && response?.status >= 200 && response?.status < 300) {
                toast.error("E-Sign Completed!");
                return response.data.status;
            }
        } catch (error) {
            console.error("Error checking KYC status:", error);
            toast.error("Failed to verify KYC status. Please try again.");
            return '';
        }
    }

    const updateAddress = async () => {
        try {
            const tokens = Storage.getToken();
            const response = await axios.patch('https://api.wealthup.me/api/v1/cybrilla/kyc/update/address', {}, {
                headers: {
                    Authorization: `Bearer ${tokens?.access_token}`
                }
            });

            if (response && response?.status >= 200 && response?.status < 300) {
                toast.error("Address Updated");
                const status = await checkStatus();
                if (response?.data?.status === 'ESIGN_REQUIRED' || status === true) {
                    await handleESign();
                    localStorage.removeItem('onboardingData');
                } else {
                    const fieldsNeeded = response?.data?.kyc_object?.requirements?.fields_needed;
                    if (fieldsNeeded && fieldsNeeded?.length > 0) {
                        const fieldsText = fieldsNeeded?.join(', ');
                        toast.error(`Enter these details: ${fieldsText}`);
                    }
                    setisUpdating(true);
                }
                updateData();
                return;
            }

        } catch (error) {
            console.error("Error while updating address:", error);
            toast.error("Failed");
            return;
        } finally {
            updateData();
        }
    };

    const updateData = async () => {
        try {
            const tokens = Storage.getToken();
            const response = await axios.patch('https://api.wealthup.me/api/v1/cybrilla/kyc/update',
                finalUserData,
                {
                    headers: {
                        Authorization: `Bearer ${tokens?.access_token}`
                    }
                }
            );

            if (response && response?.status >= 200 && response?.status < 300) {
                const status = await checkStatus();
                if (response?.data?.status === 'ESIGN_REQUIRED' || status === true) {
                    await handleESign();
                    localStorage.removeItem('onboardingData');
                } else {
                    const fieldsNeeded = response?.data?.requirements?.fields_needed;
                    if (fieldsNeeded && fieldsNeeded?.length > 0) {
                        const fieldsText = fieldsNeeded?.join(', ');
                        toast.error(`Enter these details: ${fieldsText}`);
                    }
                }
                return;
            }

        } catch (error) {
            console.error("Error while updating address:", error);
            toast.error("Failed");
            return;
        }
    }

    const isValidPincode = (pincode: string) => {
        return /^\d{6}$/.test(pincode);
    };

    const nextStep = async () => {
        if (step === Step.InitialStep) {
            if (!pan) {
                toast.error("Please fill out Pan no.");
                return;
            }
            if (!aadhar || aadhar.length !== 4) {
                toast.error("Please enter valid 4-digit Aadhaar number");
                return;
            }
            if (!dateOfBirth) {
                toast.error("Please enter your Date of Birth");
                return;
            }
            const body = {
                pan: pan,
                aadhar_number: aadhar,
                date_of_birth: dateOfBirth,
            }
            try {
                const tokens = Storage.getToken();
                const response = await axios.post('https://api.wealthup.me/api/v1/cybrilla/kyc/status', body, {
                    headers: {
                        Authorization: `Bearer ${tokens?.access_token}`
                    }
                });

                if (response.data.status === true) {
                    setIsKYCDone(true);
                    toast.success("KYC is already completed. Let's collect your Demographic details.");
                } else {
                    setIsKYCDone(false);
                }
            } catch (error) {
                console.error("Error checking KYC status:", error);
                toast.error("Failed to verify KYC status. Please try again.");
                return;
            }
        }

        if (step === Step.PersonalDetails && !validatePersonalDetails()) {
            return;
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

        if (step === Step.NomineeDetails) {
            consolidateData();
        }
        if (step != Step.NomineeDetails) {
            setStep((prevStep) => {
                const newStep = Math.min(prevStep + 1, Step.Success);
                saveToLocalStorage(); // Save data to local storage after updating the step
                return newStep;
            });
        }
    };
    const handleSubmit = async () => {
        const bankDetailsBody = {
            "account_holder_name": bankData?.holderName,
            "account_number": bankData?.bankAccountNumber,
            "account_type": bankData?.typeOfAccount,
            "ifsc_code": bankData?.ifscCode,
        };
        const body = step === Step.BankDetails ? bankDetailsBody : finalUserData;
        const url = step === Step.BankDetails
            ? 'https://api.wealthup.me/api/v1/cybrilla/details/user/bank_account/update'
            : 'https://api.wealthup.me/api/v1/cybrilla/details/user/create'
        // : 'https://api.wealthup.me/api/v1/cybrilla/kyc/request';

        setLoading(true);
        try {
            const kycResponse = await axios.post(url, body, {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            if (kycResponse?.data?.identity_doc_redirect_url) {
                window.location.href = kycResponse.data.identity_doc_redirect_url;
                return;
            }

            const data = kycResponse?.data || {};

            if (kycResponse.status >= 200 && kycResponse.status < 300) {
                const bankVerifyId = data?.bank_account_verification_data?.id;
                if (bankVerifyId) setBankVerifyId(bankVerifyId);

                toast.success("Thanks for submitting details, We will notify you as soon as your account is activated");

                if (step === Step.BankDetails) {
                    setIsFetchingBankAccount(true);
                    if (["failed", "completed"].includes(bankVerifyStatus)) {
                        setStep(Step.Success);
                        setIsFetchingBankAccount(false);
                        if (bankVerifyStatus === "failed") {
                            setTimeout(() => window.location.reload(), 500);
                        } else {
                            window.location.href = "/myaccount/transact/mutualfunds?check=kyc";
                        }
                        return;
                    }
                }

                if (step === Step.NomineeDetails) {
                    setStep((prevStep) => {
                        const newStep = Math.min(prevStep + 1, Step.Success);
                        saveToLocalStorage(); // Save data after updating step
                        return newStep;
                    });
                }
            } else {
                const errorMessage =
                    data?.error?.errors?.[0]?.message ||
                    data?.error?.message ||
                    data?.error ||
                    kycResponse.statusText ||
                    `Error ${kycResponse.status}: Something went wrong.`;
                toast.error(errorMessage);
            }
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.error ||
                    error.message ||
                    error.response?.statusText ||
                    errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const previousStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, Step.InitialStep));
    };

    useEffect(() => {
        const fetchData = async () => {
            const savedData = localStorage.getItem('onboardingData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setUserData(prev => ({ ...prev, ...parsedData.userData }));
                setTaxData(parsedData.taxData);
                setBankData(parsedData.bankData);
                setPan(parsedData.pan);
                setAadhar(parsedData.aadhar);
                setMobile(parsedData.mobile);
                setStep(Step.InitialStep);
                const consolidatedData = {
                    account_holder_name: parsedData?.bankData?.holderName || "",
                    account_number: parsedData?.bankData?.bankAccountNumber || "",
                    account_type: parsedData?.bankdata?.typeOfAccount || '',
                    ifsc_code: parsedData?.bankData?.ifscCode || "",
                    pan: parsedData?.pan || "",
                    dateOfBirth: parsedData?.dateOfBirth || "",
                    aadhar_number: parsedData?.aadhar || "",
                    name: `${parsedData?.userData?.firstName || ""} ${parsedData?.userData?.lastName || ""}`,
                    address_pincode: userData?.addressPincode || "",
                    address_line_1: userData?.addressLine1 || "",
                    address_line_2: userData?.addressLine2 || "",
                    gender: parsedData?.userData?.gender || "",
                    marital_status: parsedData?.userData?.maritalStatus || "",
                    father_name: parsedData?.userData?.father_name || "",
                    mother_name: parsedData?.userData?.mother_name || "",
                    email: parsedData?.userData?.email || "",
                    phone: parsedData?.mobile || "",
                    occupation_type: parsedData?.taxData?.occupation,
                    source_of_wealth: parsedData?.taxData?.source_of_wealth,
                    income_slab: parsedData?.taxData?.income_slab,
                    residential_status: taxData?.taxStatus,
                    photo: parsedData?.userData?.photo,
                    signature: parsedData?.userData?.signature,
                };
                const formData = new FormData();
                Object.entries(consolidatedData).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                setFinalUserData(formData);
            }

            try {
                const tokens = Storage.getToken();
                if (tokens?.access_token) {
                    setAccessToken(tokens.access_token);
                    const userApiClient = new UserApi(tokens.access_token);
                    const userRes: Response = await userApiClient.getAuthMe();

                    if (userRes.ok) {
                        const me = await userRes.json();
                        setUserRes(me);
                        setPan(me?.pan);
                        setAadhar(me?.aadhaar_last_4_digit);
                        setDateOfBirth(me?.dob?.split("T")[0]);
                        if (me?.phone?.length === 12) {
                            const updatedPhone = me.phone.slice(2);
                            setMobile(updatedPhone);
                        }

                        if (me?.bank_accounts?.[0]?.ifsc) {
                            setBankData(prevData => ({
                                ...prevData,
                                holderName: `${me?.first_name} ${me?.last_name}`,
                                ifscCode: me.bank_accounts[0].ifsc,
                                bankAccountNumber: me.bank_accounts[0].account_number,
                                reEnterBankAccountNumber: me.bank_accounts[0].account_number,
                                typeOfAccount: me.bank_accounts[0].account_type,
                            }));
                        }
                        setUserData(prev => ({
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
                            gender: me?.gender || "",
                            middleName: "",
                            father_name: me?.family_details?.find((member: any) => member.relationship === 'father')?.full_name || "",
                            mother_name: me?.family_details?.find((member: any) => member.relationship === 'mother')?.full_name || "",
                            countryOfBirth: "India",
                            isPoliticallyExposed: false,
                            maritalStatus: me?.marital_status || "",
                            signature: null,
                            photo: null,
                        }));

                        setTaxData(prev => ({
                            ...prev,
                            occupation: me?.occupation_type || "",
                            taxCategory: "",
                            taxStatus: "",
                            income_slab: me?.income_slab || "",
                            source_of_wealth: me?.source_of_wealth || "",
                        }))
                        setKYCStatus(me?.cybrilla?.kyc?.status);
                        const invAccCreated = me?.cybrilla?.mf_account?.id && me?.cybrilla?.investor_profile?.id;
                        setIsAccountCreated(invAccCreated);
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!bankVerifyId) return;

        let isPolling = true;
        let timeoutId: NodeJS.Timeout | null = null;

        const poll = async () => {
            if (!isPolling) return;

            const currentStatus = await checkBankStatus();
            if (currentStatus) {
                if (currentStatus === "failed" || currentStatus === "completed") {
                    setBankVerifyStatus(currentStatus);
                    isPolling = false;
                    return;
                }
            }

            timeoutId = setTimeout(poll, POLLING_INTERVAL);
        };

        poll();

        // Cleanup on component unmount
        return () => {
            isPolling = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [bankVerifyId]);


    useEffect(() => {
        if (bankVerifyStatus === "completed") {
            toast.success("Bank verification completed successfully!");
        } else if (bankVerifyStatus === "failed") {
            toast.error("Bank verification failed. Update your Bank Details...");
            setStep(Step?.BankDetails);
            setUpdatingBankAccount(true);
        }
    }, [bankVerifyStatus]);


    const consolidateData = () => {
        const consolidatedData = {
            account_holder_name: bankData?.holderName ?? "",
            account_number: bankData?.bankAccountNumber ?? "",
            account_type: bankData?.typeOfAccount ?? "",
            ifsc_code: bankData?.ifscCode ?? "",
            pan: pan ?? "",
            aadhar_number: aadhar ?? "",
            name: `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim(),
            address_pincode: userData?.addressPincode ?? "",
            address_line_1: userData?.addressLine1 ?? "",
            address_line_2: userData?.addressLine2 ?? "",
            gender: userData?.gender ?? "",
            marital_status: userData?.maritalStatus ?? "",
            father_name: userData?.father_name ?? "",
            mother_name: userData?.mother_name ?? "",
            email: userData?.email ?? "",
            phone: mobile ?? "",
            occupation_type: taxData?.occupation ?? "",
            source_of_wealth: taxData?.source_of_wealth ?? "",
            income_slab: taxData?.income_slab ?? "",
            residential_status: taxData?.taxStatus ?? "",
            photo: userData?.photo ?? null, // Ensure it's a File object if uploading
            signature: userData?.signature ?? null, // Ensure it's a File object if uploading
        };

        console.log("fvdfvsdvsdvsdvsdvsdv", consolidatedData);

        const formData = new FormData();

        Object.entries(consolidatedData).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        console.log("fvdfvsdvsdvsdvsdvsdv 1111111111111111111", formData)



        setFinalUserData(formData);
        setTimeout(() => {
            setShouldCallAPI(true);
        }, 2000);
    };

    const renderStep = () => {
        switch (step) {
            case Step.InitialStep:
                return <InitialStep
                    aadhar={aadhar}
                    setAadhar={setAadhar}
                    nextStep={nextStep}
                    pan={pan}
                    dateOfBirth={dateOfBirth}
                    setDateOfBirth={setDateOfBirth}
                    setPan={setPan}
                    mobileNo={mobile}
                    isKYCDone={isKYCDone}
                    isMutualFund={true}
                />;
            case Step.PersonalDetails:
                return <PersonalDetails
                    nextStep={nextStep}
                    userRes={userRes}
                    userData={userData}
                    mobileNo={mobile}
                    setUserData={setUserData}
                    isMutualFund={true}
                    needDemographic={needDemographic}
                />;
            case Step.TaxDetails:
                return <TaxDetails
                    nextStep={nextStep}
                    taxData={taxData}
                    setTaxData={setTaxData}
                />;
            case Step.NomineeDetails:
                return <NomineeDetails nextStep={nextStep} isLoading={loading} />;
            case Step.BankDetails:
                return <BankDetails
                    nextStep={nextStep}
                    setBankData={setBankData}
                    bankData={bankData}
                    isLoading={loading}
                />;
            case Step.Success:
                return <SuccessPage />;
            default:
                return <InitialStep
                    aadhar={aadhar}
                    setAadhar={setAadhar}
                    nextStep={nextStep}
                    pan={pan}
                    dateOfBirth={dateOfBirth}
                    setDateOfBirth={setDateOfBirth}
                    setPan={setPan}
                    mobileNo={mobile}
                    isKYCDone={isKYCDone}
                    isMutualFund={true}
                />;
        }
    };

    if (false) {
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
        <div className="relative">
            <HeaderNav
                showBtn={true}
                showNotification={true}
                whatsapp={false}
                title="Complete Onboarding"
            />
            <div className="flex flex-col items-center justify-center bg-[#E7F9F2] lg:py-4">
                {<BankVerificationPopup isOpen={isFetchingBankAccount} />}
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
                                    <p className="text-base text-[#035782] text-center font-medium -mb-1">
                                        {isKYCDone ? 'Your KYC is completed. We need to get some demographic details.' : 'Your KYC is not completed yet.'}
                                    </p>
                                    <p className="text-lg text-[#035782] font-semibold">Let&apos;s Get Started</p>
                                    {!isKYCDone && <p className="text-base text-[##4A5151] font-normal -mt-5">with some basic details about you and how you will be transacting.</p>}
                                </div>
                            </div>
                            <div className="relative flex justify-around items-center mb-2 text-[#4A5151] text-center">
                                {/* Step 1: Personal Details */}
                                <div
                                    className={`flex flex-col items-center z-10 cursor-pointer`}
                                    onClick={() => {
                                        setStep(Step.PersonalDetails);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    <div
                                        className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[20px] font-semibold ${step === Step.PersonalDetails
                                            ? "bg-[#2E87B9] text-white"
                                            : "border bg-white border-[#035782] text-[#035782]"
                                            }`}
                                    >
                                        1
                                    </div>
                                    <p className="mt-2 text-sm">Personal<br /> Details</p>
                                </div>

                                {/* Connecting dotted line (above text, centered between circles) */}
                                <div className="absolute w-full transform top-5 flex justify-between px-10">
                                    <div className="border-t-2 border-dotted border-gray-300 w-[65%] text-center flex justify-center mx-auto"></div>
                                    <div className="border-t-2 border-dotted border-gray-300 w-full"></div>
                                    <div className="border-t-2 border-dotted border-gray-300 w-full"></div>
                                </div>

                                <div
                                    className={`flex flex-col items-center z-10 cursor-pointer`}
                                    onClick={() => {
                                        setStep(Step.TaxDetails);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    <div className="flex flex-col items-center z-10">
                                        <div
                                            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[20px] font-semibold ${step === Step.TaxDetails ? "bg-[#2E87B9] text-white" : "border bg-white border-[#035782] text-[#035782]"}`}
                                        >
                                            2
                                        </div>
                                        <p className="mt-2 text-sm">Tax<br /> Details</p>
                                    </div>
                                </div>

                                <div
                                    className={`flex flex-col items-center z-10 cursor-pointer`}
                                    onClick={() => {
                                        setStep(Step.NomineeDetails);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    <div className="flex flex-col items-center z-10">
                                        <div
                                            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[20px] font-semibold ${step === Step.NomineeDetails ? "bg-[#2E87B9] text-white" : "border bg-white border-[#035782] text-[#035782]"}`}
                                        >
                                            3
                                        </div>
                                        <p className="mt-2 text-sm">Nominee<br /> Details</p>
                                    </div>
                                </div>

                                <div
                                    className={`flex flex-col items-center z-10 cursor-pointer`}
                                    onClick={() => {
                                        setStep(Step.BankDetails);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    <div className="flex flex-col items-center z-10">
                                        <div
                                            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[20px] font-semibold ${step === Step.BankDetails ? "bg-[#2E87B9] text-white" : "border bg-white border-[#035782] text-[#035782]"}`}
                                        >
                                            4
                                        </div>
                                        <p className="mt-2 text-sm">Bank<br /> Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="text-[#4A5151]">{renderStep()}</div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
