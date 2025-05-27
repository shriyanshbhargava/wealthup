import React, { useState } from "react";
import { toast } from "react-toastify";

interface BankDetailsProps {
    nextStep: () => void;
    setBankData: any;
    bankData: any;
    isLoading?: boolean;
}

interface ValidationError {
    field: string;
    message: string;
}

const BankDetails: React.FC<BankDetailsProps> = ({ nextStep, bankData, setBankData, isLoading }) => {
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const validateIFSC = (ifsc: string) => {
        const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return ifscPattern.test(ifsc);
    };

    const validateAccountNumber = (accountNumber: string) => {
        // Account number should be 9-18 digits
        return /^\d{9,18}$/.test(accountNumber);
    };

    const validateFields = () => {
        const newErrors: ValidationError[] = [];

        // Validate Account Holder Name
        if (!bankData.holderName?.trim()) {
            newErrors.push({ field: 'holderName', message: 'Account holder name is required' });
        } else if (bankData.holderName.trim().length < 3) {
            newErrors.push({ field: 'holderName', message: 'Name should be at least 3 characters long' });
        }

        // Validate IFSC Code
        if (!bankData.ifscCode) {
            newErrors.push({ field: 'ifscCode', message: 'IFSC code is required' });
        } else if (!validateIFSC(bankData.ifscCode)) {
            newErrors.push({ field: 'ifscCode', message: 'Please enter a valid IFSC code' });
        }

        // Validate Bank Account Number
        if (!bankData.bankAccountNumber) {
            newErrors.push({ field: 'bankAccountNumber', message: 'Bank account number is required' });
        } else if (!validateAccountNumber(bankData.bankAccountNumber)) {
            newErrors.push({ field: 'bankAccountNumber', message: 'Please enter a valid account number (9-18 digits)' });
        }

        // Validate Re-entered Account Number
        if (!bankData.reEnterBankAccountNumber) {
            newErrors.push({ field: 'reEnterBankAccountNumber', message: 'Please re-enter bank account number' });
        } else if (bankData.bankAccountNumber !== bankData.reEnterBankAccountNumber) {
            newErrors.push({ field: 'reEnterBankAccountNumber', message: 'Account numbers do not match' });
        }

        // Validate Account Type
        if (!bankData.typeOfAccount) {
            newErrors.push({ field: 'typeOfAccount', message: 'Please select account type' });
        }

        // Validate Mode of Holding
        if (!bankData.modeOfHolding) {
            newErrors.push({ field: 'modeOfHolding', message: 'Please select mode of holding' });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const getFieldError = (fieldName: string) => {
        const error = errors.find(error => error.field === fieldName);
        return error ? error.message : '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Clear error when field is changed
        setErrors(prev => prev.filter(error => error.field !== name));
        setBankData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (validateFields()) {
            nextStep();
        }
    };

    return (
        <div className="px-8">
            <div className="flex flex-col gap-5 text-lg font-light">
                <div className="flex flex-col">
                    <input
                        type="text"
                        name="holderName"
                        value={bankData.holderName}
                        onChange={handleChange}
                        placeholder="Account Holder Name*"
                        className={`p-2 border-b ${getFieldError('holderName') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                        required
                    />
                    {getFieldError('holderName') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('holderName')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <input
                        type="text"
                        name="ifscCode"
                        value={bankData.ifscCode}
                        onChange={handleChange}
                        placeholder="IFSC Code*"
                        className={`p-2 border-b ${getFieldError('ifscCode') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                        required
                    />
                    {getFieldError('ifscCode') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('ifscCode')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <input
                        type="text"
                        name="bankAccountNumber"
                        value={bankData.bankAccountNumber}
                        onChange={handleChange}
                        placeholder="Bank Account Number*"
                        className={`p-2 border-b ${getFieldError('bankAccountNumber') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                        required
                    />
                    {getFieldError('bankAccountNumber') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('bankAccountNumber')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <input
                        type="text"
                        name="reEnterBankAccountNumber"
                        value={bankData.reEnterBankAccountNumber}
                        onChange={handleChange}
                        placeholder="Re-enter Bank Account Number*"
                        className={`p-2 border-b ${getFieldError('reEnterBankAccountNumber') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                        required
                    />
                    {getFieldError('reEnterBankAccountNumber') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('reEnterBankAccountNumber')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <select
                        name="typeOfAccount"
                        value={bankData.typeOfAccount}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('typeOfAccount') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!bankData.typeOfAccount ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Type Of Account*</option>
                        <option value="savings" className="text-black">Savings</option>
                        <option value="nro" className="text-black">NRO</option>
                        <option value="nre" className="text-black">NRE</option>
                        <option value="current" className="text-black">Current</option>
                    </select>
                    {getFieldError('typeOfAccount') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('typeOfAccount')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <select
                        name="modeOfHolding"
                        value={bankData.modeOfHolding}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('modeOfHolding') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!bankData.modeOfHolding ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Mode Of Holding*</option>
                        <option value="single" className="text-black">Single</option>
                        <option value="joint" className="text-black">Joint</option>
                    </select>
                    {getFieldError('modeOfHolding') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('modeOfHolding')}</p>
                    )}
                </div>
            </div>

            <div className="flex mt-10 mb-4 justify-center w-full">
                <button
                    className="bg-[#FB7306] text-white text-lg font-semibold p-4 w-full rounded"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3.536-3.536A10 10 0 002 12h2z"
                            ></path>
                        </svg>
                    ) : (
                        "Verify Bank Account"
                    )}
                </button>
            </div>
        </div>
    );
};

export default BankDetails;