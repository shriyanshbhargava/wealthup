"use client";

import { BsInfoCircle, BsPerson } from "react-icons/bs";
import {
  FaCheck,
  FaCheckCircle,
  FaCopy,
  FaFilePdf,
  FaHeart,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import {
  MdAccountBalance,
  MdAccountCircle,
  MdPeople,
  MdSms,
} from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";

import { EmailApi } from "@/api/services/notification/EmailApi";
import Image from "next/legacy/image";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { ProfileContext } from "@/components/DashboardLayout";
import Storage from "@/utils/storage";
import { UploadCASForm } from "@/components/MyAccount/Portfolio/components/UploadModal";
import { UserApi } from "@/api/services/user/UserApi";
import styles from "./ProgressTab.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { whatsappHelpLink } from "@/utils/constants";

const TASKS_WITH_DESCRIPTION = [
  { task: "", description: "Sign up on the platform to earn reward points" },
  { task: "Take WealthoMeter", description: "Take Wealthometer to earn reward points" },
  {
    task: "Share your CAS", description: (
      <>
        <p className="text-xl">Upload your latest CAS to earn reward points:</p>
        <UploadCASForm />
      </>
    )
  },
  {
    task: "Complete Your Profile (*)", description: (
      <p className="text-xl">
        Complete * marked items in <Link href="profile" className="underline">
          &quot;My Profile&quot;
        </Link> section to earn reward points
      </p>
    )
  },
  { task: "Check RiskoMeter", description: "Check your RiskoMeter to earn reward points" },
  { task: "Take FinknowMeter", description: "Check your FinknowMeter level to earn reward points" },
  {
    task: "Buy Life Insurance", description:
      <div>
        <p>Take life insurance from Wealthup to earn reward points based on the premium paid:</p>
        <table className="w-full">
          <thead>
            <th>Life Insurance (Net of tax)</th>
            <th className="text-right">New</th>
            <th className="text-right">Renewal</th>
          </thead>
          <tbody>
            <tr>
              <td>Upto 25,000</td>
              <td className="text-right">2,000</td>
              <td className="text-right">500</td>
            </tr>
            <tr>
              <td>25,000 - 50,000</td>
              <td className="text-right">4,000</td>
              <td className="text-right">1,000</td>
            </tr>
            <tr>
              <td>50,000+</td>
              <td className="text-right">7,000</td>
              <td className="text-right">1,500</td>
            </tr>
          </tbody>
        </table>
      </div>
  },
  {
    task: "Increase your life insurance cover", description:
      <div>
        <p>Take life insurance from Wealthup to earn reward points based on the premium paid:</p>
        <table className="w-full">
          <thead>
            <th>Life Insurance (Net of tax)</th>
            <th className="text-right">New</th>
            <th className="text-right">Renewal</th>
          </thead>
          <tbody>
            <tr>
              <td>Upto 25,000</td>
              <td className="text-right">2,000</td>
              <td className="text-right">500</td>
            </tr>
            <tr>
              <td>25,000 - 50,000</td>
              <td className="text-right">4,000</td>
              <td className="text-right">1,000</td>
            </tr>
            <tr>
              <td>50,000+</td>
              <td className="text-right">7,000</td>
              <td className="text-right">1,500</td>
            </tr>
          </tbody>
        </table>
      </div>
  },
  {
    task: "Buy Health Insurance", description:
      <div>
        <p>Take health insurance from Wealthup to earn reward points based on the premium paid:</p>
        <table className="w-full">
          <thead>
            <th>Health Insurance Premium (Net of tax)</th>
            <th>New/Renewal</th>
          </thead>
          <tbody>
            <tr>
              <td>Upto 10,000</td>
              <td className="text-right">800</td>
            </tr>
            <tr>
              <td>10,000 - 25,000</td>
              <td className="text-right">1,500</td>
            </tr>
            <tr>
              <td>25,000 - 50,000</td>
              <td className="text-right">3,000</td>
            </tr>
            <tr>
              <td>50,000+</td>
              <td className="text-right">5,000</td>
            </tr>
          </tbody>
        </table>
      </div>
  },
  {
    task: "Open Investment Account", description: (
      <p className="text-xl">
        Open a free investment account with Wealthup&apos;s partner (NJ E-Wealth) <a href="http://p.njw.bz/20631" target="_blank" rel="noreferrer" className="underline">here</a> to earn reward points.
      </p>
    )
  },
  { task: "First Mutual Fund Investment", description: "Make your first investment via Wealthup to earn reward points" },
  { task: "For Every Rs. 10,000 Investment", description: "Earn 5 reward points per month for every Rs. 10,000 investment via Wealthup" },
  {
    task: "Tax Filing", description: (
      <p className="text-xl">
        File income tax return via Wealthup to earn reward points. Share your details <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeFrpZBvIJFhLcnQwijZ0PaLP1hStwTUE5QEejharB5_rJUjQ/viewform" className="underline">here.</a>
      </p>
    )
  },
  { task: "Refer a Friend", description: "Earn vouchers from your favourite brands like Myntra, Swiggy, Dominos, etc." }
]

export const getIcon = (icon: string) => {
  icon = icon.toLowerCase();
  if (icon == "star") {
    return <FaStar />;
  } else if (icon == "shield") {
    return <FaShieldAlt />;
  } else if (icon == "sms") {
    return <MdSms />;
  } else if (icon == "heart") {
    return <FaHeart />;
  } else if (icon == "group") {
    return <MdPeople />;
  } else if (icon == "document") {
    return <FaFilePdf />;
  } else if (icon == "account") {
    return <MdAccountCircle />;
  } else if (icon == "user") {
    return <BsPerson />;
  } else if (icon == "investment") {
    return <MdAccountBalance />;
  } else {
    return <FaCheckCircle />;
  }
};

const TASK_UPTO = ["Buy Life Insurance", "Buy Health Insurance"];
const UNDERLINE_TEXTS = ["Buy Life Insurance", "Open Investment Account"]

const getPage = (
  push: any,
  page: string,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
) => {
  page = page.toLowerCase();
  if (page === "popup") {
    setShowPopup(true);
  } else if (page === "profile") {
    return push("/myaccount/profile");
  } else if (page === "finlit") {
    return push("/myaccount/finlit");
  } else if (page === "riskprofile") {
    return push("/myaccount/riskometer");
  } else if (page === "investments") {
    return push("/myaccount/investments");
  } else if (page === "tax") {
    return push("/myaccount/tax");
  } else if (page === "playstore") {
    return push("https://play.google.com/store/apps/details?id=com.wealthup.wealthupapp")
  }
};

export const ProgressTab = () => {
  const [tasks, setTasks] = React.useState<
    Array<{
      title: string;
      coins: number;
      icon: string;
      page: string;
    }>
  >([]);

  const tokens = Storage.getToken()!;
  const userApiClient = new UserApi(tokens.access_token);

  React.useEffect(() => {
    (async () => {
      const res: Response = await userApiClient.getTasks();

      if (res.status === 200) {
        const data = await res.json();
        setTasks(data);
      }
    })();
  }, []);
  return (
    <>
      <section className="pl-6 pr-4 md:px-10 py-12">
        <div className={[styles.timeline, 'before:left-0 md:before:left-1/2 md:before:-translate-x-1/2'].filter(Boolean).join(' ')}>
          <div className={[styles.container, 'flex flex-col items-end w-full'].filter(Boolean).join(' ')}>
            {tasks.map((task, index) => (
              <Item
                task={task}
                key={index}
                className={(index + 1) % 2 === 0 ? "float-right" : ""}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="fixed flex z-10 bottom-28 lg:bottom-5 right-2">
        <div className="px-3 py-1 md:py-2 rounded-full bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200">
          <a href={whatsappHelpLink} className="flex items-center gap-2" >
            <p className="text-xs md:text-sm text-white mb-0 leading-tight">To fix your finances</p>
            <div className="cursor-pointer">
              <Image
                src="/assets/img/whatsapp.png"
                alt="Whatsapp Logo"
                width={40}
                height={40}
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

const Item: React.FC<{
  className?: string;
  task: {
    title: string;
    coins: number | null;
    icon: string;
    page: string;
    details?: string;
  };
}> = ({ className, task }) => {
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [showInfoPopup, setShowInfoPopup] = React.useState<boolean>(false);

  const { push } = useRouter();

  return (
    <>
      <div className={`${styles.timeline_item} py-2 w-[90%] md:w-full`}>
        <div
          className={[
            styles.timeline_img,
            `flex items-center justify-center text-white text-2xl -ml-[20px] ${task.coins === null ? 'mt-0 md:mt-1' : 'mt-4 md:mt-[25px]'} md:-ml-[25px] left-0 md:left-1/2 h-[50px] w-[50px]`,
          ].join(" ")}
        >
          {getIcon(task.icon)}
        </div>
        <div
          className={
            "content relative w-full md:w-[45%] px-2 md:px-8 py-3 rounded-md bg-white shadow-large hover:shadow-xl " +
            styles.timeline_card +
            " " +
            className
          }
        >
          <div className="flex flex-col justify-center px-4 py-3">
            {/* <span className="flex-shrink-0 block w-8 md:w-12 h-8 md:h-12 rounded-full bg-primary-new"></span> */}
            <p
              className={`flex items-center gap-2 capitalize text-lg md:text-2xl mb-0 font-robo font-medium cursor-pointer ${UNDERLINE_TEXTS.includes(task.title) ? 'hover:underline hover:text-primary' : ''}`}
              onClick={() => getPage(push, task.page, setShowPopup)}
            >
              {task.title}
              {task.coins === null && (
                <BsInfoCircle
                  className="cursor-pointer"
                  onClick={() => setShowInfoPopup(true)}
                />
              )}
            </p>
            {task.coins !== null && (
              <span className="text-secondary flex items-center gap-4">
                {task.page === "popup_referral" ? (
                  "Earn vouchers from your favourite brands"
                ) : (
                  <>
                    Earn {TASK_UPTO.includes(task.title) ? 'upto' : null} {task.coins.toLocaleString("en-IN")} reward points {task.title === "For Every Rs. 10,000 Investment" && 'monthly'}
                  </>
                )}
                <BsInfoCircle
                  className="cursor-pointer"
                  onClick={() => setShowInfoPopup(true)}
                />
              </span>
            )}
          </div>
        </div>
      </div>
      <ContactModal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        taskName={task.title}
      />
      <InfoModel
        open={showInfoPopup}
        onClose={() => setShowInfoPopup(false)}
        description={task?.details ?? TASKS_WITH_DESCRIPTION.find(elm => elm.task === task.title)?.description ?? ""}
        title={task.title}
      />
    </>
  );
};

const ContactModal: React.FC<{
  open: boolean;
  onClose: () => void;
  taskName: string;
}> = ({ open, onClose, taskName }) => {
  const { user } = React.useContext(ProfileContext);

  const handleSubmit = async () => {
    const emailApiClient = new EmailApi();

    await emailApiClient.sendMail({
      email: ["ankit@wealthup.me", "medha@wealthup.me"],
      subject: `Request for ${taskName}`,
      body: `${user?.first_name ? user?.first_name : "User"
        } with phone number ${user!.phone
        } wants to complete the task ${taskName}`,
    });

    toast.success("we will contact you soon", {
      hideProgressBar: true
    });

    onClose();
  };

  return (
    <Modal show={open} onClose={onClose} title="Request a callback at">
      <p className="text-xl">{user!.phone}</p>
      <div className=" sm:flex sm:flex-row-reverse ">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex w-full justify-center border border-transparent bg-white rounded-full px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Ok
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const InfoModel: React.FC<{
  open: boolean;
  onClose: () => void;
  description: string | React.ReactNode;
  title: string;
}> = ({ open, onClose, description, title }) => {
  const [copied, setCopied] = useState(false);

  const { user } = useContext(ProfileContext);
  const link = `https://www.wealthup.me?ref=${user?.token}`

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCopied(false);
    }, 500);

    return () => clearInterval(interval);
  }, [copied])

  return (
    <Modal show={open} onClose={onClose} title={title}>
      {typeof description === 'string' ? (
        <p className="text-xl">{description}</p>
      ) : description}
      {title === "Refer a Friend" && (
        <div className="mb-4 flex px-2 justify-between bg-gray-100 text-black rounded-lg items-center h-10">
          <span className="py-2 text-sm text-truncate">{link}</span>
          <button onClick={handleCopyReferral} className="bg-gray-700 p-1 w-8 h-8 flex justify-center items-center rounded-md text-white hover:bg-gray-900 ml-2">
            {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
          </button>
        </div>
      )}
      <div className=" sm:flex sm:flex-row-reverse ">
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
