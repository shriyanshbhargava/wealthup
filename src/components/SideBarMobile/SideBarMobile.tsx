'use client'
import React, { Fragment } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import { getLinks } from './links';

type SideBarMobileProps = {
  showUser?: boolean
}

const SideBarMobile: React.FC<SideBarMobileProps> = ({ showUser = true }) => {
    const pathname = usePathname();
    const router = useRouter();

    const md = useMediaQuery({ maxWidth: 992 });
    const {data} = getLinks(pathname.includes('/demo'), md)

    return (
        <div className='z-50 max-w-[250px] hidden side-bar-gradient min-h-screen text-white p-4 text-xl lg:flex flex-col'>
          <div className=''>
            <div>
                <Image
                    src="/assets/img/wealthup-new-whitelogo.png"
                    alt="wealthup.me logo"
                    height={145}
                    width={145}
                    priority
                    className="Logo lg:pb-3 cursor-pointer"
                    onClick={()=>{router.push('/')}}
                />
            </div>
            <div>
            {data.map((group, index) => (
              <div key={index} className="my-4 mb-4">
                <motion.p
                //   animate={controlTitleText}
                  className="mb-2 ml-4 font-semibold text-2xl "
                >
                  {group.name}
                </motion.p>
                {group.items.map((item, index2) => (
                  <Fragment key={index2}>
                    {item.desktop && (
                      (<Link
                        href={item.link}
                        key={index2}
                        className={`flex mx-4  my-1 py-1 cursor-pointer hover:text-[#FF7300] rounded-lg items-center ${pathname === item.link ? "bg-gray-300" : ""
                          }`}>

                        <motion.p
                          className="mb-0 text-lg font-normal "
                        >
                          {item.title}
                        </motion.p>

                      </Link>)
                    )}
                  </Fragment>
                ))}
                </div>
            ))}
            </div>
          </div>
        </div>
    )
}

export default SideBarMobile