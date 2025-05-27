import React, { useState, useEffect } from "react";
import Image from 'next/image';

interface Props {
    nextStep: () => void;
    isLoading?: boolean;
    isMutualFund?: boolean;
    isKYCDone?: boolean;
}

interface Address {
    addressLine1: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
}

interface Nominee {
    id: number;
    fullName: string;
    dob: string;
    relationship: string;
    phone: string;
    email: string;
    isSameAdress: boolean;
    address: Address;
}

interface ValidationError {
    field: string;
    message: string;
}

const NomineeDetails: React.FC<Props> = ({ nextStep, isLoading, isKYCDone, isMutualFund }) => {
    const [nominees, setNominees] = useState<Nominee[]>([
        {
            id: 1,
            fullName: "",
            dob: "",
            relationship: "",
            phone: "",
            email: "",
            isSameAdress: true,
            address: {
                addressLine1: "",
                pincode: "",
                city: "",
                state: "",
                country: ""
            }
        }
    ]);

    const [errors, setErrors] = useState<{ [key: number]: ValidationError[] }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^\d{10}$/.test(phone);
    };

    const validatePincode = (pincode: string) => {
        return /^\d{6}$/.test(pincode);
    };

    const validateDate = (date: string) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate < today && selectedDate.getFullYear() > 1900;
    };

    const validateNominee = (nominee: Nominee): ValidationError[] => {
        const nomineeErrors: ValidationError[] = [];

        if (!nominee.fullName.trim()) {
            nomineeErrors.push({ field: 'fullName', message: 'Full name is required' });
        }

        if (!nominee.dob) {
            nomineeErrors.push({ field: 'dob', message: 'Date of birth is required' });
        } else if (!validateDate(nominee.dob)) {
            nomineeErrors.push({ field: 'dob', message: 'Please enter a valid date of birth' });
        }

        if (!nominee.relationship.trim()) {
            nomineeErrors.push({ field: 'relationship', message: 'Relationship is required' });
        }

        if (!nominee.phone) {
            nomineeErrors.push({ field: 'phone', message: 'Phone number is required' });
        } else if (!validatePhone(nominee.phone)) {
            nomineeErrors.push({ field: 'phone', message: 'Please enter a valid 10-digit phone number' });
        }

        if (!nominee.email) {
            nomineeErrors.push({ field: 'email', message: 'Email is required' });
        } else if (!validateEmail(nominee.email)) {
            nomineeErrors.push({ field: 'email', message: 'Please enter a valid email address' });
        }

        if (!nominee.isSameAdress) {
            if (!nominee.address.addressLine1.trim()) {
                nomineeErrors.push({ field: 'addressLine1', message: 'Address is required' });
            }
            if (!nominee.address.pincode) {
                nomineeErrors.push({ field: 'pincode', message: 'Pincode is required' });
            } else if (!validatePincode(nominee.address.pincode)) {
                nomineeErrors.push({ field: 'pincode', message: 'Please enter a valid 6-digit pincode' });
            }
            if (!nominee.address.city.trim()) {
                nomineeErrors.push({ field: 'city', message: 'City is required' });
            }
            if (!nominee.address.state.trim()) {
                nomineeErrors.push({ field: 'state', message: 'State is required' });
            }
            if (!nominee.address.country.trim()) {
                nomineeErrors.push({ field: 'country', message: 'Country is required' });
            }
        }

        return nomineeErrors;
    };

    const handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNominees((prev) =>
            prev.map((nominee) =>
                nominee.id === id
                    ? {
                        ...nominee,
                        [name]: value
                    }
                    : nominee
            )
        );
        // Clear error for the field being changed
        setErrors(prev => {
            const nomineeErrors = prev[id] || [];
            return {
                ...prev,
                [id]: nomineeErrors.filter(error => error.field !== name)
            };
        });
    };

    const handleAddressChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNominees((prev) =>
            prev.map((nominee) =>
                nominee.id === id
                    ? {
                        ...nominee,
                        address: { ...nominee.address, [name]: value }
                    }
                    : nominee
            )
        );
        // Clear error for the address field being changed
        setErrors(prev => {
            const nomineeErrors = prev[id] || [];
            return {
                ...prev,
                [id]: nomineeErrors.filter(error => error.field !== name)
            };
        });
    };

    const handleSameAdress = (id: number, value: boolean) => {
        setNominees((prev) =>
            prev.map((nominee) =>
                nominee.id === id
                    ? {
                        ...nominee,
                        isSameAdress: value,
                        address: value
                            ? {
                                addressLine1: "",
                                pincode: "",
                                city: "",
                                state: "",
                                country: ""
                            }
                            : nominee.address
                    }
                    : nominee
            )
        );
        // Clear address-related errors when switching to same address
        if (value) {
            setErrors(prev => {
                const nomineeErrors = prev[id] || [];
                return {
                    ...prev,
                    [id]: nomineeErrors.filter(error => !['addressLine1', 'pincode', 'city', 'state', 'country'].includes(error.field))
                };
            });
        }
    };

    const addNominee = () => {
        const newNominee = {
            id: Date.now(),
            fullName: "",
            dob: "",
            relationship: "",
            phone: "",
            email: "",
            isSameAdress: true,
            address: {
                addressLine1: "",
                pincode: "",
                city: "",
                state: "",
                country: ""
            }
        };
        setNominees((prev) => [...prev, newNominee]);
    };

    const removeNominee = (id: number) => {
        if (nominees.length > 1) {
            setNominees((prev) => prev.filter((nominee) => nominee.id !== id));
            // Remove errors for the removed nominee
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleSubmit = () => {
        const newErrors: { [key: number]: ValidationError[] } = {};
        let hasErrors = false;

        nominees.forEach(nominee => {
            const nomineeErrors = validateNominee(nominee);
            if (nomineeErrors.length > 0) {
                newErrors[nominee.id] = nomineeErrors;
                hasErrors = true;
            }
        });

        setErrors(newErrors);

        if (!hasErrors) {
            nextStep();
        }
    };

    const getFieldError = (nomineeId: number, fieldName: string) => {
        const nomineeErrors = errors[nomineeId] || [];
        const error = nomineeErrors.find(error => error.field === fieldName);
        return error ? error.message : '';
    };

    return (
        <div className="flex flex-col gap-1 px-8">
            {nominees.map((nominee) => (
                <div key={nominee.id} className="flex flex-col gap-2 text-lg font-light">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name of Nominee*"
                        value={nominee.fullName}
                        onChange={(e) => handleChange(nominee.id, e)}
                        required
                        className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'fullName') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                    />
                    {getFieldError(nominee.id, 'fullName') && (
                        <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'fullName')}</p>
                    )}

                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth*"
                        value={nominee.dob}
                        onChange={(e) => handleChange(nominee.id, e)}
                        required
                        className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'dob') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                    />
                    {getFieldError(nominee.id, 'dob') && (
                        <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'dob')}</p>
                    )}
                    {isMutualFund ?
                        <div className="w-full">
                            <select
                                name="relationship"
                                value={nominee.relationship}
                                onChange={(e) => handleChange(nominee.id, e)}
                                className={`p-2 w-full border-b ${getFieldError(nominee.id, 'relationship') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!nominee.relationship ? 'text-[#B5B5B5]' : 'text-black'}`}
                                required
                            >
                                <option value="" className="text-[#B5B5B5]">Relationship with Applicant*</option>
                                <option value="father" className="text-black">Father</option>
                                <option value="mother" className="text-black">Mother</option>
                                <option value="spouse" className="text-black">Spouse</option>
                                <option value="son" className="text-black">Son</option>
                                <option value="daughter" className="text-black">Daughter</option>
                                <option value="sibling" className="text-black">Sibling</option>

                            </select>
                            {getFieldError(nominee.id, 'relationship') && (
                                <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'relationship')}</p>
                            )}
                        </div>
                        :
                        <div>
                            <input
                                type="text"
                                name="relationship"
                                placeholder="Relationship with Applicant*"
                                value={nominee.relationship}
                                onChange={(e) => handleChange(nominee.id, e)}
                                required
                                className={`mb-1 w-full p-2 border-b ${getFieldError(nominee.id, 'relationship') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                            />
                            {getFieldError(nominee.id, 'relationship') && (
                                <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'relationship')}</p>
                            )}
                        </div>
                    }
                    {!isMutualFund &&
                        (
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number of Nominee*"
                                    value={nominee.phone}
                                    onChange={(e) => handleChange(nominee.id, e)}
                                    required
                                    className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'phone') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                                />
                                {getFieldError(nominee.id, 'phone') && (
                                    <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'phone')}</p>
                                )}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email id of Nominee*"
                                    value={nominee.email}
                                    onChange={(e) => handleChange(nominee.id, e)}
                                    required
                                    className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'email') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                                />
                                {getFieldError(nominee.id, 'email') && (
                                    <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'email')}</p>
                                )}
                            </div>
                        )
                    }
                    {!nominee.isSameAdress && (
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="addressLine1"
                                placeholder="Address Line 1*"
                                value={nominee.address.addressLine1}
                                onChange={(e) => handleAddressChange(nominee.id, e)}
                                required
                                className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'addressLine1') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                            />
                            {getFieldError(nominee.id, 'addressLine1') && (
                                <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'addressLine1')}</p>
                            )}

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode*"
                                value={nominee.address.pincode}
                                onChange={(e) => handleAddressChange(nominee.id, e)}
                                required
                                className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'pincode') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                            />
                            {getFieldError(nominee.id, 'pincode') && (
                                <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'pincode')}</p>
                            )}

                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City*"
                                        value={nominee.address.city}
                                        onChange={(e) => handleAddressChange(nominee.id, e)}
                                        required
                                        className={`mb-1 p-2 w-full border-b ${getFieldError(nominee.id, 'city') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                                    />
                                    {getFieldError(nominee.id, 'city') && (
                                        <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'city')}</p>
                                    )}
                                </div>
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State*"
                                        value={nominee.address.state}
                                        onChange={(e) => handleAddressChange(nominee.id, e)}
                                        required
                                        className={`mb-1 p-2 w-full border-b ${getFieldError(nominee.id, 'state') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                                    />
                                    {getFieldError(nominee.id, 'state') && (
                                        <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'state')}</p>
                                    )}
                                </div>
                            </div>

                            <input
                                type="text"
                                name="country"
                                placeholder="Country*"
                                value={nominee.address.country}
                                onChange={(e) => handleAddressChange(nominee.id, e)}
                                required
                                className={`mb-1 p-2 border-b ${getFieldError(nominee.id, 'country') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none`}
                            />
                            {getFieldError(nominee.id, 'country') && (
                                <p className="text-red-500 text-sm mb-3">{getFieldError(nominee.id, 'country')}</p>
                            )}
                        </div>

                    )}
                    <div className="flex flex-col my-4 text-sm font-normal text-[#4A5151]">
                        <label className="mr-4">Is the nominee&apos;s permanent address same as applicant?</label>
                        <div className="flex">
                            <label className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="isSameAdress"
                                    checked={nominee.isSameAdress}
                                    onChange={() => handleSameAdress(nominee.id, true)}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="isSameAdress"
                                    checked={!nominee.isSameAdress}
                                    onChange={() => handleSameAdress(nominee.id, false)}
                                    className="mr-2"
                                />
                                No
                            </label>
                        </div>
                    </div>
                    {nominees.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeNominee(nominee.id)}
                            className="text-red-500 hover:underline"
                        >
                            Remove Nominee
                        </button>
                    )}
                </div>

            ))}
            <button
                type="button"
                onClick={addNominee}
                className="bg-white border-[2px] border-[#FB7706] text-black text-lg font-normal w-fit py-2 px-10 rounded"
            >
                Add Another Nominee
            </button>

            <div className="flex my-10 justify-center w-full">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#FB7306] text-white text-lg font-semibold p-4 w-full rounded flex items-center justify-center disabled:opacity-50"
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
                        "Next"
                    )}
                </button>

            </div>
        </div>
    );
};

export default NomineeDetails;
