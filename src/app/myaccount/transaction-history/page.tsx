"use client"

import React, { useEffect, useState } from 'react';

import Filter from '@/components/TransactionFilter';
import HeaderNav from '@/components/MyAccount/MutualFundsAnalyser/HeaderNav';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import Image from 'next/image';
import Sort from '@/assets/icons/sort.svg'
import Storage from '@/utils/storage';
import { apiUrl } from '@/utils/constants';

type FilterState = {
    dateRange: any;
    investmentType: string[];
    transactionType: string[];
    status: string[];
    sortBy: string | null;
    sortOrder: 'asc' | 'desc';
};
interface ITransaction {
    _id: string;
    user_id: string;
    type: string;
    amount: number;
    status: string;
    deal_id?: number;
    investment_type?: string;
    message: string;
    order_id?: string;
    session_id?: string;
    investment_name?: string;
    units?: any;
    tap_invest_transaction_id?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


const formatDate = (isoDate: any) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

function formatFundType(fundType: string): string {
    return fundType
        .replace(/_/g, ' ')
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });
    const [transactionData, setTransactionData] = useState<ITransaction[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        dateRange: null,
        investmentType: [],
        transactionType: [],
        status: [],
        sortBy: null,
        sortOrder: 'asc',
    });

    const tokenData = Storage.getToken();
    const access_token = tokenData?.access_token;


    const fetchData = async () => {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/api/v1/transaction-history`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
        });
        const data = await res.json();;
        setTransactionData(data?.data);
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [access_token]);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999); // End of today

        const startOfThisWeek = new Date(today);
        startOfThisWeek.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)

        const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of this month

        let startOfCustom: Date | null = null;
        let endOfCustom: Date | null = null;

        if (typeof filters.dateRange === "object" && filters?.dateRange?.from && filters?.dateRange?.to) {
            startOfCustom = new Date(filters.dateRange.from);
            endOfCustom = new Date(filters.dateRange.to);
            endOfCustom.setHours(23, 59, 59, 999); // Include the entire day for the 'to' date
        }

        if (typeof filters.dateRange === "string") {
            switch (filters.dateRange.toLowerCase()) {
                case "today":
                    setDates({ startDate: today, endDate: endOfToday });
                    break;
                case "this week":
                    setDates({ startDate: startOfThisWeek, endDate: endOfToday });
                    break;
                case "this month":
                    setDates({ startDate: startOfThisMonth, endDate: endOfToday });
                    break;
                default:
                    setDates({ startDate: null, endDate: null });
                    break;
            }
        } else if (typeof filters.dateRange === "object" && startOfCustom && endOfCustom) {
            setDates({ startDate: startOfCustom, endDate: endOfCustom });
        }
    }, [filters.dateRange]);

    const getFilteredData = () => {
        return transactionData
            .filter((item) => {
                // Filter by date range
                if (filters.dateRange) {
                    const currentDate = new Date(item.createdAt);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Start of today

                    const endOfToday = new Date(today);
                    endOfToday.setHours(23, 59, 59, 999); // End of today

                    const startOfThisWeek = new Date(today);
                    startOfThisWeek.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)

                    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of this month

                    // Check if the dateRange is an object for the "custom" case
                    let startOfCustom = null;
                    let endOfCustom = null;
                    if (typeof filters.dateRange === "object" && filters.dateRange.from && filters.dateRange.to) {
                        startOfCustom = new Date(filters.dateRange.from);
                        endOfCustom = new Date(filters.dateRange.to);
                        endOfCustom.setHours(23, 59, 59, 999); // Include the entire day for the 'to' date
                    }

                    console.log("Date Debug:", {
                        currentDate: currentDate.toISOString(),
                        today: today.toISOString(),
                        endOfToday: endOfToday.toISOString(),
                        startOfThisWeek: startOfThisWeek.toISOString(),
                        startOfThisMonth: startOfThisMonth.toISOString(),
                        startOfCustom: startOfCustom?.toISOString(),
                        endOfCustom: endOfCustom?.toISOString(),
                        filter: filters.dateRange,
                    });

                    if (typeof filters.dateRange === "string") {
                        switch (filters.dateRange.toLowerCase()) {
                            case "today":
                                return currentDate >= today && currentDate <= endOfToday;
                            case "this week":
                                return currentDate >= startOfThisWeek && currentDate <= endOfToday;
                            case "this month":
                                return currentDate >= startOfThisMonth && currentDate <= endOfToday;
                            default:
                                return true;
                        }
                    } else if (typeof filters.dateRange === "object" && startOfCustom && endOfCustom) {
                        return currentDate >= startOfCustom && currentDate <= endOfCustom;
                    }


                    return true; // Default fallback
                }
                return true;
            })
            .filter((item) => {
                // Filter by investment type
                if (filters?.investmentType?.length > 0) {
                    return filters.investmentType.some((type) =>
                        'Invoice Discounting'.includes(formatFundType(type))
                    );
                }
                return true;
            })
            .filter((item) => {
                // Filter by transaction type
                if (filters?.transactionType?.length > 0) {
                    return filters.transactionType.includes(item.type);
                }
                return true;
            })
            .filter((item) => {
                // Filter by status
                if (filters?.status?.length > 0) {
                    return filters.status.includes(item.status);
                }
                return true;
            })
            .sort((a, b) => {
                if (filters.sortBy) {
                    const factor = filters.sortOrder === "asc" ? 1 : -1;
                    switch (filters.sortBy) {
                        case "Date":
                            return factor * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                        case "Transaction":
                            return factor * a.type.localeCompare(b.type);
                        case "Amount":
                            return factor * (a.amount - b.amount);
                        case "Status":
                            return factor * a.status.localeCompare(b.status);
                        default:
                            return 0;
                    }
                }
                return 0;
            });
    };






    const handleFilterChange = (updatedFilters: FilterState) => {
        setFilters((prev) => ({
            ...prev,
            ...updatedFilters,
        }));
    };


    const filteredResult = getFilteredData();

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredResult?.length / itemsPerPage);

    const currentData = filteredResult?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="relative">
            <HeaderNav
                showBtn={true}
                showNotification={true}
                whatsapp={false}
                beta={false}
                title="My Transactions"
            />
            <div className="md:p-8 md:block hidden">
                <div className="flex justify-between items-center mb-4 px-5">
                    {
                        dates?.startDate && dates?.endDate ?
                            <h2 className="text-base font-semibold">
                                From: {dates?.startDate.toLocaleDateString()} To: {dates?.endDate.toLocaleDateString()}
                            </h2>
                            :
                            <div></div>
                    }
                    <div className='relative'>
                        <button
                            className="px-4 py-1 text-[#035782] bg-white font-semibold border-2 shadow-sm flex gap-2 items-center border-[#1e739e] rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[#1e739e]"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <HiOutlineAdjustmentsHorizontal className='text-2xl text-gray-400' />
                            <span className='pt-[2px]'>Filter</span>
                        </button>
                    </div>
                    {
                        isFilterOpen &&
                        <div className="w-[250px] xxsm:w-[270px] xs:w-[340px] xsm:w-[400px] p-6 bg-[#DBF6F1] rounded-xl shadow-[#60a1c2] shadow-md mb-4 absolute right-10 top-16">
                            <Filter filters={filters} onFilterChange={handleFilterChange} onclose={() => { setIsFilterOpen(false); }} />
                        </div>
                    }
                </div>
                <div className="pt-4 p-8  bg-white rounded-xl shadow-[#60a1c2] shadow-md">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="text-xs border-b-2 border-gray-500 md:text-sm">
                                <th className="py-2 font-semibold text-left w-[4%]">Sr.<br />No.</th>
                                <th className="py-2 font-semibold text-right w-1/12 pr-20 cursor-pointer"
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            sortBy: "Date",
                                            sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
                                        }))
                                    }>Date
                                    <button
                                        className="ml-2 px-1 py-0.5"
                                    >
                                        <Image src={Sort} width={8} height={8} alt='sort' />
                                    </button>
                                </th>
                                <th className="py-2 font-semibold text-left w-1/12">Investment<br />Type</th>
                                <th className="py-2 font-semibold text-left w-1/6">Investment<br />Name</th>
                                <th className="py-2 font-semibold text-left w-1/12 cursor-pointer"
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            sortBy: "Transaction",
                                            sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
                                        }))
                                    }>Transaction<br />Type

                                    <button
                                        className="ml-2 px-1 py-0.5"
                                    >
                                        <Image src={Sort} width={8} height={8} alt='sort' />
                                    </button></th>
                                {/* <th className="py-2 font-semibold text-center w-1/12">Units/Lots</th> */}
                                <th className="py-2 font-semibold text-right w-1/12 cursor-pointer"
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            sortBy: "Amount",
                                            sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
                                        }))
                                    }>Amount

                                    <button
                                        className="ml-2 px-1 py-0.5"
                                    >
                                        <Image src={Sort} width={8} height={8} alt='sort' />
                                    </button></th>
                                <th className="py-2 font-semibold text-center w-1/12">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((fund, index) => (
                                fund.amount !== 0 && (
                                    <tr key={index} className="border-b font-normal text-sm text-[#232323] text-right">
                                        <td className="py-2 align-top text-left w-[4%]">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="py-2 align-top text-right w-1/12 pr-20">{formatDate(fund.createdAt)}</td>
                                        <td className="py-2 align-top text-left w-1/12 break-words pr-2">{'Invoice Discounting'}</td>
                                        <td className="py-2 align-top text-left w-1/6">{fund.investment_name}</td>
                                        <td className="py-2 align-top text-left w-1/12">{formatFundType(fund.type)}</td>
                                        {/* <td className="py-2 align-top text-center w-1/12">{fund.units}</td> */}
                                        <td className="py-2 align-top text-right w-1/12">{(fund.amount)?.toLocaleString('en-IN', {
                                            style: 'currency',
                                            currency: 'INR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        })}</td>
                                        <td className="py-2 align-top text-center w-1/12">{fund.status}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between mt-4 px-5">
                    <div className="text-sm text-[#232323] font-medium">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, filteredResult.length)} from {filteredResult.length}{" "}
                        entries
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 text-lg border rounded-lg ${currentPage === 1 ? "text-gray-400 bg-white" : "text-[#035782] bg-white border border-[#035782]"
                                }`}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1
                                    ? "bg-[#035782] text-white"
                                    : "text-[#035782] bg-white border border-[#035782]"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 text-lg border rounded-lg ${currentPage === totalPages ? "text-gray-400 bg-white" : "text-[#035782] bg-white border border-[#035782]"
                                }`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            <div className='block p-3 md:hidden'>
                <div className="flex justify-between items-center mb-4 px-5">
                    <div className='flex text-[8px] gap-1'>
                        <button
                            className="px-2 py-1 text-[#035782] bg-white font-semibold border-2 shadow-sm flex gap-2 items-center border-[#1e739e] rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[#1e739e]"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            Mutual Funds
                        </button>
                        <button
                            className="px-2 py-1 text-[#035782] bg-white font-semibold border-2 shadow-sm flex gap-2 items-center border-[#1e739e] rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[#1e739e]"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            Bonds
                        </button>
                        <button
                            className="px-2 py-1 text-[#035782] bg-white font-semibold border-2 shadow-sm flex gap-2 items-center border-[#1e739e] rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[#1e739e]"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            Invoice Discounting
                        </button>
                    </div>
                    <div className='relative text-[8px]'>
                        <button
                            className="px-4 py-1 text-[#035782] bg-white font-semibold border-2 shadow-sm flex gap-2 items-center border-[#1e739e] rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-[#1e739e]"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <HiOutlineAdjustmentsHorizontal className='text-lg text-gray-400' />
                            <span className=''>Filter</span>
                        </button>
                    </div>
                </div>
                <h2 className="text-sm font-semibold px-5">From: 24 Dec 2024 To: 24 Dec 2024</h2>
                <div className='flex flex-col gap-3'>
                    {
                        currentData?.map((item, index) => {
                            return (
                                <div key={index} className=''>
                                    <TransactionCard {...item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}



const TransactionCard: React.FC<ITransaction> = ({
    _id, user_id, type, amount, status, message, createdAt, updatedAt, investment_name, deal_id, investment_type, order_id, session_id, tap_invest_transaction_id, __v
}) => {
    return (
        <div className="bg-white rounded-xl shadow-[#60a1c2] shadow-md-50 p-4 shadow-md border border-gray-200 w-full">
            <h3 className="text-lg font-semibold text-gray-800">{investment_name}</h3>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between items-start">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Date</span>
                    <span className="block font-semibold text-gray-800">{formatDate(createdAt)}</span>
                </div>
                <div className="text-sm text-gray-600 text-right">
                    <span className="font-medium">Amount</span>
                    <span className="block font-semibold text-gray-800">
                        {(amount)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-start mt-4">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Transaction Type</span>
                    <span className="block font-semibold text-gray-800">{formatFundType(type)}</span>
                </div>
                <div className="text-sm text-gray-600 text-right">
                    <span className="font-medium">Status</span>
                    <span
                        className={`block font-semibold`}
                    >
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
};

