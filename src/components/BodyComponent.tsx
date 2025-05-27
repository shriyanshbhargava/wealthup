import React, { useContext } from 'react'

import Footer from '@/components/ui/footer'
import { Sidebar as MobileSidebar } from "./Sidebar";
import SideBar from '@/components/ui/Sidebar'
import { useSidebarContext } from '@/components/ui/Sidebar/sidebar-context'

export const BodyComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCollapsed } = useSidebarContext() 
  return (
    <>
        <div className="hidden lg:block">
            <SideBar />
        </div>
        <div className="lg:hidden">
            <MobileSidebar />
        </div>
        <div className={`pb-8 lg:pb-0  ${isCollapsed ? 'lg:pl-[70px]': 'lg:pl-[250px]'}`}>
            <main className="flex-1 bg-gray-100">
                {children}
            </main>
            <Footer />
        </div>
    </>
  )
}
