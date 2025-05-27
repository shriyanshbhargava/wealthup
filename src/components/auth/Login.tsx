import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import Input, { SubmissionInput } from "@/components/ui/Input";
import PhoneInput, { PhoneInputV2 } from "@/components/ui/PhoneInput";
import React, { useEffect } from "react";
import { SITE_KEY, __prod__ } from "@/utils/constants";

import { AuthApi } from "@/api/services/auth/AuthApi";
import { Button } from "@/components/ui/Button";
import type { E164Number } from 'libphonenumber-js/types';
import Image from "next/legacy/image";
import Link from "next/link";
import NewButton from '@/components/ui/ButtonNew'
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import checknoxoutlinedimg from '@/assets/images/wealthometer_main/checkboxoutlined.png';
import { handleRecaptchaResponse } from "@/utils/recaptcha";
import { isValidPhoneNumber } from "react-phone-number-input";
import loginImage from '@/assets/auth/loginImage.png'
import loginImageMob from '@/assets/auth/loginImageMob.png'
import loginImageMobile from '@/assets/images/login-screen-mobile.jpg';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

// import ReCAPTCHA from "react-google-recaptcha"

// export const handleRecaptchaResponse = async (recaptchaValue: string | null) => {
//   try {
//     const response = await fetch('/api/verify_recaptcha', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ recaptchaValue })
//     });

//     const data = await response.json();

//     if (data.success) {
//       return true;
//       // reCAPTCHA verification passed
//       // Continue with your logic here
//     } else {
//       // reCAPTCHA verification failed
//       // Handle failure case here
//       return false
//     }
//   } catch (error) {
//     toast.error('Failed to verify reCAPTCHA' + error);
//   }
// };

type FormValues = {
  name: string;
  phone: string;
  email: string;
  acceptTerms: boolean;
  otp: number;
};

const registerValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone is required")
    .min(10, "Phone should contain 10 digits"),
  otp: Yup.string()
    .matches(/^[0-9]+$/, "Enter OTP")
    .max(6, "OTP should only contain 6 numbers"),
  acceptTerms: Yup.bool().oneOf([true], "* required"),
  name: Yup.string().required("Name is required").min(3, "Enter a valid name"),
  email: Yup.string().email().required("Email is required"),
});

const loginValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone is required")
    .min(10, "Phone should contain 10 digits"),
  otp: Yup.string()
    .matches(/^[0-9]+$/, "Enter valid OTP")
    .max(6, "OTP should only contain 6 digits"),
  acceptTerms: Yup.bool().oneOf([true], "* required"),
});

