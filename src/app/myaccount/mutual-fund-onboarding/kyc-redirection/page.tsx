'use client';

import { useEffect } from "react";
import Storage from "@/utils/storage";
import axios from "axios";
import { toast } from "react-toastify";


async function checkStatus() {
    try {
        const tokens = Storage.getToken();
        const response = await axios.post('https://api.wealthup.me/api/v1/cybrilla/kyc/status', {}, {
            headers: {
                Authorization: `Bearer ${tokens?.access_token}`
            }
        });

   

        if (response.data.status === "esignNeeded") {
            window.location.href = "https://wealthup.me/esign";
            return;
        }
        else if (response.data.status === 'true') {
            window.location.href = `/myaccount/transact/mutualfunds`;
            return;
        }
        else{
            toast.error("Failed to verify KYC status. Please try again.");
            return;
        }
    } catch (error) {
        console.error("Error checking KYC status:", error);
        toast.error("Failed to verify KYC status. Please try again.");
        window.location.href = "/myaccount"; 
        return;
    }
}

export default function Page() {
    useEffect(() => {
        checkStatus(); 
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <div className="text-lg font-medium">Verifying KYC Status...</div>
            </div>
        </div>
    );
}
