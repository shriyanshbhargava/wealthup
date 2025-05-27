"use client"
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { debounce, fetchFunds, mandateAuth, mandateCreate } from "./HelpingFunctions";
import { FaCheckCircle } from "react-icons/fa";

interface KYCModalProps {
    setIsModalOpen: (isOpen: boolean) => void;
    isModalOpen: boolean;
    textMessage: string;
    KYCStatus: string;
}

interface KycStatusPopupProps {
    queryCheck: string;
    invAccCreated: boolean;
}

interface MandateModalProps {
    onClose: () => void;
    body: any;
    setIsAuthSucess: (value: boolean) => void;
    setMandateID: any;
    access_token: string;
    approvedMandatesList: any;
    mandatesList: any;
}

interface OtpModalProps {
    onclose: () => void;
    otp: string;
    setOtp: (otp: string) => void;
    closeModal: any;
}

interface AllFundsInputProps {
    onClick: any;
    access_token: string;
    setSearchTerm: any;
    searchTerm: any;
}

const KYCModal: React.FC<KYCModalProps> = ({ setIsModalOpen, isModalOpen, textMessage, KYCStatus }) => {

    const [buttonText, setButtonText] = useState('Ok')

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setButtonText('Redirecting to KYC completion...');
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1000)
        window.location.href = `/myaccount/mutual-fund-onboarding?KYCStatus=${KYCStatus}`
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" style={{ zIndex: 999999999 }}>
            <div className="bg-white w-11/12 md:w-1/3 rounded-2xl p-6 shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={handleClose}
                >
                    X
                </button>
                <h2 className="text-xl font-semibold mb-4">{textMessage ? textMessage : 'Your KYC is not completed'}</h2>
                <p className="mb-6">{KYCStatus === 'SUBMITTED' ? '' : KYCStatus === 'PENDING' ? 'Please Complete Mandatory Fields' : 'Do you want to complete it?'}</p>
                {
                    KYCStatus != 'SUBMITTED' &&
                    (
                        <button
                            className="w-full h-[50px] bg-[#FB7706] text-white border border-[#FB7706] text-[18px] font-semibold rounded-[4px] mx-auto"
                            onClick={handleOk}
                        >
                            {buttonText}
                        </button>
                    )
                }
            </div>
        </div>
    );
};

