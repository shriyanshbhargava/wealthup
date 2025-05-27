"use client"
import Image from "next/image";
import { toast } from "react-toastify";
import { IInvestComponentProps } from "./Interface";
import { useEffect, useState } from "react";
import { AllFundsInput } from "./Modals";

export const InvestComponent: React.FC<IInvestComponentProps> = ({
    options,
    redemption,
    setRedemption,
    withdrawAmount,
    setWithdrawAmount,
    activeSection,
    setShowButtons,
    setActiveRightPart,
    setAmount,
    amount,
    timePeriod,
    setTimePeriod,
    investmentType,
    setInvestmentType,
    activeRightPart,
    setSelectedFund,
    selectedFund,
    date,
    access_token,
    setDate,
    installments,
    setStartMonth,
    startMonth,
    noOfInstallment,
    setNoOfInstallment,
    setInstallments,
    switchInTo,
    setSwitchInTo,
    switchFrom,
    setSwitchFrom,
    frequency,
    setFrequency,
    setOpenMandateModal,
    isAuthSucess,
    approvedMandatesList,
    setInstallmentDate,
    installmentDate,
}) => {

    const [switchFunds, setSwitchFunds] = useState<any>();
    const [switchSearchTerm, setSwitchSearchTerm] = useState("");
    const [searchFundTerm, setSearchFundTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredFunds = switchFunds?.filter((scheme: { name: string; }) =>
        scheme.name.toLowerCase().includes(switchSearchTerm.toLowerCase())
    )

    useEffect(() => {
        setInstallments('monthly');
    }, [setInstallments]);

    useEffect(() => {
        const fetchSwitchFunds = async () => {
            try {
                const response = await fetch('https://api.wealthup.me/api/v1/cybrilla/funds/me', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch funds');

                const data = await response.json();
                const schemes = data.folios.flatMap((folio: { schemes: any; }) => folio.schemes);
                setSwitchFunds(schemes);
            } catch (err) {
                console.error(err);
            } finally {
            }
        };

        fetchSwitchFunds();
    }, [access_token]);

    const numberToWords = (num: number) => {
        if (num === 0) return "Zero";

        const ones = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen"
        ];

        const tens = [
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
        ];

        const thousands = [
            "", "Thousand", "Lakh", "Crore"
        ];

        const numberToStr: (n: number) => string = (n: number): string => {
            if (n === 0) return "";
            else if (n < 20) return ones[n];
            else if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
            else if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numberToStr(n % 100) : "");
            else return "";
        };


        const splitIntoIndianGroups = (n: number) => {
            const groups = [];
            // Get the last 3 digits
            groups.unshift(n % 1000);
            n = Math.floor(n / 1000);

            // Get the next groups of 2 digits each
            while (n > 0) {
                groups.unshift(n % 100);
                n = Math.floor(n / 100);
            }
            return groups;
        };

        const convertToWords = (groups: string | any[]) => {
            let result = "";
            for (let i = 0; i < groups.length; i++) {
                if (groups[i] !== 0) {
                    result += numberToStr(groups[i]) + " " + thousands[groups.length - 1 - i] + " ";
                }
            }
            return result.trim();
        };

        const indianGroups = splitIntoIndianGroups(num);
        return convertToWords(indianGroups);
    };

    const splitIntoIndianGroups = (n: number) => {
        const groups = [];
        // Get last 3 digits
        groups.unshift(n % 1000);
        n = Math.floor(n / 1000);

        // Get subsequent groups of 2 digits each
        while (n > 0) {
            groups.unshift(n % 100);
            n = Math.floor(n / 100);
        }
        return groups;
    };


    const getFormattedAmount = (amount: number) => {
        const words = numberToWords(amount).split(" ");
        if (words.length > 4) {
            return words.join(" "); // Join the words without commas
        }
        return words.join(" "); // Ensure the result is a single string
    };

    const handleSwitchContinue = () => {

        setShowButtons(false);
        setActiveRightPart("switch");

        const orderType = "switch";
        const planType = "once"; // Assuming "once" for switching

        // handleApiCall(orderType, planType, 0, installments); // Adjust amount as needed

    };

    // Define VALID_INSTALLMENT_DAYS
    const VALID_INSTALLMENT_DAYS = {
        monthly: Array.from({ length: 28 }, (_, i) => i + 1),
        quarterly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    };


    // Create frequency options
    const frequencyOptions = Object.keys(VALID_INSTALLMENT_DAYS).map(key => ({
        value: key,
        label: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) // Format label
    }));

    // New state to hold investor funds
    // Empty dependency array to run only on mount

    const isButtonDisabled =
        !amount ||
        !investmentType ||
        !timePeriod ||
        (investmentType === "sip" &&
            (installments == null || noOfInstallment == null || !installmentDate || !startMonth));

    return (
        <div className="right text-[20px] lg:mb-[0px] mb-10  h-auto  space-y-6">
            {activeSection === "invest" && (
                <div className="invest">
                    <p className="text-[20px]  lg:mt-0 mt-10 font-semibold text-[#035782]">I want to invest</p>
                    <input
                        disabled={activeRightPart.length > 1}
                        className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                        type="text"
                        maxLength={13}
                        placeholder="Enter Amount"
                        value={`₹ ${Number(amount).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                        }).slice(1)}`}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setAmount(Number(numericValue));
                        }}
                    />
                    <div className="lg:w-[390px] sm:w-[250px] relative">
                        <p className="py-2  ">
                            {amount ? `${getFormattedAmount(Number(amount))} Rupees` : "Enter Amount in numbers"}
                        </p>
                    </div>

                    <div className="time-period relative">
                        <p className="text-[20px] font-semibold text-[#035782]">For</p>
                        <div className="relative w-full lg:w-[400px]">
                            <select
                                disabled={activeRightPart.length > 1}
                                className="border-b-2 text-[17px] border-black w-full py-2 px-1 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                                aria-label="Time Period"
                                value={timePeriod} // Bind the state value
                                onChange={(e) => setTimePeriod(e.target.value)} // Update state on change
                            >
                                <option value="" disabled>
                                    Select Time Period
                                </option>
                                <option value="1">Less than 1 year</option>
                                <option value="3">1-3 years</option>
                                <option value="5">More than 3 years</option>
                            </select>
                            <Image
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                src="/Down-arrow.png"
                                alt="Dropdown arrow"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>

                    <div className="radio my-8 space-y-2">
                        <p className="text-[20px] font-semibold text-[#035782]">How do you want to invest?</p>
                        <div className="flex gap-12 font-[15px]">
                            <label className="flex items-center space-x-2">
                                <input checked={investmentType === "lump-sum"} disabled={activeRightPart.length > 1} type="radio" name="investment-type" value="lump-sum" className="cursor-pointer" onChange={(e) => {
                                    setInvestmentType(e.target.value);
                                    setInstallments("");
                                }}
                                />
                                <span className="text-[#4A5151]">Lump sum</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="radio" disabled={activeRightPart.length > 1} name="investment-type" checked={investmentType === "sip"} value="sip" className="cursor-pointer" onChange={(e) => {
                                    setInvestmentType('sip');
                                    setInstallments("");
                                }}
                                />
                                <span className="text-[#4A5151]">SIP</span>
                            </label>
                        </div>
                    </div>
                    {(investmentType === "sip" && approvedMandatesList?.length != 0) && (
                        <div>
                            <div className="installments flex flex-col">
                                <label className="text-[20px] font-semibold text-[#035782]">Select Frequency</label>
                                <select
                                    className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                    value={installments ?? ''}
                                    onChange={(e) => setInstallments(e.target.value)}
                                    defaultValue="monthly"
                                >
                                    <option value="" disabled>Select Frequency</option>
                                    {frequencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative my-10 w-full pr-10 lg:w-[400px]">
                                <h5 className="text-[20px] font-semibold text-[#035782]">
                                    Installment Date
                                </h5>
                                <input
                                    className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                    type="date"
                                    placeholder="Installment Date"
                                    value={installmentDate}
                                    min={`${new Date().getFullYear()}-01-01`}
                                    max={`${new Date().getFullYear()}-12-28`}
                                    onChange={(e) => {
                                        const selectedDate = new Date(e.target.value);
                                        const day = selectedDate.getDate();

                                        // Restrict selection to days 1-28 only
                                        if (day >= 1 && day <= 28) {
                                            setInstallmentDate(e.target.value);
                                        } else {
                                            toast.error("Please select a date between 1st and 28th.");
                                            e.target.value = "";
                                        }
                                    }}
                                />
                            </div>

                            <div className="relative my-10 w-full pr-10 lg:w-[400px]">
                                <h5 className="text-[20px] font-semibold text-[#035782]">
                                    Starting Month
                                </h5>
                                <select
                                    className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                    value={startMonth}
                                    onChange={(e) => setStartMonth(e.target.value)}
                                >
                                    <option value="">
                                        Select month
                                    </option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>


                            <h5 className="text-[20px] font-semibold text-[#035782]">
                                No. of Installments
                            </h5>
                            <div className="relative w-full lg:w-[400px]">
                                <input
                                    className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                    type="number"
                                    placeholder="Number of Instalments"
                                    value={noOfInstallment}
                                    onChange={(e) => {
                                        setNoOfInstallment(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {(investmentType === "sip" && approvedMandatesList?.length === 0) ?
                        (
                            <button
                                onClick={() => {
                                    setOpenMandateModal(true);
                                }}
                                className={`w-full lg:w-[400px] mt-6 h-[50px] text-white border bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"} text-[18px] font-semibold rounded-[4px]`}
                            >
                                Create Mandate
                            </button>
                        )
                        :
                        <></>
                    }
                    {(investmentType === "lump-sum" || (investmentType === "sip" && approvedMandatesList?.length && approvedMandatesList?.length > 0)) ? (
                        <button
                            disabled={activeRightPart.length > 1 || isButtonDisabled}
                            onClick={() => {
                                if (amount && timePeriod && investmentType) {
                                    setShowButtons(false);
                                    setActiveRightPart("invest");
                                } else {
                                    toast.error("Please enter amount and time period");
                                }
                            }}
                            className={`w-full lg:w-[400px] mt-6 h-[50px] text-white border rounded-[4px] text-[18px] font-semibold 
                            ${isButtonDisabled || activeRightPart.length > 1
                                    ? "bg-[#c7c7c7]"
                                    : "bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"}`}
                        >
                            Continue
                        </button>
                    )
                        :
                        <></>
                    }

                </div>
            )}

            {activeSection === "withdraw" && (
                <div className="withdraw">
                    <p className="text-[20px] font-semibold lg:mt-0 mt-10 text-[#035782]">I want to withdraw</p>
                    <input
                        disabled={activeRightPart.length > 1}
                        className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                        type="text"
                        maxLength={13}
                        placeholder="Enter Amount"
                        value={`₹ ${Number(withdrawAmount).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                        }).slice(1)}`}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setWithdrawAmount(Number(numericValue));
                        }}
                    />
                    <div className="w-[390px] relative">
                        <p className="py-2  ">
                            {withdrawAmount ? `${getFormattedAmount(Number(withdrawAmount))} Rupees` : "Enter Amount in numbers"}
                        </p>
                    </div>
                    <div className="time-period relative">
                        <div className="relative w-full lg:w-[400px]">
                            <select
                                disabled={activeRightPart.length > 1}
                                value={timePeriod}
                                className="border-b-2 text-[17px] border-black w-full py-2 px-1 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                                aria-label="Time Period"
                                onChange={(e) => setTimePeriod(e.target.value)}
                            >
                                <option value="" disabled selected>
                                    Select type of redemption
                                </option>
                                <option value="immediately">Immediately</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <Image
                                className="absolute  right-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                src="/Down-arrow.png"
                                alt="Dropdown arrow"
                                width={20}
                                height={20}
                            />
                        </div>
                        {
                            timePeriod == "monthly" &&
                            <>
                                <div className="installments flex flex-col">
                                    <label className="text-[20px] pt-5 font-semibold text-[#035782]">Select Frequency</label>
                                    <select
                                        className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                        value={frequency ?? ''}
                                        onChange={(e) => setFrequency(e.target.value)}
                                        defaultValue="monthly"
                                    >
                                        <option value="" disabled>Select Frequency</option>
                                        {frequencyOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative w-full lg:w-[400px] pt-5">
                                    <input
                                        disabled={activeRightPart.length > 1}
                                        className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                        type="number"
                                        placeholder="Number of Instalments"
                                        value={installments}
                                        onChange={(e) => {
                                            setInstallments(e.target.value)
                                        }}
                                    />
                                </div>
                            </>
                        }
                    </div>
                    <button
                        disabled={
                            activeRightPart.length > 1 ||
                            !(withdrawAmount) ||
                            !(timePeriod) ||
                            (timePeriod === "monthly" && (!installments))
                        }
                        onClick={() => {
                            if (!withdrawAmount || !timePeriod) {
                                return toast.error("Please enter amount and time period");
                            }
                            setShowButtons(false);
                            setActiveRightPart("withdraw");
                        }}
                        className={`w-full lg:w-[400px] mt-10 h-[50px] text-white border ${activeRightPart.length > 1 ||
                            !(withdrawAmount) ||
                            !(timePeriod) ||
                            (timePeriod === "monthly" && (!installments))
                            ? "bg-[#c7c7c7]"
                            : "bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"
                            } text-[18px] font-semibold rounded-[4px]`}
                    >
                        Continue
                    </button>
                </div>
            )}

            {activeSection === "switch" && (
                <div className="switch">
                    <div className="time-period relative">
                        <p className="text-[20px] font-semibold lg:mt-0 mt-10 text-[#035782]">I want to switch out of</p>
                        <div className="relative w-full lg:w-[400px]">
                            <input
                                type="text"
                                className="w-full px-3 py-2 text-[17px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none focus:border-[#035782]"
                                value={switchSearchTerm}
                                onChange={(e) => setSwitchSearchTerm(e.target.value)}
                                placeholder="Search for fund"
                                onFocus={() => setIsDropdownOpen(true)}
                            />
                            {isDropdownOpen && filteredFunds?.length > 0 && (
                                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded-md max-h-40 overflow-y-auto" style={{ zIndex: 11112323 }}>
                                    {filteredFunds.map((scheme: any) => (
                                        <div
                                            key={scheme.isin}
                                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                            onClick={() => {
                                                setSwitchFrom(scheme);
                                                setSwitchSearchTerm(scheme.name);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {scheme.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="time-period relative z-50">
                        <p className="text-[20px] font-semibold text-[#035782] mt-8">I want to switch in to</p>
                        <AllFundsInput searchTerm={searchFundTerm} setSearchTerm={setSearchFundTerm} onClick={(selectedFund: string) => setSwitchInTo(selectedFund)} access_token={access_token} />
                    </div>
                    <div className="time-period relative">
                        <div className="relative w-full lg:w-[400px] mt-12">
                            <select disabled={activeRightPart.length > 1} value={redemption}
                                onChange={(e) => {
                                    setRedemption(e.target.value)
                                }}
                                className="border-b-2 border-black text-[17px] w-full py-2 bg-[#E7F9F2] text-black focus:outline-none focus:border-[#035782] appearance-none pr-10"
                                aria-label="Time Period"
                            >
                                <option value="" disabled selected>
                                    Select type of redemption
                                </option>
                                <option value="immediately">Immediately</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <Image
                                className="absolute right-3 top-1/2  transform -translate-y-1/2 pointer-events-none"
                                src="/Down-arrow.png"
                                alt="Dropdown arrow"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                    {
                        redemption == "monthly" &&
                        <>

                            <div className="relative  my-10 w-full pr-10 lg:w-[400px]">
                                <h5 className="text-[20px] font-semibold text-[#035782]">

                                    Start Date
                                </h5>
                                <input
                                    disabled={activeRightPart.length > 1}
                                    className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                    type="date"
                                    placeholder="Start Date"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="relative w-full lg:w-[400px]">
                                <input
                                    disabled={activeRightPart.length > 1}
                                    className="border-b-2 text-[17px] border-black w-full lg:w-[400px] placeholder-black py-2 bg-[#E7F9F2] px-1 text-black focus:outline-none focus:border-[#035782]"
                                    type="number"


                                    placeholder="Number of Instalments"
                                    value={installments}
                                    onChange={(e) => {
                                        setInstallments(e.target.value)
                                    }}
                                />
                            </div>
                        </>
                    }
                    <button
                        onClick={() => {
                            if (redemption && switchFrom && switchInTo) {
                                if (redemption === "monthly" && (!date || !installments)) {
                                    toast.error("Please Start Date and number of installments");
                                } else {
                                    setShowButtons(false);
                                    setActiveRightPart("switch");
                                    handleSwitchContinue();
                                }
                            } else {
                                toast.error("Please select a fund to switch.");
                            }
                        }}
                        disabled={
                            activeRightPart.length > 1 ||
                            !redemption ||
                            !switchInTo ||
                            !switchFrom ||
                            (redemption === "monthly" && (!date || !installments))
                        }
                        className={`w-full lg:w-[400px] mt-6 h-[50px] text-white border ${activeRightPart.length > 1 ||
                            !redemption ||
                            !switchInTo ||
                            !switchFrom ||
                            (redemption === "monthly" && (!date || !installments))
                            ? "bg-[#c7c7c7]"
                            : "bg-[#FB7706] border-[#FB7706] focus:outline-none focus:ring-2 focus:ring-[#FB7706]"
                            } text-[18px] font-semibold rounded-[4px]`}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
};

