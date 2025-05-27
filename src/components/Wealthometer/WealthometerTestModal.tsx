'use client'

import React, { useContext, useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import { ProfileContext } from "@/components/DashboardLayout";
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Define interfaces for type safety
interface WealthometerData {
  performance_count: number | null;
}

interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
}

interface ProfileContextType {
  user?: User;
}

const WealthometerTestModal: React.FC = () => {
  const { user } = useContext<ProfileContextType>(ProfileContext);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isCheckingTest, setIsCheckingTest] = useState<boolean>(true);

  useEffect(() => {
    checkWealthometerTest();
  }, []);

  const checkWealthometerTest = async (): Promise<void> => {
    setIsCheckingTest(true);

    try {
      const tokens = Storage.getToken();
      if (!tokens) {
        setIsCheckingTest(false);
        return;
      }

      const userApiClient = new UserApi(tokens.access_token);
      const wealthometerRes = await userApiClient.getWealthometer();

      if (wealthometerRes.ok) {
        const data: WealthometerData = await wealthometerRes.json();
        
        if (data.performance_count === null) {
          setShowModal(true);
        }
      } else {
        console.error("Failed to fetch wealthometer data:", wealthometerRes.status);
        toast.error("Failed to fetch wealthometer data");
      }
    } catch (err) {
      console.error("Error fetching wealthometer data:", err);
      toast.error("An error occurred while checking wealthometer test");
    } finally {
      setIsCheckingTest(false);
    }
  };

  const handleRedirect = (): void => {
    setLoading(true);
    router.push('/wealthometer');
  };

  const onClose = (): void => {
    setShowModal(false);
  };

  // Optional: Add a method to get initials if needed
  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.slice(0, 1)}${user.last_name.slice(0, 1)}`;
    }
    return '';
  };

  if (isCheckingTest) {
    return null; 
  }

  return (
    <Modal 
      show={showModal} 
      onClose={onClose} 
      title="Complete Your Financial Profile" 
      showClose={true}
      bg="bg-white" 
      width="max-w-[500px]" 
      modalClass="custom-shadow-1" 
      textColor="text-primary-blue-dark" 
      titleClass="font-semibold text-[19px] h-fit"
    >
      <div className="flex flex-col gap-4 h-full md:h-auto">
        <div className="flex flex-col">
          <p className="text-gray-700 mb-4">
            Take our wealthometer test to get personalized financial insights and recommendations tailored to your financial situation.
          </p>
        </div>
        <div className="flex-grow-0 h-full flex justify-end mt-4 mb-2">
          <button
            onClick={handleRedirect}
            disabled={loading}
            className="bg-[#FB7306] mt-3 inline-flex w-fit h-fit justify-center rounded-md px-8 py-3 text-base font-semibold text-white hover:bg-[#FF9933] disabled:hover:bg-none"
          >
            {loading ? <Spinner /> : "Let's take a wealthometer test"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WealthometerTestModal; 