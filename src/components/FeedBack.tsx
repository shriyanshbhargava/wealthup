"use client"

import React, { Fragment, createContext, useContext, ReactNode } from "react";
import { adminUrl, whatsappLink } from "@/utils/constants";

import { Button } from "@/components/ui/Button";
import { EmailApi } from "@/api/services/notification/EmailApi";
import Image from "next/image";
import { motion, MotionProps } from "framer-motion"; // Import MotionProps
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

export const FeedBack: React.FC<{
  onOpen: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ onOpen }) => {
  const { show } = useContext(FeedbackProvider)!;
  const pathname = usePathname();

  const dashboardRoute = pathname.includes("dashboard");

  if (!show || dashboardRoute) {
    return <Fragment></Fragment>;
  }

  return (
    <div className="fixed flex z-10 bottom-5 right-2 -rotate-90">
      <div className="rotate-90 cursor-pointer">
        <a href={whatsappLink}>
          <Image
            src="/assets/img/whatsapp.png"
            alt="Whatsapp Logo"
            width={70}
            height={70}
          />
        </a>
      </div>
      {/* <div
        className="bg-primary-dark py-2 text-xl text-white font-sans font-bold px-3 rounded-t-2xl cursor-pointer hover:bg-primary-light"
        onClick={onOpen}
      >
        Feedback
      </div> */}
    </div>
  );
};

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Define a custom MotionDiv component that properly supports children
const MotionDiv: React.FC<MotionProps & { className?: string; children: ReactNode }> = ({
  children,
  ...props
}) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export const FeedBackForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [errors, setErrors] = React.useState<{
    message?: string;
    email?: string;
  }>({});
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as typeof e.target & {
      tagName: string;
    };
    if (target.tagName === "SECTION" && typeof onClose != "undefined") {
      return onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    dispatch({
      type: "update",
      payload: {
        [target.name]: target.value,
      },
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    validate(state, async (errors) => {
      if (!errors.length) {
        const res = await fetch(
          `${adminUrl}/api/feedback-submission`,
          {
            body: JSON.stringify({
              ...state,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "post",
          }
        );

        try {
          const emailApi = new EmailApi();
          await emailApi.sendMail({
            email: ["ankit@wealthup.me", "medha@wealthup.me"],
            body: `You have received new Feedback: ${state.message} from ${state.name ?? "Unknow user"
              } `,
            subject: "New Feedback",
          });
        } catch (err) {
          console.log(err);
        }

        if (res.status === 201) {
          setSubmitted(true);
          onClose();
        } else {
          toast.error(
            "There was a problem submitting your request. Please check your submission and try again, or email us directly."
          );
        }
      }
    });
  };

  const validate = (state: any, callback: (errors: string[]) => void) => {
    const errs: string[] = [];
    if (!state.message.length) {
      errs.push("message");
      setErrors((errors) => {
        return { ...errors, message: "Message is required" };
      });
    }

    if (
      state.email.length &&
      !String(state.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errs.push("email");
      setErrors((errors) => {
        return { ...errors, email: "Enter a valid email address" };
      });
    }

    callback(errs);
  };

  // Using our custom MotionDiv component to fix the type error
  return (
    <section
      className="bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center md:block z-20 fixed h-screen w-screen"
      onClick={handleClick}
    >
      <MotionDiv
        initial={{ height: "490px" }}
        animate={{
          height:
            Object.keys(errors).length === 1
              ? "540px"
              : Object.keys(errors).length === 2
                ? "580px"
                : submitted
                  ? "320px"
                  : "490px",
        }}
        className="bg-white w-full md:w-1/4 rounded-2xl mx-6 md:mx-0 px-4 py-3 fixed md:right-12 md:top-1/2 md:bottom-1/2 md:-mt-[245px] flex flex-col"
      >
        {submitted ? (
          <div className="w-full h-full flex justify-center items-center">
            <h3>Thank you</h3>
          </div>
        ) : (
          <>
            <h1 className="text-xl md:text-3xl font-sans capitalize text-primary mb-4">
              We are listening
            </h1>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-xl font-robo">Name</label>
              <input
                type="text"
                className="border-2 rounded-lg bg-transparent px-2 py-2"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-xl font-robo">Email</label>
              <input
                type="email"
                className={`border-2 ${errors.email ? "border-red-700" : ""
                  } rounded-lg bg-transparent px-2 py-2`}
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-700">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-xl font-robo">Phone</label>
              <input
                type="number"
                className="border-2 rounded-lg bg-transparent px-2 py-2"
                placeholder="Phone"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl font-robo">
                Message <span className="text-red-800">*</span>
              </label>
              <textarea
                className={`border-2 ${errors.message ? "border-red-700" : ""
                  } rounded-lg bg-transparent px-2 py-2`}
                placeholder="Feedback"
                name="message"
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-700">{errors.message}</p>
              )}
            </div>
            <div className="flex gap-8 mt-6">
              <Button size="big" onClick={onClose}>
                Cancel
              </Button>
              <Button size="big" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </>
        )}
      </MotionDiv>
    </section>
  );
};

export const FeedbackProvider = createContext<{
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);