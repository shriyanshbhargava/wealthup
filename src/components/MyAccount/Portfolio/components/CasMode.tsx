import React, { useContext, useEffect, useState } from "react";

import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { ProfileContext } from "@/components/DashboardLayout";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { toast } from "react-toastify";
import { whatsappLink } from "@/utils/constants";

export const CASModal: React.FC<{
  onClose: () => void;
  open: boolean;
  casNotUploded: boolean;
}> = ({ onClose, open, casNotUploded }) => {
  const [status, setStatus] = useState<"yes" | "no" | "">("");
  const [updateCasStatus, setUpdateCasStatus] = useState<"yes" | "no">("no");
  const [trackStatus, setTrackStatus] = useState<"yes" | "no">("no");
  const [showAfterEmail, setShowAfterEmail] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useContext(ProfileContext);

  const updateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tokens = Storage.getToken()!;
    const userClientApi = new UserApi(tokens.access_token);

    const res: Response = await userClientApi.updateMe({ email });

    if (res.status === 201) {
      toast.success("Email updated successfully");
      setShowAfterEmail(true);
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Modal onClose={onClose} show={open}>
      {casNotUploded ? (
        <>
          {trackStatus === "yes" ? (
            <>
              {status === "yes" ? (
                <p className="text-2xl">
                  Forward the latest email with CAS to{" "}
                  <a
                    className="text-blue-500 underline"
                    href="mailto:docs@wealthup.me"
                  >
                    docs@wealthup.me
                  </a>{" "}
                  along with the password{" "}
                </p>
              ) : status === "no" ? (
                <p className="text-2xl">
                  Schedule a call with us using this link xxx
                </p>
              ) : (
                <>
                  {user?.email || showAfterEmail ? (
                    <>
                      <p className="text-2xl">
                        Do you have CAS in your primary mailbox?
                      </p>
                      <div className="sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          onClick={() => setStatus("yes")}
                          className="inline-flex w-full justify-center border border-transparent bg-white rounded-full px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setStatus("no")}
                        >
                          No
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl">Enter your primary email ID</p>
                      <form onSubmit={updateEmail}>
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
                        <button
                          type="submit"
                          className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Submit
                        </button>
                      </form>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <p className="text-2xl">
                Do you want to track all your investments automatically?
              </p>
              <div className="sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setTrackStatus("yes")}
                  className="inline-flex w-full justify-center border border-transparent bg-white rounded-full px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {updateCasStatus === "yes" ? (
            <p className="text-2xl">
              Update your CAS by uploading it here on the page or sending the
              CAS along with its password to docs@wealthup.me
            </p>
          ) : (
            <>
              <p className="text-2xl">Do you want to update your CAS?</p>
              <div className="sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setUpdateCasStatus("yes")}
                  className="inline-flex w-full justify-center border border-transparent bg-white rounded-full px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

// When i come to this tab,
// - Check if CAS has ever been uploaded
//     - If yes, check if i updated my CAS less one month ago.
// 		— If yes, then no popup
// 		— If no, then show pop - “Do you want to update your CAS” - Give “Yes” or “No” as options
// 			— If yes, show “Update your CAS by uploading it here or sending the CAS along with its password to docs@wealthup.me”
// 			— If no, pop disappears
// 	— If no, show “Do you want to track all your investments automatically?”
// 		— If yes, “Do you have CAS in your primary email?”
// 			— If yes, “Share your latest CAS by uploading it here or sending the CAS along with its password to docs@wealthup.me”
// 			— If no, “Contact us to get help in accessing your CAS”
// 		— If no, pop disappears
