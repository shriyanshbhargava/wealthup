// "use client"

// import '@/styles/newstyles.css'
// import "react-toastify/dist/ReactToastify.css";

// import React, { useEffect } from 'react';
// import { Slide, ToastContainer } from "react-toastify";
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// import Footer from '@/components/ui/footer';
// import {Sidebar as SidebarMobile}  from '@/components/ui/Sidebar'
// import Storage from '@/utils/storage';
// import { useSidebarContext } from '@/components/ui/Sidebar/sidebar-context';

// const DashboardLayout = ({children}) => {
//   const { isCollapsed } = useSidebarContext();
//   const { push } = useRouter();
//   const pathname = usePathname();
//   const query = useSearchParams()

//   const [newDash, setNewDash] = React.useState(false)

//   useEffect(() => {
//     if (query.get('ref')) {
//       Storage.storeReferral(query.get('ref'));
//     }

//   }, [query]);
  
//   return (
//     <section className='flex w-full layout-gradient overflow-clip'>
//       {
//         pathname === ("/demo/transact/invoicediscounting") || pathname === ("/demo/transact/mutualfunds")  ?
//         <div>
//         {children}
//         </div>
//         :
//       <>
//         <div className='hidden lg:block'>
//           <SideBar />
//         </div>
//         <div className='lg:hidden'>
//           <SidebarMobile />
//         </div>
//         <div className={`grow text-primary-blue ${isCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[250px]'} w-full`}>
//         {!newDash && pathname !== ("/demo/goals") && pathname !== ("/demo/transaction-history")  && <HeaderNav 
//           showBtn={false}
//           showNotification={true} 
//           whatsapp={false}
//         />}
//           {children}
//           <Footer />
//         </div>
//         <ToastContainer position="bottom-center" transition={Slide} />
//         </>
// }
//     </section>
//   )
// }

// export default DashboardLayout