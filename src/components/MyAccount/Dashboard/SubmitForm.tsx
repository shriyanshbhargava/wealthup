import React, { createRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { OTPApi } from "@/api/services/auth/OTPApi";
import { toast } from "react-toastify";
import PhoneInput, { PhoneInputV2 } from "@/components/ui/PhoneInput";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import Input, { SubmissionInput } from "@/components/ui/Input";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { __prod__ } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { AuthApi } from "@/api/services/auth/AuthApi";
import Storage from "@/utils/storage";
import Script from "next/script";
import { useMediaQuery } from "react-responsive";
import { motion } from 'framer-motion';
import { Spinner } from "@/components/ui/Spinner";
import { IoIosArrowBack } from "react-icons/io";
import type { E164Number } from 'libphonenumber-js/types';
import page from "@/app/goals/page";


type FormValues = {
    name: string;
    phone: string;
    email: string;
    acceptTerms: boolean;
    otp: number;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().optional(),
    phone: Yup.string()
        .required("Phone is required"),
    email: Yup.string().optional()
});

export const SubmissionForm: React.FC<{
    onBack: React.MouseEventHandler<HTMLSpanElement> | undefined;
    onSubmit: (props: {
        name: string;
        email?: string;
        phone: string;
        id: string;
    }) => void;
    submitted: boolean;
    title?: string;
    login?: boolean;
    additionData?: {
        phone?: string;
        email?: string;
    },
    script?: string;
    wealthometer?: boolean;
    setShowResult: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ onBack, onSubmit, submitted, title, additionData, login = false, script, wealthometer = false, setShowResult }) => {
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [requestAgain, setRequestAgain] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>("");
    const otpRef = createRef<HTMLInputElement>();

    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

    const nameField = document.getElementById('name') as HTMLInputElement;
    const phoneField = document.querySelector('phone') as HTMLInputElement;
    const otpField = document.getElementById('otp') as HTMLInputElement;
    const submitButton = document.getElementById('submit') as HTMLButtonElement;

    nameField?.addEventListener('input', () => {
        if (nameField?.value?.length > 0) {
            phoneField?.focus();
        }
    });

    useEffect(() => {
        const phone = watch("phone");
        if (phone?.length >= 10) {
            otpField?.focus();
        }
    })

    useEffect(() => {
        if (wealthometer) {
            push('?page=submission', undefined, { shallow: true })
        }
    }, [push, wealthometer])

    useEffect(() => {
        if (otpSent) {
            setTimeout(() => {
                setRequestAgain(true);
            }, 10000);
        }
    }, [otpSent])

    useEffect(() => {
        if (watch("name")) {
            const phoneInput = document.querySelector('input[name="phone"]') as HTMLInputElement;
            if (phoneInput) {
                phoneInput.focus();
            }
        }
    }, [watch("name")]);



    useEffect(() => {
        const phone = watch("phone");

        if (typeof phone === "string" && isValidPhoneNumber(phone)) {
            sendOTP({
                phone: phone,
                name: watch("name"),
                email: watch("email"),
                acceptTerms: false,
                otp: 0
            });
            otpRef.current?.focus();
        }
    }, [watch("phone")]);


    useEffect(() => {
        if (otpSent && otp.length === 6) {
            handleSubmit(verifyOTPAndSubmit)();
        }
    }, [otp, otpSent]);

    useEffect(() => {
        if (additionData && additionData.email) {
            setValue("email", additionData.email);
        }

        if (additionData && additionData.phone) {
            setValue("phone", additionData.phone)
        }
    }, [additionData]);

    const OTPApiClient = new OTPApi();

    const sendOTP = async (data: FormValues) => {
        setOtpLoading(true);

        if (otpRef.current !== null) {
            otpRef.current.focus();
            console.log(otpRef.current)
        }

        // if (!__prod__) {
        //   setOtpSent(true);
        //   setOtpLoading(false);
        //   return;
        // }

        const phoneNumber = parsePhoneNumber(data.phone);

        if (phoneNumber?.nationalNumber.length != 10) {
            toast.error("Invalid Phone Number");
            return;
        }

        if (data.name.length == 0) {
            toast.error("Please enter your name");
            return;
        }

        // if(data.email.length==0){
        //     toast.error("Please enter your email");
        //     return;
        // }

        const body = JSON.stringify({
            // phone: phoneNumber?.countryCallingCode+"_"+phoneNumber?.nationalNumber,
            phone: data.phone.replace("+", '')
        });



        try {
            const res: Response = await OTPApiClient.sendOTP(body);
            const json = await res.json();
            setOtpLoading(false);

            if (res.status === 200) {
                setOtpSent(true);
                toast.success("OTP sent successfully. Check your phone.");
            } else if (res.status === 429) {
                toast.error("Too many request, try after 15 minutes.")
            } else {
                toast.error(json.message);
            }
        } catch (err) {
            console.log(err);
            setOtpLoading(false);
            toast.error("Something went wrong while sending OTP");
        }
    };

    const verifyOTPAndSubmit = async (data: FormValues) => {

        // if(login){
        //     push('/myaccount/wealthometer')
        //     return;
        // }

        setSubmitting(true);

        // if (!__prod__) {
        //   setSubmitting(false);
        //   onSubmit({
        //     name: data.name,
        //     email: data.email,
        //     phone: data.phone,
        //     id: "",
        //   });
        //   return;
        // }

        const body = JSON.stringify({
            phone: data.phone.replace("+", ''),
            otp,
        });

        try {
            let response: Response;
            if (login) {
                const authApiClient = new AuthApi();
                const authBody: {
                    phone: string;
                    otp: string;
                    name?: string;
                    email?: string;
                } = {
                    phone: data.phone.replace("+", ''),
                    otp: otp!.toString(),
                };

                if (data?.name && data.name.length) {
                    authBody['name'] = data.name;
                }

                if (data?.email && data.email.length) {
                    authBody["email"] = data.email;
                }

                response = await authApiClient.login(JSON.stringify(authBody));

            } else {
                response = await OTPApiClient.verifyOTP(body);
            }

            const json = await response.json();
            if (response.status === 200) {

                if (login) {
                    Storage.storeToken(json.tokens);
                }

                onSubmit({
                    name: data.name,
                    email: data.email,
                    phone: data.phone.replace("+", ''),
                    id: json.user.id,
                });

                setSubmitting(false)
            }

            else {
                setSubmitting(false);
                toast.error(json.message);
            }
        } catch (err) {
            setSubmitting(false);
            toast.error("Something went wrong while verifying OTP");
        }
    };

    const mediumDevices = useMediaQuery({ minWidth: '768px' });

    return <>
        {script && (
            <Script id="fbevent" dangerouslySetInnerHTML={{
                __html: `
        ${script}
    `}} />
        )}
        <motion.div
            key='submit-form'
            initial={{ opacity: 0, marginLeft: 200 }}
            animate={{ opacity: 1, marginLeft: 0 }}
            className='rounded-[30px] w-full h-full mt-8 mb-[100px]  md:w-[700px] md:h-[450px] p-8 bg-white shadow-md'>
            <div>
                <div className="md:hidden mb-4">
                    <button onClick={() => setShowResult(false)} className="flex gap-2 cursor-pointer text-primary items-center">
                        <IoIosArrowBack className="text-primary" /> Back
                    </button>
                </div>
                <h3 className="text-center  text-xl text-sky-800 md:text-2xl leading-tight font-sans text-secondary">
                    You&apos;re just one step away!
                </h3>
                <p className="text-center text-sky-800">Please fill the details to unlock the detailed report</p>
                <form
                    id="otp-form"
                    className="flex flex-col gap-6 w-full"
                    onSubmit={handleSubmit(verifyOTPAndSubmit)}
                >
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        <div className="w-full md:w-[45%]">
                            {/* <div className="text-sky-800 w-60  mb-2 text-lg font-medium">Name</div> */}
                            <label className="flex items-start text-2xl font-medium text-sky-800" >Name<span className="text-base"> *</span></label>
                            <SubmissionInput autoFocus id="name" type="text" {...register("name")}
                                className="border text-sky-800 border-sky-800 placeholder:text-sky-800  focus:outline-none  focus:border-sky-800 " placeholder="Enter your name" autoComplete="given-name" error={
                                    /[0-9]+/g.test(watch("name")) ? "Enter a valid name" : ""
                                } />

                        </div>
                        <div className="w-[45%] hidden md:block">
                            <label className="flex items-start text-2xl font-medium text-sky-800" >Email</label>
                            <SubmissionInput id="email" type="email" {...register("email")}
                                // label="Email" 
                                className="border border-sky-800 placeholder:text-sky-800 text-sky-800  focus:border-sky-800  focus:outline-none " placeholder="Enter your email" autoComplete="email" error={errors.email?.message} />
                        </div>
                    </div>


                    <div className="flex flex-col md:flex-row  justify-between">
                        <div className="flex justify-end text-sky-800 flex-col w-full md:w-[45%] mb-4">
                            <Controller

                                name="phone"
                                control={control}
                                rules={{
                                    validate: (value) => isValidPhoneNumber(value),
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInputV2
                                        value={value as E164Number}
                                        required={true}
                                        onChange={onChange}
                                        rightComponent={<></>}
                                        error={errors.phone?.message}
                                        setOtpSent={setOtpSent}
                                    />
                                )}
                            />

                            <div className="mt-2 flex justify-end">
                                <Button id="WOM_send-otp" custom border onClick={handleSubmit(sendOTP)}>
                                    {otpSent ? "Resend OTP" : 'Send OTP'}
                                </Button>
                            </div>
                        </div>
                        <div className="w-full md:w-[45%] flex flex-col gap-2">
                            <label className="block text-2xl font-medium text-sky-800">OTP</label>
                            <SubmissionInput
                                className="text-sky-800 border border-sky-800 focus:border-sky-800 focus:outline-none placeholder:text-sky-800"
                                type="number"
                                name="otp"
                                id="otp"
                                ref={otpRef}
                                // label="OTP"
                                placeholder="Enter OTP"
                                autoComplete="one-time-code"
                                value={otp}
                                maxLength={6}
                                onChange={(e) => { setOtp(e.target.value) }}
                                error={
                                    otp.length && otp.length != 6 ? "OTP should be 6 digits" : ''
                                }
                                onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                                disabled={!otpSent}
                            />
                            {otpSent && otp.length === 6 && (
                                <div className="flex w-full md:w-auto justify-end">
                                    <Button id="WOM_see-report" custom disabled={otp?.toString().length !== 6} type="submit" size="bigger" className="w-full md:w-auto" loading={submitting}>
                                        See Report
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="flex -mt-[30px]  py-8  items-start gap-3">
                        <input
                            id="WOM_terms"
                            type="checkbox"
                            {...register("acceptTerms")}
                            defaultChecked
                        />

                        <p className="-mt-2 mb-0 font-robo font-normal text-base">
                            I agree to Wealthup&apos;s{" "}
                            <Link href="/terms" className="text-blue-700 underline">

                                Terms & Conditions

                            </Link>
                            , and to be contacted by them over phone or whatsapp.
                        </p>
                        {errors.acceptTerms && (
                            <p className="text-red-500 mb-0">
                                {errors.acceptTerms?.message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </motion.div>
    </>;
};
