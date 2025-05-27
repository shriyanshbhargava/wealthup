'use client'

import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import React, { useEffect, useReducer, useState } from "react";

import { AuthApi } from "@/api/services/auth/AuthApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import DateInput from "@/components/ui/DateInput";
import Input from "@/components/ui/Input";
import Link from "next/link";
import PhoneInput from "@/components/ui/PhoneInput";
import { SITE_KEY } from "@/utils/constants";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { handleRecaptchaResponse } from "@/utils/recaptcha";
import { rentReceiptCrumbs } from "@/utils/Breadcrumbs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  tenetName: "",
  landlordName: "",
  rentAmount: "",
  landlordPan: "",
  phone: "",
  rentFrom: new Date(),
  rentTo: new Date(),
  rentPaidOn: "",
  paymentMode: "",
  location: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "reset":
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
};

const paymentOptions = [
  { value: "Cash", label: "Cash" },
  { value: "Net Banking", label: "Net Banking" },
  { value: "UPI", label: "UPI" },
  { value: "NEFT", label: "NEFT" },
];

const days = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
];

export const RentReceiptGeneratorForm: React.FC<{
  dashboard?: boolean;
  handleSucess?: () => void;
}> = ({ dashboard = false, handleSucess }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [me, setMe] = useState<any>(null);
  const [panError, setPanError] = useState<boolean>(false);

  const getMe = async (token: string) => {
    const userApiClient = new UserApi(token);
    const res: Response = await userApiClient.getMe();

    if (res.status === 200) {
      const data = await res.json();
      setMe(data);
    }
  };

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
      
    });
  }, [])

  useEffect(() => {
    const tokens = Storage.getToken();

    if (tokens === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      getMe(tokens.access_token);
    }
  }, []);

  useEffect(() => {
    if (me !== null && me.first_name) {
      dispatch({
        type: "update",
        payload: {
          tenetName: `${me.first_name} ${me?.last_name ?? ""}`,
        },
      });
    }
  }, [me]);

  const router = useRouter();
  const [routerReady, setRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
    }
  }, [router.isReady]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "landlordPan" &&
      !e.target.value.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    ) {
      setPanError(true);
    } else {
      setPanError(false);
    }

    dispatch({
      type: "update",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleReset = () => {
    dispatch({
      type: "reset",
      payload: {
        tenetName:
          isLoggedIn && me !== null && me?.first_name
            ? `${me.first_name} ${me?.last_name ?? ""}`
            : "",
        rentFrom: new Date(),
        rentTo: new Date(),
      },
    });
  };

  const authApiClient = new AuthApi();

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

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
      phone: state.phone,
    });

    try {
      const res: Response = await authApiClient.sendOTP(body);
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

  const verifyOTPAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // return handleSubmit();

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
      phone: state.phone,
      otp,
    });
    try {
      const response: Response = await authApiClient.login(body);

      if (response.status === 200) {
        const json = await response.json();

        Storage.storeToken(json.tokens);

        if (json.status === "invalid") {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        } else if (json.status === "expired") {
          setSubmitting(false);
          toast.error("This OTP has expired");
        } else {
          handleSubmit();
          setSubmitting(false);
        }
      } else {
        setSubmitting(false);
        toast.error("Something went wrong while verifying OTP");
      }
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    setSubmitting(true);
    e?.preventDefault();

    const noValidationKeys = ["landlordPan"];

    if (isLoggedIn) noValidationKeys.push("phone");

    const stateKeys = Object.keys(initialState).filter(
      (key) => !noValidationKeys.includes(key)
    );

    let error = false;

    stateKeys.forEach((key) => {
      if (!state[key]) {
        error = true;
      }
    });

    if (parseInt(state.rentAmount) > 8333 && !state.landlordPan) error = true;

    if (error) {
      toast.error("Please fill all the fields to generate receipt");
    }

    // Handle the data
    const tokens = Storage.getToken()!;
    const userApiClient = new UserApi(tokens.access_token);

    const body = JSON.stringify({
      landlord_name: state.landlordName,
      tenat_name: state.tenetName,
      payment_mode: state.paymentMode,
      location: state.location,
      rent_amount: state.rentAmount,
      payment_date: state.rentPaidOn,
      pan: state.landlordPan,
      to_date: Date.parse(state.rentTo),
      from_date: Date.parse(state.rentFrom),
    });

    const res: Response = await userApiClient.generateRentReceipt(body);

    const data = await res.json();
    if (res.status === 201) {
      if (dashboard && typeof handleSucess === "function") {
        setSubmitting(false);
        handleReset();
        return handleSucess();
      }
      router.push("/myaccount/rent-receipt");
      setSubmitting(false);
    } else {
      toast.error(data.message);
      setSubmitting(false);
    }
  };

  return <>
    <div className="py-8 rent-receipt-gradient text-white">
      <div className="px-4"><Breadcrumbs crumbs={rentReceiptCrumbs} /></div>
      <div>
      <Container >
        <div className="text-center ">
        <h1 className="text-5xl">Rent Receipt Generator</h1>
        <h1 className="pt-4 font-robo font-medium text-xl md:text-2xl lg:text-3xl xl:text-2xl leading-tight ">
          Avoid the last minute hassle of arranging rent receipts.
          <br />
          Generate them with one click and save your taxes!
        </h1>
        </div>
        <div className="my-8">
          <form
            onSubmit={
              isLoggedIn
                ? handleSubmit
                : otpSent
                ? verifyOTPAndSubmit
                : sendOTP
            }
            onReset={handleReset}
          >
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <div className="flex flex-col w-full text-white">
                <Input
                  label="Tenant Name"
                  placeholder="Tenant Name"
                  name="tenetName"
                  disabled={isLoggedIn && me !== null}
                  value={state.tenetName}
                  onChange={handleChange}
                  className="mb-0 text-white"
                  bgLabel={`${dashboard ? "bg-white" : "bg-transparent"}`}
                />
                {dashboard || (isLoggedIn && me !== null) ? (
                  <p className="">
                    You can update your name in{" "}
                    <Link href="/myaccount/profile" className="text-blue-500 underlinw">
                      My Profile
                    </Link>
                  </p>
                ) : null}
              </div>
              <Input
                label="Landlord Name"
                placeholder="Landlord Name"
                name="landlordName"
                value={state.landlordName}
                onChange={handleChange}
                bgLabel={`${dashboard ? "bg-black" : "bg-transparent"}`}
                
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <Input
                label="Rent Amount"
                placeholder="Rent Amount"
                name="rentAmount"
                type="number"
                value={state.rentAmount}
                onChange={handleChange}
                bgLabel={`${dashboard ? "bg-white" : "bg-transparent"}`}
              />
              {parseInt(state.rentAmount) > 8333 ? (
                <Input
                  label="Landlord's PAN Number"
                  placeholder="Landlord's PAN Number"
                  name="landlordPan"
                  value={state.landlordPan?.toUpperCase()}
                  onChange={handleChange}
                  error={
                    state.landlordPan.length && panError
                      ? "Enter a valid PAN"
                      : ""
                  }
                  bgLabel={`${dashboard ? "bg-white" : "bg-transparent"}`}
                />
              ) : null}
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <Input
                label="Address"
                placeholder="Address"
                name="location"
                value={state.location}
                onChange={handleChange}
                bgLabel={`${dashboard ? "bg-white" : "bg-transparent"}`}
              />
              {!isLoggedIn ? (
                <>
                  {otpSent ? (
                    <Input
                      label="OTP"
                      placeholder="OTP"
                      name="otp"
                      value={otp}
                      onChange={({ target }) => setOtp(target.value)}
                      // bgLabel={`${dashboard ? "bg-white" : "bg-transparent"}`}
                    />
                  ) : (
                    <PhoneInput
                      value={state.phone}
                      bgLabel="bg-#045783"
                      onChange={(value) => {
                        dispatch({
                          type: "update",
                          payload: {
                            phone: value,
                          },
                        });
                      }}
                    />
                  )}
                </>
              ) : null}
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              {/* <Input
                label="Rent From"
                name="rentFrom"
                value={state.rentFrom}
                type="date"
                onChange={handleChange}
                bgLabel="bg-gray-100"
              /> */}
              <DateInput
                bgLabel={`${dashboard ? "bg-gray-100" : "bg-white"}`}
                value={state.rentFrom}
                onChange={(date) => {
                  dispatch({
                    type: "update",
                    payload: {
                      rentFrom: date,
                    },
                  });
                }}
                label="Rent From"
              />
              {/* <Input
                label="Rent To"
                name="rentTo"
                value={state.rentTo}
                type="date"
                onChange={handleChange}
                bgLabel="bg-gray-100"
              /> */}
              <DateInput
                bgLabel={`${dashboard ? "bg-gray-100" : "bg-white"}`}
                value={state.rentTo}
                onChange={(date) => {
                  dispatch({
                    type: "update",
                    payload: {
                      rentTo: date,
                    },
                  });
                }}
                label="Rent To"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8">
              <Dropdown
                defaultTitle="Rent Paid On"
                onChange={(value) => {
                  dispatch({
                    type: "update",
                    payload: {
                      rentPaidOn: value,
                    },
                  });
                }}
                value={state.rentPaidOn}
                bgTransparent={dashboard ? true : false}
              >
                {days.map((day, index) => (
                  <DropdownItem key={index} value={day.value}>
                    {day.label}
                  </DropdownItem>
                ))}
              </Dropdown>

              <Dropdown
                defaultTitle="Payment Mode"
                onChange={(value) => {
                  dispatch({
                    type: "update",
                    payload: {
                      paymentMode: value,
                    },
                  });
                }}
                value={state.paymentMode}
                bgTransparent={dashboard ? true : false}
              >
                {paymentOptions.map((option, index) => (
                  <DropdownItem key={index} value={option.value}>
                    {option.label}
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>
            <div className="flex gap-4 justify-start mt-4">
              {otpSent || isLoggedIn ? (
                <Button type="submit" className="btn" loading={submitting}>
                  Submit
                </Button>
              ) : (
                <Button type="submit" className="btn" loading={otpLoading}>
                  Send OTP
                </Button>
              )}
              <Button color="secondary" type="reset">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </Container>
      </div>
    </div>
  </>;
};
