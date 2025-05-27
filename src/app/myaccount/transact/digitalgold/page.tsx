"use client";

import React, { useEffect, useState, useRef } from "react";
import Storage from "@/utils/storage";
import { AuthApi } from "@/api/services/auth/AuthApi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";

type User = {
  _id: string | null;
  calls_booked: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  dob: string | null;
  coins: string | null;
  cas_updated_at: string | null;
  sub_end_date: string | null;
  tier: "gold" | "base" | "silver" | null;
  subscriptionStatus: "active" | "inactive" | null;
  token: string | null;
};


export default function Page() {
  const pathname = usePathname();
  const demo = pathname?.includes("demo");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const IFRAME_URL = "https://wealthup.augmont.com/buy";
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [user, setUser] = useState<User>(initialUser);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const redirectToLogin = () => {
    const pathname = window.location.pathname;
    window.location.href = `/login?next=${pathname}`;
  };

  const getUser = async () => {
    try {
      const token = Storage.getToken();
      if (token != null) {
        const authApiClient = new AuthApi(token.access_token);
        const res: Response = await authApiClient.me();

        if (res.status !== 200) {
          Storage.removeToken();
          if (!demo) {
            redirectToLogin();
          }
        } else {
          const json = await res.json();
          setUser(json);
        }
      } else {
        Storage.removeToken();
        if (!demo) {
          redirectToLogin();
        }
      }
    } finally {
      setIsAuthChecked(true);
    }
  };

  useEffect(() => {
    // Start authentication check immediately
    getUser();

    // Preload the iframe content
    const preloadIframe = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        await fetch(IFRAME_URL, {
          method: "GET",
          mode: "no-cors",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        setIsIframeReady(true);
      } catch (error) {
        console.warn("Iframe preload failed, falling back to direct load");
        setIsIframeReady(true);
      }
    };

    preloadIframe();

    return () => {
      // Cleanup if component unmounts
      setIsIframeReady(false);
    };
  }, []);

  if (demo) {
    return <div>Demo mode not available</div>;
  }

  if (!isAuthChecked) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <>
      <HeaderNav
        showBtn={true}
        showNotification={true}
        whatsapp={false}
        beta={false}
        title="Digital Gold"
      />
      <Head>
        {/* Preconnect to iframe domain */}
        <link rel="preconnect" href="https://wealthup.augmont.com/buy" />
        <link rel="dns-prefetch" href="https://wealthup.augmont.com/buy" />
      </Head>

      <div className="w-full bg-[#FBFBF6] min-h-screen">
        <div className="px-10">
          <div>
            {/* <p className="text-[#565656] font-semibold text-base sm:text-[6px] md:text-[1.25rem]">
              Digital Gold Investment
            </p> */}
            <div className="flex gap-4">
              <Link
                href="/myaccount/transact/mutualfunds"
                className="text-white text-base sm:text-[6px] md:text-[18px] bg-gray-500 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
              >
                Mutual Funds
              </Link>
              <Link
                href="/myaccount/transact/invoicediscounting"
                className="text-white text-base sm:text-[6px] md:text-[18px] bg-gray-500 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
              >
                Invoice Discounting
              </Link>
              <Link
                href="/myaccount/transact/digitalgold"
                className="text-white text-base sm:text-[6px] md:text-[18px] bg-green-800 w-fit py-1 px-4 my-2 md:my-8 rounded-full font-semibold"
              >
                Digital Gold/Silver
              </Link>
            </div>

            <div className="w-full h-[800px] rounded-lg overflow-hidden relative bg-white">
              {isIframeReady && (
                <iframe
                  ref={iframeRef}
                  src={IFRAME_URL}
                  className="w-full h-full border-0"
                  title="Digital Gold/Silver"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const initialUser: User = {
  _id: null,
  calls_booked: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  city: null,
  dob: null,
  coins: null,
  cas_updated_at: null,
  sub_end_date: null,
  tier: null,
  subscriptionStatus: null,
  token: null,
};
