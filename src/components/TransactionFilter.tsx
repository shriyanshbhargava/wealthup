import React, { useState, useEffect, useRef } from "react";

interface FilterProps {
    filters: {
        dateRange: any;
        investmentType: string[];
        transactionType: string[];
        status: string[];
        sortBy: string | null;
        sortOrder: any;
    };
    onFilterChange: (filters: any) => void;
    onclose: () => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange, onclose }) => {
    const [showCustomInputs, setShowCustomInputs] = useState(false);
    const [resetDateRange, setResetDateRange] = useState(false);
    const [resetSortBy, setResetSortBy] = useState(false);
    const [isDescending, setIsDescending] = useState(false);
    const [selectedRange, setSelectedRange] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    const handleDateRangeChange = (range: string) => {
        if (range !== "custom") {
            setSelectedRange(range);
            handleUpdate("dateRange", range);
        } else {
            setSelectedRange("custom");
            handleUpdate("dateRange", { from: "", to: "" });
        }
    };

    function formatFundType(fundType: string): string {
        return fundType
            .replace(/_/g, ' ')
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }


    const handleCustomDateChange = (key: "from" | "to", value: string) => {
        if (selectedRange !== "custom") setSelectedRange("custom");
        const currentDateRange =
            typeof filters.dateRange === "object" && filters.dateRange !== null
                ? filters.dateRange
                : { from: "", to: "" };
        const updatedDateRange = { ...currentDateRange, [key]: value };
        handleUpdate("dateRange", updatedDateRange);
    };

    const dateRanges = ["Today", "This Week", "This Month", "Custom"];
    const investmentTypes = ["INVOICE_DISCOUNTING"];
    const transactionTypes = ["WALLET_RECHARGE", "BOND_PAYMENT", "WALLET_WITHDRAWAL", "PAYMENT_THROUGH_WALLET",];
    const statuses = ["SUCCESS", "PAID", "ACTIVE", "EXPIRED", "FAILED"];
    const sortOptions = [
        "Date (A - Z)",
        "Transaction (Z - A)",
        "Amount (Z - A)",
        "Status (Z - A)",
    ];

    const handleUpdate = (key: string, value: any) => {
        console.log('rrrrrrrrrrrrr', key, value)
        onFilterChange({ ...filters, [key]: value });
    };
    const handleSortUpdate = (updates: { [key: string]: any }) => {
        console.log('Updating values:', updates);
        onFilterChange({ ...filters, ...updates });
    };
    const toggleArrayValue = (key: string, value: string) => {
        const current = filters[key as keyof typeof filters] as string[];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        handleUpdate(key, updated);
    };

    const handleResetFilter = () => {
        const resetFilters = {
            dateRange: null,
            investmentType: [],
            transactionType: [],
            status: [],
            sortBy: null,
        };
        setSelectedRange(null);
        onFilterChange(resetFilters);
        setShowCustomInputs(false);
    };


    const handleResetSort = () => {
        onFilterChange({ ...filters, sortBy: null });
    };

    // console.log('tgdgegegergergerg', filters)

    useEffect(() => {
        if (resetDateRange) {
            setResetDateRange(false);
        }
        if (resetSortBy) {
            setResetSortBy(false);
        }
    }, [filters]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                onclose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onclose]);


    return (
        <div ref={filterRef} className="bg-white rounded-lg border shadow-lg text-gray-700 font-medium">
            {/* Header */}
            <div className="flex justify-between px-4 py-2 items-center text-[#035782]">
                <p className="flex items-center my-auto text-sm font-semibold">
                    Filter
                </p>
                <div className="flex">
                    <button className="mr-2 text-[#035782] text-sm font-medium" onClick={handleResetFilter}>
                        Reset
                    </button>
                    <button className="flex items-center" onClick={onclose}>X</button>
                </div>
            </div>
            <div className="space-y-6 py-4 border-y">
                {/* Date Range */}
                <div className="space-y-2 px-4">
                    <h4 className="flex items-center my-auto text-sm font-semibold text-[#035782]">Date Range</h4>
                    <div className="flex gap-2">
                        {dateRanges.map((range) => (
                            <button
                                key={range}
                                onClick={() => handleDateRangeChange(range.toLowerCase())}
                                className={`px-3 py-1 text-xs shadow-[#035782] shadow rounded-full border border-[#035782] hover:bg-[#C8F1EA] ${selectedRange === range.toLowerCase()
                                    ? "bg-[#C8F1EA]"
                                    : ""
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>

                    {selectedRange === "custom" && (
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="date"
                                value={typeof filters.dateRange === "object" ? filters.dateRange.from : ""}
                                onChange={(e) => handleCustomDateChange("from", e.target.value)}
                                className="px-3 py-1 text-xs shadow-[#035782] shadow rounded-full border border-[#035782] hover:bg-[#C8F1EA]"
                            />
                            <input
                                type="date"
                                value={typeof filters.dateRange === "object" ? filters.dateRange.to : ""}
                                onChange={(e) => handleCustomDateChange("to", e.target.value)}
                                className="px-3 py-1 text-xs shadow-[#035782] shadow rounded-full border border-[#035782] hover:bg-[#C8F1EA]"
                            />
                        </div>
                    )}


                </div>

                {/* Investment Type */}
                <div className="space-y-2 px-4">
                    <h4 className="flex items-center my-auto text-sm font-semibold text-[#035782]">Investment Type</h4>
                    <div className="flex flex-wrap gap-2">
                        {investmentTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => toggleArrayValue("investmentType", type)}
                                className={`px-3 py-1 text-xs shadow-[#035782] shadow rounded-full border border-[#035782] hover:bg-[#C8F1EA] ${filters.investmentType.includes(type) ? 'bg-[#C8F1EA]' : ''}`}
                            >
                                {formatFundType(type)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transaction Type */}
                <div className="space-y-2 px-4">
                    <h4 className="flex items-center my-auto text-sm font-semibold text-[#035782]">Transaction Type</h4>
                    <div className="flex flex-wrap gap-2">
                        {transactionTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => toggleArrayValue("transactionType", type)}
                                className={`px-3 py-1 text-xs shadow-[#035782] shadow rounded-full border border-[#035782] hover:bg-[#C8F1EA] ${filters.transactionType.includes(type) ? 'bg-[#C8F1EA]' : ''}`}
                            >
                                {formatFundType(type)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2 px-4">
                    <h4 className="flex items-center my-auto text-sm font-semibold text-[#035782]">Status</h4>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => toggleArrayValue("status", status)}
                                className={`px-3 py-1 text-xs shadow-[#035782] shadow rounded-full border border-[#035782] hover:bg-[#C8F1EA] ${filters.status.includes(status) ? 'bg-[#C8F1EA]' : ''}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-2 pb-4">
                {/* Sort By Section */}
                <div className="flex justify-between border-b px-4 py-2 items-center text-[#035782]">
                    <p className="flex items-center my-auto text-sm font-semibold">
                        Sort By
                    </p>
                    <button className="ml-1 text-[#035782] text-sm font-medium" onClick={handleResetSort}>
                        Reset
                    </button>
                </div>
                <div className="space-y-1 px-5">
                    {sortOptions.map((sortOption) => {
                        const field = sortOption.split(" ")[0];
                        const isSelected = filters.sortBy === field;
                        // console.log('kjhjgherjghjghjghdfjghdf', field);
                        return (
                            <button
                                key={sortOption}
                                onClick={() => {
                                    const newOrder = isSelected && filters.sortOrder === 'asc' ? 'desc' : 'asc';
                                    handleSortUpdate({
                                        sortBy: field,
                                        sortOrder: newOrder,
                                    });
                                }}
                                className={`w-full text-left px-3 py-1 text-sm rounded text-[#035782] ${isSelected ? 'bg-[#C8F1EA]' : ''}`}
                            >
                                {`${field} (${isSelected && filters.sortOrder === 'asc' ? 'A - Z' : 'Z - A'})`}
                            </button>

                        );
                    })}

                </div>


            </div>
        </div>
    );
};

export default Filter;
