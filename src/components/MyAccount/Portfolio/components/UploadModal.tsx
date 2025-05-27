import React, { createRef, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { BiArrowBack } from "react-icons/bi";
import Input from "@/components/ui/Input";
import { MdClose } from "react-icons/md";
import Modal from "@/components/ui/Modal";
import Popup from "@/components/ui/popup";
import { ProfileContext } from "@/components/DashboardLayout";
import { Spinner } from "@/components/ui/Spinner";
import StepLoader from "@/components/ui/stepLoader";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { differenceInCalendarDays } from 'date-fns';
import { toast } from "react-toastify";

export const UploadModal: React.FC<{ investment?: boolean; open: boolean; onClose: () => void; setFetchAgain: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  open,
  onClose,
  setFetchAgain,
  investment
}) => {
  const { user } = useContext(ProfileContext)!;

  const [email, setEmail] = useState<string | null>(user?.email ?? null);
  const [pan, setPan] = useState<string>("");
  const [panWithMask, setPanWithMask] = useState<string>("");
  const [userId, setUserId] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [pekrn, setPekrn] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [otp, setOtp] = useState<string>("");

  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [detailCas, setDetailCas] = useState<boolean>(false);

  const ref = createRef<HTMLInputElement>();
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const tokens = Storage.getToken();
  //   const userApiClient = new UserApi(tokens!.access_token);

  //   (async () => {
  //     try {
  //       // Fetch user data without relying on sensitive data API
  //       const meRes: Response = await userApiClient.getMe();
  //       const userRes: Response = await userApiClient.getAuthMe();

  //       if (userRes.ok) {
  //         const me = await userRes.json();
  //         // Set PAN if available
  //         if (me?.PAN) {
  //           setPan(me.PAN);
  //         }
          
  //         // Set mobile number if available
  //         if (me?.phone?.length === 12) {
  //           const updatedPAN = me.phone.slice(2);
  //           setMobile(updatedPAN);
  //         }
  //       }

  //       if (meRes.ok) {
  //         const me = await meRes.json();
  //         setUserId(me._id)
  //       }

  //       // Optional: Sensitive data API call with error handling
  //       try {
  //         const res: Response = await userApiClient.getSensitiveData();
  //         if (res.status === 200) {
  //           const body = await res.json();
            
  //           if (body.pan) {
  //             let maskedPan = body.pan.split("").fill("*", 0, 6).join("");
  //             setPanWithMask(maskedPan);
  //           }
  //         }
  //       } catch (sensitiveErr) {
  //         console.warn("Could not fetch sensitive data:", sensitiveErr);
  //         // Optionally set a default masked PAN or skip
  //         setPanWithMask("******XXXX");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //       toast.error("Could not load user information");
  //     }
  //   })();
  // }, []);

  const resetStates = () => {
    setEmail(user?.email ?? null);
    setPan("");
    setPanWithMask("");
    setUserId("");
    setMobile("");
    setPekrn("");
    setFromDate("");
    setToDate("");
    setOtp("");
    setFiles(null);
    setLoading(false);
    setOtpSent(false);
    setShowInfo(false);
  };

  const handleSubmitCas = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(false);
    setLoading(true);
    if (!pan || !mobile || (detailCas && (!fromDate || !toDate))) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    if (user?.cas_updated_at) {
      const differenceInDays = differenceInCalendarDays(
        Date.now(),
        Date.parse(
          user?.cas_updated_at
        )
      )

      if (differenceInDays <= 30) {
        toast.error('Only one CAS can be uploaded in a month')
        setLoading(false);
        return;
      }
    }

    console.log("Uploading...");

    if (pan?.length) {
      const data = {
        pan: pan.toUpperCase(),
        pekrn: '',
        mobile: mobile,
        email: '',
        detailCas: detailCas,
        fromDate: detailCas ? fromDate : undefined,
        toDate: detailCas ? toDate : undefined
      };

      console.log(JSON.stringify(data))
      try {
        const res = await fetch("https://api.wealthup.me/api/v1/casRequest/casRequest", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200) {
          toast.success("OTP sent to your mobile. Please verify.");
          setOtpSent(true);
          setLoading(false);
        } else {
          const json = await res.json();
          toast.error(json.error ?? "Something went wrong.");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoadingSubmit(true)

    const data = {
      mobile: mobile,
      enteredOtp: otp,
      detailCas: detailCas
    };

    try {
      const res = await fetch("https://api.wealthup.me/api/v1/casRequest/validateOtp", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("CAS document fetched successfully.");
        setFetchAgain(true);
        setLoading(false);

        if (pathname?.includes('/myaccount/mutualfundanalyser ') || investment) {
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        } else {
          router.push('/myaccount/mutualfundanalyser ');
        }

        onClose();
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Something went wrong.");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handlePanClick = () => {
    setPanWithMask(pan);
  };
  const handleMobileClick = () => {
    setMobile(mobile);
  };
  const handleFromDateClick = () => {
    setFromDate(fromDate);
  };
  const handleToDateClick = () => {
    setToDate(toDate);
  };
  const handleToggle = () => {
    setDetailCas(!detailCas);
  };
  const handleChangePan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPan(e.target.value);
    setPanWithMask(e.target.value);
  };
  const handleChangeMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };
  const handleChangeFromDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };
  const handleChangeToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };
  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };


  return (
    <Modal show={open} onClose={onClose} title={loading || showInfo ? "" : "Update your mutual fund data from MF Central."} showClose={!showInfo} bg="bg-white" width="max-w-[200%]" modalClass="custom-shadow-1" textColor="text-primary-blue-dark" titleClass="font-semibold text-[19px] h-fit">
      <>
        {showInfo ? (
          <div>
            <BiArrowBack className="cursor-pointer text-2xl mb-4" onClick={() => setShowInfo(false)} />
            <p className="text-base">Search &quot;NSDL CAS&quot; or &quot;CDSL CAS&quot; in your primary email inbox, open the latest email, and download the attachment. The file is password-protected; use your PAN as the password.</p>
          </div>
        ) : (
          <>
            {loading ? (
              loadingSubmit ? (
                // Show StepLoader during OTP verification
                <div className="w-full h-full flex justify-center align-center">
                  <StepLoader />
                </div>
              ) : (
                // Show spinner and "Your report is being generated" while sending OTP
                <div className="w-full h-full flex justify-center align-center">
                  <div>
                    <p>Your report is being generated</p>
                    <div className="flex justify-center">
                      <Spinner size="8" color="white" />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-4 h-full md:h-[325.19px]">
                <form onSubmit={otpSent ? handleVerifyOtp : handleSubmitCas}>
                  {otpSent ? (
                    <>
                      <div className="flex flex-col">
                        <Input
                          type="text"
                          placeholder="OTP"
                          name="Otp"
                          label="OTP"
                          inputClass="uppercase border-primary-blue-dark"
                          focusWithin="bg-white"
                          required
                          value={otp}
                          bgLabel="bg-[#E8F8F5]"
                          color="primary-blue-dark"
                          onChange={handleChangeOtp}
                        />
                        <div className="flex-grow-0 h-full flex justify-end mt-4 mb-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#FB7306] mt-3 inline-flex w-fit h-fit justify-center rounded-md px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#FF9933] disabled:hover:bg-none"
                          >
                            {loading ? <Spinner /> : "Submit"}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {email === null || (!email?.length && (
                        <Input
                          type="email"
                          placeholder="Email"
                          name="Email"
                          label="Email"
                          value={email}
                          bgLabel="bg-primary-new"
                          color="white"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      ))}
                      <div className="flex flex-col">
                        <Input
                          type="text"
                          placeholder="PAN Number"
                          name="Pan"
                          label="PAN"
                          inputClass="uppercase border-primary-blue-dark"
                          focusWithin="bg-white"
                          required
                          onClick={handlePanClick}
                          value={pan}
                          bgLabel="bg-[#E8F8F5]"
                          color="primary-blue-dark"
                          onChange={handleChangePan}
                        />
                        <p className="text-base text-[#0B2546]">{pan?.length && !pan?.match(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/) ? "Enter a valid PAN" : ""}</p>
                      </div>
                      <div className="flex flex-col">
                        <Input
                          type="text"
                          placeholder="Phone Number"
                          name="Mobile"
                          label="Phone Number"
                          inputClass="uppercase border-primary-blue-dark p-1"
                          focusWithin="bg-white"
                          required
                          onClick={handleMobileClick}
                          value={mobile}
                          bgLabel="bg-[#E8F8F5]"
                          color="primary-blue-dark"
                          onChange={handleChangeMobile}
                        />
                        <p className="text-base text-[#0B2546]">{mobile.length && mobile.length > 10 ? "Enter a valid Mobile" : ""}</p>
                      </div>
                      <p className="text-sm">You will receive an OTP from MFCentral.</p>
                      <div className="flex-grow-0 h-full flex justify-center md:mt-20 mb-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-[#FB7306] mt-3 inline-flex w-fit h-fit justify-center rounded-md px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#FF9933] disabled:hover:bg-none"
                        >
                          {loading ? <Spinner /> : "Get OTP"}
                        </button>
                      </div>
                    </>
                  )}
                </form>
                {/* <span className="text-center my-2 text-2xl font-bold">OR</span>
              <span className="text-xl mb-2">
                Email your latest CAS along with password to{" "}
                <a href="mailto:docs@wealthup.me" className="underline">
                  docs@wealthup.me
                </a>
              </span> */}
              </div>
            )}
          </>
        )}
      </>
    </Modal>

  );
};