const KycStatusPopup: React.FC<KycStatusPopupProps> = ({ queryCheck, invAccCreated }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (queryCheck !== 'kyc') return;

        const timer = setTimeout(() => {
            if (invAccCreated) {
                toast.success('Your Investment Account is Activated. You can start investing now!');
            } else {
                setShowPopup(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [queryCheck, invAccCreated]);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        showPopup ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" style={{ zIndex: 99999999 }}>
                <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                    <p className="text-xl font-semibold">Your Investment Account is Not Activated Yet.</p>
                    <p className="text-lg text-gray-600 mt-2">Refresh to check updated status</p>
                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="mt-4 bg-[#FB7706] text-white px-4 py-2 rounded-lg"
                    >
                        {isLoading ? (
                            // Loader: you can customize this spinner as needed.
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        ) : (
                            'Refresh'
                        )}
                    </button>
                </div>
            </div>
        )
            : null
    );
};

const MandateModal: React.FC<MandateModalProps> = ({
    onClose,
    body,
    setIsAuthSucess,
    setMandateID,
    access_token,
    approvedMandatesList,
    mandatesList
}) => {

    const handleCreate = async () => {
        const data = await mandateCreate(access_token, body);
        if (data?.auth_url) {
            setMandateID(data?.id);
            setIsAuthSucess(true);
            onClose();
            window.open(data?.auth_url);
        }
    }

    const handleMandateApi = async (id: any, status: string) => {
        const data = status === 'CREATED'
            ? await mandateAuth(access_token, id)
            : await mandateCreate(access_token, body);

        const url = data?.token_url || data?.auth_url;

        if (url) {
            setMandateID(data?.id);
            setIsAuthSucess(true);
            onClose();
            window.open(url);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl  p-6 shadow-lg">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold">Mandates</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </div>
                {
                    mandatesList && mandatesList?.length > 0 ?
                        <div className="grid lg:grid-cols-3 gap-5 py-2">
                            {
                                mandatesList?.map((mandate: any) => (
                                    <button onClick={() => handleMandateApi(mandate?.id, mandate?.mandate_status)} key={mandate.id} className="bg-white cursor-pointer w-fit text-sm rounded-2xl shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-2">
                                        <h2 className="text-base font-semibold mb-2">Mandate Ref: {mandate.mandate_ref}</h2>
                                        <p className="text-gray-600 mb-1 text-sm"><strong>Bank Account ID:</strong> {mandate.bank_account_id}</p>
                                        <p className="text-gray-600 mb-1 text-sm"><strong>Limit:</strong> ₹{mandate.mandate_limit}</p>
                                        <p className="text-gray-600 mb-1 text-sm"><strong>UMRN:</strong> {mandate.umrn}</p>
                                        <p className="text-green-700 font-medium text-sm"><strong className="text-[#FB7706]">Status:</strong> {mandate.mandate_status}</p>
                                        <p className="text-gray-500 text-sm mt-3">Approved At: {new Date(mandate.approved_at).toLocaleString()}</p>
                                    </button>
                                ))
                            }
                        </div>
                        :
                        <div className="flex flex-col max-w-2xl items-center justify-center py-16">
                            <div className="text-5xl text-gray-400">⚠️</div>
                            <p className="text-lg text-gray-600 mt-4">No active mandates available</p>
                            <button
                                className="text-[#FB7706] hover:underline mt-2"
                                onClick={handleCreate}
                            >
                                Create a mandate
                            </button>
                        </div>
                }
            </div>
        </div>
    );
};

const OtpModal: React.FC<OtpModalProps> = ({ onclose, otp, setOtp, closeModal }) => {
    const handleChange = (e: any) => {
        setOtp(e.target.value);
    };
    useEffect(() => {
        toast.success("OTP Sent Successful!");
    }, [])
    const handleSubmit = () => {
        if (otp) {
            onclose();
        }
        else {
            toast.error('Wrong otp');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                >
                    ✖
                </button>

                <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full h-[50px] text-white bg-[#FB7706] border border-[#FB7706] text-[16px] lg:text-[18px] font-semibold rounded-[4px]"
                >
                    Submit
                </button>
            </div>
        </div>

    )
}


const AllFundsInput: React.FC<AllFundsInputProps> = ({ onClick, searchTerm, setSearchTerm, access_token }) => {
    const [options, setOptions] = useState<any>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const debouncedFetchFunds = useMemo(() =>
        debounce(async (query: any) => {
            const funds = await fetchFunds(query, access_token);
            setOptions(funds);
        }, 300),
        [fetchFunds, access_token]
    );

    useEffect(() => {
        if (searchTerm.length > 1) {
            debouncedFetchFunds(searchTerm);
        } else {
            setOptions([]);
        }
    }, [searchTerm, debouncedFetchFunds]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest(".funds-dropdown")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full funds-dropdown">
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for fund"
                onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && options.length > 0 && (
                <div className="absolute left-0 z-50 mt-1 w-full bg-white border border-gray-200 shadow-md rounded-md max-h-40 overflow-y-auto">
                    {options.map((option: any) => (
                        <div
                            key={option.value}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => {
                                onClick(option); // Pass the option to the parent component
                                setSearchTerm(option.label);
                                setIsDropdownOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PaymentSucessModal: React.FC<{ setShowPaymentModel: any, funds: any }> = ({ setShowPaymentModel, funds }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setShowPaymentModel(false);
                    window.location.href = '/myaccount/transact/mutualfunds'
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [setShowPaymentModel]);


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                style={{ backgroundImage: "url('/assets/ribbon.gif')", backgroundSize: 'contain', backgroundPosition: 'center' }}
                className="bg-white p-6 rounded-md flex flex-col items-center shadow-lg lg:w-[30%] lg:mx-0 mx-4 lg:h-auto"
            >
                <FaCheckCircle className="text-4xl text-[#01C8A9] my-3" />
                <h1 className="text-3xl font-bold text-[#035782]">Congrats!</h1>
                <h1 className="text-2xl font-medium mb-4">Payment successful.</h1>

                {funds?.length > 0 && (
                    <div className="w-full mt-3 px-4">
                        <h2 className="text-lg font-semibold text-[#035782] mb-2">Details:</h2>
                        <div className="w-full space-y-2">
                            {funds.map((fund: { name: string; value: string; amount: string }, index: number) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-md shadow-sm bg-gray-50">
                                    <p className="text-sm font-medium text-gray-700">Fund Name: <span className="font-semibold">{fund.name}</span></p>
                                    <p className="text-sm text-gray-600">Value: <span className="font-semibold">{fund.value}</span></p>
                                    <p className="text-sm text-gray-600">Amount: <span className="font-semibold">{fund.amount}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setShowPaymentModel(false)}
                    className="bg-[#FB7306] mt-7 text-white font-medium py-2 px-4 rounded-md"
                >
                    Redirecting you in {countdown} s
                </button>
            </div>
        </div>

    )
}


export {
    OtpModal,
    KycStatusPopup,
    KYCModal,
    MandateModal,
    AllFundsInput,
    PaymentSucessModal
}