export const Login: React.FC = () => {
  const [otpLoading, setOtpLoading] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false);
  const [tokenChecked, setTokenChecked] = React.useState<boolean>(false);
  const [currentTab, setCurrentTab] = React.useState<"login" | "register">(
    "login"
  );

  const router = useRouter();

  React.useEffect(() => {
    if (window !== undefined) {
      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get('next');
      if (next) {
        localStorage.setItem('next', next);
      }
    }
  }, []);

  React.useEffect(() => {
    if (window != undefined) {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token")?.length
      ) {
        router.push("/myaccount/dashboard");
      } else {
        setTokenChecked(true);
      }
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(loginValidationSchema) });

  // initial add google recaptca
  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    }

    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
      console.log("Script loaded!");
    });
  }, [])

  const handleKeyDownPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(sendOTP)();
    }
  };

  const AuthApiClient = new AuthApi();

  const sendOTP = async (data: FormValues) => {
    setOtpLoading(true);

    const win = window as typeof window & {
      grecaptcha: any
    }
    win.grecaptcha.ready(() => {
      win.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token: string) => {
        const result = await handleRecaptchaResponse(token)
        if (result === false) {
          setOtpLoading(false);
          return;
        }
      });
    });

    // if (!__prod__) {
    //   setOtpSent(true);
    //   setOtpLoading(false);
    //   return;
    // }
    

    const body: any = {
      phone: data.phone.replace('+', '_'),
      method: 'login'
    };

    try {
      const res: Response = await AuthApiClient.sendOTP(JSON.stringify(body));
      setOtpLoading(false);
      const json = await res.json();
      if (res.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent successfully. Check your phone.");
      } else {
        toast.error(json?.message ?? "Something went wrong while sending OTP");
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
    //   if (window != undefined) {
    //     localStorage.setItem(
    //       "token",
    //       JSON.stringify({
    //         auth_token: "sometokengoeshere",
    //         expires_at: "Date;;;",
    //       })
    //     );
    //   }
    //   push("/myaccount/dashboard");
    //   return;
    // }

    const body: any = {
      phone: data.phone.replace('+', ''),
      otp: data.otp,
    };

    try {
      const response: Response = await AuthApiClient.login(
        JSON.stringify(body)
      );

      const json: any = await response.json();

      if (response.ok && response.status === 200) {
        setSubmitting(false);
        Storage.storeToken(json.tokens);

        const next = localStorage.getItem('next')
        if (next) {
          router.push(next)
          localStorage.removeItem('next')
        } else {
          router.push("/myaccount/dashboard");
        }
      }
      else {
        if (json.status === "invalid") {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        } else if (json.status === "expired") {
          setSubmitting(false);
          toast.error("This OTP has expired");
        } else {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        }
      }
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  if (!tokenChecked) {
    return (
      <div className="h-screen w-screen">
        <div className="flex items-center justify-center text-black">
          <Spinner color="black" size="4" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex pt-24 md:px-0 md:pt-20 text-white login-mob-gradient" style={{ backgroundColor: "rgba(1, 142, 148, 1)" }}>
      <div className="container md:flex md:static md:min-h-[696px]">
        <div className="relative lg:w-1/2 h-full flex items-start lg:pt-12">
          <div className="flex flex-col md:w-2/3">
            <div className="md:hidden">
              {/* <Image src={loginImageMobile} alt="Login Screen Mobile Image" /> */}
              {/* Mobile Styling */}
              <div className="text-white flex justify-center items-center lg:block relative z-0 w-full mb-10 h-full pt-6">
                {/* <Image src={loginImage} alt="Login Image" layout="fill" /> */}
                <div className="lg:flex font-normal md:font-semibold text-left  justify-evenly md:p-8 md:pt-1 lg:p-1 text-2xl max-md:pl-0 w-1/2">
                  <p className="text-center text-3xl pb-0 max-sm:text-lg max-sm:text-left font-semibold leading-tight">Get a free report card for your <br className="max-sm:hidden"></br>finances- within minutes!</p>
                  <div className="flex flex-row flex-wrap">
                  <section className="w-max md:m-auto md:relative flow-root">
                    <div className="flex items-center md:p-2 justify-start max-sm:text-xxl mb-2">
                      <Image src={checknoxoutlinedimg} alt="checkbox" width={20} height={20} />
                      <div className="mx-2 lg:flex-1">
                        <p className="m-0 max-sm:text-sm" style={{ lineHeight: 1 }}>Expected Retirement Age</p>
                      </div>
                    </div>
                    <div className="flex items-center md:p-2 justify-start mb-2">
                      <Image src={checknoxoutlinedimg} alt="checkbox" width={20} height={20} />
                      <div className="mx-2 lg:flex-1">
                        <p className="m-0 max-sm:text-sm" style={{ lineHeight: 1 }}>Identify Mistakes</p>
                      </div>
                    </div>
                  </section>
                  <section className="w-max md:m-auto md:relative ">
                    <div className="text-lg flex items-center md:p-2 justify-start mr-2 mb-2">
                      <Image src={checknoxoutlinedimg} alt="checkbox" width={20} height={20} />
                      <div className="mx-2 lg:flex-1">
                        <p className="m-0 max-sm:text-sm" style={{ lineHeight: 1 }}>Personalized Roadmap</p>
                      </div>
                    </div>
                    <div className="text-lg flex items-center md:p-2 justify-start mr-2">
                      <Image src={checknoxoutlinedimg} alt="checkbox" width={20} height={20} />
                      <div className="mx-2 lg:flex-1">
                        <p className="m-0 max-sm:text-sm" style={{ lineHeight: 1 }}>Tips To Improve</p>
                      </div>
                    </div>
                  </section>
                  </div>
                </div>
                <div className="flex justify-center items-start relative scale-105">
                  <Image src={loginImageMob} alt="Wealthometer" objectFit="contain" className="pl-10" />
                </div>
              </div>
            </div>
            <>
              <p className="text-[40px] md:text-[50px] text-white font-medium text-center lg:text-left mb-9">Login</p>
              {/* <div className="flex rounded-xl text-xl md:text-3xl leading-tight font-sans text-secondary ">
                <span
                  className={`rounded-l-xl cursor-pointer py-2 px-6 font-bold ${currentTab === "login"
                    ? "bg-primary-new text-white"
                    : "bg-gray-200"
                    }`}
                  onClick={() => setCurrentTab("login")}
                >
                  Login
                </span>
                <span
                  className={`rounded-r-xl cursor-pointer py-2 px-6 font-bold ${currentTab === "register"
                    ? "bg-primary-new text-white"
                    : "bg-gray-200"
                    }`}
                  onClick={() => setCurrentTab("register")}
                >
                  Register
                </span>
              </div> */}
              {currentTab === "register" ? <Register /> : (
                <form
                  className="flex flex-col gap-6 w-full"
                  onSubmit={handleSubmit(verifyOTPAndSubmit)}
                >
                  <div className="flex flex-col gap-2 w-full text-white">
                    {/* <ReCAPTCHA
                      sitekey="6LflUv8nAAAAAKEJAD16c3jMJganJuv_yV091xEx"
                      onChange={handleRecaptchaResponse}
                    /> */}
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        validate: (value) => isValidPhoneNumber(value),
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInputV2
                          value={value as E164Number}
                          required
                          // eslint-disable-next-line
                          onChange={onChange}
                          error={errors.phone?.message}
                          setOtpSent={setOtpSent}
                        />
                      )}
                    />
                    {/* {!otpSent && (
                      <p className="text-white text-base">Don&apos;t have an account yet? <a href="#" className="underline">Sign Up</a></p>
                    )} */}
                    {otpSent && (
                      <div className="mt-4">
                        <SubmissionInput
                          type="number"
                          label="OTP"
                          {...register("otp")}
                          error={errors.otp?.message}
                          autoFocus
                          placeholder="OTP"
                          autoComplete="one-time-code"
                          otp
                          className="text-lg text-white"
                        />
                        <p className="font-robo font-normal text-base">
                          Didn&apos;t receive code?{" "}
                          <span
                            className="font-bold underline cursor-pointer"
                            onClick={handleSubmit(sendOTP)}
                          >
                            Request again
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("acceptTerms")}
                      defaultChecked
                    />
                    <p className="mb-0 font-robo font-normal text-lg">
                      I agree to Wealthup&apos;s{" "}
                      <Link href="/terms" className="underline">
                        Terms &amp; Conditions.
                      </Link>
                    </p>
                    {errors.acceptTerms && (
                      <p className="text-red-500 mb-0">
                        {errors.acceptTerms?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    {otpSent ? (
                      // <Button type="submit" size="bigger" className="btn" loading={submitting}>
                      //   Submit
                      // </Button>
                      <NewButton
                        size='small'
                        padding={'px-1 sm:px-4 sm:py-2 py-3 lg:max-w-fit'}
                        boxShadow={false}
                        onClick={() => {}}
                        type="submit"
                        loading={submitting}>
                          <span className='text-base font-medium'>Submit</span>
                      </NewButton>
                    ) : (
                        // <Button
                        //   size="bigger"
                        //   className="btn"
                        //   loading={otpLoading}
                        //   onClick={handleSubmit(sendOTP)}
                        // >
                        //   Send OTP
                        // </Button>
                      <NewButton
                        type="submit"
                        size='small'
                        padding={'px-1 sm:px-4 sm:py-2 py-3 lg:max-w-fit'}
                        boxShadow={false}
                        onClick={handleSubmit(sendOTP)}
                        loading={otpLoading}>
                          <span className='text-base font-medium'>Send OTP</span>
                      </NewButton>
                    )}
                  </div>
                </form>
              )}
            </>
            <div className="mt-6">
              <h4 className="mb-2 font-robo font-normal text-base">Disclaimer</h4>
              <p className="font-robo font-light text-sm">
                We&apos;re committed to your privacy. We use the information you
                provide to contact you about our relevant content, products, and
                services. You may unsubscribe from these communications at any
                time. For more information, check out our{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 h-auto text-white flex justify-center items-center lg:block z-0 w-1/2 pt-12 max-lg:flex-col max-md:hidden" style={{ backgroundColor: "rgba(3, 87, 130, 1)" }}>
          <div>
            <p className="text-center px-16 text-3xl font-medium leading-tight">Get a free report card for your <br></br>finances- within minutes!</p>
            {/* <Image src={loginImage} alt="Login Image" layout="fill" /> */}
            <div className="lg:flex font-normal md:font-semibold text-left w-full justify-evenly md:p-8 md:pt-1 lg:p-1 text-2xl md:pl-0 ">
              <section className="w-max m-auto md:relative ">
                <div className="flex items-center md:p-2 justify-start">
                  <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
                  <div className="mx-2 lg:flex-1">
                    <p className="m-0 py-4 text-lg md:font-semibold" style={{ lineHeight: 1 }}>Identify Mistakes</p>
                  </div>
                </div>
                <div className="flex items-center md:p-2 justify-start">
                  <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
                  <div className="mx-2 lg:flex-1">
                    <p className="m-0  py-4 text-lg md:font-semibold" style={{ lineHeight: 1 }}>Expected Retirement Age</p>
                  </div>
                </div>
              </section>
              <section className="w-max m-auto md:relative ">
                <div className="text-lg flex items-center md:p-2 justify-start mr-2">
                  <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
                  <div className="mx-2 lg:flex-1">
                    <p className="m-0 py-4 text-lg  md:font-semibold" style={{ lineHeight: 1 }}>Personalized Roadmap</p>
                  </div>
                </div>
                <div className="text-lg flex items-center md:p-2 justify-start mr-2">
                  <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
                  <div className="mx-2 lg:flex-1">
                    <p className="m-0 py-4 text-lg md:font-semibold" style={{ lineHeight: 1 }}>Tips To Improve</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex justify-center lg:pl-28 items-start max-lg:pl-10">
            <Image src={loginImage} width={500} height={500} alt="Login Image"></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const Register = () => {
  const [otpLoading, setOtpLoading] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false);

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(registerValidationSchema) });

  const handleKeyDownPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(sendOTP)();
    }
  };

  const AuthApiClient = new AuthApi();

  const sendOTP = async (data: FormValues) => {
    setOtpLoading(true);

    const win = window as typeof window & {
      grecaptcha: any
    }
    win.grecaptcha.ready(() => {
      win.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token: string) => {
        const result = await handleRecaptchaResponse(token)
        if (result === false) {
          setOtpLoading(false);
          return;
        }
      });
    });

    // if (!__prod__) {
    //   setOtpSent(true);
    //   setOtpLoading(false);
    //   return;
    // }

    const body: any = {
      phone: data.phone.replace('+', ''),
      method: "register"
    };

    try {
      const res: Response = await AuthApiClient.sendOTP(JSON.stringify(body));
      setOtpLoading(false);
      const json = await res.json();
      if (res.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent successfully. Check your phone.");
      } else {
        toast.error(json?.message ?? "Something went wrong while sending OTP");
      }
    } catch (err) {
      console.log(err);
      setOtpLoading(false);
      toast.error("Something went wrong while sending OTP");
    }
  };

  const verifyOTPAndSubmit = async (data: FormValues) => {
    setSubmitting(true);

    const body: any = {
      phone: data.phone.replace('+', ''),
      otp: data.otp,
      name: data.name,
      email: data.email,
    };

    if (Storage.getReferral()) {
      body["token"] = Storage.getReferral();
    }

    try {
      const response: Response = await AuthApiClient.login(
        JSON.stringify(body)
      );

      const json: any = await response.json();

      if (response.ok && response.status === 200) {
        setSubmitting(false);
        Storage.storeToken(json.tokens);

        const next = localStorage.getItem('next')
        if (next) {
          push(next)
          localStorage.removeItem('next')
        } else {
          push("/myaccount/dashboard");
        }
      }
      else {
        if (json.status === "invalid") {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        } else if (json.status === "expired") {
          setSubmitting(false);
          toast.error("This OTP has expired");
        } else {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        }
      }
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-full"
      onSubmit={handleSubmit(verifyOTPAndSubmit)}
    >
      <div className="flex flex-col gap-2 w-full h-[340px]">
        {/* <ReCAPTCHA
          sitekey="6LflUv8nAAAAAKEJAD16c3jMJganJuv_yV091xEx"
          onChange={handleRecaptchaResponse}
        /> */}
        <SubmissionInput
          type="text"
          label="Name"
          required
          {...register("name", {
            required: true,
          })}
          error={errors.name?.message}
          autoFocus
          placeholder="Name"
          autoComplete="given-name"
        />
        <SubmissionInput
          type="text"
          label="Email"
          required
          {...register("email", {
            required: true,
          })}
          error={errors.name?.message}
          placeholder="Email"
          autoComplete="email"
        />
        <div className="text-white">
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInputV2
                value={value as E164Number}
                required
                // eslint-disable-next-line
                onChange={onChange}
                error={errors.phone?.message}
                setOtpSent={setOtpSent}
              />
            )}
          />
        </div>
        {otpSent && (
          <>
            <SubmissionInput
              type="number"
              label="OTP"
              {...register("otp")}
              error={errors.otp?.message}
              autoFocus
              placeholder="OTP"
              autoComplete="one-time-code"
            />
            <p className="font-robo font-normal">
              Didn&apos;t receive code?{" "}
              <span
                className="font-bold text-blue-700 underline cursor-pointer"
                onClick={handleSubmit(sendOTP)}
              >
                Request again
              </span>
            </p>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("acceptTerms")}
          defaultChecked
        />
        <p className="mb-0 font-robo font-normal">
          I agree to Wealthup&apos;s{" "}
          <Link href="/terms" className="text-blue-700 underline">

            Terms &amp; Conditions.

          </Link>
        </p>
        {errors.acceptTerms && (
          <p className="text-red-500 mb-0">
            {errors.acceptTerms?.message}
          </p>
        )}
      </div>
      <div>
        {otpSent ? (
          <Button type="submit" size="bigger" className="btn" loading={submitting}>
            Submit
          </Button>
        ) : (
          <Button
            size="bigger"
            className="btn"
            loading={otpLoading}
            onClick={handleSubmit(sendOTP)}
          >
            Send OTP
          </Button>
        )}
      </div>
    </form>
  );
}

const MobileHeroSection = () => {
  return (
    <div className="text-white flex">
      <div className="w-1/2">
        <p className="text-center lg:px-16 text-2xl lg:text-3xl font-medium leading-tight">Get a free report card for your <br></br>finances- within minutes!</p>
        {/* <Image src={loginImage} alt="Login Image" layout="fill" /> */}
        <div className="lg:flex font-normal md:font-semibold text-left w-full justify-evenly md:p-8 md:pt-1 lg:p-1 text-2xl md:pl-0 ">
          <section className="w-max m-auto md:relative ">
            <div className="flex items-center md:p-2 justify-start">
              <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
              <div className="mx-2 lg:border-b-2 lg:border-white lg:flex-1">
                <p className="m-0 py-4 text-lg md:font-semibold" style={{ lineHeight: 1 }}>Identify Mistakes</p>
              </div>
            </div>
            <div className="flex items-center md:p-2 justify-start">
              <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
              <div className="mx-2 lg:border-b-2 lg:border-white lg:flex-1">
                <p className="m-0  py-4 text-lg md:font-semibold" style={{ lineHeight: 1 }}>Expected Retirement Ag</p>
              </div>
            </div>
          </section>
          <section className="w-max m-auto md:relative ">
            <div className="text-lg flex items-center md:p-2 justify-start mr-2">
              <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
              <div className="mx-2 lg:border-b-2 lg:border-white lg:flex-1">
                <p className="m-0 py-4 text-lg  md:font-semibold" style={{ lineHeight: 1 }}>Personalized Roadmaps</p>
              </div>
            </div>
            <div className="text-lg flex items-center md:p-2 justify-start mr-2">
              <Image src={checknoxoutlinedimg} alt="checkbox" width={30} height={30} />
              <div className="mx-2 lg:border-b-2 lg:border-white lg:flex-1">
                <p className="m-0 py-4 text-lg md:font-semibold" style={{ lineHeight: 1 }}>Tips To Improve</p>
              </div>
            </div>
          </section>
      </div>
        </div>
        <div className="flex justify-center lg:pl-28 items-start max-lg:pl-10">
          <Image src={loginImage} width={500} height={500} alt="Login Image"></Image>
        </div>
      </div>
  )
}
