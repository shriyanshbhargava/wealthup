import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Chart from './chat';
import { useMediaQuery } from 'react-responsive';
import Modal from '@/components/ui/Modal';

const percentages: number[] = [0.8, 1.2, 0.9];
const colors: string[] = ['#01C8A9', '#22AAA1', '#035782'];

export const ShowMeHow = () => {
  const md = useMediaQuery({ minWidth: 767 })
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='relative w-full bg-[linear-gradient(180deg,#055C84_0%,#179A99_100%)]'>
        <div className="md:container">
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
                <div className="flex justify-center">
                    <div className="flex w-[908px]">
                        <div className='w-full bg-white rounded-[25px] border border-[#FDFDFD] shadow-[4px_4px_4px_0px_#045A83] p-6 md:max-w-[340px] md:border-[6px] md:border-[#FF7300]'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-xl font-semibold text-brand-blue mb-0 leading-none'>Your Goal</p>
                                    <p className='text-4xl font-semibold text-brand-blue mb-0 leading-none'>Retire at 50</p>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
                                        <path d="M44.5345 58.5183C37.7317 61.8637 29.9309 62.5707 22.6376 60.5028C15.3443 58.4349 9.07542 53.7387 5.04098 47.3206C1.00654 40.9025 -0.507511 33.2174 0.791043 25.7486C2.0896 18.2799 6.10871 11.5568 12.0727 6.87706C18.0366 2.1973 25.5227 -0.107408 33.086 0.407729C40.6493 0.922865 47.7537 4.22133 53.0281 9.66653C58.3024 15.1117 61.3728 22.3176 61.6467 29.8935C61.9205 37.4694 59.3785 44.8782 54.511 50.69L61.2652 57.2937C61.7122 57.7309 61.9672 58.3279 61.9741 58.9532C61.981 59.5785 61.7393 60.1809 61.302 60.6279C60.8647 61.075 60.2678 61.33 59.6425 61.3369C59.0172 61.3438 58.4147 61.102 57.9677 60.6648L29.3787 32.7004C28.9316 32.2631 28.6766 31.6661 28.6697 31.0408C28.6628 30.4155 28.9046 29.8131 29.3418 29.3661C29.7791 28.919 30.376 28.664 31.0013 28.6571C31.6266 28.6502 32.2291 28.892 32.6761 29.3292L40.9312 37.404C42.3702 35.175 43.0149 32.5256 42.7608 29.8847C42.5067 27.2438 41.3687 24.7659 39.5311 22.8522C37.6935 20.9385 35.2638 19.701 32.6354 19.3401C30.0069 18.9791 27.3336 19.5158 25.0481 20.8632C22.7626 22.2107 20.9988 24.29 20.0422 26.7646C19.0855 29.2393 18.9921 31.9644 19.7769 34.4987C20.5617 37.0331 22.179 39.2284 24.3667 40.7293C26.5545 42.2302 29.1848 42.9487 31.8318 42.7687C32.1411 42.7479 32.4514 42.7882 32.7451 42.8873C33.0388 42.9864 33.31 43.1424 33.5434 43.3463C33.7768 43.5503 33.9678 43.7982 34.1054 44.0759C34.243 44.3537 34.3245 44.6558 34.3453 44.9651C34.3874 45.5896 34.1796 46.2053 33.7677 46.6767C33.5637 46.9101 33.3158 47.101 33.0381 47.2386C32.7603 47.3762 32.4582 47.4577 32.149 47.4786C28.4024 47.7348 24.6805 46.705 21.5985 44.5594C18.5165 42.4137 16.2588 39.2807 15.1986 35.6781C14.1385 32.0755 14.3393 28.219 15.7679 24.746C17.1965 21.273 19.7673 18.3914 23.0555 16.5775C26.3437 14.7636 30.1524 14.1259 33.8521 14.7698C37.5518 15.4138 40.921 17.3008 43.403 20.1191C45.8849 22.9374 47.3309 26.5181 47.502 30.2696C47.6732 34.021 46.5592 37.7185 44.3441 40.7511L51.1191 47.378C55.1421 42.4223 57.1922 36.1549 56.8757 29.7797C56.5593 23.4045 53.8986 17.371 49.4047 12.838C44.9108 8.30495 38.9006 5.59207 32.5284 5.22039C26.1562 4.8487 19.8713 6.84442 14.8808 10.8242C9.89039 14.804 6.54629 20.4873 5.4908 26.7825C4.43532 33.0777 5.74289 39.5409 9.16236 44.9307C12.5818 50.3206 17.8721 54.2571 24.0171 55.9841C30.1621 57.7111 36.7285 57.1069 42.4551 54.2875C43.0161 54.0117 43.6638 53.9702 44.2554 54.1719C44.8471 54.3736 45.3345 54.8022 45.6102 55.3632C45.8859 55.9243 45.9275 56.5719 45.7258 57.1636C45.524 57.7553 45.0955 58.2426 44.5345 58.5183Z" fill="#035782"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col justify-center md:gap-12 md:mt-6">
                    <div className='md:w-[400px] bg-white rounded-[25px] border border-[#FDFDFD] shadow-[4px_4px_4px_0_#045A83] p-6 mt-4'>
                        <p className='text-xl md:text-3xl font-semibold md:text-bold text-brand-blue'>Retirement Corpus</p>
                        <div className='relative flex justify-center'>
                            <Chart width={md ? 400 : 296} height={137} percentages={percentages} colors={colors} />
                            {/* <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full'>
                                <div className='flex text-brand-blue justify-center items-center gap-2 mb-8'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M9.6785 12.8634C9.6785 13.018 9.63264 13.1692 9.54671 13.2978C9.46078 13.4264 9.33864 13.5267 9.19575 13.5858C9.05286 13.645 8.89562 13.6605 8.74392 13.6303C8.59223 13.6002 8.45288 13.5257 8.34352 13.4163C8.23415 13.307 8.15967 13.1676 8.1295 13.0159C8.09932 12.8642 8.11481 12.707 8.174 12.5641C8.23319 12.4212 8.33342 12.2991 8.46202 12.2131C8.59062 12.1272 8.74182 12.0813 8.89649 12.0813C9.10389 12.0813 9.3028 12.1637 9.44946 12.3104C9.59611 12.457 9.6785 12.656 9.6785 12.8634ZM8.89649 4.57399C7.25425 4.57399 5.92483 5.76656 5.92483 7.23284V7.54565C5.92483 7.67009 5.97426 7.78944 6.06225 7.87743C6.15025 7.96542 6.26959 8.01486 6.39404 8.01486C6.51848 8.01486 6.63782 7.96542 6.72582 7.87743C6.81381 7.78944 6.86325 7.67009 6.86325 7.54565V7.23284C6.86325 6.28426 7.77508 5.51241 8.89649 5.51241C10.0179 5.51241 10.9297 6.28426 10.9297 7.23284C10.9297 8.18143 10.0179 8.95328 8.89649 8.95328C8.77204 8.95328 8.6527 9.00271 8.56471 9.0907C8.47671 9.1787 8.42728 9.29804 8.42728 9.42249V10.0481C8.42728 10.1725 8.47671 10.2919 8.56471 10.3799C8.6527 10.4679 8.77204 10.5173 8.89649 10.5173C9.02093 10.5173 9.14027 10.4679 9.22827 10.3799C9.31626 10.2919 9.3657 10.1725 9.3657 10.0481V9.85885C10.7819 9.65709 11.8681 8.55601 11.8681 7.23284C11.8681 5.76656 10.5387 4.57399 8.89649 4.57399ZM16.873 8.79687C16.873 10.3745 16.4052 11.9167 15.5288 13.2284C14.6523 14.5402 13.4065 15.5625 11.949 16.1663C10.4915 16.77 8.88764 16.9279 7.34034 16.6202C5.79304 16.3124 4.37175 15.5527 3.25621 14.4372C2.14066 13.3216 1.38097 11.9003 1.07319 10.353C0.765416 8.80572 0.923378 7.2019 1.5271 5.74438C2.13083 4.28685 3.15321 3.04108 4.46495 2.16461C5.77668 1.28813 7.31887 0.820313 8.89649 0.820312C11.0112 0.822796 13.0387 1.66398 14.534 3.15934C16.0294 4.65469 16.8706 6.68212 16.873 8.79687ZM15.9346 8.79687C15.9346 7.40486 15.5218 6.04411 14.7485 4.88669C13.9751 3.72927 12.8759 2.82718 11.5899 2.29448C10.3038 1.76178 8.88868 1.6224 7.52341 1.89397C6.15815 2.16554 4.90407 2.83585 3.91977 3.82016C2.93547 4.80446 2.26515 6.05853 1.99358 7.4238C1.72201 8.78907 1.86139 10.2042 2.39409 11.4903C2.92679 12.7763 3.82889 13.8755 4.9863 14.6489C6.14372 15.4222 7.50447 15.835 8.89649 15.835C10.7625 15.8329 12.5515 15.0908 13.8709 13.7713C15.1904 12.4518 15.9326 10.6629 15.9346 8.79687Z" fill="#045A83"/>
                                    </svg>
                                    <button className='text-base text-brand-blue underline'>
                                         What does this mean?
                                    </button>
                                </div>
                            </div> */}
                        </div>
                        <div className='flex justify-between px-4 mt-6'>
                            <div className='flex flex-col items-center'>
                                <span className='text-xl text-brand-blue font-semibold'>Current</span>
                                <span className='text-[40px] text-brand-blue md:text-[#01C8A9] font-semibold'>30L</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='text-xl text-brand-blue font-semibold'>Projected</span>
                                <span className='text-[40px] text-brand-blue md:text-[#1E8982] font-semibold'>80L</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='text-xl text-brand-blue font-semibold'>Target</span>
                                <span className='text-[40px] text-brand-blue font-semibold'>1Cr</span>
                            </div>
                        </div>
                        <div className='hidden md:flex text-brand-blue justify-center items-center gap-2 mb-8 mt-12'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path d="M9.6785 12.8634C9.6785 13.018 9.63264 13.1692 9.54671 13.2978C9.46078 13.4264 9.33864 13.5267 9.19575 13.5858C9.05286 13.645 8.89562 13.6605 8.74392 13.6303C8.59223 13.6002 8.45288 13.5257 8.34352 13.4163C8.23415 13.307 8.15967 13.1676 8.1295 13.0159C8.09932 12.8642 8.11481 12.707 8.174 12.5641C8.23319 12.4212 8.33342 12.2991 8.46202 12.2131C8.59062 12.1272 8.74182 12.0813 8.89649 12.0813C9.10389 12.0813 9.3028 12.1637 9.44946 12.3104C9.59611 12.457 9.6785 12.656 9.6785 12.8634ZM8.89649 4.57399C7.25425 4.57399 5.92483 5.76656 5.92483 7.23284V7.54565C5.92483 7.67009 5.97426 7.78944 6.06225 7.87743C6.15025 7.96542 6.26959 8.01486 6.39404 8.01486C6.51848 8.01486 6.63782 7.96542 6.72582 7.87743C6.81381 7.78944 6.86325 7.67009 6.86325 7.54565V7.23284C6.86325 6.28426 7.77508 5.51241 8.89649 5.51241C10.0179 5.51241 10.9297 6.28426 10.9297 7.23284C10.9297 8.18143 10.0179 8.95328 8.89649 8.95328C8.77204 8.95328 8.6527 9.00271 8.56471 9.0907C8.47671 9.1787 8.42728 9.29804 8.42728 9.42249V10.0481C8.42728 10.1725 8.47671 10.2919 8.56471 10.3799C8.6527 10.4679 8.77204 10.5173 8.89649 10.5173C9.02093 10.5173 9.14027 10.4679 9.22827 10.3799C9.31626 10.2919 9.3657 10.1725 9.3657 10.0481V9.85885C10.7819 9.65709 11.8681 8.55601 11.8681 7.23284C11.8681 5.76656 10.5387 4.57399 8.89649 4.57399ZM16.873 8.79687C16.873 10.3745 16.4052 11.9167 15.5288 13.2284C14.6523 14.5402 13.4065 15.5625 11.949 16.1663C10.4915 16.77 8.88764 16.9279 7.34034 16.6202C5.79304 16.3124 4.37175 15.5527 3.25621 14.4372C2.14066 13.3216 1.38097 11.9003 1.07319 10.353C0.765416 8.80572 0.923378 7.2019 1.5271 5.74438C2.13083 4.28685 3.15321 3.04108 4.46495 2.16461C5.77668 1.28813 7.31887 0.820313 8.89649 0.820312C11.0112 0.822796 13.0387 1.66398 14.534 3.15934C16.0294 4.65469 16.8706 6.68212 16.873 8.79687ZM15.9346 8.79687C15.9346 7.40486 15.5218 6.04411 14.7485 4.88669C13.9751 3.72927 12.8759 2.82718 11.5899 2.29448C10.3038 1.76178 8.88868 1.6224 7.52341 1.89397C6.15815 2.16554 4.90407 2.83585 3.91977 3.82016C2.93547 4.80446 2.26515 6.05853 1.99358 7.4238C1.72201 8.78907 1.86139 10.2042 2.39409 11.4903C2.92679 12.7763 3.82889 13.8755 4.9863 14.6489C6.14372 15.4222 7.50447 15.835 8.89649 15.835C10.7625 15.8329 12.5515 15.0908 13.8709 13.7713C15.1904 12.4518 15.9326 10.6629 15.9346 8.79687Z" fill="#045A83"/>
                                    </svg>
                                    <button onClick={() => setShowModal(true)} className='text-base text-brand-blue underline'>
                                         What does this mean?
                                    </button>
                                </div>
                    </div>
                    <div className='md:w-[460px] md:px-8 bg-white rounded-[25px] border border-[#FDFDFD] shadow-[4px_4px_4px_0_#045A83] p-6 mt-4 text-brand-blue'>
                        <p className='text-base md:text-lg'>Discipline is good, but you will not reach your ₹2 Crore retirement goal by 50 at this pace.</p>
                        <h3 className='text-2xl font-semibold'>Let&apos;s get you there sooner:</h3>
                        <ul className='text-base md:text-lg md:text-left font-normal list-inside'>
                            <li><span className='font-semibold'>Boost your income:</span> Invest lump sum ₹60 Lakhs or increase your SIP by ₹1 Lakh</li>
                        </ul>
                        <div className='ml-4 my-4'>
                            <span className='text-2xl font-semibold'>OR</span>
                        </div>
                        <ul className='text-base md:text-lg md:text-left font-normal list-inside'>
                            <li><span className='font-semibold'>Boost your returns:</span> Generate better returns </li>
                        </ul>
                        <div className='mt-14'>
                            <p className='text-center text-base'>Let&apos;s analyse your investments and see how much return they’re generating</p>
                            <div className='flex justify-center mt-6'>
                                <button className='w-[275px] h-[56px] rounded-md bg-[#FB7306] shadow-[0px_3px_4px_0px_#074553] text-white text-xl'>
                                    Upload CAS
                                </button>
                            </div>
                            <div className='flex justify-center mt-6'>
                                <Link href="/myaccount/new-dashboard/journey">
                                    <button className='text-base text-brand-blue underline'>
                                        Skip to your custom journey
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
    </div>
  )
}
