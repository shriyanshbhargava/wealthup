import React from 'react'
import { formatNumber } from '../components/Table'
import { formatPerformance } from './Perfomance'

const FundAccordionTitle = ({name, amt, performance, percentage}) => {
    return(
        <div className='text-white bg-primary-blue w-full rounded-md px-3 sm:px-4'>
            <div className='w-full flex justify-between gap-4 py-2 items-center'>
                <span className='max-w-[220px] sm:max-w-max text-left'>{name}</span>
                <span className='font-medium'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(amt, 0)}</span>
            </div>
            <div className='w-full flex justify-between gap-4 pb-2'>
                <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3'>
                    <span className='rounded-full w-2 h-2 inline-block' style={{backgroundColor:formatPerformance(performance).color}}></span>
                    <span >{formatPerformance(performance).label}</span>
                </span> 
                <span>{formatNumber(percentage,1)}% of portfolio</span>
            </div>
        </div>
    )
}


export default FundAccordionTitle