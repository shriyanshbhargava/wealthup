import React, { useContext, useState } from "react";

import { BsInfoCircle } from "react-icons/bs";
import { FiCheck } from 'react-icons/fi'
import Modal from "@/components/ui/Modal";
import { ProfileContext } from "./DashboardLayout";
import { format } from 'date-fns'

const MEMBERSHIP_BENIFITS = [
    { feature: "Eligibility Criteria", free: "", gold: "", heading: true },
    { feature: "Points (in last 12 months)", free: "", silver: "2,000", gold: "6,000" },
    { feature: "Accelerated access (For 3 months)", free: "", silver: "5 Lakhs of investment", gold: "" },
    { feature: "Expert Support", free: "", gold: "", heading: true },
    { feature: "Access to financial tools", free: "Yes", silver: "Yes", gold: "Yes" },
    { feature: "Handholding for setting up", free: "Yes", silver: "Yes", gold: "Yes" },
    {
        feature: "Unlimited email support",
        free: "Yes",
        silver: "Yes", gold: "Yes",
    },
    {
        feature: "Unlimited WhatsApp support",
        free: "",
        silver: "Yes", gold: "Yes",
    },
    { feature: "Call Support on follow ups", free: "", silver: "Yes", gold: "Yes" },
    {
        feature: "Call support",
        free: "Pay per call",
        silver: "3 40-minute calls annually", gold: "Unlimited*",
    },
    { feature: "Customized financial plan", free: "", silver: "", gold: "Yes" },
    { feature: "Taxes", free: "", silver: "", gold: "", heading: true },
    {
        feature: "Advisory for maximing tax savings",
        free: "Yes",
        silver: "Yes", gold: "Yes",
    },
    {
        feature: "Complete tax declaration",
        free: "",
        silver: "", gold: "Yes",
    },
    { feature: "Discount on tax filing", free: "", silver: "", gold: "Yes" },
    { feature: "Investments", free: "", silver: "", gold: "", heading: true },
    {
        feature: "Goal-based investment planning ",
        free: "Yes",
        silver: "Yes", gold: "Yes",
    },
    { feature: "Auto-investment tracking", free: "Yes", silver: "Yes", gold: "Yes" },
    { feature: "General market alerts", free: "Yes", silver: "Yes", gold: "Yes" },
    { feature: "Investment diversification", free: "Yes", silver: "Yes", gold: "Yes" },
    {
        feature: "Emergency fund planning",
        free: "Yes",
        silver: "Yes", gold: "Yes",
    },
    { feature: "Liquidity planning", free: "Yes", silver: "Yes", gold: "Yes" },
    { feature: "Health Insurance planning", free: "15 Min on Call", silver: "40 Min on Call", gold: "Unlimited*" },
    { feature: "Life Insurance planning", free: "15 Min on Call", silver: "40 Min on Call", gold: "Unlimited*" },
    {
        feature: "Personalised portfolio alerts",
        free: "",
        silver: "", gold: "Yes",
    },
    { feature: "Investment monitoring", free: "", silver: "", gold: "Yes" },
    { feature: "Investment rebalancing", free: "", silver: "", gold: "Yes" },
    {
        feature: "Save tax on capital gains up to Rs 1 Lakh",
        free: "",
        silver: "", gold: "Coming soon",
    },
];

const GoldMember = () => {
    const [showPopup, setShowPopup] = useState(false);

    const { user } = useContext(ProfileContext)!;

    let percentage = (parseInt(user?.coins ?? "0") / 6000) * 100;
    if (user?.tier === "base") {
        percentage = (parseInt(user?.coins ?? "0") / 2000) * 100;
    }
    const width =
        percentage < 0 ? "0%" : percentage > 100 ? "100%" : `${percentage}%`;

    return (
        <div className="bg-gray-900 rounded-xl text-gray-200 p-4 ml-4">
            <div className="flex items-center gap-4 text-gray-200">
                <p className={`${user?.tier === "gold" ? "text-[#d4af37]" : "text-gray-200"} font-bold uppercase text-xl mb-0`}>{user?.tier === 'silver' ? "Silver Tier" : user?.tier === "gold" ? "Gold Tier" : "Base Tier"}</p>
                <BsInfoCircle
                    className="cursor-pointer"
                    onClick={() => setShowPopup(true)}
                />
            </div>
            {user?.tier !== "gold" && (
                <p className="text-sm mb-2">
                    Get access to {user?.tier === 'silver' ? 'Gold' : 'Silver'} Tier
                </p>
            )}
            <div className="w-full justify-between flex items-center gap-4">
                <span className="uppercase flex flex-col text-sm lg:text-xs leading-tight">
                    Valid Thru
                </span>
                <time className="font-bold text-sm">{user?.subscriptionStatus === 'active' ? format(Date.parse(user?.sub_end_date ?? ''), "MM/yy") : 'Inactive'}</time>
            </div>
            <div className="my-2 flex justify-between items-center gap-4">
                <span className="uppercase flex flex-col text-sm lg:text-xs leading-tight">
                    Reward Points
                </span>
                <span className="text-sm font-bold">{Intl.NumberFormat('en-In').format(parseInt(user?.coins ?? "0"))}/{user?.tier === 'base' ? '2,000' : '6,000'}</span>
            </div>
            <div className="w-full relative">
                <span className="block w-full h-3 rounded-full bg-gray-800"></span>
                <span
                    style={{ width }}
                    className={`absolute top-0 left-0 h-3 rounded-full bg-[#d4af37]`}
                ></span>
            </div>
            <GoldMemberPopup open={showPopup} onClose={() => setShowPopup(false)} />
        </div >
    );
};

export default GoldMember;

const GoldMemberPopup: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
}) => {
    return (
        <Modal show={open} onClose={onClose} width="sm:max-w-4xl">
            <table className="-my-12 w-full border-collapse overflow-x-scroll sm:overflow-hidden">
                <thead className="">
                    <tr>
                        <th className="w-2/5 font-semibold text-left text-xl border-b border-gray-300">
                            Features
                        </th>
                        <th className="w-1/5 font-semibold text-left text-xl border-b border-gray-300">
                            Base Tier
                        </th>
                        <th className="w-1/5 font-semibold text-left text-xl border-b border-gray-300">
                            Silver Tier
                        </th>
                        <th className="w-1/5 font-semibold text-left text-xl border-b border-gray-300">
                            Gold Tier
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {MEMBERSHIP_BENIFITS.map((item: any, index) => (
                        <tr className={`${item.heading && item.heading === true ? "my-4" : "border-b border-gray-200"}`} key={index}>
                            {Object.keys(item).map((el, elIndex) => (
                                <td key={elIndex} className={`${index === 0 ? 'w-2/5' : 'w-1/5'}px-4 text-left ${item.heading && item.heading === true ? "font-bold text-lg pt-4" : ""}`}>
                                    {item[el] === "Yes" ? <FiCheck className="" /> : item[el]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-16 text-sm leading-tight">* Rescheduling can happen upto 2 hours prior to the call. Else it will be considered a no show for which the penalty is 2,000 reward points.</p>
        </Modal>
    );
};
