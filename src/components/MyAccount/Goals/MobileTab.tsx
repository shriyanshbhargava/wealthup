"use client";
import React, { useState } from "react";

const MobileTab = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<"networth" | "monthly">> }) => {

    const handleTabClick = (tab: "networth" | "monthly") => {
        setActiveTab(tab);
    };

    return (
        <div className="flex md:hidden justify-center items-center rounded-3xl p-1 bg-white border border-[#035782] w-fit mx-auto">
            <button
                onClick={() => handleTabClick("networth")}
                className={`py-1.5 px-3 rounded-2xl font-semibold ${activeTab === "networth"
                        ? "bg-[#035782] text-white"
                        : "bg-white text-[#035782]"
                    }`}
            >
                Current Investments
            </button>
            <button
                onClick={() => handleTabClick("monthly")}
                className={`py-1.5 px-3 rounded-2xl font-semibold ${activeTab === "monthly"
                        ? "bg-[#035782] text-white"
                        : "bg-white text-[#035782]"
                    }`}
            >
                Monthly
            </button>
        </div>
    );
};

export default MobileTab;
