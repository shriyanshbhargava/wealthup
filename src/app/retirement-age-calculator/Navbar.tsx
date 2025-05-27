'use client'

import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from "@headlessui/react";
import { profilePages, resourcesPages, toolsPages } from '@/components/ui/header';

import { AiOutlineCloseCircle } from 'react-icons/ai'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import Button from '@/components/ui/ButtonNew';
import Image from 'next/image';
import Link from 'next/link';
import MobileHeader from '@/components/ui/header/MobileHeader'
import Modal from '@mui/material/Modal';
import React from 'react';
import { ReferForm } from '@/components/ui/ReferFormNew';
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { useMediaQuery } from 'react-responsive';

const style = () => ({
    position: 'absolute',
    top: '50%',
    left: "50%",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
    borderRadius: '12px'
})

const NavBar = ({ logged = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [headerSolid, setHeaderSolid] = useState(false);

    useEffect(() => {
        (async () => {
            const tokens = Storage.getToken();
            if (tokens !== null) {
                const userApiClient = new UserApi(tokens.access_token);

                setIsLoggedIn(true);

                const res = await userApiClient.getMe();

                if (res.status === 200) {
                    const data = await res.json();
                    setName(data?.first_name?.split("")[0] ?? "U");
                } else {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        })();
    }, [logged]);

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

    const smallDevice = useMediaQuery({ maxWidth: 992 })

    return (
        <nav className='flex py-2 px-8 md:px-16 text-base items-center w-full justify-between fixed top-0 left-0 z-30 transition-all duration-300' style={{ backgroundColor: headerSolid || smallDevice ? "#035782" : "transparent" }}>
            <div className='px-0 md:px-4 pt-2 md:py-4 relative bottom-2'>
                <span className="hidden lg:block w-[120px]"></span>
                <Link href={'/'} className="lg:hidden">
                    <Image
                        src="/assets/img/wealthup-new-whitelogo.png"
                        alt="wealthup.me logo"
                        height={45}
                        width={145}
                        className="cursor-pointer Logo"
                        priority
                    />
                </Link>
            </div>

            <div className='hidden lg:flex items-center justify-evenly w-10/12 '>
                <div className='px-4'>
                    <ul className='flex items-center list-none uppercase'>
                        {/* {pages.map(pageitem => {
              return <li className='py-3 px-6 text-lg' key={pageitem}><Link href={'/'} >{pageitem}</Link></li>;
            })} */}
                        <li className={`py-3 text-base px-6 ${headerSolid ? "text-white" : "text-black"}`}>
                            <Link href="/about">
                                About Us
                            </Link>
                        </li>
                        <li className={`py-3 text-base px-6 ${headerSolid ? "text-white" : "text-black"}`}>
                            <Link href="/#help">
                                Services
                            </Link>
                        </li>
                        <li className="relative flex items-center">
                            <NavItemPopOver headerSolid={headerSolid} title="Tools" items={toolsPages} />
                        </li>
                        <li className="relative flex items-center">
                            <NavItemPopOver headerSolid={headerSolid} title="Resources" items={resourcesPages} />
                        </li>
                        <li className="py-3 px-6">
                            <div>
                                <div className={`cursor-pointer text-base ${headerSolid ? "text-white" : "text-black"}`} onClick={() => setIsOpen(true)}>Join</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center justify-center h-fit list-none'>
                    {isLoggedIn ? (
                        <NavItemPopOver
                            headerSolid={headerSolid}
                            user
                            title={name}
                            items={profilePages}
                        />
                    ) : <Link href={'/login'}>
                        <Button size='small' onClick={() => { }}>
                            LOGIN/SIGNUP
                        </Button>
                    </Link>}
                </div>
            </div>

            <button
                className="navbar-toggler focus:outline-none block lg:hidden"
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

            <MobileHeader
                isLoggedIn={false}
                show={showMobileNav}
                onClose={() => setShowMobileNav(false)}
                onOpen={() => { setIsOpen(true); setShowMobileNav(false) }}
            />

            {isOpen && (
                <Modal
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                >
                    <Box sx={style} maxWidth={'sm'} minWidth={'360px'}>
                        <div className="absolute top-2 right-2 " onClick={() => setIsOpen(false)}>
                            <AiOutlineCloseCircle color='#0A5783' size={25} className='cursor-pointer' />
                        </div>
                        <ReferForm show={isOpen} onClose={() => setIsOpen(false)} />
                    </Box>
                </Modal>
            )}

        </nav>
    );
}

export const NavItemPopOver: React.FC<{
    title: string;
    items: Array<{ to: string; name: string }>;
    user?: boolean;
    navbar?: boolean;
    headerSolid: boolean;
}> = ({ title, items, user = false, navbar = true, headerSolid }) => {
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
                        className={`${open ? "" : "text-opacity-90"} cursor-pointer text-base ${user
                            ? "rounded-full flex items-center justify-center bg-[#FF7300] text-white font-bold uppercase duration-300"
                            : "px-6 uppercase hover:text-[#FF7300]"
                            } ${navbar ? ' w-12 h-12' : 'bg-primary-blue w-8 h-8 sm:w-12 sm:h-12'} ${headerSolid ? "text-white" : ""}`}
                    >
                        <span>{title}</span>
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

export default NavBar
