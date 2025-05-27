"use client"
import React from 'react'

interface ButtonsComponentProps {
    activeSection: string,
    setActiveSection: (section: string) => void,
    firstTime: boolean,
}

export const ButtonsComponent: React.FC<ButtonsComponentProps> = ({ firstTime, setActiveSection, activeSection }) => {
    return (
        <div className="left h-auto w-full mx-auto">
            <div className="bg-[#E7F9F2] p-6 mx-auto">
                <h2 className="text-[21px] text-[#035782] mx-auto font-semibold mb-11">
                    What do you want to do today?
                </h2>

                <div className="flex flex-col items-start space-y-6">
                    {/* Invest Button */}
                    <button
                        onClick={() => setActiveSection("invest")}
                        className={`w-full lg:w-[400px] h-[50px] ${activeSection === "invest" ? "bg-[#FB7706] text-white" : "bg-white text-black"
                            } border border-[#FB7706] text-[18px] font-semibold rounded-[4px]`}
                    >
                        Invest/Purchase
                    </button>

                    {/* Withdraw/Sell Button */}
                    <button
                        onClick={() => !firstTime && setActiveSection("withdraw")}
                        disabled={firstTime}
                        className={`w-full lg:w-[400px] h-[50px] ${activeSection === "withdraw" ? "bg-[#FB7706] text-white" : "bg-white text-black"
                            } border border-[#FB7706] text-[18px] font-semibold rounded-[4px] ${firstTime ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        title={firstTime ? "You don’t have any investments yet." : ""}
                    >
                        Withdraw/Sell
                    </button>

                    {/* Switch Button */}
                    <button
                        onClick={() => !firstTime && setActiveSection("switch")}
                        disabled={firstTime}
                        className={`w-full lg:w-[400px] h-[50px] ${activeSection === "switch" ? "bg-[#FB7706] text-white" : "bg-white text-black"
                            } border border-[#FB7706] text-[18px] font-semibold rounded-[4px] ${firstTime ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        title={firstTime ? "You don’t have any investments yet." : ""}
                    >
                        Switch
                    </button>
                </div>
            </div>
        </div>
    );
};
