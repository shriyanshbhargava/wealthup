import Button from '@/components/ui/ButtonNew'
import Link from 'next/link'
import React from 'react'
import { formatNumber } from '../components/Table'

const SummaryCard = ({currentValue, missedGain, totalFunds, fundsRed}) => {
  return (
    <section className='p-4 pb-8 bg-[#e6f9f5] md:bg-[#e6f9f596] rounded-lg w-full flex flex-col gap-4 text-primary-blue mb-10'>
        <div className='flex gap-2 items-center'>
            <h5>MF Portfolio Summary</h5>
        </div>
        <div className='flex flex-col md:flex-row gap-8 justify-center w-full md:w-11/12 m-auto'>
            <Link href="/myaccount/portfolio-analyser/investments" className='dashboard-card md:basis-1/3 text-center'>
                <div>
                    <h5 className='mb-0'>Your Current MF Value</h5>
                    <p className='text-2xl md:text-3xl lg:text-4xl font-bold py-2 md:py-6 mb-0'>
                        <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(currentValue, 0)}
                    </p>
                </div>
            </Link>
            <Link href="/myaccount/portfolio-analyser/performance" className='dashboard-card md:basis-1/3 text-center'>
                <div>
                    <h5 className='mb-0'>Missed Gains</h5>
                    <p className='text-2xl md:text-3xl lg:text-4xl font-bold py-2 md:py-6 mb-0 text-red-600'>
                        <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(missedGain, 0)} <span className="text-xs">Annually</span>
                    </p>
                    {/* <div className='w-full m-auto md:absolute -bottom-16 right-1/2 md:translate-x-1/2'>
                        <button className='w-fit m-auto md:w-4/5 xl:w-3/5 px-4 py-2 rounded text-white bg-primary-blue text-base md:text-xl'>Know More</button>
                    </div> */}
                </div>
            </Link>
            <Link href="/myaccount/portfolio-analyser/diversification" className='dashboard-card md:basis-1/3 text-center'>
                <div>
                    <h5 className='mb-0'>No. Of Funds</h5>
                    <p className={`text-2xl md:text-3xl lg:text-4xl font-bold py-2 md:py-6 mb-0 ${fundsRed ? 'text-red-600' : 'text-primary-blue'}`}>{totalFunds}</p>
                    {/* <div className='md:absolute -bottom-16 w-10/12 m-auto'>
                        <Button size='small' padding={'w-fit m-auto md:w-4/5 xl:w-3/5 px-4 py-2 rounded text-white text-base md:text-xl'} boxShadow={false}>
                            <span className='text-base md:text-xl'>Critical Level</span>
                    </Button>
                    </div> */}
                </div>
            </Link>
        </div>
    </section>
  )
}

export default SummaryCard