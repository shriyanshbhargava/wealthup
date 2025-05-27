"use client"

import { ReactNode, useEffect, useState } from "react";
import { FeedBackForm, FeedbackProvider } from "@/components/FeedBack";
import { SidebarProvider } from '@/components/ui/Sidebar/sidebar-context';
import { ToastContainer } from './toast-container';
import { useRouter } from "next/navigation"; // Changed from next/router
import Storage from "@/utils/storage";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  const router = useRouter();

  // Your client-side effects and state logic can go here
  useEffect(() => {
    // Your referral code logic
  }, []);

  return (
    <FeedbackProvider.Provider value={{ show, setShow }}>
      <SidebarProvider>
        <div className="font-sans"> {/* Changed from body to div */}
          {isOpen && <FeedBackForm onClose={() => setIsOpen(false)} />}
          {children}
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5MF3NPV" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} 
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <ToastContainer />
        </div>
      </SidebarProvider>
    </FeedbackProvider.Provider>
  );
}