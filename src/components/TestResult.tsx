import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import React, { createRef, useEffect, useState } from "react";

import { AuthApi } from "@/api/services/auth/AuthApi";
import { Button } from "@/components/ui/Button";
import Image from "next/legacy/image";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { OTPApi } from "@/api/services/auth/OTPApi";
import PhoneInput from "@/components/ui/PhoneInput";
import Script from "next/script";
import Storage from "@/utils/storage";
import { __prod__ } from "@/utils/constants";
import { isValidPhoneNumber } from "react-phone-number-input";
import loginImage from "@/assets/images/login-screen.jpg";
import loginImageMobile from '@/assets/images/login-screen-mobile.jpg';
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  acceptTerms: boolean;
  otp: number;
};

const validationSchema = Yup.object().shape({
  // name: Yup.string()
  //   .required("Name is required")
  //   .matches(/^[A-Za-z ]+$/, { message: "Enter a valid name" }),
  phone: Yup.string()
    .required("Phone is required")
    .min(10, "Phone should contain 10 digits"),
  // email: Yup.string().email("Email is invalid").required("Email is required"),
  acceptTerms: Yup.bool().oneOf([true], "* required"),
});

export const TestResult: React.FC<{
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
}> = ({ onBack, onSubmit, submitted, title, additionData, login = false, script, wealthometer = false }) => {
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [requestAgain, setRequestAgain] = useState<boolean>(false);

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  useEffect(() => {
    if (wealthometer) {
      push('?page=submission', undefined, { shallow: true })
    }
  }, [])

  useEffect(() => {
    if (otpSent) {
      setTimeout(() => {
        setRequestAgain(true);
      }, 10000);
    }
  }, [otpSent])

  useEffect(() => {
    if (additionData && additionData.email) {
      setValue("email", additionData.email);
    }

    if (additionData && additionData.phone) {
      setValue("phone", additionData.phone)
    }
  }, [additionData]);

  const otp = watch("otp");

  const OTPApiClient = new OTPApi();

  const sendOTP = async (data: FormValues) => {
    setOtpLoading(true);

    // if (!__prod__) {
    //   setOtpSent(true);
    //   setOtpLoading(false);
    //   return;
    // }

    const body = JSON.stringify({
      phone: data.phone,
    });

    try {
      const res: Response = await OTPApiClient.sendOTP(body);
      setOtpLoading(false);

      if (res.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent successfully. Check your phone.");
      } else {
        toast.error("Something went wrong while sending OTP");
      }
    } catch (err) {
      console.log(err);
      setOtpLoading(false);
      toast.error("Something went wrong while sending OTP");
    }
  };

  const verifyOTPAndSubmit = async (data: FormValues) => {
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
      phone: data.phone,
      otp: data.otp,
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
          phone: data.phone,
          otp: data.otp.toString(),
          name: data.name,
        };

        if (data?.email && !!data?.email?.length) {
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
          phone: data.phone,
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
    <div className="flex md:h-screen md:min-h-[1020px] py-32 px-6 md:px-0 md:py-0 justify-center md:justify-between items-center">
      <div className="relative lg:w-1/2 h-full flex items-center justify-center">
        <div className="flex flex-col md:w-2/3">
          <div className="md:hidden -mt-[4.5rem] -mx-8">
            <Image src={loginImageMobile} alt="Login Screen Mobile Image" />
          </div>
          {submitted ? (
            <div className="py-10">
              <p>We are generating your customised report.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 lg:mb:2">
                <span
                  onClick={onBack}
                  className="text-blue-600 hover:underline flex items-center cursor-pointer max-w-[max-content] text-xl"
                >
                  <MdArrowBackIos /> Back
                </span>
              </div>
              <h3 className="text-xl md:text-2xl leading-tight font-sans text-secondary mb-6">
                {title ??
                  "Share your details. The result will be emailed to you."}
              </h3>
              <form
                className="flex flex-col gap-6 w-full"
                onSubmit={handleSubmit(verifyOTPAndSubmit)}
              >
                {/* <div className="flex flex-col gap-2 w-full">
                  <Input
                    type="text"
                    {...register("name")}
                    error={
                      /[0-9]+/g.test(watch("name")) ? "Enter a valid name" : ""
                    }
                    label="Name"
                    placeholder="Name"
                    autoComplete="name"
                    autoFocus={mediumDevices}
                    required
                  />
                </div> */}
                <div className="flex items-center flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 w-full">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      validate: (value) => isValidPhoneNumber(value),
                    }}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        value={value}
                        label="Phone"
                        required
                        onChange={onChange}
                        error={errors.phone?.message}
                      />
                    )}
                  />
                  <Button
                    className="md:-mt-2"
                    loading={otpLoading}
                    border
                    type="button"
                    onClick={handleSubmit(sendOTP)}
                  >
                    {otpSent ? "Request Again" : "Send OTP"}
                  </Button>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Input
                    type="number"
                    label="OTP"
                    {...register("otp")}
                    error={
                      otp && otp.toString().length !== 6
                        ? "OTP should be only 6 digits"
                        : ""
                    }
                    placeholder="OTP"
                    autoComplete="one-time-code"
                  />
                  {otpSent && (
                    <p className="font-robo font-normal">
                      Didn&apos;t receive code?{" "}
                      <span
                        className="font-bold text-blue-700 underline cursor-pointer"
                        onClick={handleSubmit(sendOTP)}
                      >
                        Request again
                      </span>
                    </p>
                  )}
                </div>
                {/* <div className="flex flex-col gap-2 w-full">
                  <Input
                    {...register("email")}
                    label="Email"
                    autoComplete="email"
                    placeholder="Email"
                    error={errors.email?.message}
                  />
                </div> */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("acceptTerms")}
                    defaultChecked
                  />
                  <p className="-mt-2 mb-0 font-robo font-normal">
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
                <div>
                  <Button custom disabled={otp?.toString().length !== 6} type="submit" size="bigger" className="w-full" loading={submitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </>
          )}
          <div className="mt-6">
            <h4 className="mb-0 font-robo font-normal">Disclaimer</h4>
            <p className="font-robo font-light italic">
              We&apos;re committed to your privacy. We use the information you
              provide to contact you about our relevant content, products, and
              services. You may unsubscribe from these communications at any
              time. For more information, check out our{" "}
              <Link href="/privacy" className="text-blue-700 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative z-0 w-1/2 bg-gray-600 h-full">
        <Image src={loginImage} alt="Login Image" layout="fill" />
      </div>
    </div>
  </>;
};
