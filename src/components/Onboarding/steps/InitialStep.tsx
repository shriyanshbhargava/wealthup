import Image from 'next/image';
import { KeyboardEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';

interface BankDetailsProps {
    nextStep: () => void;
    pan: string;
    setPan: any;
    setDateOfBirth?: any;
    mobileNo: string;
    aadhar: string;
    dateOfBirth?: string;
    setAadhar: any;
    isKYCDone?: boolean;
    isMutualFund?: boolean;
}

const InitialStep: React.FC<BankDetailsProps> = ({ nextStep, pan, setPan, mobileNo, aadhar, setAadhar, dateOfBirth, setDateOfBirth, isKYCDone, isMutualFund }) => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState(mobileNo);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isChecked, setIsChecked] = useState(false);


    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value.length === 1 && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`)?.focus();
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`)?.focus();
            }
        }
    };

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };

    useEffect(() => {
        const storedData = localStorage.getItem("onboardingData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setPan(parsedData?.pan || "PAN not found");
        }
    }, [setPan]);

    return (
        <div className="flex flex-col text-lg font-light items-center justify-center h-fit">
            {step === 1 && (
                <div className="w-full p-8 pt-4 space-y-8 lg:space-y-10">
                    <div>
                        <h2 className="text-lg font-semibold text-[#035782]">Please Enter Your PAN</h2>
                    </div>
                    <div className='border p-4 rounded-md custom-shadow-2 flex'>
                        <input
                            type="text"
                            className="w-full focus:outline-none"
                            placeholder="Enter PAN"
                            value={pan}
                            onChange={(e) => setPan(e.target.value)}
                        />
                    </div>
                    <div className='mt-5'>
                        <div className='flex gap-4 items-center text-center'>
                            <Image src={'/assets/img/shield.svg'} width={21} height={27} alt="shield" className='' />
                            <p className='text-sm my-auto font-normal text-[#4A5151]'>Your PAN and AADHAAR details are 100% safe and secure with us.</p>
                        </div>
                        <div className="flex justify-center w-full mt-5 mb-10">
                            <button
                                onClick={() => setStep(2)
                                    //  nextStep()
                                }
                                className="bg-[#FB7306] text-white text-lg font-semibold p-4 w-full rounded"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="w-full p-8 pt-4 space-y-8">
                    <div>
                        <h2 className="text-lg font-semibold text-[#035782]">Please Enter Last 4 Digits Of Aadhaar and Date of Birth</h2>
                        <p className="text-[#4A5151] font-normal text-base -mt-2 mb-4">To fast track the account opening by using details from your existing mutual fund portfolio.</p>
                    </div>
                    <div>
                        <div className='border p-4 rounded-md custom-shadow-2 flex'>
                            <input
                                type="text"
                                className="w-full focus:outline-none bg-transparent"
                                placeholder="Enter PAN"
                                value={pan}
                                disabled
                            />
                        </div>
                        {/* <p className='mt-4 text-sm text-[#01C8A9]'>Yay! You are KYC verified! </p> */}
                    </div>
                    <div className='border p-4 rounded-md custom-shadow-2 flex'>
                        <input
                            type="text"
                            maxLength={4}
                            // max={4}
                            className="w-full focus:outline-none bg-transparent"
                            placeholder="Enter Your Last 4 Digit Of aadhaar"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                        />
                    </div>
                    {isMutualFund &&
                        <div className='border p-4 rounded-md custom-shadow-2 flex'>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                placeholder="Enter Your DOB"
                                className="w-full focus:outline-none bg-transparent"
                            />
                        </div>
                    }
                    <div className='mt-5'>
                        <div className='flex gap-4 items-center text-center'>
                            <Image src={'/assets/img/shield.svg'} width={21} height={27} alt="shield" className='' />
                            <p className='text-sm my-auto font-normal text-[#4A5151]'>Your PAN and AADHAAR details are 100% safe and secure with us</p>
                        </div>
                        <div className="flex justify-center w-full mt-5 mb-10">
                            <button
                                onClick={() => {
                                    if (aadhar.length === 4) {

                                        nextStep()


                                    } else {
                                        toast.error("Please Enter Your Last 4 Digit Of aadhaar")
                                    }
                                }

                                }

                                className="bg-[#FB7306] text-white text-lg font-semibold p-4 w-full rounded"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="w-full p-8 space-y-8">
                    <div>
                        <h2 className="text-lg font-semibold text-[#035782]">Please Enter Your Phone Number</h2>
                        <p className="text-[#4A5151] font-normal text-base -mt-2 mb-4">To fast track the account opening by using details from your existing mutual fund portfolio.</p>
                    </div>
                    <div>
                        <div className='border p-4 rounded-md custom-shadow-2 flex'>
                            <input
                                type="text"
                                className="w-full focus:outline-none bg-transparent"
                                placeholder="Enter PAN"
                                value={pan}
                                disabled
                            />
                            {true &&
                                <Image src={'/assets/img/Tick.svg'} width={33} height={33} alt="sucess" />
                            }
                        </div>
                        {/* <p className='mt-4 text-sm text-[#01C8A9]'>Yay! You are KYC verified! </p> */}
                    </div>
                    <div>
                        <div className='border p-4 rounded-md custom-shadow-2 flex'>
                            <input
                                type="text"
                                className="w-full focus:outline-none bg-transparent"
                                placeholder="Enter PAN"
                                value={aadhar}
                                disabled
                            />
                            {true &&
                                <Image src={'/assets/img/Tick.svg'} width={33} height={33} alt="sucess" />
                            }
                        </div>
                        {/* <p className='mt-4 text-sm text-[#01C8A9]'>Yay! You are aadhar verified! </p> */}
                    </div>
                    <div className='border p-4 rounded-md custom-shadow-2 flex'>
                        <input
                            type="text"
                            className="w-full focus:outline-none bg-transparent"
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mt-2 text-sm flex items-center font-normal">
                            <input type="checkbox" className="mr-2 w-[22px] h-[22px]" name='consentCheck' onChange={handleCheckboxChange} checked={isChecked} /> I give consent to fetch my details from MF Central.
                        </div>
                        <div className="flex justify-center mt-5 w-full mb-5">
                            <button
                                className={`text-white text-lg font-semibold p-4 w-full rounded ${!isChecked ? 'bg-[#fb740695]' : 'bg-[#FB7306]'}`}
                                onClick={() => nextStep()}
                                disabled={!isChecked}
                            >
                                Get OTP
                            </button>
                        </div>
                        <button className="text-[#4A5151] text-lg font-normal text-center w-full underline" onClick={() => nextStep()}>
                            Skip
                        </button>
                    </div>
                </div>
            )}

            {/* {step === 4 && (
                <div className="w-full p-8 space-y-8">
                    <div>
                        <h2 className="text-lg font-semibold text-[#035782]">Verify it&apos;s you</h2>
                        <p className="text-[#4A5151] font-normal text-base -mt-2 mb-4">To fast track the account opening by using details from your existing mutual fund portfolio.</p>
                    </div>
                    <div className="flex justify-between px-4 mb-4">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                className="w-[43px] h-[58px] custom-shadow-2 border rounded-md text-center focus:outline-none"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>
                    <button className="text-[#4A5151] text-base font-normal w-full mx-auto">Resend OTP</button>
                    <div>
                        <div className="mt-2 text-sm flex items-center font-normal">
                            <input type="checkbox" className="mr-2 w-[22px] h-[22px]" name='consentCheck' onChange={handleCheckboxChange} checked={isChecked} /> I give consent to fetch my details from MF Central.
                        </div>
                        <div className="flex justify-center mt-5 w-full mb-10">
                            <button
                                className={`text-white text-lg font-semibold p-4 w-full rounded ${!isChecked ? 'bg-[#fb740695]' : 'bg-[#FB7306]'}`}
                                onClick={() => nextStep()}
                                disabled={!isChecked}
                            >
                                Submit OTP
                            </button>
                        </div>
                        <button className="text-[#4A5151] text-lg font-normal text-center w-full underline" onClick={() => nextStep()}>
                            Skip
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default InitialStep;