"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { goals } from './components/goals'
import { GoalsModal } from './goals-modal'
import { CustomGoal } from './components/custom-goal'
import { Tile } from './components/tile'
import { RetirementGoal } from './components/retirement-goal'
import { Education } from './components/education'
import { HouseGoal } from './components/house-goal'
import { Loans } from './components/loans'
import { Travel } from './components/travel'
import { useMediaQuery } from 'react-responsive'
import { whatsappSidebarLink } from '@/utils/constants'
import { UserApi } from '@/api/services/user/UserApi'
import Storage from '@/utils/storage'
import { notFound } from 'next/navigation'

export const JourneyPage = () => {
    const [currentModal, setCurrentModal] = useState<"options" | "custom" | "retirement" | "house" | "education" | "travel" | "loans" | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [activeTile, setActiveTile] = useState<number | null>(null)
    const [defaultActive, setDefaultActive] = useState<number | null>(null)
    const [showActiveTilePopover, setShowActiveTilePopover] = useState(false);
    const [journeyGoals, setJourneyGoals] = useState<Array<any>>([])
    // const [showActiveBackground,  setShowActiveBackground] = useState(true)
    const md = useMediaQuery({ minWidth: 764 })

    useEffect(() => {
        (async () => {
            const tokens = Storage.getToken()

            if (!tokens) {
                console.error("No access tokens available.");
                return;
            }

            const userApi = new UserApi(tokens.access_token)

            try {
                const res = await userApi.getGoals()

                if (res.ok) {
                    const data = await res.json()
                    console.log({ data })
                    setJourneyGoals(data?.goals)
                } else {
                    throw new Error("Failed to fetch goals: " + res.status);
                }
            } catch (error) {
                console.error("Error getting goals:", error)
            }
        })()
    }, [])
    //   const data = useContext(JourneyContext)

    const journeyTiles = [
        { type: 'completed', icon: goals.custom, cardType: 'card' },
        { type: 'completed', icon: goals.education, cardType: 'target' },
        { type: 'active', icon: goals.investment, cardType: 'investment' },
        { type: 'incompleted', icon: goals.retirement, cardType: 'money' },
        { type: 'incompleted', icon: goals.money, cardType: 'house' },
        { type: 'new', icon: goals.plus, cardType: 'add' }
    ];

    const height = md ? ((journeyGoals.length + 1) * 150) - 80 : (journeyGoals.length + 1) * 80

    notFound()

    return (
        <div className='relative w-full bg-[linear-gradient(180deg,#055C84_0%,#179A99_100%)] min-h-[1070px]'>
            <GoalsModal open={currentModal === "options"} setCurrentModal={setCurrentModal} />
            <CustomGoal open={currentModal === "custom"} setCurrentModal={setCurrentModal} />
            <RetirementGoal open={currentModal === "retirement"} setCurrentModal={setCurrentModal} />
            <HouseGoal open={currentModal === "house"} setCurrentModal={setCurrentModal} />
            <Travel open={currentModal === "travel"} setCurrentModal={setCurrentModal} />
            <Education open={currentModal === "education"} setCurrentModal={setCurrentModal} />
            <Loans open={currentModal === "loans"} setCurrentModal={setCurrentModal} />
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
            <div className="my-10 text-white">
                <div className="relative md:sticky top-4">
                    <h2 className="text-[32px] text-center font-semibold z-20">Aditi&apos;s Journey</h2>
                    <div className="fixed bottom-4 right-4">
                        <a href={whatsappSidebarLink}>
                            <div className='bg-white rounded-full p-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none" className='w-8 h-8'>
                                    <path d="M17.5373 3.47301C16.1775 2.10448 14.442 1.17052 12.5507 0.789521C10.6594 0.408522 8.69763 0.597641 6.91398 1.3329C5.13033 2.06817 3.60515 3.31646 2.53178 4.91955C1.45841 6.52264 0.885181 8.40833 0.884766 10.3376V15.3857C0.884766 16.0552 1.15069 16.6972 1.62405 17.1705C2.09741 17.6439 2.73941 17.9098 3.40884 17.9098H4.85117C5.52059 17.9098 6.1626 17.6439 6.63596 17.1705C7.10931 16.6972 7.37524 16.0552 7.37524 15.3857V11.7799C7.37524 11.1105 7.10931 10.4685 6.63596 9.99512C6.1626 9.52177 5.52059 9.25584 4.85117 9.25584H3.12398C3.38504 7.45372 4.28639 5.80589 5.66304 4.61399C7.03969 3.42208 8.79955 2.76583 10.6205 2.76536H10.6782C12.491 2.77312 14.2404 3.43331 15.6064 4.62515C16.9724 5.81699 17.8636 7.4608 18.117 9.25584H16.3898C15.7204 9.25584 15.0784 9.52177 14.605 9.99512C14.1316 10.4685 13.8657 11.1105 13.8657 11.7799V15.3857C13.8657 16.0552 14.1316 16.6972 14.605 17.1705C15.0784 17.6439 15.7204 17.9098 16.3898 17.9098H18.1566C18.0735 18.317 17.8522 18.683 17.5303 18.9459C17.2083 19.2087 16.8054 19.3522 16.3898 19.3521H11.3416C11.0547 19.3521 10.7796 19.4661 10.5767 19.669C10.3739 19.8718 10.2599 20.147 10.2599 20.4339C10.2599 20.7208 10.3739 20.9959 10.5767 21.1988C10.7796 21.4017 11.0547 21.5156 11.3416 21.5156H16.3898C17.4414 21.5144 18.4496 21.0962 19.1931 20.3526C19.9367 19.609 20.355 18.6008 20.3562 17.5492V10.3376C20.3611 9.06417 20.1147 7.8023 19.631 6.62433C19.1473 5.44636 18.4358 4.37545 17.5373 3.47301ZM4.85117 11.4193C4.9468 11.4193 5.03852 11.4573 5.10614 11.5249C5.17376 11.5926 5.21175 11.6843 5.21175 11.7799V15.3857C5.21175 15.4814 5.17376 15.5731 5.10614 15.6407C5.03852 15.7083 4.9468 15.7463 4.85117 15.7463H3.40884C3.31321 15.7463 3.22149 15.7083 3.15387 15.6407C3.08625 15.5731 3.04826 15.4814 3.04826 15.3857V11.4193H4.85117ZM16.0292 15.3857V11.7799C16.0292 11.6843 16.0672 11.5926 16.1348 11.5249C16.2024 11.4573 16.2942 11.4193 16.3898 11.4193H18.1927V15.7463H16.3898C16.2942 15.7463 16.2024 15.7083 16.1348 15.6407C16.0672 15.5731 16.0292 15.4814 16.0292 15.3857Z" fill="#035782" />
                                </svg>
                            </div>
                        </a>
                    </div>
                    <div className='md:absolute md:right-[20px] md:top-[-23px] md:flex md:gap-4 my-8 px-4'>
                        <div className="flex justify-between mb-2">
                            <Link href="/myaccount/new-dashboard/dash" className="rounded-[34px] px-3 h-[36px] flex items-center gap-4 text-white bg-[#01C8A9]">
                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.2584 7.84004V5.80191C25.2584 4.5149 24.7471 3.2806 23.8371 2.37054C22.927 1.46048 21.6927 0.949219 20.4057 0.949219H8.75924C7.47223 0.949219 6.23793 1.46048 5.32787 2.37054C4.41781 3.2806 3.90655 4.5149 3.90655 5.80191V7.84004C2.80956 8.0628 1.82331 8.65794 1.11491 9.52465C0.406516 10.3914 0.0195312 11.4763 0.0195312 12.5957C0.0195312 13.7151 0.406516 14.8 1.11491 15.6667C1.82331 16.5334 2.80956 17.1286 3.90655 17.3513V21.3305C3.90655 21.8453 4.11106 22.3391 4.47508 22.7031C4.8391 23.0671 5.33282 23.2716 5.84763 23.2716H23.3173C23.8321 23.2716 24.3258 23.0671 24.6899 22.7031C25.0539 22.3391 25.2584 21.8453 25.2584 21.3305V17.3513C26.3554 17.1286 27.3416 16.5334 28.05 15.6667C28.7584 14.8 29.1454 13.7151 29.1454 12.5957C29.1454 11.4763 28.7584 10.3914 28.05 9.52465C27.3416 8.65794 26.3554 8.0628 25.2584 7.84004ZM8.75924 2.8903H20.4057C21.1779 2.8903 21.9185 3.19705 22.4645 3.74309C23.0106 4.28912 23.3173 5.0297 23.3173 5.80191V7.84004C22.222 8.06526 21.2377 8.66124 20.5306 9.52752C19.8234 10.3938 19.4365 11.4774 19.4352 12.5957H9.72978C9.72842 11.4774 9.34154 10.3938 8.63437 9.52752C7.9272 8.66124 6.94299 8.06526 5.84763 7.84004V5.80191C5.84763 5.0297 6.15439 4.28912 6.70042 3.74309C7.24645 3.19705 7.98704 2.8903 8.75924 2.8903ZM24.3352 15.5073H24.2879C24.0305 15.5073 23.7836 15.6096 23.6016 15.7916C23.4196 15.9736 23.3173 16.2204 23.3173 16.4778V21.3305H5.84763V16.4778C5.84763 16.2204 5.74537 15.9736 5.56336 15.7916C5.38135 15.6096 5.13449 15.5073 4.87709 15.5073H4.82978C4.25602 15.498 3.69781 15.3193 3.22526 14.9938C2.75271 14.6682 2.3869 14.2103 2.17376 13.6775C1.96063 13.1447 1.90967 12.5609 2.02731 11.9992C2.14494 11.4376 2.42591 10.9232 2.83493 10.5207C3.24394 10.1182 3.76277 9.8456 4.32624 9.73703C4.88971 9.62847 5.47269 9.68883 6.00197 9.91052C6.53125 10.1322 6.98321 10.5054 7.3011 10.9831C7.61899 11.4608 7.78863 12.0218 7.7887 12.5957V17.4484C7.7887 17.7058 7.89096 17.9526 8.07297 18.1347C8.25498 18.3167 8.50184 18.4189 8.75924 18.4189C9.01665 18.4189 9.26351 18.3167 9.44552 18.1347C9.62753 17.9526 9.72978 17.7058 9.72978 17.4484V14.5368H19.4352V17.4484C19.4352 17.7058 19.5374 17.9526 19.7194 18.1347C19.9014 18.3167 20.1483 18.4189 20.4057 18.4189C20.6631 18.4189 20.91 18.3167 21.092 18.1347C21.274 17.9526 21.3762 17.7058 21.3762 17.4484V12.5957C21.3763 12.0218 21.546 11.4608 21.8638 10.9831C22.1817 10.5054 22.6337 10.1322 23.163 9.91052C23.6923 9.68883 24.2752 9.62847 24.8387 9.73703C25.4022 9.8456 25.921 10.1182 26.33 10.5207C26.739 10.9232 27.02 11.4376 27.1376 11.9992C27.2553 12.5609 27.2043 13.1447 26.9912 13.6775C26.7781 14.2103 26.4122 14.6682 25.9397 14.9938C25.4671 15.3193 24.9089 15.498 24.3352 15.5073Z" fill="white" />
                                    <rect x="9.75586" y="11.7188" width="9.7173" height="4.15079" fill="#01C8A9" />
                                    <path d="M17.2765 7.87483V9.01048H18.7857V10.3852H17.1868C17.0274 11.3316 16.6339 12.019 16.0063 12.4473C15.3887 12.8757 14.4523 13.0899 13.1971 13.0899V13.8818C13.1971 14.3501 13.2917 14.7186 13.481 14.9876C13.6802 15.2566 14.0139 15.3911 14.4822 15.3911C14.9304 15.3911 15.2542 15.2665 15.4534 15.0175C15.6527 14.7585 15.7523 14.3849 15.7523 13.8968H17.6949C17.6749 14.9029 17.391 15.675 16.8431 16.2129C16.2952 16.7409 15.5132 17.0049 14.4971 17.0049C13.4411 17.0049 12.6342 16.721 12.0764 16.1532C11.5185 15.5853 11.2396 14.7585 11.2396 13.6726V11.6852C12.3055 11.6852 13.0925 11.6603 13.6005 11.6105C14.1086 11.5508 14.4871 11.4312 14.7362 11.2519C14.9852 11.0726 15.1496 10.7837 15.2293 10.3852H10.7614V9.01048H15.304V7.87483H10.7614V6.41043H18.7857V7.87483H17.2765Z" fill="white" />
                                </svg>
                                50 yrs
                            </Link>
                            <button className='md:hidden rounded-[26px] px-3 h-[36px] flex items-center gap-4 text-white bg-[#FF7300]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <g clip-path="url(#clip0_3569_883)">
                                        <rect x="0.574219" y="0.695312" width="25" height="25" rx="12.5" fill="white" />
                                        <ellipse cx="16.7324" cy="22.6758" rx="14.3584" ry="5.71875" fill="#035782" />
                                        <ellipse cx="8.3856" cy="24.024" rx="15.6792" ry="5.71875" transform="rotate(10.0525 8.3856 24.024)" fill="#01C8A9" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3569_883">
                                            <rect x="0.574219" y="0.695312" width="25" height="25" rx="12.5" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                1/3
                            </button>
                        </div>
                        <div className="flex justify-between mb-2">
                            <Link href="/myaccount/portfolio-analyser/summary" className="rounded-[34px] px-3 h-[36px] flex items-center gap-4 text-white bg-[#01C8A9]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path d="M16.12 3.1631C15.861 3.14127 15.6002 3.17174 15.354 3.25257C15.1079 3.3334 14.8818 3.46282 14.6902 3.63263C14.4985 3.80243 14.3455 4.0089 14.2408 4.23893C14.1361 4.46895 14.0821 4.71751 14.0821 4.96881V9.57595C14.0789 10.0035 14.2334 10.4181 14.518 10.7453C14.8026 11.0725 15.1986 11.2909 15.6348 11.3613C16.3318 11.4743 16.9816 11.7754 17.5092 12.2299C18.0368 12.6844 18.4209 13.2738 18.617 13.9302C18.8132 14.5865 18.8135 15.283 18.6179 15.9395C18.4223 16.596 18.0388 17.1857 17.5115 17.6406C16.9843 18.0956 16.3348 18.3972 15.6379 18.5108C14.941 18.6244 14.2251 18.5454 13.5727 18.2827C12.9203 18.0201 12.3579 17.5846 11.9505 17.0264C11.543 16.4682 11.307 15.8101 11.2696 15.1279C11.2216 14.1967 11.4184 13.4287 11.8555 12.8328C12.1124 12.4864 12.2336 12.063 12.1973 11.6382C12.161 11.2134 11.9697 10.8149 11.6575 10.5139L8.42078 7.31146C8.23628 7.13311 8.01531 6.99394 7.77199 6.90286C7.52868 6.81178 7.26837 6.7708 7.00773 6.78253C6.74709 6.79426 6.49186 6.85844 6.25835 6.97098C6.02484 7.08351 5.81819 7.24192 5.65164 7.43607C3.69809 9.69941 2.69717 12.5905 2.84785 15.5346C2.99854 18.4787 4.28979 21.2602 6.46492 23.326C8.73928 25.5073 11.8158 26.7274 15.0196 26.7188H15.1942C18.3636 26.6667 21.388 25.4263 23.6293 23.2595C25.8706 21.0927 27.1535 18.1689 27.2071 15.1052C27.295 8.95404 22.4247 3.70912 16.12 3.1631ZM7.08835 8.58701L10.3239 11.7804V11.7872C9.84363 12.4535 9.54202 13.2246 9.44617 14.0313H4.74929C4.93704 12.0286 5.75314 10.1291 7.08835 8.58701ZM4.75046 15.8438H9.47312C9.66754 16.9573 10.2158 17.9847 11.0417 18.7833C11.8676 19.5819 12.9303 20.1121 14.0821 20.3003V24.8655C11.681 24.6535 9.43263 23.6348 7.72782 21.9866C6.02301 20.3385 4.96952 18.1649 4.75046 15.8438ZM22.3016 21.9769C20.6035 23.6298 18.3571 24.6514 15.9571 24.8621V20.3003C17.0435 20.1255 18.052 19.6434 18.8552 18.9149C19.623 18.2234 20.1754 17.338 20.4499 16.3589C20.7244 15.3798 20.7101 14.346 20.4086 13.3743C20.1071 12.4026 19.5305 11.5319 18.7438 10.8604C17.9572 10.189 16.9919 9.74369 15.9571 9.57482V4.96881C21.2915 5.43099 25.4106 9.87162 25.3321 15.0792C25.2953 17.6733 24.2072 20.1499 22.3016 21.9769Z" fill="white" />
                                </svg>
                                30%
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            <Link href="/myaccount/dashboard" className="rounded-[34px] px-3 h-[36px] flex items-center gap-4 text-white bg-[#01C8A9]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                                    <g clip-path="url(#clip0_3554_1737)">
                                        <path d="M16.0149 13.9901C14.6488 11.706 15.319 9.4363 16.1045 7.08981L15.652 7.25593C15.1174 7.47761 14.5701 7.66898 14.0128 7.82906C12.3053 8.22983 11.1036 7.51343 10.7301 5.83143C10.6083 5.19915 10.5611 4.55541 10.5893 3.91271C10.6049 3.6068 10.6895 3.30797 10.837 3.0374C10.9845 2.76683 11.1914 2.53113 11.443 2.347C13.0224 1.0637 14.858 0.754298 16.8259 1.13846C17.3104 1.23398 17.7821 1.57868 18.1791 1.9047C20.1001 3.47872 21.4682 5.4535 22.5034 7.65048C23.927 10.676 24.9579 13.8012 25.1863 17.1631C25.3207 19.1275 24.546 20.5458 22.9772 21.6526C21.4084 22.7594 19.6604 23.2141 17.8227 23.5215C14.8708 24.0302 11.9019 23.9015 8.93298 23.7956C8.00571 23.7935 7.07932 23.7401 6.15829 23.6357C3.11252 23.1851 1.17877 20.9362 1.28122 17.9439C1.28583 17.007 1.42154 16.075 1.68462 15.1738C2.92897 11.3903 7.52642 10.4974 10.5679 12.7401C11.014 13.0702 11.3278 13.6662 11.8144 13.8282C12.301 13.9901 12.9157 13.6745 13.4685 13.6974C14.2967 13.741 15.1312 13.8863 16.0149 13.9901ZM11.9382 6.21974C12.3202 6.96107 12.92 7.21648 13.9189 6.86554C14.8708 6.52915 15.7523 6.00794 16.6786 5.60093C16.8921 5.50957 17.2443 5.45558 17.3745 5.56564C17.5046 5.67569 17.5345 6.03078 17.4705 6.24051C17.1845 7.15211 16.8088 8.04087 16.5442 8.9587C16.1301 10.4019 15.9892 11.8658 16.7213 13.2654C17.2101 14.2061 17.9593 14.9267 18.7981 15.5745C18.9774 15.7116 19.225 15.8133 19.3189 15.9899C19.4039 16.2185 19.45 16.459 19.4555 16.7021C19.2207 16.7125 18.9326 16.8163 18.7575 16.7208C17.8867 16.2473 17.082 15.6431 16.1835 15.2278C14.0192 14.2289 11.5583 14.4345 9.87424 16.3366C9.6608 16.5837 9.34918 16.6813 9.15709 16.4114C9.09892 16.3005 9.07021 16.1773 9.07357 16.0529C9.07692 15.9285 9.11224 15.8069 9.17629 15.6991C9.66507 15.1987 10.2285 14.7668 10.8411 14.2456C10.4491 13.8988 10.0379 13.573 9.60957 13.2696C7.41543 11.8742 4.57884 12.3518 3.15094 14.3515C2.38256 15.4292 2.26304 16.6668 2.25023 17.9356C2.22035 20.7098 4.00256 22.6535 6.86476 22.7718C10.0941 22.9068 13.3298 23.1622 16.5613 22.7552C18.3136 22.533 20.0275 22.1925 21.6069 21.3764C23.7178 20.2841 24.4072 18.8845 24.1682 16.5734C23.8928 14.0026 23.1394 11.5689 22.1405 9.1975C21.1117 6.75549 19.7457 4.51491 17.6818 2.74985C17.3104 2.43214 16.8473 2.08536 16.3862 2.01891C15.0522 1.82164 13.7396 1.98361 12.5614 2.70417C11.5519 3.32713 11.2808 4.12452 11.7077 5.32476L14.1665 4.5419C13.7759 4.18889 13.4984 4.00823 13.3298 3.75905C13.2732 3.66588 13.2388 3.56153 13.2292 3.45371C13.2196 3.34588 13.235 3.23734 13.2743 3.13609C13.3536 3.07067 13.4488 3.0262 13.5509 3.00692C13.6529 2.98765 13.7583 2.99423 13.857 3.02603C14.4077 3.35827 14.9455 3.76943 14.969 4.463C14.9903 5.11088 14.4696 5.40989 13.9317 5.64039C13.7234 5.72373 13.5094 5.79311 13.2914 5.84804C12.8432 5.97886 12.3928 6.09515 11.9382 6.21974Z" fill="white" stroke="white" stroke-width="0.6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3554_1737">
                                            <rect width="26" height="25" fill="white" transform="translate(0.207031)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                60%
                            </Link>
                        </div>
                    </div>
                    {/* For desktop only */}
                    <div className="hidden md:flex md:absolute md:right-[20px] md:top-[60px]">
                        <div className="w-[320px] bg-white p-8 rounded-[37px] border-[3px] border-[#035782]">
                            <div>
                                <h2 className="text-2xl font-semibold text-primary-blue text-center">Aditi&apos;s Progress</h2>
                                <div className="mt-12">
                                    <p className="text-lg font-normal text-primary-blue text-center">Buy health insurance</p>
                                    <div className="flex justify-center mt-4 mb-8">
                                        <div className="flex items-center justify-center bg-primary-blue w-10 h-10 border-[3px] border-[#01C8A9] rounded-full">
                                            <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.7482 1.28211L5.94569 12.0846C5.88299 12.1474 5.80852 12.1972 5.72656 12.2311C5.6446 12.2651 5.55674 12.2826 5.46802 12.2826C5.37929 12.2826 5.29144 12.2651 5.20947 12.2311C5.12751 12.1972 5.05305 12.1474 4.99035 12.0846L0.264264 7.3585C0.137578 7.23181 0.0664062 7.05999 0.0664062 6.88083C0.0664062 6.70166 0.137578 6.52984 0.264264 6.40315C0.390951 6.27647 0.562774 6.2053 0.741936 6.2053C0.921098 6.2053 1.09292 6.27647 1.21961 6.40315L5.46802 10.6524L15.7928 0.326764C15.9195 0.200078 16.0913 0.128906 16.2705 0.128906C16.4496 0.128906 16.6215 0.200078 16.7482 0.326764C16.8748 0.45345 16.946 0.625274 16.946 0.804436C16.946 0.983598 16.8748 1.15542 16.7482 1.28211Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className='text-lg font-normal text-primary-blue text-center'>Save 30% of your income</p>
                                    <div className="flex justify-center mb-4">
                                        <div className="w-[221px] relative">
                                            <div className="w-full bg-[#C4FAF1] border-[3px] border-[#01C8A9] py-2 rounded-full" />
                                            <div className="absolute top-0 left-0 w-[20%] py-2 bg-primary-blue border-[3px] border-[#01C8A9] rounded-full flex justify-center">
                                            </div>
                                            <div className="absolute left-2 top-[-2px]">
                                                <span className="text-[10px]">10%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='text-lg font-normal text-primary-blue text-center'>Create your emergency funds</p>
                                    <div className="flex justify-center">
                                        <div className="w-[221px] relative">
                                            <div className="w-full bg-[#C4FAF1] border-[3px] border-[#01C8A9] py-2 rounded-full" />
                                            <div className="absolute top-0 left-0 w-[20%] py-2 bg-primary-blue border-[3px] border-[#01C8A9] rounded-full flex justify-center">
                                            </div>
                                            <div className="absolute left-2 top-[-2px]">
                                                <span className="text-[10px]">10%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Journey */}
                <div className={`flex justify-center z-10 w-full md:w-[calc(100%-360px)]`} style={{ height }}>
                    <div className="flex justify-end md:justify-start md:w-full relative mt-10 md:max-w-[400px] xl:max-w-[600px] mx-auto">
                        {journeyGoals?.length != 0 && journeyGoals?.map((tile, index) => (
                            <Tile
                                key={index}
                                className={`absolute ${activeTile === index ? 'z-50' : ''}`}
                                evenOdd={(index + 1) % 2 === 0 ? 'even' : 'odd'}
                                index={index + 1}
                                type={"completed"} // {(tile.type as any)} 
                                md={md}
                                onClick={() => {
                                    if (tile.type === "new") {
                                        setCurrentModal("options")
                                    }

                                    if (activeTile !== null && index === activeTile) {
                                        setShowActiveTilePopover(true)
                                    }

                                    if (tile.type !== 'new') {
                                        setShowActiveTilePopover(true);
                                        setActiveTile(index)
                                    }
                                }}
                                setActiveTile={setActiveTile}
                                setDefaultActive={setDefaultActive}
                                showAcitveTilePopover={showActiveTilePopover}
                                activeTile={activeTile}
                                cardType={"target"}//{tile.cardType as any}
                            >
                                {/* {goals.retirement} */}
                            </Tile>
                        ))}
                        <Tile
                            className={`absolute ${activeTile === journeyGoals.length ? 'z-50' : ''}`}
                            evenOdd={(journeyGoals.length + 1) % 2 === 0 ? 'even' : 'odd'}
                            index={journeyGoals.length + 1}
                            type={"new"} // {(tile.type as any)} 
                            md={md}
                            onClick={() => {
                                setCurrentModal("options")
                            }}
                            setActiveTile={setActiveTile}
                            setDefaultActive={setDefaultActive}
                            showAcitveTilePopover={showActiveTilePopover}
                            activeTile={activeTile}
                            cardType={"add"}//{tile.cardType as any}
                        ></Tile>
                    </div>
                </div>
                {defaultActive && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={() => setDefaultActive(null)}></div>
                )}
            </div>
        </div>
    )
}
