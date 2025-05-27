import { Button } from "@/components/ui/Button";
import { EmailApi } from "@/api/services/notification/EmailApi";
import Input from "@/components/ui/Input";
import { OTPApi } from "@/api/services/auth/OTPApi";
import PhoneInput from "@/components/ui/PhoneInput";
import React from "react";
import { adminUrl } from "@/utils/constants";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ReferForm: React.FC<{ bg?: string }> = ({ bg }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [otpLoading, setOtpLoading] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [phoneInputClicked, setPhoneInputClicked] =
    React.useState<boolean>(false);
  const [firstNameInputClicked, setFirstNameInputClicked] =
    React.useState<boolean>(false);
  const [emailInputClicked, setEmailInputClicked] = React.useState<boolean>(false);
  const [messageInputClicked, setMessageInputClicked] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  React.useEffect(() => {
    validate(state);
  }, [state]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setErrors({});
    validate(state, async (errors) => {
      if (!errors.length) {
        const res = await fetch(`https://api.wealthup.me/api/v1/referrer`, {
          body: JSON.stringify({
            ...state,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        });
        setSubmitting(true);
        if (res.status === 200) {
          setSubmitted(true);
        } else {
          toast.error(
            "There was a problem submitting your request. Please check your submission and try again, or email us directly."
          );
        }
      }
    });
  };

  const validate = (
    state: any,
    callback?: (errors: string[]) => void,
    condition?: "click"
  ) => {
    let nameClicked = firstNameInputClicked;
    let emailClicked = emailInputClicked;
    let phoneClicked = phoneInputClicked;
    let messageClicked = messageInputClicked;

    if (condition && condition === "click") {
      nameClicked = true;
      emailClicked = true;
      phoneClicked = true;
      messageClicked = true;
    }

    const allErrors = [];
    if (nameClicked && !state.name.length) {
      allErrors.push("name");
      setErrors((errors) => {
        return { ...errors, name: "Name is required" };
      });
    } else if (nameClicked && /\d/g.test(state.firstName)) {
      allErrors.push("name");
      setErrors((errors) => {
        return {
          ...errors,
          name: "Name should only contain letters",
        };
      });
    } else {
      setErrors((errors) => {
        return { ...errors, name: "" };
      });
    }

    if (
      emailClicked &&
      !String(state.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      allErrors.push("email");
      setErrors((errors) => {
        return { ...errors, email: "Enter a valid email address" };
      });
    } else {
      setErrors((errors) => {
        return { ...errors, email: "" };
      });
    }

    if (phoneClicked && state.phone.length < 10) {
      allErrors.push("phone");
      setErrors((errors) => {
        return { ...errors, phone: "Phone number should contain 10 digits" };
      });
    } else {
      setErrors((errors) => {
        return { ...errors, phone: "" };
      });
    }

    if (typeof callback === "function") {
      callback(allErrors);
    }
  };

  const OTPApiClient = new OTPApi();

  const sendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    validate(
      state,
      async (errors) => {
        if (errors.length) {
          toast.error("All fields are required");
        } else {
          setOtpLoading(true);
          const body = JSON.stringify({
            phone: state.phone.replaceAll("+", ""),
          });

          try {
            const res: Response = await OTPApiClient.sendOTP(body);
            setOtpLoading(false);

            if (res.status === 200) {
              setOtpSent(true);
              toast.success("OTP send successfully");
            } else {
              toast.error("Somethig went wrong while sending OPT");
            }
          } catch (err) {
            console.log(err);
            setOtpLoading(false);
            toast.error("Something went wrong while sending OTP");
          }
        }
      },
      "click"
    );
  };

  const verifyOTPAndSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubmitting(true);
    e.preventDefault();
    const body = JSON.stringify({
      phone: state.phone.replaceAll("+", ""),
      otp: state.otp,
    });
    try {
      const response: Response = await OTPApiClient.verifyOTP(body);

      if (response.status === 200) {
        const json = await response.json();
        if (json.status === "verified") {
          handleSubmit(e);
        } else if (json.status === "invalid") {
          setSubmitting(false);
          toast.error("Invalid OTP try again.");
        } else if (json.status === "expired") {
          setSubmitting(false);
          toast.error("This OTP has expired");
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

  return (
    <>
      {submitted && (
        <div className="">
          <h3>Thank you</h3>
        </div>
      )}
      {!submitted && (
        <form className="w-full flex items-center justify-center">
          <div
            className={`flex w-full mt-6 md:mt-0 flex-col ${bg ? "" : "md:w-3/4"
              } mb-6`}
          >
            <h2 className="mb-4 text-base md:text-2xl text-primary-black leading-tight" data-wow-delay="0.3s">Join the waitlist for our referral program</h2>
            <p className="mb-2 text-sm md:text-xl text-primary-black">Benefits of joining the program:
            </p>
            <p className="mb-2 text-sm md:text-lg text-primary-black">1. Build passive income for yourself - Get paid on every transaction your referee makes - FOR LIFE!</p>
            <p className="mb-2 text-sm md:text-lg text-primary-black">2. Get this money straight into your bank account or convert it into crypto, gold, mutual funds etc.</p>
            <Input
              placeholder="Name *"
              name="name"
              autoComplete="name"
              label="Name"
              required
              value={state.name}
              onClick={() => setFirstNameInputClicked(true)}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              value={state.email}
              onClick={() => setEmailInputClicked(true)}
              onChange={handleChange}
              error={errors.email}
            />
            {otpSent ? (
              <div className="flex flex-col lg:flex-row lg:gap-5 w-auto items-start justify-between">
                <div className="w-full lg:w-3/4">
                  <Input
                    placeholder="OTP"
                    name="otp"
                    label="OTP"
                    type="number"
                    autoComplete="one-time-code"
                    value={state.otp}
                    onChange={handleChange}
                  // error={errors.otp}
                  />
                  <p className="font-robo font-normal">
                    Didn&apos;t receive code?{" "}
                    <span
                      className="font-bold text-blue-700 underline cursor-pointer"
                      onClick={sendOTP}
                    >
                      Request again
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <Button
                    onClick={verifyOTPAndSubmit}
                    loading={submitting}
                    custom
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row lg:gap-5 w-auto items-start justify-between">
                <div className="w-full">
                  <PhoneInput
                    required
                    error={errors.phone}
                    value={state.phone}
                    onClick={() => setPhoneInputClicked(true)}
                    onChange={(value) => {
                      dispatch({
                        type: "update",
                        payload: {
                          phone: value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="flex-shrink-0 h-full mt-3">
                  <Button onClick={sendOTP} loading={otpLoading} custom>
                    Send OTP
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
};
