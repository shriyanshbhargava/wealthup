"use client"

import { Bubble, BubblePopover } from '../Bubble';
import Image, { StaticImageData } from 'next/image';
import { motion, useReducedMotion } from "framer-motion";

import { IoLogoLinkedin } from 'react-icons/io';
import Link from 'next/link';
import React from 'react';
import { getLinks } from './items'
import medhaImage from '@/assets/images/medha.png'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { useSidebarContext } from './sidebar-context';
import { whatsappSidebarLink } from '@/utils/constants';

const SideBar = () => {
    const shouldReduceMotion = useReducedMotion()
    const { isCollapsed, toggleCollapse } = useSidebarContext();
    const router = useRouter();
    let animate

    animate = shouldReduceMotion ? { width: "70px" } : { width: isCollapsed ? "70px" : "250px" }

    const pathname = usePathname();
    const handleLogout = () => {
        router.push('/logout');
    };
    const { data } = getLinks((pathname?.includes('/demo') ? true : false), true)

    return (
        <motion.aside
            className="max-w-[250px] z-50 fixed overflow-y-auto top-0 left-0 side-bar-gradient"
            animate={animate}
        >
            <div className='h-screen p-4'>
                <div className="flex flex-col items-center justify-between h-full">
                    <div>
                        <div className={`${isCollapsed ? 'flex justify-center' : ''} mb-8`}>
                            {isCollapsed ? (
                                <Link href='/'>
                                    <Image
                                        src="/img/logo.png"
                                        alt="wealthup.me logo"
                                        height={40}
                                        width={40}
                                        priority
                                    />
                                </Link>
                            ) : (
                                <Link href='/'>
                                    <Image
                                        src="/assets/img/wealthup-new-whitelogo.png"
                                        alt="wealthup.me logo"
                                        height={145}
                                        width={145}
                                        priority
                                    />
                                </Link>
                            )}
                        </div>
                        <div>
                            {data.map((it, index) => (
                                <div key={index}>
                                    {it.name && <h2 className={`uppercase text-white mb-0 mt-4 ${isCollapsed ? 'text-sm' : 'text-lg'}`}>{it.name}</h2>}
                                    <ul className='list-none text-white'>
                                        {it.items.map((link, idx) => (
                                            <li key={link.link} className={`${pathname === link.link ? "bg-primary-blue rounded-lg" : ''}`}>
                                                <Link href={link.link}>
                                                    <button id={`sidebar-${link.title.replace(' ', '_')}`} className='flex gap-2 items-center'>
                                                        <div className={`flex items-center justify-center ${isCollapsed ? "w-[50px] h-[50px]" : "w-[45px] h-[45px]"}`}>
                                                            {isCollapsed ? (
                                                                <BubblePopover label={link.title}>
                                                                    {link.image ? (
                                                                        <Image
                                                                            src={link.image as StaticImageData}
                                                                            height={isCollapsed ? 40 : 30}
                                                                            width={isCollapsed ? 40 : 30}
                                                                            alt={link.title}
                                                                        />
                                                                    ) : (<link.icon />)}
                                                                </BubblePopover>
                                                            ) : (
                                                                <>
                                                                    {link.image ? (
                                                                        <Image
                                                                            src={link.image as StaticImageData}
                                                                            height={isCollapsed ? 40 : 30}
                                                                            width={isCollapsed ? 40 : 30}
                                                                            alt={link.title}
                                                                        />
                                                                    ) : (<link.icon />)}
                                                                </>
                                                            )}
                                                        </div>
                                                        {!isCollapsed && <span className='text-base text-left'>{link.title}</span>}
                                                    </button>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className='mt-12'>
                            {isCollapsed ? (
                                <motion.div className='flex justify-center relative'>
                                    <Bubble>
                                        <Image src={medhaImage} width={40} height={40} alt="Relationship Manager" />
                                    </Bubble>
                                </motion.div>
                            ) : (
                                <motion.div className='bg-[#E8F8F5] rounded py-4 px-4'>
                                    <motion.p className='text-sm mb-2 font-semibold text-primary-blue'>Your finance partner is</motion.p>
                                    <motion.div className='flex justify-between items-center'>
                                        <Image src={medhaImage} width={60} height={60} className='flex-shrink-0 rounded-full' alt="Relationship Manager" />
                                        <div className='ml-2'>
                                            <p
                                                className='text-sm font-medium flex items-center mb-2 text-primary-blue'>
                                                <span className='pr-2'>Medha</span>
                                                <a href="https://www.linkedin.com/in/medha-agarwal" target="_blank" rel='noopener norefer'><IoLogoLinkedin className='text-2xl' /></a>
                                            </p>
                                            <a href={whatsappSidebarLink} target='_blank' rel="noopener norefer">
                                                <button className="bg-[#01C8A9] rounded py-2 px-2 w-full text-xs text-white">Chat with Medha</button>
                                            </a>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                    <div className='w-full'>
                        <button
                            onClick={handleLogout}
                            className='w-full bg-red-600 text-white py-2 rounded mt-4'
                        >
                            Log Out
                        </button>
                        {/* <div className="absolute bottom-2 right-6 transform translate-x-1/2 z-50">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleCollapse()}
                                className='bg-[#01C8A9] rounded p-2 text-lg text-white flex items-center justify-center'
                            >
                                {isCollapsed ? (
                                    <BsChevronRight />
                                ) : (
                                    <BsChevronLeft />
                                )}
                            </motion.button>
                        </div> */}
                    </div>
                </div>
            </div>
        </motion.aside>
    )
}

export default SideBar
