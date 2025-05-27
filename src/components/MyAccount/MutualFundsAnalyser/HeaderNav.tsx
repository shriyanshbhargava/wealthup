'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { BsWhatsapp } from 'react-icons/bs';
import Button from '@/components/ui/ButtonNew';
import { IoIosNotificationsOutline } from 'react-icons/io';
import React from 'react'
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { dashboardPages } from '@/components/ui/header';
import dynamic from 'next/dynamic';
import { whatsappLink } from '@/utils/constants';
import { UploadModal } from '@/components/MyAccount/Portfolio/components/UploadModal';

const NavItemPopOver = dynamic(()=> import('../../Navbar').then((mod) => mod.NavItemPopOver),{ssr:false} );

const demoPages = [
  {
    to: "/demo/profile",
    name: "My Profile",
  },
  {
    to: "#",
    name: "Logout",
  },
]

const HeaderNav: React.FC<{
  title?: string,
  showBtn?: boolean,
  showNotification?: boolean,
  whatsapp?: boolean,
  pf?: boolean,
  beta?: boolean
}> = ({ title = "", showBtn = true, showNotification = true, whatsapp = true, pf = false, beta = true }) => {
  const [headerSolid, setHeaderSolid] = useState(false);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCasModal, setShowCasModal] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const demo = pathname?.includes('demo');

  useEffect(() => {
    (async () => {
      const tokens = Storage.getToken();
      if (tokens !== null) {
        const userApiClient = new UserApi(tokens.access_token);
        const res = await userApiClient.getMe();
        if (res.status === 200) {
          const data = await res.json();
          let initials = ''
          initials += (data?.first_name?.split('')[0] ?? '')
          initials += (data?.last_name?.split('')[0] ?? '')
          if (initials.length === 0) {
            initials = 'U'
          }
          setName(initials);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn])

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 40) {
        setHeaderSolid(true);
      } else {
        setHeaderSolid(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const renderTitle = () => {
    if (title === "My Profile") {
      return (
        <>
          My Profile
          <svg width="64" height="52" viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M42.5124 0.0078125C42.4768 2.66813 41.9357 5.29833 40.9169 7.75794C39.8623 10.304 38.3165 12.6174 36.3678 14.5661C34.4192 16.5147 32.1057 18.0605 29.5597 19.1151C27.0137 20.1697 24.285 20.7125 21.5293 20.7125L21.5293 20.7128C27.0948 20.7129 32.4324 22.9238 36.3678 26.8593C40.2582 30.7496 42.4633 36.0101 42.5134 41.5065C42.5141 41.5065 42.5147 41.5065 42.5154 41.5065C42.5655 36.0101 44.7707 30.7496 48.661 26.8593C52.5513 22.9689 57.8118 20.7638 63.3083 20.7137C63.3083 20.713 63.3083 20.7124 63.3083 20.7117C57.8104 20.6626 52.5483 18.4573 48.657 14.5661C44.7877 10.6967 42.5854 5.472 42.5124 0.0078125Z" fill="#01C8A9" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0799 22.6476L10.0956 22.6476L10.0356 22.6475L9.9759 22.6476H10.0799ZM10.0797 22.7069C10.0721 23.9777 9.81809 25.2352 9.33162 26.4096C8.83759 27.6023 8.11348 28.686 7.20063 29.5989C6.28778 30.5117 5.20408 31.2358 4.01138 31.7298C2.81887 32.2238 1.54076 32.4781 0.25 32.4782L0.250001 32.4785C2.857 32.4786 5.35719 33.5143 7.20063 35.3578C9.02294 37.1801 10.0559 39.6442 10.0795 42.2188C10.0797 42.2188 10.0798 42.2188 10.08 42.2188C10.1036 39.6442 11.1365 37.1801 12.9589 35.3578C14.7815 33.5351 17.2461 32.5021 19.8212 32.4789C19.8212 32.4785 19.8212 32.4781 19.8212 32.4777C17.2461 32.4545 14.7815 31.4215 12.9589 29.5989C11.1292 27.7692 10.0953 25.2927 10.0797 22.7069Z" fill="#01C8A9" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.6188 40.9046L27.6506 40.9046L27.5937 40.9043L27.5368 40.9046H27.618C27.618 41.6369 27.4738 42.362 27.1936 43.0385C26.9133 43.715 26.5026 44.3297 25.9848 44.8475C25.467 45.3653 24.8523 45.7761 24.1758 46.0563C23.4996 46.3364 22.7749 46.4806 22.043 46.4808L22.043 46.4809C23.5215 46.4812 24.9393 47.0686 25.9848 48.1141C27.0185 49.1477 27.6044 50.5454 27.6178 52.0058C27.6182 52.0058 27.6186 52.0058 27.619 52.0058C27.6324 50.5454 28.2184 49.1477 29.252 48.1141C30.2858 47.0803 31.6838 46.4943 33.1444 46.4811C33.1444 46.4809 33.1444 46.4807 33.1444 46.4805C31.6838 46.4673 30.2858 45.8813 29.252 44.8475C28.2063 43.8018 27.6188 42.3835 27.6188 40.9046Z" fill="#01C8A9" />
          </svg>
        </>
      )
    }
    return title
  }

  return (
    <div className='w-full text-primary-blue justify-between flex items-center bg-[rgba(0,178,178,0.40)] pl-1 sm:px-4 md:px-8 py-2'>
      <div className='flex flex-col grow max-w-fit'>
        <h3 className='sm:grow m-0 sm:my-2 font-semibold text-base md:text-[1.25rem] flex items-center gap-0 lg:gap-2'>
          {renderTitle()}
          {beta && (
            <span className='inline-block lg:text-base text-[1px] opacity-70 font-semibold lg:pl-2 pl-0'>BETA</span>
          )}
        </h3>
      </div>
      <div className='grow sm:grow-0 flex items-center justify-end sm:justify-evenly gap-4 w-max'>
        {pathname === ("/myaccount/portfolio") || pathname === ("/myaccount/mutualfundanalyser") ?
          <div className='h-full'>
            <Button size='small' padding={'p-2 px-5 sm:h-10 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => setShowCasModal(true)}>
              <div style={{ lineHeight: "1px" }} className='text-sm sm:text-base sm:px-2  font-medium'>Refresh MF Portfolio</div>
            </Button>
          </div>
          :
          <></>
        }
        {!showNotification && (
          <div className='w-6 h-6 sm:w-10 sm:h-10'>
            <IoIosNotificationsOutline size={'100%'} />
          </div>
        )}
        <div className='flex justify-between gap-4 items-center w-fit'>
          {/* {pathname != ("/myaccount/dashboard") &&
            <div className='font-bold'>
              <Link
                href='/myaccount/dashboard'
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                Dashboard
              </Link>
            </div>
          } */}
          <div className='w-8 h-8 mr-1 sm:w-12 sm:h-12 bg-primary-blue rounded-full'>
            <NavItemPopOver user title={name} items={demo ? demoPages : dashboardPages} navbar={false} />
          </div>
        </div>
      </div>

      <UploadModal setFetchAgain={setFetchAgain} open={showCasModal} onClose={() => setShowCasModal(false)} />
    </div >
  )
}

export default HeaderNav;