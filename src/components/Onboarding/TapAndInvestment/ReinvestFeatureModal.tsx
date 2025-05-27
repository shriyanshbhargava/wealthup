"use client"

import React, { useEffect, useState } from "react";

import Cross from "@/assets/tapAndInvestment/cross.svg";
import { IDealDetails } from "./DetailsCard";
import Image from "next/image";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { apiUrl } from "@/utils/constants";

interface ReinvestFeatureModalProps {
    handleClose: () => void;
    dealData?: IDealDetails;
    balance: number;
    handleRedirect: (arg0: boolean) => void;
    handlePayment: (arg0: boolean) => void;
    rechargeNow: boolean;
}


const ReinvestFeatureModal: React.FC<ReinvestFeatureModalProps> = ({ handleClose, dealData, balance, handleRedirect, rechargeNow, handlePayment }) => {
    const [terms, setTerms] = useState(false);
    const [name, setName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleTermClose = () => {
        setTerms(!terms);
    };

    useEffect(() => {
        (async () => {
            const tokens = Storage.getToken();
            if (tokens !== null) {
                const userApiClient = new UserApi(tokens.access_token);
                const res = await userApiClient.getMe();
                if (res.status === 200) {
                    const data = await res.json();

                    setName(data?.first_name + " " + data?.last_name);
                } else {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        })();
    }, []);

    return (
        <div className="bg-black md:ml-[250px] bg-opacity-50 fixed inset-0 overflow-y-auto flex justify-center pb-9 items-center z-50">

            {terms && <ReinvestTerms dealData={name} handleClose={handleTermClose} />}
            <div className="relative bg-[#FBFBF6] w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] h-[90%] sm:h-[70%] md:h-[75%] lg:h-[65%] rounded-lg shadow-lg flex flex-col p-6 sm:p-10 md:p-8">
                <div className="flex-1 overflow-y-auto relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-blue">
                            New Feature
                        </h2>
                        <button onClick={handleClose} className="bg-slate-200 p-2 sm:p-3 rounded-full ">
                            <Image
                                src={Cross}
                                width={15}
                                height={15}
                                alt="Close"
                            />
                        </button>
                    </div>

                    <h1 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold mb-4">
                        You have chosen to Reinvest in {dealData?.company?.registeredName}
                    </h1>
                    <p className="font-medium text-sm sm:text-base md:text-sm text-gray-400">
                        We now have Reinvesting as a feature for select deals. By enabling
                        this feature your payout will automatically be invested again in the
                        same company on better or same terms.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-semibold text-sm sm:text-base">Company</span>
                            <span className="font-medium text-sm sm:text-xl md:text-xl">{dealData?.company?.registeredName}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-semibold text-sm sm:text-base">XIRR</span>
                            <span className="font-medium text-sm sm:text-xl md:text-xl">{dealData?.minInvestment?.netIRR?.toFixed(2)}% or more</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-semibold text-sm sm:text-base">Tenure</span>
                            <span className="font-medium text-sm sm:text-xl md:text-xl">{dealData?.tenure} Days</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-600 bg-gray-100 p-3 rounded-lg font-semibold text-sm sm:text-base md:text-sm mb-4 flex items-center space-x-2">
                            <InfoImg primaryColor="#6B7280" secondaryColor="#9CA3AF" />
                            <span>
                                By clicking Reinvest you agree to the{" "}
                                <button onClick={() => {
                                    setTerms(true)
                                }} className="underline underline-offset-3">
                                    Reinvestment Terms.
                                </button>
                            </span>
                        </p>
                        <p className="text-primary-blue bg-[rgba(0,178,178,0.13)] p-3 flex gap-2 items-center rounded-lg font-semibold text-sm sm:text-base md:text-sm">
                            <InfoImg primaryColor="#166534" secondaryColor="#166534" />
                            You can opt out later, up to 2 days before payouts.
                        </p>
                    </div>
                </div>

                {/* Button container at the bottom */}
                <div className="flex justify-end space-x-4 mt-auto">
                    <button onClick={handleClose} className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border text-sm sm:text-base md:text-lg font-bold border-gray-300 rounded-2xl text-gray-600 hover:bg-gray-100">
                        Don&apos;t Reinvest
                    </button>
                    <button onClick={() => { rechargeNow ? handleRedirect(false) : handlePayment }} className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-bold bg-[#FF7300] text-white rounded-2xl">
                        Reinvest
                    </button>
                </div>
            </div>
        </div>

    );
};



const InfoImg: React.FC<{ primaryColor: string; secondaryColor: string }> = ({
    primaryColor,
    secondaryColor,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 50 50"
            fill="none"
        >
            <circle cx="25" cy="25" r="23" stroke={primaryColor} strokeWidth="2" />
            <path
                fill={secondaryColor}
                d="M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"
            />
        </svg>
    );
};

export default ReinvestFeatureModal;

export const ReinvestTerms = ({ handleClose, dealData }: any) => {
    console.log("dealData", dealData);
    return (
        <div
            className="fixed md:ml-[250px]  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{ zIndex: 2147483647 }}
        >
            <div
                className="bg-white relative md:h-3/4 h-full lg:py-10 p-6 md:p-8 rounded-lg shadow-lg w-full md:w-[75%] overflow-y-auto"
                style={{ // Ensures height compatibility
                    maxHeight: "calc(100vh - 8rem)", // Prevents overflow
                    overflowX: "hidden", // Safeguard horizontal overflow
                    boxSizing: "border-box", // Consistent box sizing
                }}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-xl md:text-2xl font-bold uppercase">
                        Reinvestment Terms
                    </h3>
                    <button
                        onClick={handleClose}
                        className="absolute right-5 top-5 bg-slate-200 p-2 rounded-full"
                        style={{ zIndex: 2147483648 }} // Ensures button stays on top
                    >
                        <Image src={Cross} width={15} height={15} alt="Cross" />
                    </button>
                </div>
                <div className="mt-4 text-sm md:text-base space-y-4">
                    <p>
                        <strong>Sub.</strong> Authority to invest Receivables.
                    </p>
                    <p>
                        <strong>Ref.</strong> Service Agreement dated 12th Dec&apos;24 executed by the Seller and the Purchaser and the Company (“Agreement”)
                    </p>
                    <p>
                        Through this Consent Letter (the &quot;Letter&quot;) I, <strong>{dealData}</strong>, the Purchaser, by activating the consent toggle on the Platform, hereby grant my consent to the Company to reinvest the Receivables (in proportion to my share in the Receivables) received in the Escrow Account on my behalf. By enabling the reinvestment toggle feature, I explicitly consent to be bound by the Terms and Conditions of <strong>www.wealthup.in</strong>, subsequent service agreements, Privacy Policy, Risk Disclosure, and such other agreements that may be executed between the Company and me.
                    </p>
                    <p>
                        The reinvested amount shall be deployed for the purpose of purchasing the other Invoices of the Seller pursuant to a separate Service Agreement to be executed on this behalf through the platform <strong>Wealthup</strong>.
                    </p>
                    <p>
                        <strong>This consent is provided under the following terms:</strong>
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>
                            The Credit Period of the new service agreement will be identical to the credit period stipulated in the Agreement.
                        </li>
                        <li>
                            The Internal Rate of Return (IRR) for the new service agreements will be equal to or greater than the IRR agreed upon in the Agreement.
                        </li>
                    </ul>
                    <p>
                        I acknowledge that I shall not withdraw my consent after executing a new Service Agreement. It is hereby clarified that consent can be withdrawn 2 days prior to execution of the new service agreement.
                    </p>
                    <p>
                        I understand that this does not reduce or mitigate any risks associated with the investment and is just a product feature. In all subsequent agreements, the nature and relationship between the Parties including the rights and obligations remain the same. Previous Agreements have no effect on subsequent agreements; each act of Purchasing Receivables will be treated independently. No further approval or action from the Purchaser shall be required for such reinvestment until the consent toggle is activated.
                    </p>
                    <p>
                        I confirm that all KYC (Know Your Customer) details provided during the onboarding process are accurate and up-to-date and will notify and update in case. The Company reserves the right to verify and update KYC details as required.
                    </p>
                    <p>
                        This Letter must be read in conjunction with the Agreement. All terms used herein are as defined in the Service Agreement. To the extent provided herein, all other terms of the Agreement shall continue to apply till the credit period and subsequent to the Purchase of Invoices the new Service Agreement will be applicable which will have similar terms and conditions unless otherwise notified.
                    </p>
                </div>
            </div>
        </div>
    );
};

