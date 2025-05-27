import React, { useState } from 'react'

import { Disclaimer } from './disclaimer';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '@/components/ui/Modal'
import people from '@/assets/images/people.png'

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  return (
    <div className='relative w-full bg-[linear-gradient(180deg,#055C84_0%,#179A99_100%)]'>
            <div className='bg-brand-blue px-4 py-2'>
                <Link href="/" className="navbar-brand">
                    <Image
                        src="/assets/img/wealthup-new-whitelogo.png"
                        width={130}
                        height={40}
                        alt="Logo"
                        priority
                    />
                </Link>
            </div>
            <div className='relative px-6 py-8 text-white'>
                <h2 className='text-[26px] xl:text-[32px] font-semibold mb-0 md:text-center'>Hi Aditi!</h2>
                <div className="flex md:justify-center">
                    <p className='text-lg xl:text-xl font-normal md:text-center md:max-w-xl'><span className='font-semibold'>Congratulations!</span> You have taken the first step towards a financially healthy and stress-free life.</p>
                </div>
                <div className='flex justify-center my-4'>
                    <div className='bg-white rounded-[15px] md:py-12 py-8 md:px-16 px-6 md:max-w-5xl'>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="md:flex md:flex-col md:items-center md:w-[40%]">
                                <p className='text-brand-blue text-lg md:text-xl xl:text-2xl font-semibold'>You are expected to be financially free at the age of</p>
                                <div className='relative flex justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
                                        <path d="M104.42 53.623C106.146 53.623 107.554 55.0233 107.454 56.7461C106.823 67.5349 102.938 77.9077 96.2727 86.4769C88.9669 95.8702 78.7385 102.56 67.2048 105.49C55.671 108.419 43.4898 107.421 32.587 102.652C21.6843 97.8836 12.682 89.617 7.00344 79.1593C1.32488 68.7015 -0.705976 56.6494 1.23195 44.9083C3.16988 33.1672 8.96602 22.4069 17.704 14.3287C26.442 6.25052 37.6233 1.31528 49.4802 0.303249C60.2968 -0.619994 71.1127 1.76982 80.5047 7.11633C82.0044 7.97006 82.4118 9.91392 81.472 11.3613C80.5323 12.8086 78.6016 13.2102 77.0953 12.3681C68.8744 7.77187 59.4434 5.72486 50.0117 6.52989C39.5394 7.42374 29.6639 11.7826 21.9463 18.9175C14.2287 26.0523 9.10943 35.556 7.39781 45.926C5.6862 56.296 7.47989 66.9407 12.4953 76.1772C17.5107 85.4136 25.4617 92.7149 35.0913 96.9266C44.7208 101.138 55.4795 102.02 65.6664 99.4329C75.8532 96.8456 84.8871 90.9366 91.3398 82.6403C97.1512 75.1682 100.57 66.1435 101.192 56.7456C101.306 55.0236 102.695 53.623 104.42 53.623Z" fill="url(#paint0_linear_3204_184)"/>
                                        <defs>
                                            <linearGradient id="paint0_linear_3204_184" x1="11.9836" y1="4.78068" x2="99.0478" y2="107.137" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#FE7201"/>
                                            <stop offset="0.52" stop-color="#EB6608"/>
                                            <stop offset="1" stop-color="#DA2B2B"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className='absolute top-1/4 left-1/2 -translate-x-1/2'>
                                        <div className='flex flex-col items-center'>
                                        <span className='text-[#DA2B2B] text-[46px] font-semibold mb-0 leading-none'>74</span>
                                        <span className='text-[#DA2B2B] text-base font-semibold'>Years</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center my-2'>
                                    <Image src={people} alt="People" />
                                    <div className='flex text-brand-blue items-center gap-2 mt-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                            <path d="M9.6785 12.8634C9.6785 13.018 9.63264 13.1692 9.54671 13.2978C9.46078 13.4264 9.33864 13.5267 9.19575 13.5858C9.05286 13.645 8.89562 13.6605 8.74392 13.6303C8.59223 13.6002 8.45288 13.5257 8.34352 13.4163C8.23415 13.307 8.15967 13.1676 8.1295 13.0159C8.09932 12.8642 8.11481 12.707 8.174 12.5641C8.23319 12.4212 8.33342 12.2991 8.46202 12.2131C8.59062 12.1272 8.74182 12.0813 8.89649 12.0813C9.10389 12.0813 9.3028 12.1637 9.44946 12.3104C9.59611 12.457 9.6785 12.656 9.6785 12.8634ZM8.89649 4.57399C7.25425 4.57399 5.92483 5.76656 5.92483 7.23284V7.54565C5.92483 7.67009 5.97426 7.78944 6.06225 7.87743C6.15025 7.96542 6.26959 8.01486 6.39404 8.01486C6.51848 8.01486 6.63782 7.96542 6.72582 7.87743C6.81381 7.78944 6.86325 7.67009 6.86325 7.54565V7.23284C6.86325 6.28426 7.77508 5.51241 8.89649 5.51241C10.0179 5.51241 10.9297 6.28426 10.9297 7.23284C10.9297 8.18143 10.0179 8.95328 8.89649 8.95328C8.77204 8.95328 8.6527 9.00271 8.56471 9.0907C8.47671 9.1787 8.42728 9.29804 8.42728 9.42249V10.0481C8.42728 10.1725 8.47671 10.2919 8.56471 10.3799C8.6527 10.4679 8.77204 10.5173 8.89649 10.5173C9.02093 10.5173 9.14027 10.4679 9.22827 10.3799C9.31626 10.2919 9.3657 10.1725 9.3657 10.0481V9.85885C10.7819 9.65709 11.8681 8.55601 11.8681 7.23284C11.8681 5.76656 10.5387 4.57399 8.89649 4.57399ZM16.873 8.79687C16.873 10.3745 16.4052 11.9167 15.5288 13.2284C14.6523 14.5402 13.4065 15.5625 11.949 16.1663C10.4915 16.77 8.88764 16.9279 7.34034 16.6202C5.79304 16.3124 4.37175 15.5527 3.25621 14.4372C2.14066 13.3216 1.38097 11.9003 1.07319 10.353C0.765416 8.80572 0.923378 7.2019 1.5271 5.74438C2.13083 4.28685 3.15321 3.04108 4.46495 2.16461C5.77668 1.28813 7.31887 0.820313 8.89649 0.820312C11.0112 0.822796 13.0387 1.66398 14.534 3.15934C16.0294 4.65469 16.8706 6.68212 16.873 8.79687ZM15.9346 8.79687C15.9346 7.40486 15.5218 6.04411 14.7485 4.88669C13.9751 3.72927 12.8759 2.82718 11.5899 2.29448C10.3038 1.76178 8.88868 1.6224 7.52341 1.89397C6.15815 2.16554 4.90407 2.83585 3.91977 3.82016C2.93547 4.80446 2.26515 6.05853 1.99358 7.4238C1.72201 8.78907 1.86139 10.2042 2.39409 11.4903C2.92679 12.7763 3.82889 13.8755 4.9863 14.6489C6.14372 15.4222 7.50447 15.835 8.89649 15.835C10.7625 15.8329 12.5515 15.0908 13.8709 13.7713C15.1904 12.4518 15.9326 10.6629 15.9346 8.79687Z" fill="#045A83"/>
                                        </svg>
                                        <button className='text-base text-brand-blue underline' onClick={() => setShowModal(true)}>
                                            What does this mean?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <div className="md:w-1/2">
                            <div className="md:hidden">
                                <p className='text-brand-blue text-lg my-8'>Yikes! That&apos;s a long time, let&apos;s get you there sooner!</p>
                                <div className='flex justify-center'>
                                    <Link href="/myaccount/new-dashboard/goals">
                                        <button className='w-[275px] h-[56px] rounded-md bg-[#FB7306] shadow-[0px_3px_4px_0px_#074553] text-white text-xl'>
                                            Show me how
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className='my-8 md:my-0'>
                                <p className='text-brand-blue text-lg md:text-xl xl:text-2xl font-semibold'>What&apos;s causing the delay in you being financially free?</p>
                                <ul className='text-brand-blue text-lg md:text-xl xl:text-2xl font-normal mt-4 list-inside'>
                                    <li>87% of your investments are underperforming.</li>
                                    <li className="md:mt-4">Your monthly savings are too low.</li>
                                </ul>
                            </div>
                            <p className='text-brand-blue text-lg hidden md:block md:text-xl xl:text-2xl font-bold my-8'>Yikes! That&apos;s a long time, let&apos;s get you there sooner!</p>
                            <div className='flex max-md:justify-center mt-12'>
                                <Link href="/myaccount/new-dashboard/goals">
                                    <button className='w-[275px] h-[56px] rounded-md bg-[#FB7306] shadow-[0px_3px_4px_0px_#074553] text-white text-xl'>
                                        Show me how
                                    </button>
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} showClose bg='bg-[#CFFFF6]'>
                <div className='text-left'>
                    <p className='text-lg text-black font-semibold'>We estimate your retirement age based on 3 things:</p>
                    <ul className='text-lg text-black list-inside list-decimal mb-4 pl-4'>
                        <li><span className='font-semibold'>our bills:</span>  What you spend each month, adjusted for inflation</li>
                        <li><span className='font-semibold'>our nest egg:</span>  how much you have saved already</li>
                        <li><span className='font-semibold'>our monthly savings (SIPs):</span> How much you add to your investments each month</li>
                    </ul>
                    <p className='text-lg text-black font-semibold mb-2'>We also factored that when you retire, your investments should:</p>
                    <p className='text-lg text-black mb-0'>1) Cover your bills (even after inflation)</p>
                    <p className='text-lg text-black mb-4'>2) Continue to grow with inflation so you don’t run out of money</p>
                    <p className='text-lg text-black font-semibold mb-2'>Notes</p>
                    <p className='text-lg text-black'>-The calculation assumes your lifestyle will remain the same as today<br />
- If your life changes e.g. marriage, kids, promotions etc. the score will need to be updated <br />
- When you use this tool regularly the score’s accuracy improves</p>
                </div>
            </Modal>

            {showDisclaimer && <Disclaimer setShowDisclaimer={setShowDisclaimer} />}
        </div>
  )
}