export const UploadCASForm = () => {
  const { user } = useContext(ProfileContext)!;

  const [email, setEmail] = useState<string | null>(user?.email ?? null);
  const [pan, setPan] = useState<string>("");
  const [panWithMask, setPanWithMask] = useState<string>("");

  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const ref = createRef<HTMLInputElement>();

  useEffect(() => {
    const tokens = Storage.getToken();
    const userApiClient = new UserApi(tokens!.access_token);

    (async () => {
      try {
        const res: Response = await userApiClient.getSensitiveData();

        if (res.status === 200) {
          const body = await res.json();

          let pan = body.pan;
          pan = pan.split("").fill("*", 0, 6).join("");

          setPan(body.pan);
          setPanWithMask(pan);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSubmitCas = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user?.cas_updated_at) {
      const differenceInDays = differenceInCalendarDays(
        Date.now(),
        Date.parse(
          user?.cas_updated_at
        )
      )

      if (differenceInDays <= 30) {
        toast.error('Only one CAS can be uploaded in a month')
        setLoading(false);
        return;
      }
    }

    console.log("Uploading...");

    if (pan?.length && files?.length) {
      var data = new FormData();
      data.append("user_id", user!._id!);
      data.append("pan", pan);
      data.append("file", files[0]);

      try {
        const res = await fetch("https://api.wealthup.me/python/upload_cas", {
          method: "POST",
          body: data,
        });

        if (res.status === 201) {
          toast.success("CAS updated sucessfully");
          setLoading(false);
        } else {
          toast.error("Something went wrong.");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const handleFilePickerClick = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handlePanClick = () => {
    setPanWithMask(pan);
  };

  const handleChangePan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPan(e.target.value);
    setPanWithMask(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmitCas}>
        {email === null ||
          (!email?.length && (
            <Input
              type="email"
              placeholder="Email"
              name="Email"
              label="Email"
              value={email}
              inputClass="uppercase border-primary-blue-dark"
              focusWithin="bg-white"
              bgLabel="bg-[#E8F8F5]"
              color="primary-blue-dark"
              onChange={(e) => setEmail(e.target.value)}
            />
          ))}
        <div className="my-4 w-full">
          <input
            className="hidden"
            type="file"
            ref={ref}
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <div
            className="flex items-center justify-between w-full bg-white rounded-xl p-4 text-secondary font-medium text-xl cursor-pointer"
            onClick={handleFilePickerClick}
          >
            {files !== null && files.length ? files[0].name : "Choose File"}
            {files !== null && (
              <MdClose
                className="cursor-pointer"
                onClick={() => setFiles(null)}
              />
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="PAN"
            name="Pan"
            label="Password"
            onClick={handlePanClick}
            value={panWithMask}
            inputClass="uppercase border-primary-blue-dark"
            focusWithin="bg-white"
            bgLabel="bg-[#E8F8F5]"
            color="primary-blue-dark"
            onChange={handleChangePan}
          />
        </div>
        <div className="flex-grow-0 h-full flex justify-end  mt-4 mb-2">
          <button
            type="submit"
            disabled={loading || !files}
            className="mt-3 inline-flex flex-grow-0 w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 disabled:hover:bg-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
