"use client"

import React, { useState } from 'react'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import Button from '@/components/ui/ButtonNew'
import DoughnutChart from '@/components/MyAccount/MutualFundsAnalyser/components/Doughnut'
import Link from 'next/link';
import Popup from '@/components/ui/popup'
import { UploadModal } from '../Portfolio/components/UploadModal'
import { getColor } from '../../../utils/Dashboard/getColor'
import { whatsappLinkWealthometer } from '@/utils/constants'

export const InvestmentScoreCard = ({ total, performance, performanceMsg, investmentMsg }: { total: number, performance: number, performanceMsg: string, investmentMsg: string }) => {
    const [showCasModal, setShowCasModal] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    
    return (
        <div className={`w-full rounded-xl px-3 sm:px-6 pt-3 py-6 bg-white relative text-center flex flex-col gap-4 justify-center shadow-[0px_4px_4px_0px_rgba(3,87,130,0.50)] ${false ? "" : "border-red-600 border-2 border-b-4 "} `}>
            <div className='flex gap-2 items-center md:mb-3'>
                <h5 className='text-2xl font-bold'>Investments</h5>
                <Popup text='Indicates the overall performance of your entire mutual fund portfolio.'>
                    <AiOutlineInfoCircle size={25} className=' text-white bg-[#00C9A7] rounded-full cursor-pointer' />
                </Popup>
            </div>
            <>
                <div className='max-h-[175px] my-0 mx-auto relative'>
                    <span className={`text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} style={{ color: getColor(total) }}>
                        {total ?? '-'}<span className='text-3xl text-primary-blue font-medium'>/{total ? '10' : '-'}</span>
                    </span>
                    <DoughnutChart datapoints={[(total ?? 0) * 10, 100 - (total ?? 0) * 10]} color={[getColor(total ?? 0), '#D9D9D9']} circumference={290} rotation={215} spacing={0} />
                </div>
                <p className='text-xl font-bold m-auto'>Total Value</p>
                {!total ? (
                    <div className='mb-8'>
                        <p className='mb-0 text-lg font-medium md:w-3/4 m-auto'>To get your Score</p>
                        <Link href="/wealthometer">
                            <Button size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => null}>
                                <span className='text-sm sm:text-base font-medium'>Use WealthoMeter</span>
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <p className='mb-0 text-lg font-medium md:w-3/4 m-auto'>{investmentMsg}</p>
                )}
            </>
            <>
                <div className='max-h-[175px] my-0 mx-auto relative'>
                    <span className={`text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} style={{ color: getColor(performance ?? 0) }}>
                        {performance ?? '-'}<span className='text-3xl text-primary-blue font-medium'>/{performance ? '10' : '-'}</span>
                    </span>
                    <DoughnutChart datapoints={[(performance ?? 0) * 10, 100 - (performance ?? 0) * 10]} color={[getColor(performance ?? 0), '#D9D9D9']} circumference={290} rotation={215} spacing={0} />
                </div>
                <p className='text-xl font-bold m-auto'>Performance Score</p>
                <p className='mb-0 text-lg font-medium md:w-3/4 m-auto'>{performance === null ? "To know the performance score of your portfolio" : performanceMsg}</p>
            </>
            <div className="w-full flex justify-center">
                {!performance ? (
                    <Link href="/myaccount/portfolio-analyser">
                        <Button id="WOM_use_pf" size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => {}}>
                            <span className='text-sm sm:text-base font-medium'>Use Portfolio Analyser</span>
                        </Button>
                    </Link>
                ) : (
                    <a href={whatsappLinkWealthometer}>
                        <Button id="WOM_talk_to_your_rm" size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => {}}>
                            <span className='text-sm sm:text-base font-medium'>Talk to your RM</span>
                        </Button>
                    </a>
                )}
            </div>

            <UploadModal onClose={() => setShowCasModal(false)} open={showCasModal} setFetchAgain={setFetchAgain} />
        </div>
    )
}
