"use client"

import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { usePathname, useRouter } from 'next/navigation'

import { BsPersonCircle } from 'react-icons/bs'
import Image from "next/legacy/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import { ReferForm } from "../ReferForm";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { useMediaQuery } from "react-responsive";

// import { useRouter } from "next/navigation";
export const resourcesPages = [
  {
    to: "/resources/blog",
    name: "Blog",
  },
  {
    to: "/resources/school-of-finance",
    name: "School of Finance",
  },
  {
    to: "/resources/faq",
    name: "FAQs",
  },
];

export const toolsPages = [
  {
    to: "/tools/financial-health-checker",
    name: "WealthoMeter",
  },
  {
    to: "/tools/risk-profile",
    name: "RiskoMeter",
  },
  // {
  //   to: "/financial-literacy",
  //   name: "FinknowMeter",
  // },
  {
    to: "/tools/rent-receipt-generator",
    name: "Rent Receipt Generator",
  },
  // {
  //   to: "/tax-saving",
  //   name: "Tax-Saving Tool",
  // },
];

export const profilePages = [
  {
    to: "/myaccount/dashboard",
    name: "My Dashboard",
  },
  {
    to: "/logout",
    name: "Logout",
  },
]

export const dashboardPages = [
  {
    to: "/myaccount/profile",
    name: "My Profile",
  },
  {
    to: "/logout",
    name: "Logout",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [headerSolid, setHeaderSolid] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const pathname = usePathname();

  const dashOrDemo = pathname?.includes('myaccount') || pathname?.includes('demo');

  useEffect(() => {
    (async () => {
      const tokens = Storage.getToken();
      if (tokens !== null) {
        const userApiClient = new UserApi(tokens.access_token);

        setIsLoggedIn(true);

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
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setHeaderSolid(true);
      } else {
        setHeaderSolid(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const router = useRouter();

  const isActive = (path: string): boolean => {
    if (path === "/about-us" && pathname === "/about-us") {
      return true;
    } else if (path === "/services" && pathname === "/services") {
      return true;
    }
    return false;
  };

  const sm = useMediaQuery({ maxWidth: 425 });

  return (
    <header className="relative">
      <div
        className={`navigation fixed h-20 bg-primary-blue top-0 left-0 w-full  z-30 transition-all duration-300 ${headerSolid ? "bg-[#ebf8ff]" : ""
          }`}
      >
        <div className="container">
          <nav className="navbar pt-1 md:py-2 pl-[10px]  navbar-expand-lg flex  justify-between items-center relative duration-300">
            <Link href="/" className="navbar-brand">

              <Image
                src="/assets/img/wealthup-new-whitelogo.png"
                width={sm ? "170" : "170"}
                height={sm ? "58" : "58"}
                alt="Logo"
                priority
              />

            </Link>
            <button
              className="navbar-toggler focus:outline-none block lg:hidden mr-[20px] md:mr-[60px]"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowMobileNav(true)}
            >
              <span className="toggler-icon"></span>
              <span className="toggler-icon"></span>
              <span className="toggler-icon"></span>
            </button>

            <div
              className="hidden lg:block duration-300 shadow absolute top-100 left-0 mt-full bg-white z-20 w-full lg:static lg:bg-transparent lg:shadow-none"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav list-none mr-auto justify-center items-center lg:flex">
                <li className="nav-item">
                  <Link href="/about-us" className={`page-scroll text-base text-center font-medium`}>
                    <span className={`text-xl text-center font-medium ${isActive('/about-us') ? 'text-[#FF7300]' : 'text-white'} hover:text-[#FF7300]`}>About Us</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/services" className={`page-scroll text-base text-center font-medium hover:text-[#FF7300]`}>
                    <span className={`text-xl text-center font-medium ${isActive('/services') ? 'text-[#FF7300]' : 'text-white'} hover:text-[#FF7300]`}>Services</span>

                  </Link>
                </li>
                <li className="relative nav-item">
                  <NavItemPopOver title="Tools" items={toolsPages} />
                </li>
                <li className="relative nav-item">
                  <NavItemPopOver title="Resources" items={resourcesPages} />
                </li>

              </ul>
            </div>
            <div className="header-btn hidden sm:block sm:absolute sm:right-0 sm:mr-16 lg:static lg:mr-0">
              {isLoggedIn ? (
                <div className="flex gap-4">
                  <Link
                    href="/myaccount/dashboard"
                    className="text-xl flex gap-4 items-center mt-1"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="text-center text-xl font-medium text-white hover:text-[#FF7300]">Dashboard</span>
                  </Link>
                  <NavItemPopOver
                    user
                    title={name}
                    items={dashOrDemo ? dashboardPages : profilePages}
                  />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-xl flex gap-4 items-center mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="text-center text-xl font-medium text-white hover:text-[#FF7300]">Login</span>
                  <BsPersonCircle className="text-white text-3xl" />
                </Link>
              )}
            </div>
          </nav>
        </div>


        <MobileHeader
          isLoggedIn={isLoggedIn}
          show={showMobileNav}
          onClose={() => setShowMobileNav(false)}
          onOpen={() => { setIsOpen(true); setShowMobileNav(false) }}
        />
        {isOpen && (
          <ReferForm show={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </header>
  );
};







export const NavItemPopOver: React.FC<{
  title: string;
  items: Array<{ to: string; name: string }>;
  user?: boolean;
  navbar?: boolean;
}> = ({ title, items, user = false, navbar = true }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover
      className="relative"
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
    >
      {({ open }) => (
        <>
          <Popover.Button
            as="a"
            className={`
                ${open ? "" : ""}
                cursor-pointer ${user
                ? "rounded-full  flex items-center justify-center bg-[#FF7300] text-white  font-bold uppercase duration-300"
                : "px-6 uppercase hover:text-[#FF7300] text-white"
              } ${navbar ? ' w-12 h-12 text-base' : 'bg-primary-blue w-8 h-8 sm:w-12 sm:h-12 text-base md:text-xl'}`}
          >
            <span className="text-xl text-center font-medium">{title}</span>
          </Popover.Button>
          <Transition
            show={isShowing}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={`absolute  z-10 mt-1 w-screen transform px-4 sm:px-0 max-w-[230px] ${navbar ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/3'}`}>
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative flex flex-col gap-8 bg-white p-7">
                  {items.map((item) => (
                    (<Link
                      href={item.to}
                      key={item.name}
                      className="-m-3 flex items-center p-2 rounded-lg transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 text-[#028190] hover:text-[#FF7300]">

                      <div className="ml-4 flex items-center text-[#028190] hover:text-[#FF7300] w-full">
                        <p className="text-base text-left mb-0 font-medium ">
                          {item.name}
                        </p>
                      </div>

                    </Link>)
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Header;
