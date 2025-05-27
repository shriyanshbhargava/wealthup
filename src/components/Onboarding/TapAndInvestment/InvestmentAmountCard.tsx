"use client";

import React, { useEffect, useRef, useState } from "react";
import ReinvestFeatureModal, { ReinvestTerms } from "./ReinvestFeatureModal";

import Cross from "@/assets/tapAndInvestment/cross.svg";
import DownArrow from "@/assets/tapAndInvestment/down-arrow.svg";
import { IDealDetails } from "./DetailsCard";
import Image from "next/image";
import Storage from "@/utils/storage";
import UpArrow from "@/assets/tapAndInvestment/up-arrow.svg";
import { UserApi } from "@/api/services/user/UserApi";
import { apiUrl } from "@/utils/constants";
import { cashfree } from "@/utils/utils";
import { setFips } from "crypto";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// import { Deal } from "@/app/tap-and-invest/page";









interface InvestmentAmountCardProps {
    dealData?: IDealDetails;
    walletBalance: number;
    dealId: string;
    payBalance: string;
    orderId: string;
    financeType: string;
    hasCalledCheckStatus: any;
}

interface CashfreeWindow extends Window {
    Cashfree: any;
}


const InvestmentAmountCard = ({ dealData, walletBalance, dealId, payBalance, orderId, financeType, hasCalledCheckStatus }: InvestmentAmountCardProps) => {
    const [showReinvest, setShowReinvest] = useState(false);
    const [scheduleExpand, setScheduleExpand] = useState(false);
    const [paymentPage, setPaymentPage] = useState(false);
    const [rechargeNow, setRechargeNow] = useState(false);
    const [balance, setBalance] = useState(() => {
        return payBalance ? Number(payBalance) : dealData?.minInvestment?.amount ?? 25000;
    });

    const [isLoading, setIsLoading] = useState(false)
    const [stayInvested, setStayInvested] = useState(true);
    const [success, setSuccess] = useState(false);
    const [sessionID, setSessionID] = useState('');
    const [isTapChecked, setIsTapChecked] = useState(true);
    const [onboarded, setOnboarded] = useState("INCOMPLETE");

    const handleClose = () => {
        setShowReinvest(!showReinvest);
    };

    function calculateReturnAmount(amount: number, netIRR: number, days: number, totalDaysInYear = 365) {
        // Calculate the fraction of the year
        const fractionalPeriod = days / totalDaysInYear;

        // Calculate the return amount
        const returnAmount = amount * Math.pow((1 + netIRR), fractionalPeriod);

        return returnAmount;
    }

    const returnAmount =
        dealData?.minInvestment?.returnAmount !== undefined &&
            dealData?.minInvestment?.amount !== undefined
            ? (dealData.minInvestment.returnAmount / dealData.minInvestment.amount) * balance
            : 0;


    console.log("returnAmount", balance ?? 0, dealData?.minInvestment?.netIRR ?? 0, dealData?.tenure, returnAmount)

    const handlePaymentClose = () => {
        setPaymentPage(!paymentPage);
    };

    console.log("dealData", dealData)

    const tokenData = Storage.getToken();
    const access_token = tokenData?.access_token;

    // useEffect(() => {
    //     if (success) {
    //         const timer = setTimeout(() => setSuccess(false), 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [success]);

    const isButtonDisabled = dealData?.minInvestment?.amount ? balance < dealData.minInvestment.amount : false;


    const handlePayment = async (auto?: boolean) => {
        if (dealData?.minInvestment?.amount && balance < dealData?.minInvestment?.amount) {
            toast.error(`Cannot Invest amount less than ${dealData?.minInvestment?.amount?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            })}`)
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/tapinvest/investment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    type: auto ? financeType : dealData?.financeType,
                    amount: auto ? payBalance : balance,
                    dealId: auto ? dealId : dealData?.id,
                    ...(stayInvested && { stayInvested: true })
                }),
            });

            if (!res.ok) {
                // Try to parse the error response
                const errorData = await res.json();
                const errorMsg = errorData?.message || `Request failed with status ${res.status}`;
                throw new Error(errorMsg);
            }

            const data = await res.json();


            if (data?.code >= 200 && data?.code < 300) {
                setSuccess(true);
                toast.success("Investment successful!");

                setTimeout(() => {
                    window.location.href = '/myaccount/transact/invoicediscounting';
                }, 4000);

            } else {
                const errorMsg = data?.message || "Something went wrong.";
                toast.error(errorMsg);

                setTimeout(() => {
                    window.location.href = '/myaccount/transact/invoicediscounting';
                }, 4000);


            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message); // Display the exact error message
                setTimeout(() => {
                    window.location.href = '/myaccount/transact/invoicediscounting';
                }, 4000);

            } else {
                setTimeout(() => {
                    window.location.href = '/myaccount/transact/invoicediscounting';
                }, 4000);

                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    // console.log("dealdata",dealData)




    const handleRedirect = async () => {
        if (onboarded !== "ONBOARDED") {
            window.location.href = "/myaccount/onboarding";
            return;
        }
        if (dealData?.minInvestment?.amount && balance < dealData?.minInvestment?.amount) {
            toast.error(`Cannot Invest amount less than ${dealData?.minInvestment?.amount?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            })}`)
            return;
        }
        setIsLoading(true);

        try {
            const res = await fetch(`${apiUrl}/api/v1/tapinvest/wallet/recharge`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    amount: balance - walletBalance,
                    // returnUrl: `http://localhost:3000/transact?dealId=${dealId}&amount=${balance}&financeType=${dealData?.financeType}`,
                    // returnUrl: `https://wealthup.me/transact?dealId=${dealId}&amount=${balance}&financeType=${dealData?.financeType}`,
                    returnUrl: `https://wealthup-frontend-copy.vercel.app/myaccount/myaccount/myaccount/transact/invoicediscounting/invoicediscounting/invoicediscounting?dealId=${dealId}&amount=${balance}&financeType=${dealData?.financeType}`,
                }),
            });

            if (!res.ok) {
                // Try to parse the error response
                const errorData = await res.json();
                const errorMsg = errorData?.message || `Request failed with status ${res.status}`;
                throw new Error(errorMsg);
            }

            const data = await res.json();

            if (data?.data?.cashOrderSessionId) {
                setSessionID(data.data.cashOrderSessionId);
                toast.success("Session created successfully!");
            } else {
                // Handle missing session ID or unexpected response structure
                const errorMsg = data?.message || "Failed to create session.";
                toast.error(errorMsg);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message); // Display the exact error message
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    const checkStatus = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/tapinvest/payments/check-status/${orderId}?type=RECHARGE`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${access_token}`,
                },
            });

            if (!res.ok) {
                // Handle non-200 HTTP status codes
                const errorMsg = `Request failed with status ${res.status}`;
                throw new Error(errorMsg);
            }

            const data = await res.json();

            if (data?.code >= 200 && data?.code < 300) {
                if (data?.data?.orderStatus === "PAID") {
                    toast.success("Payment successful!"
                    );
                    handlePayment(true);
                    //    
                } else {
                    toast.error("Payment Status is" + data?.data?.orderStatus);
                }
                console.log("Status check succeeded", data);
                console.log("Payment handling triggered");
            } else {
                // Handle unexpected response codes
                const errorMsg = data?.message || "Failed to check status.";
                toast.error(errorMsg);


            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Error while checking status:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (sessionID && typeof window !== 'undefined') {
            const cf = new (window as unknown as CashfreeWindow).Cashfree(sessionID);
            cf.redirect();
            setIsLoading(false);
        }
    }, [sessionID]);

    useEffect(() => {
        if (!hasCalledCheckStatus.current && dealId && orderId && payBalance) {
            hasCalledCheckStatus.current = true;
            checkStatus();
        }
    }, [orderId]);



    useEffect(() => {
        (async () => {
            const tokens = Storage.getToken();
            if (tokens !== null) {
                const userApiClient = new UserApi(tokens.access_token);
                const res = await userApiClient.getAuthMe();
                if (res.status === 200) {
                    const data = await res.json();
                    let status = data?.tap_invest?.onboarding_status
                    setOnboarded(status)
                }
            }
        })();
    }, []);



    const today = new Date();
    const formattedTodayDate = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
    });

    const scheduleDate = new Date(today);
    dealData && scheduleDate.setDate(today.getDate() + dealData.tenure);

    const formattedScheduleDate = scheduleDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
    });


    return (
        <>
            {success &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="relative w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 border-4 border-green-500 rounded-full opacity-50"></div>
                            <div className="absolute w-full h-full">
                                <span className="absolute h-[5px] bg-green-500 rounded-full transform origin-top-left rotate-45 top-[48%] left-[26%] w-[28px] animate-[icon-line-tip_0.75s]"></span>
                                <span className="absolute h-[5px] bg-green-500 rounded-full transform origin-top-right rotate-[-45deg] top-[35%] right-[25%] w-[50px] animate-[icon-line-long_0.75s]"></span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showReinvest && <Reinvest handleClose={handleClose} />}
            {paymentPage && <ReinvestFeatureModal handleRedirect={handleRedirect} handlePayment={handlePayment} handleClose={handlePaymentClose} dealData={dealData} balance={balance} rechargeNow={rechargeNow} />}
            <div className="md:p-6 space-y-4 w-full h-full md:space-y-5 pb-14 md:pb-0">
                <div className="border rounded-lg shadow-md bg-white">
                    <h2 className="font-semibold uppercase text-lg text-gray-500 p-4 pb-0">
                        INVESTMENT AMOUNT
                    </h2>
                    <div className="flex px-4 items-center">
                        <span className="text-3xl md:text-4xl font-bold text-gray-800">
                            <input
                                type="text"
                                className={`lg:text-3xl md:text-2xl font-bold text-gray-800 w-[90%] border-none rounded px-2`}
                                value={`₹ ${Number(balance).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 0,
                                }).slice(1)}`}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                    setBalance(Number(numericValue));
                                }}
                            />
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 p-4">
                        <button
                            onClick={() => setBalance(balance + 10000)}
                            className="px-4 py-2 bg-[rgba(0,178,178,0.40)] text-primary-blue rounded-full text-sm font-semibold hover:bg-[#D6EBD8]"
                        >
                            +₹10,000
                        </button>
                        <button
                            onClick={() => setBalance(balance + 25000)}
                            className="px-4 py-2 bg-[rgba(0,178,178,0.40)] text-primary-blue rounded-full text-sm font-semibold hover:bg-[#D6EBD8]"
                        >
                            +₹25,000
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-between gap-4 rounded-b-lg p-4 bg-[#F6F6F1]">
                        <div>
                            <h3 className="font-semibold uppercase text-sm md:text-lg text-gray-500 underline decoration-dashed underline-offset-4">
                                XIRR
                            </h3>
                            <p className="text-xl md:text-xl font-medium text-gray-800">
                                {dealData?.minInvestment?.netIRR?.toFixed(2)}%
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold uppercase text-sm md:text-lg text-gray-500 underline decoration-dashed underline-offset-4">
                                Tenure
                            </h3>
                            <p className="text-xl md:text-xl font-medium text-gray-800">{dealData?.tenure}d</p>
                        </div>
                        <div>
                            <h3 className="font-semibold uppercase text-sm md:text-lg text-gray-500 underline decoration-dashed underline-offset-4">
                                Returns
                            </h3>
                            <p className="text-xl md:text-xl font-medium text-primary-blue">

                                {`${Math.round(Number(returnAmount)).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 0,
                                })}`}
                            </p>

                        </div>
                    </div>
                </div>


                <div className="border flex flex-col rounded-lg shadow-md bg-white">
                    <div className="flex justify-between p-4">
                        <div>
                            <h3 className="font-semibold uppercase text-lg text-gray-500">
                                Returns Schedule
                            </h3>
                            <p className="text-sm md:text-base font-semibold uppercase text-gray-400">
                                {formattedTodayDate} to {formattedScheduleDate}
                            </p>
                        </div>
                        <button onClick={() => setScheduleExpand(!scheduleExpand)}>
                            <Image
                                src={!scheduleExpand ? DownArrow : UpArrow}
                                width={15}
                                height={15}
                                alt="Down-Arrow"
                            />
                        </button>
                    </div>
                    {scheduleExpand && (
                        <div className="relative mt-2">
                            <table className="w-full border-collapse text-sm md:text-base">
                                <thead>
                                    <tr className="text-center bg-[#F6F6F1]">
                                        <th className="p-4">Key Events</th>
                                        <th className="p-4">Dates</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td className="p-4">Investment Date</td>
                                        <td className="p-4">{formattedTodayDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Settlement Date</td>
                                        <td className="p-4">{formattedTodayDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">Payout Date</td>
                                        <td className="p-4">{formattedScheduleDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="flex justify-between w-full items-center border p-4 rounded-lg shadow-md bg-white">
                    <div>
                        <h3 className="font-semibold m-0 uppercase text-lg text-gray-500">Reinvest on maturity</h3>
                        <button onClick={() => setShowReinvest(true)} className="font-semibold uppercase m-0 text-base text-gray-400 underline decoration-dashed underline-offset-4">Learn more</button>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={stayInvested} onChange={() => { setStayInvested(!stayInvested) }} />
                        <div className="w-16 h-8 bg-gray-200 rounded-full peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-blue"></div>
                    </label>
                </div>

                <div className="p-4 flex flex-wrap justify-between items-center gap-2">
                    <span className="text-sm md:text-base font-semibold uppercase text-gray-500">
                        WALLET BALANCE: {Number(walletBalance).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
                {walletBalance < balance ?
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                // console.log("showReinvest",showReinvest)
                                if (isButtonDisabled) {
                                    toast.error(`Cannot Invest amount less than ${dealData?.minInvestment?.amount?.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        maximumFractionDigits: 0,
                                    })}`)
                                }
                                else if (stayInvested && onboarded == "ONBOARDED") {
                                    setRechargeNow(true);
                                    setPaymentPage(true);
                                    // handlePayment(false)
                                } else {
                                    handleRedirect()
                                }
                            }}
                            className={`w-[75%] md:w-full px-5 md:px-0 py-2 md:py-3 mx-auto bg-[#FF7300] text-white font-semibold text-base md:text-lg rounded-md flex justify-center items-center ${isLoading || isButtonDisabled ? "cursor-not-allowed opacity-75" : ""}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : onboarded !== "ONBOARDED" ? (
                                <div> Complete Your KYC</div>
                            ) : (
                                <>
                                    Invest -{" "}
                                    {Number(balance - walletBalance).toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        maximumFractionDigits: 2,
                                    })}
                                </>
                            )}
                        </button>


                        {/* <p className="text-sm mt-1">Your balance amount is: {Number(walletBalance).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                        })}. You will need to recharge first.</p> */}
                    </div>
                    :
                    <div>
                        <button
                            onClick={() => {
                                // console.log("showReinvest",showReinvest)
                                if (isButtonDisabled) {
                                    toast.error(`Cannot Invest amount less than ${dealData?.minInvestment?.amount?.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        maximumFractionDigits: 0,
                                    })}`)
                                }
                                else if (stayInvested) {
                                    // setPaymentPage(true)
                                    setRechargeNow(false);

                                } else {
                                    handlePayment(false)

                                }
                            }}
                            className={`md:w-full px-5 md:px-0 py-2 md:py-3 mx-auto bg-[#FF7300] text-white font-semibold text-base md:text-lg rounded-md flex justify-center items-center ${isLoading || isButtonDisabled ? "cursor-not-allowed opacity-75" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Invest -{" "}
                                    {Number(balance).toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        maximumFractionDigits: 2,
                                    })}
                                </>
                            )}
                        </button>
                        <p className="text-sm mt-1">Your amount will be deducted from your wallet balance. Your current balance is: {Number(walletBalance).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                        })}
                        </p>
                    </div>
                }
            </div>
        </>
    );
};

export default InvestmentAmountCard;

const Reinvest = ({ handleClose }: any) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white relative p-6 md:p-8 rounded-lg shadow-lg w-full h-full md:w-[40%] md:h-auto overflow-auto">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl md:text-2xl font-bold uppercase">Reinvest</h3>
                    <button
                        onClick={handleClose}
                        className="absolute right-5 top-5 bg-slate-200 p-2 rounded-full"
                    >
                        <Image src={Cross} width={15} height={15} alt="Cross" />
                    </button>
                </div>
                <div className="mt-4 text-sm md:text-base">
                    <p>
                        Automatically reinvest your payout in the same company. Your payout will
                        be reinvested only if the XIRR is equal to or greater than the current
                        investment and the tenure remains the same.
                    </p>
                </div>
            </div>
        </div>
    );
};
