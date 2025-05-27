"use client";

import React, { useEffect, useState } from "react";

import Arrow from "@/assets/tapAndInvestment/right-arrow.svg";
import { Deal } from "@/app/myaccount/transact/invoicediscounting/page";
import DetailsCard from "./DetailsCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TapAndInvestmentCardProps {
    investmentsData: Deal;
    walletBalance: number;
}

export default function TapAndInvestmentCard({ investmentsData, walletBalance }: TapAndInvestmentCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        const url = `/myaccount/transact/invoicediscounting?dealId=${investmentsData.id}`;
        router.push(url);
        if (typeof window !== 'undefined') {
            window.location.href = url;
        };
    }

    const handleClose = () => {
        setShowDetails(false);
    };



    useEffect(() => {
        if (showDetails) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [showDetails]);


    const percentage = investmentsData?.successfullyAmountRaise && investmentsData?.targetAmountToRaise && (investmentsData?.successfullyAmountRaise / investmentsData?.targetAmountToRaise) * 100;
    const isDisabled = investmentsData?.isSoldOut;
    return (
        <button
            className={`relative ${isDisabled ? 'opacity-[50%] cursor-not-allowed' : ''}`} disabled={isDisabled}
            onClick={handleClick}
        >
            <div className="w-full h-full rounded-2xl bg-white">
                <div className="border-b-0 px-8 py-5 space-y-2 rounded-t-2xl border">
                    <div className="flex gap-4 items-center">
                        <div className=" w-[25%] md:w-[50%]">
                            <Image
                                src={investmentsData?.company?.logoUrl}
                                width={80}
                                height={80}
                                alt={investmentsData?.company?.brandName}
                            />
                        </div>
                        <div className="flex flex-col gap-0 justify-start w-[75%] md:w-fitt">
                            <p className="md:text-2xl text-base font-semibold m-0 overflow-hidden break-all text-left">
                                {investmentsData?.company?.brandName}
                            </p>
                            <p className="text-gray-400 text-sm md:text-base  w-[75%] md:w-[50%] font-semibold m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                                {investmentsData?.miniSummary}
                            </p>
                        </div>
                    </div>
                    <div className="text-red-900 bg-red-100 rounded-2xl px-4 py-1 font-semibold text-sm md:text-lg w-fit">
                        {percentage?.toFixed(0)}% RAISED
                    </div>
                </div>
                <div>
                    <div className={`flex justify-between px-8 py-5 border ${isDisabled ? 'rounded-b-2xl' : 'border-b-0'}`}>
                        <div>
                            <p className="text-gray-400 m-0 font-semibold text-sm md:text-lg">XIRR</p>
                            <p className="text-primary-blue m-0 text-lg md:text-2xl font-medium">
                                {investmentsData?.minInvestment?.netIRR.toFixed(2)}%
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 m-0 font-semibold text-sm md:text-lg">TENURE</p>
                            <p className="text-black m-0 text-lg md:text-2xl font-medium">
                                {investmentsData?.tenure} days
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 m-0 font-semibold text-sm md:text-lg">MIN INVEST</p>
                            <p className="text-black m-0 text-lg md:text-2xl font-medium">
                                {Number(investmentsData?.minInvestment?.amount).toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 0,
                                })}
                            </p>
                        </div>
                    </div>
                    {!isDisabled &&
                        <div
                            className={`bg-[rgba(0,178,178,0.40)] flex gap-2 justify-center p-2 border-primary-blue-dark rounded-b-2xl border border-t-0
                            ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <p className="text-primary-blue-dark font-semibold m-0">Tap to know more</p>
                            <Image src={Arrow} width={20} height={20} alt="arrow" />
                        </div>
                    }
                </div>
            </div>
        </button>
    );
}
