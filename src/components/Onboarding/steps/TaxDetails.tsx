import React, { useState, useEffect } from "react";

interface Props {
    nextStep: () => void;
    taxData: any;
    setTaxData: any;
}

interface ValidationError {
    field: string;
    message: string;
}

const TaxDetails: React.FC<Props> = ({ nextStep, setTaxData, taxData }) => {
    const [errors, setErrors] = useState<ValidationError[]>([]);

    const validateFields = () => {
        const newErrors: ValidationError[] = [];

        if (!taxData.occupation) {
            newErrors.push({ field: 'occupation', message: 'Please select an occupation' });
        }

        if (!taxData.taxCategory) {
            newErrors.push({ field: 'taxCategory', message: 'Please select a tax category' });
        }

        if (!taxData.taxStatus) {
            newErrors.push({ field: 'taxStatus', message: 'Please select a tax status' });
        }

        if (!taxData.income_slab) {
            newErrors.push({ field: 'income_slab', message: 'Please select your income slab range' });
        }

        if (!taxData.source_of_wealth) {
            newErrors.push({ field: 'source_of_wealth', message: 'Please select your source of wealth' });
        }

        if (!taxData.tAndC) {
            newErrors.push({ field: 'tAndC', message: 'Please accept the Terms and Conditions' });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const getFieldError = (fieldName: string) => {
        const error = errors.find(error => error.field === fieldName);
        return error ? error.message : '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value, type } = e.target;

        // Clear error when field is changed
        setErrors(prev => prev.filter(error => error.field !== name));

        if (type === "checkbox") {
            setTaxData((prevData: any) => ({
                ...prevData,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else {
            setTaxData((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleRadioChange = (value: boolean) => {
        setTaxData((prevData: any) => ({ ...prevData, isTaxResidentOtherThanIndia: value }));
    };

    const handleSubmit = () => {
        if (validateFields()) {
            nextStep();
        }
    };

    const occupationOption = [
        'business',
        'professional',
        'self_employed',
        'retired',
        'housewife',
        'student',
        'public_sector',
        'private_sector',
        'government_sector',
        'others'
    ];

    // Function to format the text
    const formatOptionText = (option: string) => {
        return option
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="px-8">
            <div className="flex flex-col gap-5 text-lg font-light">
                <div className="flex flex-col">
                    <select
                        name="occupation"
                        value={taxData.occupation}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('occupation') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!taxData.occupation ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Occupation*</option>
                        {occupationOption.map((option) => (
                            <option key={option} value={option} className="text-black">
                                {formatOptionText(option)}
                            </option>
                        ))}
                    </select>

                    {getFieldError('occupation') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('occupation')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <select
                        name="taxCategory"
                        value={taxData.taxCategory}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('taxCategory') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!taxData.taxCategory ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Tax Category*</option>
                        <option value="individual" className="text-black">Individual</option>
                        <option value="company" className="text-black">Company</option>
                    </select>
                    {getFieldError('taxCategory') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('taxCategory')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <select
                        name="taxStatus"
                        value={taxData.taxStatus}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('taxStatus') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!taxData.taxStatus ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Tax Status*</option>
                        <option value="resident_individual" className="text-black">Resident</option>
                        <option value="nri" className="text-black">Non-Resident</option>
                    </select>
                    {getFieldError('taxStatus') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('taxStatus')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <select
                        name="income_slab"
                        value={taxData.income_slab}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('income_slab') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!taxData.income_slab ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Income*</option>
                        <option value="upto_1lakh" className="text-black">Up to ₹1 lakh</option>
                        <option value="above_1lakh_upto_5lakh" className="text-black">₹1 lakh - ₹5 lakh</option>
                        <option value="above_5lakh_upto_10lakh" className="text-black">₹5 lakh - ₹10 lakh</option>
                        <option value="above_10lakh_upto_25lakh" className="text-black">₹10 lakh - ₹25 lakh</option>
                        <option value="above_25lakh_upto_1cr" className="text-black">₹25 lakh - ₹1 crore</option>
                        <option value="above_1cr" className="text-black">Above ₹1 crore</option>
                    </select>
                    {getFieldError('income_slab') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('income_slab')}</p>
                    )}
                </div>

                <div className="flex flex-col">
                    <select
                        name="source_of_wealth"
                        value={taxData.source_of_wealth}
                        onChange={handleChange}
                        className={`p-2 border-b ${getFieldError('source_of_wealth') ? 'border-red-500' : 'border-[#000000]'} rounded focus:outline-none ${!taxData.source_of_wealth ? 'text-[#B5B5B5]' : 'text-black'}`}
                        required
                    >
                        <option value="" className="text-[#B5B5B5]">Source of Wealth*</option>
                        <option value="salary" className="text-black">Salary</option>
                        <option value="business" className="text-black">Business</option>
                        <option value="gift" className="text-black">Gift</option>
                        <option value="ancestral_property" className="text-black">Ancestral Property</option>
                        <option value="rental_income" className="text-black">Rental Income</option>
                        <option value="prize_money" className="text-black">Prize Money</option>
                        <option value="royalty" className="text-black">Royalty</option>
                        <option value="others" className="text-black">Others</option>

                    </select>
                    {getFieldError('source_of_wealth') && (
                        <p className="text-red-500 text-sm mt-1">{getFieldError('source_of_wealth')}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col my-10 text-sm font-normal text-[#4A5151]">
                <label className="mr-4">Are you a tax resident of any country other than India?</label>
                <div className="flex">
                    <label className="flex items-center mr-4">
                        <input
                            type="radio"
                            name="isTaxResidentOtherThanIndia"
                            checked={taxData.isTaxResidentOtherThanIndia}
                            onChange={() => handleRadioChange(true)}
                            className="mr-2"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="isTaxResidentOtherThanIndia"
                            checked={!taxData.isTaxResidentOtherThanIndia}
                            onChange={() => handleRadioChange(false)}
                            className="mr-2"
                        />
                        No
                    </label>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="tAndC"
                        checked={taxData.tAndC}
                        onChange={handleChange}
                        className={`mr-2 w-[17px] h-[12px] ${getFieldError('tAndC') ? 'border-red-500' : ''}`}
                    />
                    <span>I agree to the <a href="/terms" target="_blank" className="underline text-blue-500">T&C*</a></span>
                </div>
                {getFieldError('tAndC') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('tAndC')}</p>
                )}
            </div>

            <div className="flex my-10 justify-center w-full">
                <button
                    onClick={handleSubmit}
                    className="bg-[#FB7306] text-white text-lg font-semibold p-4 w-full rounded"
                >
                    Next Step: Nominee Details
                </button>
            </div>
        </div>
    );
};

export default TaxDetails;