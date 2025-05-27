import React, { useState } from "react";

interface Props {
    nextStep: () => void;
    userRes: any;
    userData: any;
    setUserData: any;
    mobileNo: string;
    isMutualFund?: boolean
    needDemographic?: boolean
    isKYCDone?: boolean
    setErrors?: any;
    errors?: any;
}



const PersonalDetails: React.FC<Props> = ({ errors, setErrors, nextStep, userRes, userData, needDemographic, setUserData, mobileNo, isMutualFund, isKYCDone }) => {


    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePincode = (pincode: string) => {
        return /^\d{6}$/.test(pincode);
    };

    const validatePhone = (phone: string) => {
        const cleanPhone = phone.replace(/[\s()-]/g, '');
        return /^[1-9]\d{9}$/.test(cleanPhone);
    };

    const validateDate = (date: string) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate < today && selectedDate.getFullYear() > 1900;
    };

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'firstName':
                return value.trim() ? '' : 'First name is required';
            case 'lastName':
                return value.trim() ? '' : 'Last name is required';
            case 'gender':
                return value ? '' : 'Please select a gender';
            case 'father_name':
                return value ? '' : 'Please select father name';
            case 'mother_name':
                return value ? '' : 'Please select mother name';
            case 'maritalStatus':
                return value ? '' : 'Please select your marital status';
            case 'email':
                return validateEmail(value) ? '' : 'Please enter a valid email';
            case 'phone':
                return value?.length >= 10 && value?.length <= 12 ? '' : 'Please enter a valid 10-digit phone number';
            case 'dateOfBirth':
                return validateDate(value) ? '' : 'Please enter a valid date of birth';
            case 'addressLine1':
                return value.trim() ? '' : 'Address Line 1 is required';
            case 'addressLine2':
                return value.trim() ? '' : 'Address Line 2 is required';
            case 'addressCity':
                return value.trim() ? '' : 'City is required';
            case 'addressPincode':
                return validatePincode(value) ? '' : 'Please enter a valid 6-digit pincode';
            case 'countryOfBirth':
                return value.trim() ? '' : 'Country of birth is required';
            case 'photo':
                return value ? '' : 'Photo is required';
            case 'signature':
                return value ? '' : 'Signature is required';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData((prevData: any) => ({ ...prevData, [name]: value }));

        // Clear error when user starts typing
        setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };




    const handleSubmit = () => {
        nextStep();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setUserData((prevData: any) => ({
                ...prevData,
                [name]: file,
            }));
        }
    };


    return (
        <div className="px-8">
            <div className="flex flex-col gap-2 text-lg font-light">
                <div className="relative">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name*"
                        value={userData.firstName}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.firstName ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                </div>

                <input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={userData.middleName}
                    onChange={handleChange}
                    className="mb-4 p-2 border-b border-[#000000] rounded focus:outline-none"
                />

                <div className="relative">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name*"
                        value={userData.lastName}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.lastName ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                </div>

                <div className="relative mb-4">
                    <select
                        name="gender"
                        value={userData.gender}
                        onChange={handleChange}
                        className={`p-2 border-b ${errors.gender ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    >
                        <option value="" disabled>Select Gender*</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={userData.email}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.email ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        maxLength={10}
                        name="mobileNo"
                        placeholder="Phone Number*"
                        value={mobileNo}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                            setUserData((prevData: any) => ({ ...prevData, phone: value }));
                        }}
                        className="mb-1 p-2 border-b border-[#000000] rounded focus:outline-none w-full"
                    />
                </div>
                {(isMutualFund) &&
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                name="father_name"
                                placeholder="Father Name*"
                                value={userData.father_name}
                                onChange={handleChange}
                                className={`mb-1 p-2 border-b ${errors.father_name ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                            />
                            {errors.father_name && <span className="text-red-500 text-sm">{errors.father_name}</span>}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="mother_name"
                                placeholder="Mother Name*"
                                value={userData.mother_name}
                                onChange={handleChange}
                                className={`mb-1 p-2 border-b ${errors.mother_name ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                            />
                            {errors.mother_name && <span className="text-red-500 text-sm">{errors.mother_name}</span>}
                        </div>
                        <div className="relative mb-4">
                            <select
                                name="maritalStatus"
                                value={userData.maritalStatus}
                                onChange={handleChange}
                                className={`p-2 border-b ${errors.maritalStatus ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                            >
                                <option value="" disabled>Select Marital Status*</option>
                                <option value="unmarried">Unmarried</option>
                                <option value="married">Married</option>
                                <option value="others">Other</option>
                            </select>
                            {errors.maritalStatus && <span className="text-red-500 text-sm">{errors.maritalStatus}</span>}
                        </div>
                    </div>
                }
                <div className="relative">
                    <input
                        type="text"
                        name="addressLine1"
                        placeholder="Address Line 1*"
                        value={userData.addressLine1}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.addressLine1 ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.addressLine1 && <span className="text-red-500 text-sm">{errors.addressLine1}</span>}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="addressLine2"
                        placeholder="Address Line 2*"
                        value={userData.addressLine2}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.addressLine2 ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.addressLine2 && <span className="text-red-500 text-sm">{errors.addressLine2}</span>}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        name="addressCity"
                        placeholder="City*"
                        value={userData.addressCity}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.addressCity ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.addressCity && <span className="text-red-500 text-sm">{errors.addressCity}</span>}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        name="addressPincode"
                        placeholder="PinCode*"
                        value={userData.addressPincode}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.addressPincode ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.addressPincode && <span className="text-red-500 text-sm">{errors.addressPincode}</span>}
                </div>

                <div className="relative">
                    <input
                        name="countryOfBirth"
                        placeholder="Country of Birth*"
                        value={userData.countryOfBirth}
                        onChange={handleChange}
                        className={`mb-1 p-2 border-b ${errors.countryOfBirth ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none w-full`}
                    />
                    {errors.countryOfBirth && <span className="text-red-500 text-sm">{errors.countryOfBirth}</span>}
                </div>
                {(isMutualFund && needDemographic && !isKYCDone) &&
                    <div>
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700">Photo*</label>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.photo && <span className="text-red-500 text-sm">{errors.photo}</span>}
                        </div>

                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700">Signature*</label>
                            <input
                                type="file"
                                name="signature"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.signature && <span className="text-red-500 text-sm">{errors.signature}</span>}
                        </div>
                    </div>
                }
            </div>

            <div className="flex my-10 justify-center w-full">
                <button
                    onClick={handleSubmit}
                    className="bg-[#FB7306] text-white text-lg font-semibold p-4 w-full rounded"
                >
                    Next Step: Tax Details
                </button>
            </div>
        </div>
    );
};

export default PersonalDetails;