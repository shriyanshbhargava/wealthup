"use client"
import React, { useEffect, useMemo, useState } from "react";
import { IFundListProps } from "./Interface";
import { debounce, fetchFunds, fetchMandatelist, getFolioNumber, getISINDetails, mandateAuth, validateData } from "./HelpingFunctions";
import { toast } from "react-toastify";
import { PencilIcon, CheckIcon, TrashIcon, InformationCircleIcon } from "@heroicons/react/solid"
import { AllFundsInput } from "./Modals";


export const FundList: React.FC<IFundListProps> = ({
    selectedFund,
    setSelectedFund,
    addingAmount,
    setAddingAmount,
    fundsData,
    isEditable,
    setIsEditable,
    onAmountChange,
    onDelete,
    totalAmount,
    setFundsData,
    investmentType,
    frequency,
    amount,
    timePeriod,
    installments,
    activeSection,
    folioNumber,
    setFolioNumber,
    myFunds,
    setMyFunds,
    access_token,
    withdrawAmount,
    otpModal,
    setOtpModal,
    openPaymentModal,
    setOpenPaymentModal,
    orderOldId,
    setOrderOldId,
    setOrderId,
    orderId,
    mandatesList,
    setMandatesList,
    mandateIds,
    setMandateIds,
    setOpenMandateModal,
    openMandateModal,
    callAuth,
    noOfInstallment,
    startMonth,
    installmentDate,
}) => {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showConfirOrder, setShowConfirOrder] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("EMANDATE")
    const [editableIndex, setEditableIndex] = useState<number | null>(null);
    const [amounts, setAmounts] = useState(fundsData?.map((fund) => fund?.amount));
    const [searchFundTerm, setSearchFundTerm] = useState("");
    const [isinDetails, setIsinDetails] = useState<any>();
    const [fundNames, setFundNames] = useState<string[]>([]);

    useEffect(() => {
        // Extract only names
        const newFundNames = fundsData.map((fund: any) => fund.name);

        // Compare with previous names
        if (JSON.stringify(newFundNames) !== JSON.stringify(fundNames)) {
            setFundNames(newFundNames); // Update state to trigger effect
        }
    }, [fundNames, fundsData]);

    useEffect(() => {
        const fetchISINDetails = async () => {
            if (!fundNames.length) return;

            const newIsinDetails: any = {};
            for (const fund of fundsData) {
                const data = await getISINDetails(access_token, fund.value);
                newIsinDetails[fund.value] = data;
            }

            setIsinDetails((prevDetails: any) => ({
                ...prevDetails,
                ...newIsinDetails,
            }));
        };

        fetchISINDetails();
    }, [fundNames, access_token]);



    const handleAmountChange = (index: number, value: string) => {
        const updatedFunds = [...fundsData];
        updatedFunds[index] = { ...updatedFunds[index], amount: Number(value) || 0 };
        setFundsData(updatedFunds);
    };

    const handleSave = () => {
        setEditableIndex(null);
        // Optionally: Call API to update the backend
    };
    // Debounced fund fetch function
    const debouncedFetchFunds = useMemo(() =>
        debounce(async (query: any) => {
            const funds = await fetchFunds(query, access_token);
            setOptions(funds);
        }, 300),
        [fetchFunds, access_token]
    );


    // Fetch funds when search term changes
    useEffect(() => {
        if (activeSection === "invest") {
            if (searchTerm?.length > 1) {
                debouncedFetchFunds(searchTerm);
            } else {
                setOptions([]);
            }
        }
    }, [searchTerm, debouncedFetchFunds, activeSection]);

    useEffect(() => {
        if (!fundsData && activeSection === "invest" && setIsEditable) {
            setIsEditable(true);
        }
    }, [activeSection, fundsData, setIsEditable])

    const handleAddFund = async () => {
        if (!selectedFund || addingAmount === 0 || addingAmount === "0") {
            toast.error("Please select a fund and enter an amount");
            return;
        }

        const newFund = {
            value: selectedFund.value,
            name: selectedFund.label,
            amount: Number(addingAmount),
            id: activeSection === "withdraw" ? selectedFund.isin : selectedFund.id,
        };

        if (!selectedFund || !newFund) {
            toast.error("Invalid fund selection.");
            return;
        }

        setFundsData((prevFunds: any) => {
            const existingFunds = prevFunds ?? []; // Ensure prevFunds is always an array
            const fundExists = existingFunds?.some((fund: { value: any }) => fund?.value === selectedFund?.value);

            if (investmentType === "sip") {
                if (existingFunds?.length >= 1) {
                    toast.error("Cannot add multiple funds!");
                    return existingFunds;
                }
            }

            if (fundExists) {
                toast.error("This fund already exists. Updating the amount.");
                return existingFunds?.map((fund: { value: any }) =>
                    fund?.value === selectedFund?.value ? { ...fund, amount: newFund?.amount } : fund
                );
            }

            return [...existingFunds, newFund];
        });

        setAddingAmount("0");
        setSearchTerm("");
        setSelectedFund({});
        setSearchFundTerm("");
        setIsDropdownOpen(false);
    };



    const handleConfirmOrder = async (orderType: string, planType: string, amount: any, scheme: string | any[], installments: any, amounts: string | any[]) => {
        const url = `https://api.wealthup.me/api/v1/cybrilla/orders/create?order_type=${orderType}&plan_type=${planType}`;
        const schemeOutput = scheme.length === 1 ? scheme[0] : scheme;
        const amountsOutput = amounts.length === 1 ? amounts[0] : amounts;

        let body;

        if (investmentType === "sip") {
            body = {
                amount: amount,
                schemes: scheme,
                frequency: installments?.toUpperCase(),
                installment_day: installmentDate?.split('-')[2],
                number_of_installments: noOfInstallment,
                start_month: startMonth
            };
        } else {
            body = {
                amounts: amounts,
                schemes: scheme,
            };
        }


        const validateBody =
        {
            order_type: orderType,  // purchase, switch, redeem
            plan_type: planType,   // systematic, once
            schemes: schemeOutput,    // isin of scheme to switch in for switch order
            frequency: installments?.toUpperCase(),   // frequency if plan_type is systematic
            installment_day: installmentDate?.split('-')[2], // installment day when the order is to be executed if plan_type is systematic
            number_of_installments: noOfInstallment,  // number of installments to be made of the systematic order
            amounts: amountsOutput,    // units for the order to be executed
            isin: scheme,
            start_month: startMonth,
        }
        const isValid = investmentType === "sip" || await validateData(access_token, validateBody);

        if (isValid) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(body),
                });

                let data;
                try {
                    data = await response.json();
                } catch {
                    data = {};
                }
                if (response.ok) {
                    const orderOldId = data?.map((fund: { old_id: any; }) => fund?.old_id);
                    const orderID = data?.map((fund: { id: any; }) => fund?.id);
                    setOrderOldId(orderOldId)
                    setOrderId(orderID)
                    toast.success(`Order Created!`);
                    setOtpModal(true);
                    setOpenPaymentModal(false);
                } else {
                    const errorMessage =
                        data?.error?.errors?.[0]?.message ||
                        data?.error?.message ||
                        data?.error ||
                        response.statusText ||
                        `Error ${response.status}: Something went wrong.`;
                    toast.error(errorMessage);
                }
            } catch (error) {
                toast.error("A network error occurred. Please check your connection and try again.");
            }
        }
    };

    const handleMandateClick = async (orderType: any, planType: any, amount: any, scheme: any, installments: string) => {
        const validateBody =
        {
            order_type: orderType,  // purchase, switch, redeem
            plan_type: planType,   // systematic, once
            scheme: scheme,      // isin of scheme to switch in for switch order
            frequency: installments?.toUpperCase(),   // frequency if plan_type is systematic
            installment_day: 5, // installment day when the order is to be executed if plan_type is systematic
            number_of_installments: 6,  // number of installments to be made of the systematic order
            amount: amount,   // units for the order to be executed
            isin: scheme
        }

        const isValid = await validateData(access_token, validateBody);
        const data = await fetchMandatelist(access_token);
        const mandates = data?.mandates;
        setShowConfirOrder(true);
        setMandatesList(mandates);
        if (setOpenMandateModal) setOpenMandateModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (callAuth) {
                if (mandatesList?.length > 0) {
                    const ids = mandatesList[0]?.id;
                    setMandateIds(ids);
                    try {
                        const data = await mandateAuth(access_token, ids);
                        if (data?.token_url) {
                            window.open(data?.token_url);
                        }
                    } catch (error) {
                        console.error('Error in mandateAuth:', error);
                    }
                }
            }
        };

        fetchData();
    }, [callAuth]);


    const handlePaymentClicked = async (method: string) => {
        const url = `https://api.wealthup.me/api/v1/cybrilla/payments/create?method=${method}`;
        const orderOldIdVal = orderOldId?.length === 1 ? orderOldId[0] : orderOldId

        const body = {
            order_old_ids: orderOldId,
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(body),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (response.ok) {
                if (method === "NETBANKING" || method === 'UPI' && data?.token_url) {
                    window.open(data?.token_url);
                }
                if (investmentType === "sip") {
                    toast.success('Success!');
                } else {
                    toast.success('Purchase Successful!');
                }
                setOpenPaymentModal(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                const errorMessage =
                    data?.error?.errors?.[0]?.message ||
                    data?.error?.message ||
                    data?.error ||
                    response.statusText ||
                    `Error ${response.status}: Something went wrong.`;
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error("A network error occurred. Please check your connection and try again.");
        }

    }

    const handleRedeemClicked = async (orderType: string, planType: string, amounts: string | any[], scheme: string | any[]) => {
        const url = `https://api.wealthup.me/api/v1/cybrilla/orders/create?order_type=${orderType}&plan_type=${planType}`;
        const schemeOutput = scheme.length === 1 ? scheme[0] : scheme;
        const amountsOutput = amounts.length === 1 ? amounts[0] : amounts;
        let body: Record<string, any> = {
            amount: totalAmount,
            scheme: schemeOutput,
            folio_number: getFolioNumber(folioNumber, selectedFund.value),
        };

        if (planType === 'systematic') {
            body.frequency = frequency || undefined;
            body.number_of_installments = installments || undefined;
        }


        const validateBody =
        {
            order_type: orderType,  // purchase, switch, redeem
            plan_type: planType,   // systematic, once
            scheme: schemeOutput,    // isin of scheme to switch in for switch order
            frequency: frequency,   // frequency if plan_type is systematic
            installment_day: 5, // installment day when the order is to be executed if plan_type is systematic
            number_of_installments: 6,  // number of installments to be made of the systematic order
            amount: amountsOutput,    // units for the order to be executed
            isin: schemeOutput
        }

        const isValid = await validateData(access_token, validateBody);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(body),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (response.ok) {
                const orderOldId = data?.map((fund: { old_id: any; }) => fund?.old_id);
                const orderID = data?.map((fund: { id: any; }) => fund?.id);
                setOrderOldId(orderOldId)
                setOrderId(orderID)
                setOtpModal(true);
                toast.success('Redeem Sucessfull!');
            } else {
                const errorMessage =
                    data?.error?.errors?.[0]?.message ||
                    data?.error?.message ||
                    data?.error ||
                    response.statusText ||
                    `Error ${response.status}: Something went wrong.`;
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error("A network error occurred. Please check your connection and try again.");
        }
    }

    const handleDelete = (index: number) => {
        setFundsData((prevFunds: any) => prevFunds?.filter((_: any, i: number) => i !== index));
    };

    if (activeSection === "invest") {
        return (
            <div className=" w-full lg:max-w-xl">
                {/* Selected Funds List */}
                <div className="mt-4 w-full space-y-4">
                    {fundsData?.map((fund, index) => {
                        const isinDetail = isinDetails?.[fund?.value];
                        return (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-md shadow flex justify-between items-center"
                            >
                                {/* Fund Name */}
                                <div className="flex flex-col items-center space-x-2">
                                    <p className="text-[#023047] font-medium text-[14px] w-80">
                                        {fund?.name}
                                    </p>
                                    <div className="w-full flex gap-2">
                                        <span className="text-sm text-gray-500">● Equity</span>

                                        {/* Info Icon with Tooltip */}
                                        {/* <div className="relative group">
                                            <InformationCircleIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#023047]" />
                                            {investmentType === "sip" ?
                                                <div className="absolute z-50 left-0 mt-1 w-64 bg-white shadow-lg p-1 text-xs text-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                    <p className="text-xs">Max SIP Amount: {isinDetail?.max_sip_amount?.toLocaleString("en-IN", {
                                                        style: "currency",
                                                        currency: "INR",
                                                        maximumFractionDigits: 0,
                                                    })}</p>
                                                    <p className="text-xs">Min SIP Installments: {isinDetail?.min_sip_installments}</p>
                                                    <p className="text-xs">
                                                        Min SIP Amount:{" "}
                                                        {isinDetail?.min_sip_amount?.toLocaleString("en-IN", {
                                                            style: "currency",
                                                            currency: "INR",
                                                            maximumFractionDigits: 0,
                                                        })}
                                                    </p>
                                                    <p className="text-xs">SIP Frequency: {Object.keys(isinDetail?.sip_frequency_data || {}).join(", ")}</p>
                                                </div>
                                                :
                                                <div className="absolute z-50 left-0 mt-1 w-64 bg-white shadow-lg p-1 text-xs text-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                    <p className="text-xs">Min Initial Investment: {isinDetail?.min_initial_investment?.toLocaleString("en-IN", {
                                                        style: "currency",
                                                        currency: "INR",
                                                        maximumFractionDigits: 0,
                                                    })}</p>
                                                    <p className="text-xs">
                                                        Min Withdrawal Amount:{" "}
                                                        {isinDetail?.min_withdrawal_amount?.toLocaleString("en-IN", {
                                                            style: "currency",
                                                            currency: "INR",
                                                            maximumFractionDigits: 0,
                                                        })}
                                                    </p>
                                                    <p className="text-xs">
                                                        Max Withdrawal Amount:{" "}
                                                        {isinDetail?.max_withdrawal_amount?.toLocaleString("en-IN", {
                                                            style: "currency",
                                                            currency: "INR",
                                                            maximumFractionDigits: 0,
                                                        })}
                                                    </p>
                                                </div>
                                            }
                                        </div> */}
                                    </div>
                                </div>

                                {/* Amount Section */}
                                <div className="flex items-center space-x-2">
                                    {editableIndex === index ? (
                                        <input
                                            type="text"
                                            value={fund?.amount?.toLocaleString("en-IN", {
                                                maximumFractionDigits: 0,
                                            })}
                                            onChange={(e) => {
                                                const inputValue = e.target.value.replace(/[^0-9]/g, "");
                                                handleAmountChange(index, inputValue)
                                            }
                                            }
                                            onBlur={handleSave}
                                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                            autoFocus
                                            className="border border-gray-300 rounded px-2 py-1 text-[#023047] w-24 text-right"
                                        />
                                    ) : (
                                        <p className="font-semibold text-[#023047] text-[12px]">
                                            {fund?.amount?.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                                maximumFractionDigits: 0,
                                            })}
                                        </p>
                                    )}
                                    {isEditable && (
                                        <>
                                            {editableIndex === index ? (
                                                <CheckIcon
                                                    className="h-5 w-5 text-green-600 cursor-pointer"
                                                    onClick={handleSave}
                                                />
                                            ) : (
                                                <PencilIcon
                                                    className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#023047]"
                                                    onClick={() => setEditableIndex(index)}
                                                />
                                            )}
                                            <TrashIcon
                                                className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                                                onClick={() => handleDelete(index)}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                </div>
                {/* Fund Selection Dropdown */}
                {isEditable && (
                    <div className="mt-6 bg-white p-4 rounded-md shadow" style={{ zIndex: 999999 }}>
                        <div className="flex gap-4">
                            <AllFundsInput searchTerm={searchFundTerm} setSearchTerm={setSearchFundTerm} onClick={(selectedFund: any) => setSelectedFund(selectedFund)} access_token={access_token} />

                            {/* Amount Input */}
                            <input
                                type="text"
                                className="w-24 px-3 py-2 border border-gray-300 rounded-md text-right"
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/[^0-9]/g, "");
                                    setAddingAmount(inputValue);
                                }}
                                value={
                                    addingAmount
                                        ? new Intl.NumberFormat("en-IN").format(addingAmount) // Format in Indian style
                                        : ""
                                }
                                placeholder="0"
                            />

                            {/* Add Button */}
                            <button
                                onClick={handleAddFund}
                                className="bg-[#FF6B35] text-white px-4 py-2 rounded-md font-medium"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
                {
                    fundsData?.length ?
                        <button
                            disabled={isEditable}
                            onClick={() => {
                                const orderType = "purchase";
                                const planType = investmentType === "sip" ? "systematic" : "once";
                                const totalAmount = fundsData.reduce((acc, fund) => acc + fund.amount, 0);
                                const scheme = fundsData.map(fund => fund.value);
                                const orderID = fundsData.map(fund => fund.id);
                                const amounts = fundsData.map(fund => fund.amount);
                                setOrderId(orderID);
                                handleConfirmOrder(orderType, planType, totalAmount, scheme, installments, amounts);
                            }}
                            className={`w-full mt-2 h-[50px] text-white bg-[#FB7706] border border-[#FB7706] text-[16px] lg:text-[18px] font-semibold rounded-[4px] ${isEditable ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            title={isEditable ? 'Please save the funds before order' : ''}
                        >
                            {!showConfirOrder ? 'Place Order' : 'Confirm Order'}
                        </button>
                        :
                        <></>
                }
                {(openPaymentModal && investmentType !== "sip") && (
                    <div className="payment mt-4  lg:mt-10">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[18px] lg:text-[20px] text-[#035782] py-2">
                                Select Payment Method
                            </h2>
                        </div>
                        <div className="btns space-y-4 w-full lg:space-y-6">
                            <div className=" ">
                                {
                                    investmentType === "sip" ?
                                        <button onClick={() => {
                                            setSelectedMethod("EMANDATE")
                                        }} className={`w-full  h-[50px]   border ${selectedMethod === "EMANDATE" ? "bg-[#FB7706]   text-white" : "bg-white  text-black"}  text-[13px] border-[#FB7706] lg:text-[18px] font-semibold rounded-[4px]  `}>
                                            Mandate
                                        </button>
                                        :
                                        <div className="3butons flex justify-evenly items-center gap-2 lg:gap-4">
                                            <button onClick={() => {
                                                setSelectedMethod("Upi")
                                            }} className={`w-full  h-[50px]  border ${selectedMethod === "Upi" ? "bg-[#FB7706]   text-white" : "bg-white  text-black"} border-[#FB7706]  text-[13px] lg:text-[18px] font-semibold rounded-[4px]  `}>
                                                UPI
                                            </button>
                                            <button onClick={() => {
                                                setSelectedMethod("NetBanking")
                                            }} className={`w-full  h-[50px] border ${selectedMethod === "NetBanking" ? "bg-[#FB7706]   text-white" : "bg-white  text-black"}  border-[#FB7706] text-[13px] lg:text-[18px] font-semibold rounded-[4px]  `}>
                                                Netbanking
                                            </button>
                                        </div>
                                }
                            </div>

                            <button onClick={() => {
                                const method = selectedMethod?.toUpperCase()
                                handlePaymentClicked(method)
                            }} className="w-full  h-[50px] text-white bg-[#FB7706] border border-[#FB7706] text-[16px] lg:text-[18px] font-semibold rounded-[4px]">
                                Continue
                            </button>
                        </div>
                    </div>
                )}
                {/* Total Amount */}
                <div className="mt-6 flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span>
                        {(Number(totalAmount || 0) + Number(addingAmount || 0)).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                        })}
                    </span>
                </div>

            </div>
        );
    }
    if (activeSection === "withdraw") {
        return (
            <div className=" w-full lg:max-w-lg">
                {/* Selected Funds List */}
                <div className="mt-4 space-y-4 w-full">
                    {fundsData?.map((fund, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-md shadow flex justify-between items-center"
                        >
                            {/* Fund Name */}
                            <div>
                                <p className="text-[#023047] font-medium text-[14px] w-80">
                                    {fund?.name}
                                </p>
                                <span className="text-sm text-gray-500">● Equity</span>
                            </div>

                            {/* Amount Section */}
                            <div className="flex items-center space-x-2">
                                {editableIndex === index ? (
                                    <input
                                        type="number"
                                        value={fund?.amount}
                                        onChange={(e) => handleAmountChange(index, e.target.value)}
                                        onBlur={handleSave}
                                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                        autoFocus
                                        className="border border-gray-300 rounded px-2 py-1 text-[#023047] w-24 text-right"
                                    />
                                ) : (
                                    <p className="font-semibold text-[#023047] text-[16px]">
                                        Rs. {fund?.amount?.toLocaleString("en-IN")}
                                    </p>
                                )}

                                {/* Pen Button */}
                                {editableIndex === index ? (
                                    <CheckIcon
                                        className="h-5 w-5 text-green-600 cursor-pointer"
                                        onClick={handleSave}
                                    />
                                ) : (
                                    <PencilIcon
                                        className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#023047]"
                                        onClick={() => setEditableIndex(index)}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Fund Selection Dropdown */}
                {isEditable && (
                    <div className="mt-6 bg-white p-4 rounded-md shadow">
                        <div className="flex gap-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for fund"
                                    onFocus={() => setIsDropdownOpen(true)}
                                />
                                {isDropdownOpen && myFunds?.length && myFunds?.length > 0 && (
                                    <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded-md max-h-40 overflow-y-auto">
                                        {myFunds?.map((option) => (
                                            <div
                                                key={option?.value}
                                                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedFund(option);
                                                    setSearchTerm(option?.label);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {option?.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Amount Input */}
                            <input
                                type="text"
                                className="w-24 px-3 py-2 border border-gray-300 rounded-md text-right"
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/[^0-9]/g, "");
                                    if (inputValue > selectedFund?.market_value?.redeemable_amount) {
                                        setErrorMessage(`You can only add up to ₹${(selectedFund?.market_value?.redeemable_amount).toLocaleString('en-IN')} Difference: ₹${(Number(inputValue) - selectedFund?.market_value?.redeemable_amount).toLocaleString('en-IN')} amount`)
                                    }
                                    else {
                                        setErrorMessage('');
                                    }
                                    setAddingAmount(inputValue);
                                }}
                                value={addingAmount || ""}
                                placeholder="0"
                            />

                            {/* Add Button */}
                            <button
                                onClick={handleAddFund}
                                className="bg-[#FF6B35] text-white px-4 py-2 rounded-md font-medium"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
                {
                    errorMessage &&
                    <p className="text-[14px] text-red-600">
                        {errorMessage}
                    </p>
                }
                {myFunds?.length === 0 ?
                    <p className="text-[#023047] text-[14px] w-80">
                        No funds available in your mutual fund
                    </p>
                    :
                    <div className="my-6 flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span>Rs. {totalAmount?.toLocaleString("en-IN")}</span>
                    </div>
                }
                {
                    myFunds?.length ?
                        <div>
                            <button
                                onClick={() => {
                                    const orderType = "redeem";
                                    const planType = timePeriod === "monthly" ? "systematic" : "once";
                                    const scheme = fundsData.map(fund => fund.value);
                                    const amounts = fundsData.map(fund => fund.amount);
                                    handleRedeemClicked(orderType, planType, scheme, amounts)
                                }}
                                className="w-[100%] h-[50px] text-white    bg-[#FB7706] text-[18px] font-semibold rounded-[4px]"
                            >
                                Redeem</button>
                        </div>
                        :
                        <></>
                }
            </div>
        );
    }
    return null;
};