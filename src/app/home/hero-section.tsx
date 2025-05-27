import Image from 'next/image'
import { PeopleV2 } from '@/components/wealthometer-new/People'
import React from 'react'
import mobileFrame from '@/assets/images/wealthometer_main/mobileframenew.png'

export const HeroSection = () => {
  return (
    <section className="home-hero-section pb-6 lg:pb-12 pt-[80px]">
        <div className="container flex">
            <div className="w-1/2">
                <h1 className="capitalize text-5xl mb-6">Simplify your finance, <br/>amplify your life</h1>
                <h3 className="text-2xl font-normal">Get guidance on every aspect of your finances to achieve your financial goals quickly. <br /><br />Don’t just plan your finance, but execute</h3>
                <div className='flex mt-[56px] gap-4'>
                    <button className="bg-[#FF7300] py-2 px-6 rounded">
                        Get Started
                    </button>
                    <button className="bg-transparent border border-white py-2 px-6 rounded">
                        See Demo
                    </button>
                </div>
            </div>
            <MobileComponent />
        </div>
    </section>
  )
}

const height = ['20px', '25px', '30px', '35px', '40px'] // change the height properly...
const array = Array.from({ length: 5 }, (_, index) => index);
const colors = ['#00C9A7', '#FAD225', '#FA8D33', '#D15200', '#D42929']

