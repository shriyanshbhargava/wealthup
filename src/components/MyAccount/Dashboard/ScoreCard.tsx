import { AiOutlineInfoCircle } from 'react-icons/ai'
import Button from '@/components/ui/ButtonNew'
import DoughnutChart from '@/components/MyAccount/MutualFundsAnalyser/components/Doughnut'
import Link from 'next/link'
import Popup from '@/components/ui/popup'
import React from 'react'
import { getColor } from '@/utils/Dashboard//getColor'

type TScoreCard = {
    title: string;
    score: number;
    description?: string;
    small?: boolean;
    red?: boolean;
    total?: boolean;
    text: string;
}

export const ScoreCard: React.FC<TScoreCard> = ({ score, title, description, small, red, total = false, text }) => {
    const redBorder = red !== undefined ? red : score < 8;

    const data = total ? [score ?? 0, 100 - (score ?? 0)] : [(score ?? 0) * 10, 100 - ((score ?? 0) * 10)]

    return (
        <div className={`w-full rounded-xl px-3 sm:px-6 pt-3 py-6 bg-white relative text-center flex flex-col gap-4 shadow-[0px_4px_4px_0px_rgba(3,87,130,0.50)] ${!redBorder ? "" : "border-red-600 border-2 border-b-4 "} `}>
            <div className='flex gap-2 items-center md:mb-3'>
                <h5 className='text-2xl font-bold'>{title}</h5>
                <Popup text={text}>
                    <AiOutlineInfoCircle size={25} className=' text-white rounded-full bg-[#00c9a7] cursor-pointer' />
                </Popup>
            </div>
            <>
                <div className={`max-h-[175px] my-0 mx-auto relative`}>
                    <span className={`text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} style={{ color: getColor(score ?? 0, total) }}>
                        {score ?? '-'}<span className='text-3xl text-primary-blue font-medium'>/{
                            <>
                                {(score || score === 0) ? (total ? '100' : '10') : '-'}
                            </>
                        }</span>
                    </span>
                    <DoughnutChart datapoints={data} color={[getColor(score ?? 0, total), '#D9D9D9']} circumference={290} rotation={215} spacing={0} />
                </div>
                {description && (
                    <>
                        {total ? (
                            <>
                                {description.split('{.break}').map((line, index) => (
                                    <p className={`${index === 0 ? 'text-xl font-bold mb-2' : 'mb-0 text-lg font-medium'} md:2-3/4 mx-auto`} key={index}>{line}</p>
                                ))}
                            </>
                        ) : (<p className='mb-0 text-lg font-medium md:w-3/4 m-auto'>{description}</p>)}
                    </>
                )}
                {(score === undefined) && (
                    <div>
                        <p className='mb-0 text-lg font-medium md:w-3/4 m-auto'>To get your score</p>
                        <Link href="/wealthometer">
                            <Button size='small' padding={'px-1 sm:px-4 sm:py-2 max-w-fit'} boxShadow={false} onClick={() => null}>
                                <span className='text-sm sm:text-base font-medium'>Use WealthoMeter</span>
                            </Button>
                        </Link>
                    </div>
                )}
            </>
        </div>
    )
}
