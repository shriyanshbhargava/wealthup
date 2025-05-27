import { formatPerformance, perfomanceBreakDownColors, performanceLabels } from './Perfomance'

import React from 'react'
import { formatNumber } from '../components/Table'

const PerformanceAccordionTitle = ({performance, amt, percentage, index}) => {
    return(
        <>
            <div className='text-white bg-primary-blue w-full rounded-md px-3 sm:px-4 py-1 my-1 flex justify-between'>
                <span key={index} className='m-0 p-0 text-base flex items-center gap-1 md:gap-3'>
                    {index < 3 && (
                        <span className='rounded-full w-2 h-2 inline-block' style={{backgroundColor:perfomanceBreakDownColors[index]}}></span>
                    )}
                    <span >{performanceLabels[index]}</span>
                </span>  
                <span><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(amt, 0)}</span>
            </div>
            <div className='text-primary-blue bg-[#99e0e0] w-full rounded-md px-3 sm:px-4 py-1 my-1 flex justify-between'>
                <span>% of Portfolio</span>
                <span>{formatNumber(percentage,1)}%</span>
            </div>
        </>
    )
}

export default PerformanceAccordionTitle