const MobileComponent = () => {
    return (
        <div className='w-1/2 flex justify-end'>
            <div className='relative w-1/2 h-full'>
                <Image src={mobileFrame} alt='Mobile Frame' fill />
                <MobileCard className='top-[40px] -left-[96px]'>
                    <div className='flex justify-between mb-4'>
                        <div className='w-14 h-14 rounded-full border-2 border-white flex flex-col items-center justify-center'>
                            <span>50</span>
                            <span className='text-xs'>Years</span>
                        </div>
                        <div className='flex items-end'>
                            {array.map((index) => {
                                return (
                                    <PeopleV2 key={index} color={index !== 2 ? 'white' : colors[1]} height={height[index]} />
                                )
                            })}
                        </div>
                    </div>
                    <p className='text-sm mb-0'>Age by which your expected to be financially free.</p>
                </MobileCard>
                <MobileCard className="bottom-[50px] -right-[80px]" maxWidth='max-w-[180px]'>
                    <p className='text-sm'>Missed Gains</p>
                    <p className='text-base font-semibold text-[#F3C606]'>-₹ 3,40,000</p>
                    <p className='text-sm mb-0'>Your investments are losing this amount annually!</p>
                </MobileCard>
                <MobileCard className="bottom-[10px] -left-[80px]" maxWidth='max-w-[260px]'>
                    <p className="text-sm font-semibold">Portfolio Performance</p>
                    <div className='flex'>
                        <div className='w-[40%]'>
                            <svg className='w-full' viewBox="0 0 102 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_0_1)">
                                <mask id="path-1-inside-1_0_1" fill="white">
                                <path d="M70.417 84.89C70.8759 85.8152 70.4853 86.9402 69.5335 87.341C63.7218 89.7884 57.4551 91.0699 51.1136 91.1002C44.1414 91.1335 37.2557 89.6534 30.962 86.7687C24.6684 83.8839 19.1265 79.6677 14.7432 74.4295C10.36 69.1913 7.24664 63.0642 5.63176 56.498C4.01688 49.9317 3.94145 43.0929 5.41103 36.4838C6.8806 29.8747 9.85786 23.6629 14.1242 18.3045C18.3906 12.9461 23.8378 8.57717 30.0659 5.51838C35.7466 2.72844 41.9454 1.09307 48.2807 0.705341C49.2926 0.643416 50.1328 1.45092 50.1539 2.46442C50.1748 3.47467 49.3736 4.30729 48.3653 4.37221C42.592 4.74392 36.9449 6.24319 31.7663 8.78652C26.0428 11.5975 21.0369 15.6125 17.1162 20.5368C13.1954 25.461 10.4594 31.1696 9.10884 37.2433C7.75833 43.317 7.82764 49.6016 9.3117 55.636C10.7957 61.6703 13.6569 67.301 17.685 72.1148C21.7131 76.9286 26.806 80.8032 32.5898 83.4543C38.3736 86.1053 44.7014 87.4655 51.1088 87.4349C56.9131 87.4072 62.6491 86.2388 67.9718 84.0074C68.8946 83.6205 69.9723 83.9937 70.417 84.89Z"/>
                                </mask>
                                <path d="M70.417 84.89C70.8759 85.8152 70.4853 86.9402 69.5335 87.341C63.7218 89.7884 57.4551 91.0699 51.1136 91.1002C44.1414 91.1335 37.2557 89.6534 30.962 86.7687C24.6684 83.8839 19.1265 79.6677 14.7432 74.4295C10.36 69.1913 7.24664 63.0642 5.63176 56.498C4.01688 49.9317 3.94145 43.0929 5.41103 36.4838C6.8806 29.8747 9.85786 23.6629 14.1242 18.3045C18.3906 12.9461 23.8378 8.57717 30.0659 5.51838C35.7466 2.72844 41.9454 1.09307 48.2807 0.705341C49.2926 0.643416 50.1328 1.45092 50.1539 2.46442C50.1748 3.47467 49.3736 4.30729 48.3653 4.37221C42.592 4.74392 36.9449 6.24319 31.7663 8.78652C26.0428 11.5975 21.0369 15.6125 17.1162 20.5368C13.1954 25.461 10.4594 31.1696 9.10884 37.2433C7.75833 43.317 7.82764 49.6016 9.3117 55.636C10.7957 61.6703 13.6569 67.301 17.685 72.1148C21.7131 76.9286 26.806 80.8032 32.5898 83.4543C38.3736 86.1053 44.7014 87.4655 51.1088 87.4349C56.9131 87.4072 62.6491 86.2388 67.9718 84.0074C68.8946 83.6205 69.9723 83.9937 70.417 84.89Z" fill="#17DBA6"/>
                                <path d="M70.417 84.89C70.8759 85.8152 70.4853 86.9402 69.5335 87.341C63.7218 89.7884 57.4551 91.0699 51.1136 91.1002C44.1414 91.1335 37.2557 89.6534 30.962 86.7687C24.6684 83.8839 19.1265 79.6677 14.7432 74.4295C10.36 69.1913 7.24664 63.0642 5.63176 56.498C4.01688 49.9317 3.94145 43.0929 5.41103 36.4838C6.8806 29.8747 9.85786 23.6629 14.1242 18.3045C18.3906 12.9461 23.8378 8.57717 30.0659 5.51838C35.7466 2.72844 41.9454 1.09307 48.2807 0.705341C49.2926 0.643416 50.1328 1.45092 50.1539 2.46442C50.1748 3.47467 49.3736 4.30729 48.3653 4.37221C42.592 4.74392 36.9449 6.24319 31.7663 8.78652C26.0428 11.5975 21.0369 15.6125 17.1162 20.5368C13.1954 25.461 10.4594 31.1696 9.10884 37.2433C7.75833 43.317 7.82764 49.6016 9.3117 55.636C10.7957 61.6703 13.6569 67.301 17.685 72.1148C21.7131 76.9286 26.806 80.8032 32.5898 83.4543C38.3736 86.1053 44.7014 87.4655 51.1088 87.4349C56.9131 87.4072 62.6491 86.2388 67.9718 84.0074C68.8946 83.6205 69.9723 83.9937 70.417 84.89Z" stroke="#17DBA6" stroke-width="6" mask="url(#path-1-inside-1_0_1)"/>
                                </g>
                                <g filter="url(#filter1_d_0_1)">
                                <mask id="path-2-inside-2_0_1" fill="white">
                                <path d="M51.3846 2.83892C51.3809 1.82024 52.2072 0.989276 53.225 1.03241C59.4859 1.29772 65.6391 2.843 71.2978 5.57918C77.5122 8.58403 82.9685 12.9469 87.2566 18.3398C91.5446 23.7327 94.5528 30.0152 96.0548 36.715C97.4212 42.8096 97.5089 49.1051 96.3203 55.2087C96.1248 56.213 95.1208 56.8264 94.126 56.5871C93.1347 56.3487 92.5277 55.3535 92.7192 54.3521C93.7833 48.7863 93.6938 43.0499 92.4484 37.4951C91.0681 31.3381 88.3037 25.5646 84.363 20.6086C80.4224 15.6527 75.4081 11.6432 69.6971 8.88181C64.5356 6.38605 58.9265 4.96846 53.2173 4.70904C52.2077 4.66317 51.3882 3.84948 51.3846 2.83892Z"/>
                                </mask>
                                <path d="M51.3846 2.83892C51.3809 1.82024 52.2072 0.989276 53.225 1.03241C59.4859 1.29772 65.6391 2.843 71.2978 5.57918C77.5122 8.58403 82.9685 12.9469 87.2566 18.3398C91.5446 23.7327 94.5528 30.0152 96.0548 36.715C97.4212 42.8096 97.5089 49.1051 96.3203 55.2087C96.1248 56.213 95.1208 56.8264 94.126 56.5871C93.1347 56.3487 92.5277 55.3535 92.7192 54.3521C93.7833 48.7863 93.6938 43.0499 92.4484 37.4951C91.0681 31.3381 88.3037 25.5646 84.363 20.6086C80.4224 15.6527 75.4081 11.6432 69.6971 8.88181C64.5356 6.38605 58.9265 4.96846 53.2173 4.70904C52.2077 4.66317 51.3882 3.84948 51.3846 2.83892Z" fill="#39CEF3"/>
                                <path d="M51.3846 2.83892C51.3809 1.82024 52.2072 0.989276 53.225 1.03241C59.4859 1.29772 65.6391 2.843 71.2978 5.57918C77.5122 8.58403 82.9685 12.9469 87.2566 18.3398C91.5446 23.7327 94.5528 30.0152 96.0548 36.715C97.4212 42.8096 97.5089 49.1051 96.3203 55.2087C96.1248 56.213 95.1208 56.8264 94.126 56.5871C93.1347 56.3487 92.5277 55.3535 92.7192 54.3521C93.7833 48.7863 93.6938 43.0499 92.4484 37.4951C91.0681 31.3381 88.3037 25.5646 84.363 20.6086C80.4224 15.6527 75.4081 11.6432 69.6971 8.88181C64.5356 6.38605 58.9265 4.96846 53.2173 4.70904C52.2077 4.66317 51.3882 3.84948 51.3846 2.83892Z" stroke="#39CEF3" stroke-width="6" mask="url(#path-2-inside-2_0_1)"/>
                                </g>
                                <g filter="url(#filter2_d_0_1)">
                                <mask id="path-3-inside-3_0_1" fill="white">
                                <path d="M94.3251 58.5166C95.3439 58.816 95.9228 59.8947 95.5614 60.8932C91.8755 71.0769 84.5669 79.6653 74.9431 85.1165C74.0681 85.6121 72.967 85.2757 72.4811 84.3952C71.9763 83.4806 72.328 82.333 73.2341 81.8129C81.9465 76.8126 88.5685 69.0038 91.9379 59.757C92.2923 58.7844 93.3319 58.2248 94.3251 58.5166Z"/>
                                </mask>
                                <path d="M94.3251 58.5166C95.3439 58.816 95.9228 59.8947 95.5614 60.8932C91.8755 71.0769 84.5669 79.6653 74.9431 85.1165C74.0681 85.6121 72.967 85.2757 72.4811 84.3952C71.9763 83.4806 72.328 82.333 73.2341 81.8129C81.9465 76.8126 88.5685 69.0038 91.9379 59.757C92.2923 58.7844 93.3319 58.2248 94.3251 58.5166Z" fill="#035782"/>
                                <path d="M94.3251 58.5166C95.3439 58.816 95.9228 59.8947 95.5614 60.8932C91.8755 71.0769 84.5669 79.6653 74.9431 85.1165C74.0681 85.6121 72.967 85.2757 72.4811 84.3952C71.9763 83.4806 72.328 82.333 73.2341 81.8129C81.9465 76.8126 88.5685 69.0038 91.9379 59.757C92.2923 58.7844 93.3319 58.2248 94.3251 58.5166Z" stroke="#035782" stroke-width="6" mask="url(#path-3-inside-3_0_1)"/>
                                </g>
                                <defs>
                                <filter id="filter0_d_0_1" x="0.362305" y="0.702148" width="74.2471" height="98.3984" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.341176 0 0 0 0 0.509804 0 0 0 0.4 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                </filter>
                                <filter id="filter1_d_0_1" x="47.3848" y="1.03076" width="53.7656" height="63.6079" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.341176 0 0 0 0 0.509804 0 0 0 0.4 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                </filter>
                                <filter id="filter2_d_0_1" x="68.25" y="58.4395" width="31.4199" height="34.9067" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.341176 0 0 0 0 0.509804 0 0 0 0.4 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                </filter>
                                </defs>
                             </svg>

                        </div>
                        <div className='flex flex-col justify-around'>
                            <div className='flex gap-1 text-xs font-semibold items-center'>
                                <span className='w-2 h-2 bg-primary-blue'></span>
                                Over Performing
                            </div>
                            <div className='flex gap-1 text-xs font-semibold items-center'>
                                <span className='w-2 h-2 bg-[#39CEF3]'></span>
                                Average Performing
                            </div>
                            <div className='flex gap-1 text-xs font-semibold items-center'>
                                <span className='w-2 h-2 bg-[#17DBA6]'></span>
                                Under Performing
                            </div>
                        </div>
                    </div>
                </MobileCard>
                <MobileCard className="-top-[30px] -right-[80px]"> 
                    <div>
                        <p className='text-sm font-semibold'>Historical Net Asset Value</p>
                        <div className='w-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-full' viewBox="0 0 211 112" fill="none">
                                <path d="M18.803 75.4364C15.9591 73.9033 10.4495 56.0845 8.05023 47.3668L7.00022 95L197.616 96.4449L198.247 67.8388C196.043 67.7903 190.026 56.4983 187.695 56.9721C185.364 57.4458 178.664 71.8708 175.06 72.1852C171.456 72.4997 165.435 50.8362 162.42 50.7697C159.404 50.7032 150.71 81.8888 148.382 82.2313C146.054 82.5738 138.813 74.1432 135.076 75.2424C131.338 76.3416 124.598 92.6037 122.528 91.7703C120.457 90.937 111.283 28.1116 110.117 28.3485C108.952 28.5854 104.111 48.1715 99.0945 49.3738C94.0785 50.576 89.9152 2.56508 86.3169 2.61705C82.7186 2.66901 73.3692 84.6476 71.7454 84.6118C70.1217 84.576 60.8319 32.2509 58.617 37.9786C56.845 42.5608 48.9801 57.5466 45.2691 64.4666C43.0076 49.494 37.6602 20.1082 34.3619 22.3462C30.2389 25.1435 22.3579 77.3527 18.803 75.4364Z" fill="url(#paint0_linear_2367_208)" fill-opacity="0.2"/>
                                <g filter="url(#filter0_d_2367_208)">
                                    <path d="M8.0918 48.0378C10.4802 56.8332 15.9654 74.8105 18.7988 76.3566C22.3406 78.2892 30.2081 25.6088 34.3172 22.7851C37.6045 20.5262 42.9249 50.1745 45.1742 65.281C48.8739 58.2977 56.7152 43.1752 58.4821 38.5514C60.6908 32.7716 69.9333 85.5642 71.5512 85.5998C73.1692 85.6355 82.5082 2.91786 86.0938 2.86443C89.6793 2.811 93.8146 51.2521 98.8133 50.0377C103.812 48.8232 108.641 29.0598 109.803 28.8205C110.964 28.5811 120.089 91.9684 122.152 92.8087C124.214 93.6489 130.935 77.2389 134.66 76.1288C138.384 75.0187 145.597 83.523 147.917 83.1768C150.237 82.8305 158.909 51.3624 161.914 51.4286C164.919 51.4949 170.912 73.3513 174.503 73.0331C178.095 72.7149 184.775 58.1584 187.098 57.6798C189.421 57.2011 195.414 68.5928 197.609 68.6412" stroke="white" stroke-width="0.8" stroke-linecap="round"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_2367_208" x="0.691406" y="0.464355" width="210.318" height="110.775" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dx="3" dy="8"/>
                                    <feGaussianBlur stdDeviation="5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.00392157 0 0 0 0 0.784314 0 0 0 0 0.662745 0 0 0 0.5 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2367_208"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2367_208" result="shape"/>
                                    </filter>
                                    <linearGradient id="paint0_linear_2367_208" x1="103.944" y1="24.1423" x2="102.333" y2="97.2328" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white"/>
                                    <stop offset="1" stop-color="white"/>
                                    </linearGradient>
                                </defs>
                                </svg>
                        </div>
                    </div>
                </MobileCard>
            </div>
        </div>
    )
}

const MobileCard: React.FC<{
    children: React.ReactNode,
    className: string;
    maxWidth?: string;
}> = ({ children, className, maxWidth }) => {
    return (
        <div className={`absolute ${className}`}>
            <div className={`rounded-xl p-4 ${maxWidth ? maxWidth : "max-w-[200px]"} gradient-card`} style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            }}>
                {children}
            </div>
        </div>
    )
}
