import React from 'react'
import { formatNumber } from '../components/Table'

const FundAccordionContent = ({oneyear, twoyear, threeyear}) => {
    return(
        <div className=''>
            <div className='px-3 sm:px-4 w-full flex justify-between gap-4 py-2 items-center text-primary-blue'>
                <span className='max-w-[220px] sm:max-w-max text-left'>1-yr Missed Gain</span>
                {oneyear >0 ? <span className='font-medium'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(oneyear, 0)}</span> : '-'}
            </div>
            <div className='px-3 sm:px-4 w-full flex justify-between gap-4 py-2 items-center text-primary-blue rounded-lg bg-[#99e0e0]'>
                <span className='max-w-[220px] sm:max-w-max text-left'>2-yr Missed Gain</span>
                {twoyear >0 ? <span className='font-medium'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(twoyear, 0)}</span> : '-'}
            </div>
            <div className='px-3 sm:px-4 w-full flex justify-between gap-4 py-2 items-center text-primary-blue'>
                <span className='max-w-[220px] sm:max-w-max text-left'>3-yr Missed Gain</span>
                {threeyear >0 ? <span className='font-medium'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(threeyear, 0)}</span> : '-'}
            </div>
        </div>
    )
}

export default FundAccordionContent