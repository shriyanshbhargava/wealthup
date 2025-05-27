"use client"

import { IMeFolio, IMeScheme } from './Interface';
import { KYCModal, KycStatusPopup, MandateModal, OtpModal, PaymentSucessModal } from './Modals';
import React, { useEffect, useState } from 'react'
import { getKycStatus, getOrderDetails, getRecommendedFunds, validateData } from './HelpingFunctions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ButtonsComponent } from './ButtonsComponent';
import { FaCheckCircle } from 'react-icons/fa';
import { FundList } from './FundList';
import HeaderNav from '../MyAccount/MutualFundsAnalyser/HeaderNav';
import { InvestComponent } from './InvestComponent';
import Link from 'next/link';
import Select from "react-select";
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { toast } from 'react-toastify';

export default function MutualFunds() {
    const [showButtons, setShowButtons] = useState(true);
    const [activeRightPart, setActiveRightPart] = useState("");
    const [selectedOption, setSelectedOption] = useState("All Units");
    const [showSidebar, setShowSidebar] = useState(true);
    const [unitValue, setUnitValue] = useState<any>("0");
    const [amountValue, setAmountValue] = useState<any>("0");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(""); // For investment amount
    const [withdrawAmount, setWithdrawAmount] = useState(""); // For investment amount
    const [timePeriod, setTimePeriod] = useState(""); // For selected time period
    const [investmentType, setInvestmentType] = useState("lump-sum"); // For selected investment type
    const [selectedFund, setSelectedFund] = useState("")
    const pathname = usePathname();

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [redemption, setRedemption] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const demo = pathname?.includes('demo');
    const [edit, setEdit] = useState(false)
    const [showmodel, setShowmodel] = useState(false)
    const [showPaymentModel, setShowPaymentModel] = useState(false)
    const [openMandateModal, setOpenMandateModal] = useState(false)
    const [callAuth, setCallAuth] = useState(false)
    const [date, setDate] = useState()
    const [installments, setInstallments] = useState()
    const [frequency, setFrequency] = useState("monthly")
    const [switchInTo, setSwitchInTo] = useState<any>();
    const [switchFrom, setSwitchFrom] = useState<any>();
    const [folioNumber, setFolioNumber] = useState<Record<string, string>>({});
    const [myFunds, setMyFunds] = useState<IMeScheme[]>([]);
    const [mandatesList, setMandatesList] = useState();
    const [approvedMandatesList, setApprovedMandatesList] = useState();
    const [mandateIds, setMandateIds] = useState();
    const [otpModal, setOtpModal] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const [otp, setOtp] = useState('');
    const [orderOldId, setOrderOldId] = useState("");
    const [orderId, setOrderId] = useState([]);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [isAuthSucess, setIsAuthSucess] = useState(false);
    const [mandateID, setMandateID] = useState();
    const [noOfInstallment, setNoOfInstallment] = useState();
    const [startMonth, setStartMonth] = useState();
    const [installmentDate, setInstallmentDate] = useState();
    const [textMessage, setTextMessage] = useState('');
    const [funds, setFunds] = useState<any>([
    ]);
    const [withdrawfunds, setWithdrawfunds] = useState<any>([

    ]);
    const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const [isKYCDone, setIsKYCDone] = useState(false);
    const [invAccCreated, setInvAccCreated] = useState(false);
    const [bankAccountVerified, setBankAccountVerified] = useState(false);
    const [mfAccountCreated, setMfAccountCreated] = useState(false);
    const [investorProfileCreated, setInvestorProfileCreated] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const tokens = Storage.getToken();

    const [loading, setLoading] = useState(true);
    const access_token = tokens?.access_token || '';
    const searchParams = useSearchParams();
    const router = useRouter();
    const [KYCStatus, setKYCStatus] = useState('');
    const queryOrderId = searchParams?.get('id');
    const queryStatus = searchParams?.get('status');
    const queryType = searchParams?.get('type');
    const queryMode = searchParams?.get("mode");
    const queryTab = searchParams?.get("tab");
    const queryCheck = searchParams?.get('check');
    const totalFundsAmount = funds?.reduce((acc: any, fund: { amount: any; }) => acc + fund.amount, 0);
    const [activeSection, setActiveSection] = useState(queryMode || "invest");

    const updateMode = (mode: any) => {
        setActiveSection(mode);
        setActiveRightPart('');
        const newParams = new URLSearchParams(searchParams?.toString());
        newParams.set("tab", mode);
        newParams.delete("mode");
        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (queryOrderId && (queryStatus === 'failure' || queryStatus === 'success')) {
                const data = await getOrderDetails(access_token, queryOrderId, 'purchase', 'once');
                if (data) {
                    const totalAmount = data.reduce((sum: number, fund: any) => sum + (fund?.amount || 0), 0);
                    const transformed = data?.map((fund: any) => ({
                        value: fund?.scheme,
                        name: fund?.fund_name,
                        amount: fund?.amount,
                        id: fund?.scheme,
                    }));
                    setAmount(totalAmount);
                    setTimePeriod('1');
                    setFunds(transformed);
                }
            }
        }
        fetchData()
    }, [access_token, queryOrderId, queryStatus])

    const handleEditClick = () => {
        if (edit && funds?.length === 0) {
            toast.error("You cannot save with 0 funds.");
            return;
        }
        setEdit(!edit);
    };

    useEffect(() => {
        const fetchQueryData = async () => {
            if (queryMode) {
                setShowButtons(false);
                setActiveRightPart(queryMode);
            }
            if (queryTab) {
                setActiveSection(queryTab);
            }
            if (queryOrderId && queryStatus && queryType != 'payment') {
                if (queryStatus === 'success') {
                    toast.success(`order ${queryStatus}`)
                    setShowmodel(true);
                } else {
                    toast.error(`order ${queryStatus}`)
                }
                return;
            }
            if (queryType && queryType === 'mandate' && queryStatus === 'success') {
                toast.success('Mandate Requested Sucessfully! Bank will update it.');
                return;
            }
            if (queryType && queryType === 'payment' && queryStatus) {
                if (queryStatus === 'success') {
                    setShowPaymentModel(true)
                } else {
                    toast.error(`Payment ${queryStatus}`)
                }
                return;
            }
            if (queryType && queryType === 'kyc_esign' && queryStatus) {
                toast.success(`kyc E-Sign ${queryStatus}!`);
                return;
            }
            if (queryType && queryType === 'identity_verification' && queryStatus) {
                toast.success(`Identity Verification is ${queryStatus}!`);
                return;
            }
        };
        fetchQueryData();
    }, [queryMode, queryOrderId, queryStatus, queryTab, queryType]);

    useEffect(() => {
        // Only handle the KYC case
        if (queryCheck !== 'kyc') return;

        const timer = setTimeout(() => {
            setIsInvestmentModalOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [queryCheck, invAccCreated]);

    useEffect(() => {
        const fetchStatus = async () => {
            const status = KYCStatus === 'ALREADY_EXISTS' || KYCStatus === 'SUCCESSFUL'
            if (status || bankAccountVerified || mfAccountCreated || investorProfileCreated) {
                setTextMessage('Demographic details needed.');
                return;
            } else if (KYCStatus === 'PENDING') {
                setTextMessage('Your KYC Status is pending to submitted.');
                const status = await getKycStatus(access_token || '')
                if (status?.kyc_object?.identity_doc_redirect_url) {
                    window.location.href = status?.kyc_object?.identity_doc_redirect_url;
                }
            }
            else if (KYCStatus === 'SUBMITTED') {
                setTextMessage('Your KYC Status submitted. Please wait');
            }
            else if (KYCStatus === 'ESIGN_REQUIRED') {
                setTextMessage('E-Sign is required.');
            }
            else if (KYCStatus === 'REJECTED') {
                setTextMessage('KYC is rejected');
            }
            else if (KYCStatus === 'EXPIRED') {
                setTextMessage('KYC is EXPIRED');
            }
        }
        fetchStatus();
    }, [KYCStatus, access_token, bankAccountVerified, investorProfileCreated, mfAccountCreated])

    useEffect(() => {
        const status = KYCStatus === 'ALREADY_EXISTS' || KYCStatus === 'SUCCESSFUL'
        if (status && !bankAccountVerified && mfAccountCreated && investorProfileCreated) {
            setKYCStatus('BankVerify')
        }
    }, [KYCStatus, bankAccountVerified, investorProfileCreated, mfAccountCreated])

    useEffect(() => {
        const fetchKYCStatus = async () => {
            if (KYCStatus === '') {
                setIsKYCModalOpen(false);
                return;
            }
            const status = KYCStatus === 'ALREADY_EXISTS' || KYCStatus === 'SUCCESSFUL'
            if (status && bankAccountVerified && mfAccountCreated && investorProfileCreated) {
                setLoading(false);
                setIsKYCDone(true);
                setIsKYCModalOpen(false);
            } else {
                setLoading(false);
                if (!queryOrderId) {
                    setIsKYCModalOpen(true);
                }
                setIsKYCDone(false);
            }
        };
        fetchKYCStatus();
    }, [KYCStatus, bankAccountVerified, investorProfileCreated, mfAccountCreated, queryOrderId]);

    useEffect(() => {
        const fetchData = async () => {
            if (investmentType === 'sip') {
                const data = await fetchMandatelist(access_token || '');
                const mandates = data?.mandates;
                const approvedMandates = data?.mandates?.filter((mandate: { mandate_status: string; }) => mandate.mandate_status === "APPROVED");
                setMandatesList(mandates);
                setApprovedMandatesList(approvedMandates);
            }
        }
        fetchData();
    }, [access_token, investmentType])

    useEffect(() => {
        if (showmodel && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (countdown === 0) {
            window.location.href = '/myaccount/transact/mutualfunds?check';
            setShowmodel(false);
        }
    }, [showmodel, countdown, setShowmodel]);

    useEffect(() => {
        const fetchSwitchFunds = async () => {
            if (activeRightPart === "switch") {
                try {
                    const response = await fetch('https://api.wealthup.me/api/v1/cybrilla/funds/me', {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    });

                    if (!response.ok) throw new Error('Failed to fetch funds');

                    const data = await response.json();

                    if (!data?.folios) return;

                    const schemes: any[] = [];
                    const folioMapping: Record<string, string> = {};

                    data.folios.forEach((folio: IMeFolio) => {
                        if (!folio.schemes) return;

                        folio.schemes.forEach(fund => {
                            if (!fund.isin) return;

                            schemes.push({
                                ...fund,
                                value: fund.isin,
                                label: fund.name,
                                fullName: fund.name,
                                nav: fund.nav,
                            });

                            folioMapping[fund.isin] = folio.folio_number;
                        });
                    });

                    setMyFunds(schemes);
                    setFolioNumber(folioMapping);

                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchSwitchFunds();
    }, [access_token, activeRightPart]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => {
            setShowSidebar(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isEditable, setIsEditable] = useState(false);
    const [options, setOptions] = useState([
        { value: 'select', label: 'Find a new fund' },
    ]);
    const [addingAmount, setAddingAmount] = useState();


    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
    };

    const handleChange = (e: any) => {
        if (selectedOption === "Select amount") {
            setAmountValue(e);
            setUnitValue(e / switchFrom?.nav?.value);
        }
        else if (selectedOption === "Select units") {
            setUnitValue(e);
            setAmountValue(e * switchFrom?.nav?.value)

        }
    };
    const handleBlur = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        (async () => {
            const tokens = Storage.getToken();
            if (tokens !== null) {
                const userApiClient = new UserApi(tokens.access_token);
                const res = await userApiClient.getAuthMe();

                if (res.status === 200) {
                    const data = await res.json();
                    const investmentAccoutCreated = (data?.cybrilla?.investor_profile?.id && data?.cybrilla?.mf_account?.id) ? true : false;
                    let initials = ''
                    initials += (data?.first_name?.split('')[0] ?? '')
                    initials += (data?.last_name?.split('')[0] ?? '')
                    setKYCStatus(data?.cybrilla?.kyc?.status);
                    setInvAccCreated(investmentAccoutCreated);
                    setInvestorProfileCreated(!!data?.cybrilla?.investor_profile?.id);
                    setMfAccountCreated(!!data?.cybrilla?.mf_account?.id);
                    setBankAccountVerified(data?.cybrilla?.bank_account?.verification_status === 'completed');
                    if (initials.length === 0) {
                        initials = 'U'
                    }
                    setName(initials);
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedFund == "select") {
            togglePopup()
            setSelectedFund("")
        }
    }, [selectedFund])

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleAmountChange = (value: string, index: number) => {
        const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
        const updatedFunds = [...funds];
        updatedFunds[index].amount = numericValue;
        setFunds(updatedFunds);
    };

    const fetchRecommendedFunds = async () => {
        const type = activeSection === 'invest' ? 'purchase' : 'redeem';
        try {
            const data = await getRecommendedFunds(access_token || '', type);
            if (activeSection === 'withdraw') {
                if (timePeriod === 'monthly') {
                    const transformed = data?.systematic?.map((fund: any) => ({
                        value: fund?.isin,
                        name: fund?.name,
                        label: fund?.name,
                        amount: fund?.nav,
                        id: fund?.isin,
                    }));
                    setMyFunds(transformed);
                } else {
                    const transformed = data?.once?.map((fund: any) => ({
                        value: fund?.isin,
                        name: fund?.name,
                        label: fund?.name,
                        amount: fund?.nav,
                        id: fund?.isin,
                    }));
                    setMyFunds(transformed);
                }
            } if (activeSection == 'invest') {
                if (investmentType === 'sip') {
                    const transformed = data?.systematic?.map((fund: any) => ({
                        value: fund?.isin,
                        name: fund?.name,
                        amount: fund?.nav,
                        id: fund?.isin,
                    }));
                    setFunds(transformed);
                } else {
                    const transformed = data?.once?.map((fund: any) => ({
                        value: fund?.isin,
                        name: fund?.name,
                        amount: fund?.nav,
                        id: fund?.isin,
                    }));
                    setFunds(transformed);
                }
            }
        } catch (error) {
            console.error('Error fetching recommended funds:', error);
        }
    };

    useEffect(() => {
        if (queryStatus != 'failure' && queryStatus != 'success') {
            fetchRecommendedFunds();
        }
    }, [investmentType, activeSection, queryStatus]);

    const handleDelete = (index: any) => {
        const updatedFunds = funds.filter((_: any, i: any) => i !== index);
        setFunds(updatedFunds);
    };

    const handleSwitchClicked = async (orderType: string, planType: string) => {
        const url = `https://api.wealthup.me/api/v1/cybrilla/orders/create?order_type=${orderType}&plan_type=${planType}`;
        if (Number(amountValue) > switchFrom?.market_value.redeemable_amount) {
            toast.error('Please enter amount less than current amount');
            return;
        }
        const body = {
            switch_out_scheme: switchFrom?.isin,
            switch_in_scheme: switchInTo?.value,
            folio_number: folioNumber[switchFrom?.isin],
            amount: Number(amountValue),
        };
        const validateBody =
        {
            order_type: orderType,  // purchase, switch, redeem
            plan_type: planType,   // systematic, once
            switch_in_scheme: switchInTo?.value,    // isin of scheme to switch in for switch order
            switch_out_scheme: switchFrom?.isin,   // isin of scheme to switch in for switch order
            amount: Number(amountValue),      // amount for order to be executed
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

    const getBusinessDay = (date: Date, daysToAdd: number) => {
        let count = 0;
        while (count < daysToAdd) {
            date.setDate(date.getDate() + 1);
            // Skip weekends (Saturday: 6, Sunday: 0)
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                count++;
            }
        }
        return date;
    };

    const today = new Date();
    const tPlus3Date = getBusinessDay(today, 3);

    const formattedDate = tPlus3Date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });


    useEffect(() => {
        if (selectedOption === "All Units" && activeRightPart === "switch") {
            setAmountValue(String(switchFrom?.market_value.redeemable_amount));
            setUnitValue(switchFrom?.holdings?.redeemable_units);
        }
    }, [activeRightPart, selectedOption, switchFrom?.holdings?.redeemable_units, switchFrom?.market_value.redeemable_amount])


    const totalAmount = funds?.reduce((acc: number, fund: { amount: any; }) => acc + Number(fund.amount), 0);
    const totalWithdrawAmount = withdrawfunds?.reduce((acc: number, fund: { amount: any; }) => acc + Number(fund.amount), 0);

    useEffect(() => {
        // Add or remove the `overflow-hidden` class on the body when showModel changes
        if (showmodel) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup to remove the class when the component unmounts
        return () => document.body.classList.remove("overflow-hidden");
    }, [showmodel]);

    const handleOtpClose = async () => {
        const url = `https://api.wealthup.me/api/v1/cybrilla/orders/verify/consent`;
        const orderIdOutput = orderId?.length === 1 ? orderId[0] : orderId;
        const body = {
            ...(orderId?.length === 1 ? { order_id: orderIdOutput } : { order_ids: orderIdOutput }),
            otp: otp,
        };
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
                toast.success('Otp Verified!');
                if (activeRightPart === "withdraw") {
                    toast.success(`Transaction Completed! Money will be credited to your account by: ${formattedDate}`);
                    window.location.href = '/myaccount/transact/mutualfunds';
                }
                if (activeRightPart === "invest") {
                    if (investmentType === "sip") {
                        toast('Congratulations Your Sip Has been Set!');
                    }
                    setOpenPaymentModal(true);
                }
                if (activeRightPart === "switch") {
                    setShowmodel(true);
                }
                setOpenPaymentModal(true);
                setOtpModal(false);
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

    useEffect(() => {
        setOpenPaymentModal(false);
        setOtpModal(false);
    }, [activeSection])

    const MandateModalBody = {
        "mandate_type": "E_MANDATE",
        // "mandate_limit": Number(totalFundsAmount) 
    }
    useEffect(() => {
        if (myFunds?.length === 0) {
            setFirstTime(true);
        } else {
            setFirstTime(false);
        }
    }, [myFunds])


    return (
        <main className={`w-full `} >
            <div className="flex items-end justify-end">
                {
                    pathname === "/myaccount/transact/mutualfunds" &&
                    <HeaderNav
                        showBtn={true}
                        showNotification={true}
                        whatsapp={false}
                        beta={false}
                        title="My Transactions"
                    />
                }

            </div>
            {/* Main Content */}
            <div
                className={`bg-[#E7F9F2] lg:pb-28 w-full transition-all ${showmodel ? "overflow-hidden" : ""} ${showSidebar ? "" : "pb-16"}  duration-300 `}
            >
                <div className="flex gap-4 px-4">
                    <Link
                        href="/myaccount/transact/mutualfunds"
                        className="text-white text-base sm:text-[6px] md:text-[1.25rem] bg-green-800 w-fit py-2 px-4 my-2 md:my-5 rounded-full font-semibold"
                    >
                        Mutual Funds
                    </Link>
                    <Link
                        href="/myaccount/transact/invoicediscounting"
                        className="text-white text-base sm:text-[6px] md:text-[1.25rem] bg-gray-500 w-fit py-2 px-4 my-2 md:my-5 rounded-full font-semibold"
                    >
                        Invoice Discounting
                    </Link>
                    <Link
                        href="/myaccount/transact/digitalgold"
                        className="text-white text-base sm:text-[6px] md:text-[1.25rem] bg-gray-500 w-fit py-2 px-4 my-2 md:my-5 rounded-full font-semibold"
                    >
                        Digital Gold/Silver
                    </Link>
                </div>
                {/* Header */}

                {
                    isKYCModalOpen && (
                        <KYCModal isModalOpen={isKYCModalOpen} setIsModalOpen={setIsKYCModalOpen} textMessage={textMessage} KYCStatus={KYCStatus} />
                    )
                }
                {
                    isInvestmentModalOpen && (
                        <KycStatusPopup invAccCreated={invAccCreated} queryCheck={queryCheck || ''} />
                    )
                }

                {/* Back Button */}
                {!showButtons && (
                    <div
                        onClick={() => {
                            setShowButtons(true);
                            setActiveRightPart("");
                        }}
                        className="backbtn w-fit ml-8  text-[16px] lg:text-[18px] cursor-pointer hover:font-medium text-[#035782]  py-4 underline"
                    >
                        Back
                    </div>
                )}
                {
                    openMandateModal && (
                        <MandateModal approvedMandatesList={approvedMandatesList} mandatesList={mandatesList} setMandateID={setMandateID} setIsAuthSucess={setIsAuthSucess} onClose={() => { setOpenMandateModal(false) }} body={MandateModalBody} access_token={access_token || ''} />
                    )
                }
                {
                    otpModal && (
                        <OtpModal onclose={handleOtpClose} otp={otp} setOtp={setOtp} closeModal={() => setOtpModal(false)} />
                    )
                }
                {loading ?
                    <div className="flex justify-center items-center h-full w-full z-[999]">
                        <div className="relative h-20 w-20 rounded-full">
                            <div className="absolute inset-0 rounded-full bg-transparent border-[4px] border-transparent"></div>
                            <div className="h-full w-full rounded-full border-[4px] border-transparent border-t-[#035782] animate-spin"></div>
                        </div>
                    </div>
                    :
                    <div
                        className={`flex flex-col lg:flex-row gap-10 px-4 w-full pt-5 justify-around md:px-[50px] ${showSidebar ? "lg:ml-0" : "ml-0"
                            } ${showSidebar ? "lg:mr-[10%]" : "mr-0"}`}
                    >
                        {showButtons && (
                            <ButtonsComponent
                                firstTime={firstTime}
                                activeSection={activeSection}
                                setActiveSection={updateMode}
                            />
                        )}
                        <div className="w-full">
                            <InvestComponent
                                startMonth={startMonth}
                                setStartMonth={setStartMonth}
                                noOfInstallment={noOfInstallment}
                                setNoOfInstallment={setNoOfInstallment}
                                setInstallmentDate={setInstallmentDate}
                                installmentDate={installmentDate}
                                access_token={access_token || ''}
                                setSelectedFund={setSelectedFund}
                                selectedFund={selectedFund}
                                amount={amount}
                                date={date}
                                options={options}
                                setDate={setDate}
                                installments={installments}
                                setInstallments={setInstallments}
                                withdrawAmount={withdrawAmount}
                                setWithdrawAmount={setWithdrawAmount}
                                activeRightPart={activeRightPart}
                                timePeriod={timePeriod}
                                setInvestmentType={setInvestmentType}
                                investmentType={investmentType}
                                setTimePeriod={setTimePeriod}
                                setAmount={setAmount}
                                setActiveRightPart={setActiveRightPart}
                                setShowButtons={setShowButtons}
                                activeSection={activeSection}
                                setSwitchFrom={setSwitchFrom}
                                switchFrom={switchFrom}
                                setSwitchInTo={setSwitchInTo}
                                switchInTo={switchInTo}
                                redemption={redemption}
                                setRedemption={setRedemption}
                                setFrequency={setFrequency}
                                frequency={frequency}
                                setOpenMandateModal={setOpenMandateModal}
                                isAuthSucess={isAuthSucess}
                                approvedMandatesList={approvedMandatesList}
                            />
                        </div>
                        {isPopupVisible && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg w-96">
                                    <h2 className="text-xl font-bold mb-4">Select Fund Name</h2>
                                    <Select
                                        options={options}

                                        onChange={(e: any) => {
                                            const newOption = { value: e.value, label: e.label };
                                            setOptions((prevOptions) => [...prevOptions, newOption])
                                            setSelectedFund(e.value)
                                            togglePopup()

                                        }}
                                        placeholder="Search for fund"
                                        className="h-11"
                                        classNamePrefix="custom-select h-11"
                                        styles={{

                                        }}
                                    />
                                    <div className="flex mt-2 justify-end">
                                        <button
                                            className="bg-[#23A3E4] text-white py-2 px-4 rounded-md mr-2"
                                            onClick={togglePopup}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Active Sections */}
                        {activeRightPart === "invest" && (
                            <div className="allocation w-full">
                                <div className="heading pb-6 flex justify-between items-center w-full lg:max-w-xl">
                                    <div className=" text-[18px] lg:text-[20px] font-bold text-[#035782] ">
                                        Your Cart
                                    </div>
                                    <div onClick={handleEditClick}>  {
                                        edit == true ? <span className="text-[18px] cursor-pointer text-[#23A3E4] underline ">Save</span> : <span className="text-[18px] cursor-pointer text-[#23A3E4] underline">Edit</span>
                                    }
                                    </div>
                                </div>
                                <div className="space-y-4 w-full lg:space-y-8">
                                    <FundList
                                        noOfInstallment={noOfInstallment}
                                        startMonth={startMonth}
                                        frequency={frequency}
                                        installmentDate={installmentDate}
                                        access_token={access_token || ''}
                                        setAddingAmount={setAddingAmount}
                                        addingAmount={addingAmount}
                                        selectedFund={selectedFund}
                                        setSelectedFund={setSelectedFund}
                                        setFundsData={setFunds}
                                        fundsData={funds}
                                        isEditable={edit}
                                        setIsEditable={setEdit}
                                        onAmountChange={handleAmountChange}
                                        onDelete={handleDelete}
                                        totalAmount={totalAmount}
                                        activeSection={activeSection}
                                        folioNumber={folioNumber}
                                        setFolioNumber={setFolioNumber}
                                        myFunds={myFunds}
                                        setMyFunds={setMyFunds}
                                        openPaymentModal={openPaymentModal}
                                        setOpenPaymentModal={setOpenPaymentModal}
                                        otpModal={otpModal}
                                        setOtpModal={setOtpModal}
                                        orderOldId={orderOldId}
                                        setOrderOldId={setOrderOldId}
                                        orderId={orderId}
                                        setOrderId={setOrderId}
                                        investmentType={investmentType}
                                        installments={installments}
                                        mandatesList={mandatesList}
                                        setMandatesList={setMandatesList}
                                        mandateIds={mandateIds}
                                        setMandateIds={setMandateIds}
                                        openMandateModal={openMandateModal}
                                        setOpenMandateModal={setOpenMandateModal}
                                        callAuth={callAuth}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Withdraw Section */}
                        {activeRightPart === "withdraw" && (
                            <div className="Sell Recommendation w-full md:mr-[200px]  lg:w-[35%] ">
                                <div className="heading pb-6 flex justify-between items-center ">
                                    <div className=" text-[18px] lg:text-[20px] font-bold text-[#035782] ">
                                        Sell Recommendation
                                    </div>
                                    <div onClick={() => {
                                        setEdit(!edit)
                                    }}>  {
                                            edit == true ? <span className="text-[18px] cursor-pointer text-[#23A3E4] underline">Save</span> : <span className="text-[18px] cursor-pointer text-[#23A3E4] underline">Edit</span>
                                        }
                                    </div>
                                </div>
                                <div className="w-full space-y-8">
                                    <FundList
                                        access_token={access_token || ''}
                                        selectedFund={selectedFund}
                                        setSelectedFund={setSelectedFund}
                                        fundsData={withdrawfunds}
                                        setFundsData={setWithdrawfunds}
                                        addingAmount={addingAmount}
                                        setAddingAmount={setAddingAmount}
                                        withdrawAmount={withdrawAmount}
                                        isEditable={edit}
                                        timePeriod={timePeriod}
                                        onAmountChange={handleAmountChange}
                                        onDelete={handleDelete}
                                        totalAmount={totalWithdrawAmount}
                                        activeSection={activeSection}
                                        folioNumber={folioNumber}
                                        setFolioNumber={setFolioNumber}
                                        myFunds={myFunds}
                                        setMyFunds={setMyFunds}
                                        installments={installments}
                                        frequency={frequency}
                                        openPaymentModal={openPaymentModal}
                                        setOpenPaymentModal={setOpenPaymentModal}
                                        otpModal={otpModal}
                                        setOtpModal={setOtpModal}
                                        orderOldId={orderOldId}
                                        setOrderOldId={setOrderOldId}
                                        orderId={orderId}
                                        setOrderId={setOrderId}
                                    />
                                </div>
                                {/* <div onClick={togglePopup}  className="payment underline font-semibold py-3 text-[18px] text-[#23A3E4] my-3 flex items-center">
    Change Funds
               </div> */}
                            </div>
                        )}

                        {/* Switch Section */}
                        {activeRightPart === "switch" && (
                            <div className="w-full mr-[200px]  lg:w-[35%]">
                                <h2 className="text-[20px] text-[#035782]">Switch Summary</h2>
                                <div className="bg-[#f3f7f9] p-3">
                                    <p className="text-[16px]">{switchFrom?.name}</p>
                                    <div className="flex items-center gap-2 pb-1">
                                        <div className="w-3 h-3  rounded-full bg-[#39CEF3]" />
                                        <span>Equity</span>
                                    </div>
                                </div>
                                <div className=" flex justify-between items-center my-6">
                                    <p className="text-[18px]">Available Amount <br /> ₹ {Number(switchFrom?.market_value?.redeemable_amount || 0)}</p>
                                    <p className="text-[18px]"> Available Units <br /> {switchFrom?.holdings?.redeemable_units} </p>
                                </div>
                                <div className="border-b-2 border-black ">
                                    <p className=" text-[#035782] text-[20px] font-semibold">I want to switch in to</p>
                                    <p className="text-[16px]">{switchInTo?.label}</p>
                                </div>
                                <div>
                                    <div className="flex justify-between my-4">
                                        {["All Units", "Select units", "Select amount"].map((option) => (
                                            <div
                                                key={option}
                                                className="flex items-center gap-2 cursor-pointer"
                                                onClick={() => handleSelect(option)}
                                            >
                                                <div
                                                    className={`w-4 h-4 border-2 rounded-full ${selectedOption === option ? "bg-[#23A3E4]" : "border-[#23A3E4]"
                                                        }`}
                                                />
                                                <p
                                                    className={`mt-4 text-[16px] font-medium ${selectedOption === option ? "text-[#23A3E4]" : "text-gray-800"
                                                        }`}
                                                >
                                                    {option}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="flex  justify-between items-center">
                                            <h2 className="text-[20px]  mb-[-2px] font-medium">
                                                {selectedOption === "Select amount" ? "Amount to switch" : "Units to switch"}
                                            </h2>
                                            <h2 className="text-[20px]  mb-[-2px] font-medium">
                                                {selectedOption === "Select amount" ? "Approx. Units" : "Approx. Amount"}
                                            </h2>
                                        </div>
                                        <div className={`border  border-black ${selectedOption === "All Units" ? "bg-gray-300" : ""} flex justify-between items-center px-5  rounded-xl`}>
                                            <input
                                                disabled={selectedOption === "All Units"}
                                                type="text"
                                                maxLength={13}
                                                value={
                                                    selectedOption === "Select amount"
                                                        ? `₹ ${Number(amountValue || 0).toLocaleString("en-IN")}`
                                                        : unitValue
                                                }
                                                onChange={(e) => {
                                                    setErrorMessage('');
                                                    const inputValue = e.target.value.replace(/[^0-9.]/g, "");
                                                    if (inputValue > switchFrom?.market_value?.redeemable_amount && selectedOption === "Select amount") {
                                                        setErrorMessage(`You can only add up to ₹${(switchFrom?.market_value?.redeemable_amount).toLocaleString('en-IN')} Difference: ₹${(Number(inputValue) - switchFrom?.market_value?.redeemable_amount).toLocaleString('en-IN')} amount`)
                                                    }
                                                    else {
                                                        setErrorMessage('');
                                                    } // Only allow numeric input
                                                    handleChange(inputValue); // Pass the cleaned number back to the handler
                                                }}
                                                onBlur={() => {
                                                    handleBlur();
                                                    setErrorMessage('');
                                                }}
                                                onFocus={() => {
                                                    if (selectedOption === "Select amount") {
                                                        setErrorMessage('');
                                                        const inputValue = amountValue.replace(/[^0-9.]/g, "");
                                                        handleChange(inputValue); // Remove formatting for editing
                                                    }
                                                }}
                                                className="text-[30px] font-semibold w-[70%] bg-transparent border-none outline-none"
                                                autoFocus
                                            />
                                            <p className="font-normal  mt-3 text-[18px]">
                                                {selectedOption === "Select amount" ?
                                                    (
                                                        <>
                                                            {Math.round(amountValue / switchFrom?.nav?.value)}
                                                        </>
                                                    )
                                                    : (<>
                                                        {Number(Math.round(unitValue * switchFrom?.nav?.value)).toLocaleString("en-IN", {
                                                            style: "currency",
                                                            currency: "INR",
                                                            maximumFractionDigits: 0,
                                                        }).slice(1)}
                                                    </>
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                    {
                                        errorMessage &&
                                        <p className="text-red-600 text-[14px]">
                                            {errorMessage}
                                        </p>
                                    }
                                </div>
                                <button
                                    onClick={() => {
                                        const orderType = "switch";
                                        const planType = redemption == "monthly" ? "systematic" : "once";
                                        handleSwitchClicked(orderType, planType);
                                    }}
                                    className="w-[100%] h-[50px] text-white my-6    bg-[#FB7706] text-[18px] font-semibold rounded-[5px]"
                                >
                                    Switch now</button>
                            </div>
                        )}
                    </div>
                }
            </div>
            {
                showPaymentModel &&
                <PaymentSucessModal setShowPaymentModel={setShowPaymentModel} funds={funds} />
            }
            {
                showmodel &&
                <div
                    className="fixed  inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
                    <div
                        style={{ backgroundImage: "url('/assets/ribbon.gif')", backgroundSize: 'contain', backgroundPosition: 'center' }} className="bg-white p-6  rounded-md flex flex-col items-center  shadow-lg lg:w-[30%] lg:mx-0 mx-4 lg:h-[43%]">
                        <FaCheckCircle className="text-4xl  text-[#01C8A9] my-3" />

                        <h1 className="text-3xl font-bold  text-[#035782]">Congrats! </h1>
                        <h1 className="text-2xl font-medium ">Transaction successful.  </h1>
                        <span className="text-[17px] w-[95%] font-normal text-center">The investment will get reflected in your portfolio in 2-3 business days.</span>

                        <div className="flex ">
                            <button onClick={() => { setShowmodel(false) }}
                                className="bg-[#FB7306] mt-7 text-white font-medium py-2 px-4 rounded-md "

                            >
                                Redirecting you in {countdown} s
                            </button>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}

const fetchMandatelist = async (access_token: string) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/mandate/list`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Payment Error:', errorMessage)
            toast.error('Payment Failed! Contact Support');
        }
    } catch (error) {
        console.error('Error fetching funds:', error);
        toast.error('Failed to fetch funds');
        return [];
    }
}
