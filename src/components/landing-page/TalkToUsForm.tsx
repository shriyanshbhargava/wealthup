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
  message: "",
  otp: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const TalkToUsForm: React.FC<{ bg?: string }> = ({ bg }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
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
        const res = await fetch(`https://admin.wealthup.me/api/talk-to-us-submission`, {
          body: JSON.stringify({
            ...state,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
        });

        try {
          const emailApi = new EmailApi();
          await emailApi.sendMail({
            email: ["ankit@wealthup.me", "medha@wealthup.me"],
            body: `${state.firstName} wants to talk to you with email: ${state.email ?? "Not Given"
              } & phone: ${state.phone}`,
            subject: "Some one wants to talk to you",
          });
        } catch (err) {
          console.log(err);
        }

        setSubmitting(true);
        if (res.status === 201) {
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

    if (messageClicked && !state.message.length) {
      allErrors.push("message");
      setErrors((errors) => {
        return { ...errors, message: "Message is required" };
      });
    } else {
      setErrors((errors) => {
        return { ...errors, message: "" };
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
          <p>
            We will reach out to the email you&apos;ve provided as soon as
            possible. We look forward to talking!
          </p>
        </div>
      )}
      {!submitted && (
        <form className="w-full">
          <div
            className={`flex w-full mt-6 md:mt-0 flex-col ${bg ? "" : "md:w-3/4"
              } mb-6`}
          >
            <Input
              placeholder="Name *"
              name="name"
              autoComplete="name"
              label="Name"
              bgLabel={`${bg ? bg : "bg-[#e8f8f5]"}`}
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
              bgLabel={`${bg ? bg : "bg-[#ecdfea]"}`}
              autoComplete="email"
              value={state.email}
              onClick={() => setEmailInputClicked(true)}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              textbox
              placeholder="Message"
              name="message"
              label="Message"
              type="text"
              bgLabel={`${bg ? bg : "bg-[#ecdfea]"}`}
              onClick={() => setMessageInputClicked(true)}
              value={state.message}
              error={errors.message}
              onChange={handleChange}
            />
            {otpSent ? (
              <div className="flex flex-col lg:flex-row lg:gap-5 w-auto items-start justify-between">
                <div className="w-full lg:w-3/4">
                  <Input
                    placeholder="OTP"
                    name="otp"
                    label="OTP"
                    type="number"
                    bgLabel={`${bg ? bg : "bg-[#ecdfea]"}`}
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
                    bgLabel={`${bg ? bg : "bg-[#ecdfea]"}`}
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
            {/* </div> */}
          </div>
          {/* <Button onClick={handleSubmit} size="bigger">
            Submit
          </Button> */}
        </form>
      )}
    </>
  );
};
