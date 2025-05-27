"use client"

import '@/styles/newstyles.css'
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from 'react';
import { Slide, ToastContainer } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/ui/footer';
import HeaderNav from '@/components/MyAccount/MutualFundsAnalyser/HeaderNav'
import SideBar from '@/components/ui/Sidebar'
import { Sidebar as SidebarMobile } from '@/components/Sidebar';
import Storage from '@/utils/storage';
import { useSidebarContext } from '@/components/ui/Sidebar/sidebar-context';

const DashboardLayout = ({children}) => {
  const { isCollapsed } = useSidebarContext();
  const { push } = useRouter();
  const pathname = usePathname();
  const query = useSearchParams()

  const [newDash, setNewDash] = React.useState(false)

  // check if user is loged in or not
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      window.location.href = `/login?next=${pathname}`;
    }

    setNewDash(pathname.includes('myaccount/new-dashboard'));
  }, [push, pathname]);

  useEffect(() => {
    if (query.get('ref')) {
      Storage.storeReferral(query.get('ref'));
    }

  }, [query]);
  
  return (
    <section className='flex w-full layout-gradient overflow-clip'>
      {
        pathname === ("/myaccount/transact/invoicediscounting") || pathname === ("/myaccount/onboarding")  ?
        <div>
        {children}
        </div>
        :
      <>
        <div className='hidden lg:block'>
          <SideBar />
        </div>
        <div className='lg:hidden'>
          <SidebarMobile />
        </div>
        <div className={`grow text-primary-blue ${isCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[250px]'} w-full`}>
        {!newDash && pathname !== ("/myaccount/goals") && pathname !== ("/myaccount/transaction-history") && pathname !== ("/myaccount/transact/mutualfunds") && pathname !== ("/myaccount/onboarding") }
          {children}
          <Footer />
        </div>
        <ToastContainer position="bottom-center" transition={Slide} />
        </>
}
    </section>
  )
}

export default DashboardLayout