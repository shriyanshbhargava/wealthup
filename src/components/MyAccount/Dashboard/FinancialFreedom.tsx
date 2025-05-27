import '@/styles/newstyles.css'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import Button from '@/components/ui/ButtonNew'
import DoughnutChart from '@/../src/components/MyAccount/Dashboard/doughnut-chart'
import Image from 'next/image'
import Link from 'next/link'
import { PeopleV2 } from '@/components/wealthometer-new/People'
import Popup from '@/components/ui/popup'
import PopupFinance from '@/components/ui/popup'
import React from 'react'
import { whatsappLinkFinancialFreedom } from '@/utils/constants'

const height = ['40px', '50px', '60px', '70px', '80px'] // change the height properly...
const array = Array.from({ length: 5 }, (_, index) => index);
const colors = ['#00C9A7', '#FAD225', '#FA8D33', '#D15200', '#D42929']

const active = 4
const className = 'selected meter'

export const FinancialFreedom = ({ age }: { age: number }) => {
    return (
        <div className={`w-full rounded-xl px-3 sm:px-6 pt-3 py-6 bg-white relative text-center flex flex-col gap-4 justify-between shadow-[0px_4px_4px_0px_rgba(3,87,130,0.50)] ${false ? "" : "border-red-600 border-2 border-b-4 "} `}>
            {/* <CardTitle itemKey={itemKey} /> */}
            <div className='flex gap-2 items-center md:mb-3 border-none '>
                <h5 className='text-2xl font-bold'>Financial Freedom</h5>
                <PopupFinance text='hellow'>
                    <AiOutlineInfoCircle size={25} className=' text-white rounded-full bg-[#00c9a7] cursor-pointer' />
                </PopupFinance>
                {/* <Popup text='Financial freedom is achieved when your investments are enough to take care of your basic expenses. This is an estimate based on the information provided.'>
                    <AiOutlineInfoCircle size={25} className=' text-white rounded-full bg-[#00c9a7] cursor-pointer' />
                </Popup> */}
            </div>
            {/* {(score !==null) && */}
            <div className='w-full h-full mt-12'>
                <div className='w-full flex flex-row justify-center items-center gap-6 sm:gap-16 mb-16'>
                    <div className='flex items-end'>
                        {array.map((index) => {
                            return (
                                <PeopleV2 key={index} color={active === index ? colors[index] : '#035782'} height={height[index]} />
                            )
                        })}
                    </div>
                    <div className='relative' style={{ transform: 'scale(1.1)' }}>
                        <svg className={`${className} fill-[#E8F8F5] salecoin circle frame-circle`} style={{ transform: 'scale(1.1)' }}>
                            <defs>
                                <linearGradient id="myGradient" x1="0%" y1="30%" x2="100%" y2="0%">
                                    <stop offset="20%" stopColor="rgba(255,115,0,0.9332983193277311)" />
                                    <stop offset="80%" stopColor="rgba(254,255,0,0.8352591036414566)" />
                                </linearGradient>
                            </defs>
                            <circle className={`progress-circle circle1`} cx="50%" cy="50%" r="48%" ></circle>
                            <circle className={`progress-circle ${className}`} cx="50%" cy="50%" r="48%"></circle>
                        </svg>
                        <div className='absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%]'>
                            <div className="flex flex-col items-center justify-center">
                                {age ? (
                                    <>
                                        <span className='text-xl font-bold'>{age}</span>
                                        <span className='text-lg medium'>Years</span>
                                    </>
                                ) : <span className='text-xl font-bold'>-</span>}
                            </div>
                        </div>
                    </div>
                </div>
                {age ? (
                    <>
                        <p className='mb-2 text-xl font-bold md:w-3/4 m-auto'>You are expected to be financially free at {age}</p>
                        <p className='mb-2 text-lg font-medium md:w-3/4 m-auto'>Want to be financially free sooner?</p>
                        <a href={whatsappLinkFinancialFreedom}>
                            <Button id="WOM_get_started_now" size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => {}}>
                                <span className='text-sm sm:text-base font-medium'>Get Started Now</span>
                            </Button>
                        </a>
                    </>
                ) : (
                    <>
                        <p className='mb-2 text-lg font-medium md:w-3/4 m-auto'>Check your retirement age</p>
                        <Link href='/retirement-age-calculator'>
                            <Button id="WOM_check_now" size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => {}}>
                                <span className='text-sm sm:text-base font-medium'>Check Now</span>
                            </Button>
                        </Link>
                    </>
                )}
            </div>
            {/* } */}
        </div>
    )
}
