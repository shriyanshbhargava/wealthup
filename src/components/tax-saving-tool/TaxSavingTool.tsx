"use client"
import { AuthApi } from "@/api/services/auth/AuthApi";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import PhoneInput from "@/components/ui/PhoneInput";
import React from "react";
import { SITE_KEY } from "@/utils/constants";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import WInput from "@/components/ui/Input";
import { handleRecaptchaResponse } from "@/utils/recaptcha";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TabType = "manual" | "automatic";

const initialState = {
  basic: 0,
  hra: 0,
  allowance: 0,
  fund: 0,
  professional_tax: 0,
  income_tax: 0,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const TaxSavingTool = () => {
  const [selectedTab, setSelectedTab] = React.useState<TabType>("manual");
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [phone, setPhone] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [otpSent, setOtpSent] = React.useState<boolean>(false);
  const [otpLoading, setOtpLoading] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const { push } = useRouter();

  const initialLoad = async () => {
    const tokens = Storage.getToken();

    if (tokens === null) {
      setIsLoggedIn(false);
    } else {
      const userApiClient = new UserApi(tokens.access_token);

      const res: Response = await userApiClient.getMe();

      if (res.status === 200) {
        const data = await res.json();
        setPhone(data.phone);
        setIsLoggedIn(true);
        setToken(tokens.access_token);
      } else {
        setIsLoggedIn(false);
        setToken("");
        Storage.removeToken();
      }
    }
  };

  React.useEffect(() => {
    initialLoad();
  }, []);

  React.useEffect(() => {
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
      
    });
  }, [])

  const submitData = async (token: string) => {
    const data = { ...state, phone };

    if (name && name.length) {
      data["name"] = name;
    }

    if (email && email.length) {
      data["email"] = email;
    }

    const userApiClient = new UserApi(token);
    const res: Response = await userApiClient.updateTax(JSON.stringify(data));

    if (res.status !== 201) {
      return toast.error("Something went wrong.");
    }

    push("/myaccount/tax");
  };

  const AuthApiClient = new AuthApi();

  const sendOTP = async () => {
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

    const body = JSON.stringify({
      phone,
    });

    try {
      const res: Response = await AuthApiClient.sendOTP(body);
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

  const verifyOTP = async () => {
    setSubmitting(true);

    const body = JSON.stringify({
      phone,
      otp,
    });
    try {
      const response: Response = await AuthApiClient.login(body);

      const json: any = await response.json();
      if (response.status === 200) {
        if (json.status === "invalid") {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        } else if (json.status === "expired") {
          setSubmitting(false);
          toast.error("This OTP has expired");
        } else {
          setSubmitting(false);
          Storage.storeToken(json.tokens);
          await submitData(json.tokens.access_token);
        }
      } else {
        setSubmitting(false);
        toast.error(
          json?.message ?? "Something went wrong while verifying OTP"
        );
      }
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  return (
    <div className="flex flex-col px-6 sm:px-0 w-full mt-4 justify-center items-center">
      {/* <div className="bg-gray-500 rounded-xl w-full sm:w-1/2 flex text-white">
        <button
          onClick={() => setSelectedTab("manual")}
          className={`${
            selectedTab === "manual" ? "bg-gray-800" : ""
          } text-white text-[4vw] lg:text-[1.5vw] rounded-l-lg sm:rounded-l-xl px-3 py-1 w-1/2 font-robo font-medium`}
        >
          Enter Values Manually
        </button>
        <button
          onClick={() => setSelectedTab("automatic")}
          className={`${
            selectedTab === "automatic" ? "bg-gray-800" : ""
          } text-white text-[4vw] lg:text-[1.5vw] rounded-r-lg sm:rounded-r-xl px-3 py-1 w-1/2 font-robo font-medium`}
        >
          Upload Payslip
        </button>
      </div> */}
      {/* <p className="text-[4vw] lg:text-[2vw] font-robo font-medium">
        Monthly Income
      </p> */}
      <p className="text-3xl md:text-6xl font-robo font-bold mb-0">
        Wealthup&apos;s Tax Saving Tool
      </p>
      <p className="text-[4vw] md:text-[3vw] lg:text-[1.5vw] text-center font-robo font-medium mb-8">
        A FREE tool to check how much you can save in taxes!
      </p>
      <p className="text-[4vw] text-primary-new md:text-[3vw] lg:text-[1.5vw] text-center font-robo font-medium mb-8">
        Enter your monthly salary details to get started.
      </p>
      {selectedTab === "manual" ? (
        <div className="w-full flex flex-col mt-4">
          <div className="flex flex-col gap-10 sm:gap-0 sm:flex-row sm:items-center sm:justify-evenly w-full">
            <div className="flex flex-col pt-3 w-full md:w-[45%]">
              <div className="px-[2%] border-b-4 border-gray-600 w-full">
                <p className="text-[3.25vw] lg:text-[1.25vw] font-robo font-medium">
                  Income
                </p>
              </div>
              <Input
                label="Basic *"
                name="basic"
                state={state}
                dispatch={dispatch}
              />
              <Input
                label="House Rent Allowance (HRA)"
                name="hra"
                state={state}
                dispatch={dispatch}
              />
              <Input
                label="Special / Other Allowance"
                name="allowance"
                px={true}
                state={state}
                dispatch={dispatch}
              />
              <div className="border-y-4 border-gray-600 w-full">
                <Input
                  label="Gross Income before Tax"
                  px={true}
                  showInput={false}
                  state={state}
                  dispatch={dispatch}
                  amount={state.basic + state.hra + state.allowance}
                />
              </div>
            </div>
            <div className="flex flex-col pt-3 w-full md:w-[45%]">
              <div className="border-b-4 border-gray-600 w-full">
                <p className="text-[3.25vw] lg:text-[1.25vw] font-robo font-medium">
                  Deductions
                </p>
              </div>
              <Input
                label="Provident Fund (PF/EPF)"
                name="fund"
                state={state}
                dispatch={dispatch}
              />
              <Input
                label="Professional Tax"
                name="professional_tax"
                state={state}
                dispatch={dispatch}
              />
              <Input
                label="Income Tax (TDS)"
                name="income_tax"
                px={true}
                state={state}
                dispatch={dispatch}
              />
              <div className="px-[2%] border-y-4 border-gray-600 w-full">
                <Input
                  label="Net Income after Tax"
                  px={true}
                  showInput={false}
                  state={state}
                  dispatch={dispatch}
                  amount={
                    state.basic +
                    state.hra +
                    state.allowance -
                    (state.fund + state.professional_tax + state.income_tax)
                  }
                />
              </div>
            </div>
          </div>
          {!isLoggedIn ? (
            <>
              <div className="mt-10 flex flex-col items-center gap-4 w-full justify-center">
                <div className="flex items-start gap-4 w-full justify-center">
                  <div className="md:w-1/4 flex flex-col">
                    <WInput
                      label="Name"
                      required
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <WInput
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="md:w-1/4 flex flex-col">
                    <PhoneInput
                      required
                      value={phone}
                      onChange={(phoneNumber) => {
                        if (phoneNumber) {
                          setPhone(phoneNumber);
                        }
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <WInput
                        type="number"
                        label="OTP"
                        required
                        placeholder="OTP"
                        value={otp}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setOtp(e.target.value)
                        }
                      />
                      {otpSent && (
                        <p>
                          Didn&apos;t recieve otp.{" "}
                          <span
                            className="text-blue-500 underline cursor-pointer"
                            onClick={sendOTP}
                          >
                            Send Again
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <input
                  type="email"
                  name="email"
                  className="border-2 rounded-lg lg:rounded-xl border-gray-600 w-3/6 lg:w-1/6 py-2 px-3"
                /> */}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="terms"
                    defaultChecked={true}
                    // checked={state.terms}
                    // onChange={handleChange}
                  />
                  <p className="mb-0 font-robo font-normal">
                    I agree to Wealthup&apos;s{" "}
                    <Link href="/terms" className="text-blue-700 underline">
                      
                        Terms &amp; Conditions.
                      
                    </Link>
                  </p>
                  {/* {error && error.terms && (
                  <p className="text-red-500 mb-0">{error.terms}</p>
                )} */}
                </div>
              </div>
              <div className="flex justify-center mt-10">
                {otpSent ? (
                  <Button
                    onClick={verifyOTP}
                    size="bigger"
                    className="btn"
                    loading={submitting}
                  >
                    Verify OTP
                  </Button>
                ) : (
                  <Button onClick={sendOTP} size="bigger" className="btn" loading={otpLoading}>
                    Send OTP
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-10">
              <Button onClick={() => submitData(token)} size="bigger" className="btn">
                Submit
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full pb-[135px]">
          <p className="text-[1.5vw] font-robo font-normal py-5 ">
            Upload your payslip (in pdf format only)
          </p>
          <div className="bg-primary rounded-full text-white px-6 py-4">
            <input type="file" className="text-white" />
          </div>
          <div className="mt-10 flex flex-col gap-4 w-full items-center justify-center">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="terms"
                defaultChecked={true}
                // checked={state.terms}
                // onChange={handleChange}
              />
              <p className="mb-0 font-robo font-normal">
                I agree to Wealthup&apos;s{" "}
                <Link href="/terms" className="text-blue-700 underline">
                  
                    Terms &amp; Conditions.
                  
                </Link>
              </p>
              {/* {error && error.terms && (
                <p className="text-red-500 mb-0">{error.terms}</p>
              )} */}
            </div>
            <div className="flex  items-center gap-4 w-full justify-center">
              <p className="text-[1.5vw] mb-0">
                Email <span className="text-red-600">*</span>
              </p>
              {/* <PhoneInput
                value={phone}
                onChange={(phoneNumber) => {
                  if (phoneNumber) {
                    setPhone(phoneNumber);
                  }
                }}
              /> */}
              <input
                type="email"
                name="email"
                className="border-2 rounded-xl border-gray-600 w-1/6 py-2 px-3"
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Button size="bigger" custom>Email me the details</Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Input: React.FC<{
  label: string;
  px?: boolean;
  showInput?: boolean;
  amount?: number;
  name?: string;
  state?: any;
  dispatch: React.Dispatch<any>;
}> = ({
  label,
  px = false,
  showInput = true,
  amount = 0,
  name = "hra",
  state,
  dispatch,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(",", "");
    dispatch({
      type: "update",
      payload: { [e.target.name]: parseInt(value) },
    });
    e.target.value = parseInt(value.length ? value : "0").toLocaleString(
      "en-IN"
    );
  };

  return (
    <div
      className={`flex items-center justify-between w-full px-[2%] ${
        px ? "py-2 sm:py-3" : "pt-2 sm:pt-3"
      }`}
    >
      <label
        htmlFor={name}
        className="text-[3.25vw] sm:text-[2vw] lg:text-[1.25vw]"
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <span className="font-medium text-[3.25vw] sm:text-[2vw] lg:text-[1.25vw]">
          ₹
        </span>
        {showInput ? (
          <input
            type="text"
            className="rounded-lg border-2 px-3 py-2 w-32 md:w-full text-right"
            name={name}
            inputMode="numeric"
            // value={state[name]}
            onChange={handleChange}
          />
        ) : (
          <span className="font-medium text-[3.25vw] sm:text-[2vw] lg:text-[1.25vw]">
            {amount.toLocaleString("en-IN")}
          </span>
        )}
      </div>
    </div>
  );
};
