"use client"

import '@/styles/newstyles.css'
import "react-toastify/dist/ReactToastify.css";

import React, { ReactNode, useEffect } from 'react';
import { Slide, ToastContainer } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/ui/footer';
import HeaderNav from '@/components/MyAccount/MutualFundsAnalyser/HeaderNav'
import SideBar from '@/components/ui/Sidebar'
import { Sidebar as SidebarMobile } from '@/components/Sidebar';
import Storage from '@/utils/storage';
import { useSidebarContext } from '@/components/ui/Sidebar/sidebar-context';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { isCollapsed } = useSidebarContext();
    const { push } = useRouter();
    const pathname = usePathname();
    const query = useSearchParams()

    const [newDash, setNewDash] = React.useState(false)


    return (
        <section className='flex w-full layout-gradient overflow-clip'>
            <div className='hidden lg:block'>
                <SideBar />
            </div>
            <div className='lg:hidden'>
                <SidebarMobile />
            </div>
            <div className={`grow text-primary-blue ${isCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[250px]'} w-full`}>
                <div className='flex justify-between items-center headerDiv bg-[#00B2B266] px-8 py-2'>
                    <div className="text-[#035782] font-semibold text-[15px] lg:text-[24px]">
                        Open Account To Transact
                    </div>
                </div>
                {children}
                <Footer />
            </div>
            <ToastContainer position="bottom-center" transition={Slide} />
        </section>
    )
}

export default DashboardLayout
