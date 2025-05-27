'use client';

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Storage from "@/utils/storage";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    Storage.removeToken();
    router.push("/login");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <svg
        className={`animate-spin text-button h-8 w-8`}
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        viewBox="0 0 24 24"
      >
        <path
          fill="black"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}