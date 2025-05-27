import React from 'react'
import { formatNumber } from '../components/Table'

const FundLevelCard = ({fund, value, percentage, volatility}) =>{
    return (
        <div className='dashboard-card text-lg  px-12 my-5'>
            <div className='py-4 flex justify-between items-center bg-[#069] text-white rounded-lg px-2 font-semibold'>
                <span className='basis-2/3'>{fund}</span>
                <span className='basis-1/3 text-right'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(value, 0)}</span>
            </div>
            <div className={`flex flex-col  font-medium text-base text-primary-blue  ${volatility ? "px-2" : 'my-2 rounded-lg '}`}>
                {volatility && 
                <div className='flex justify-between py-2'>
                    <span>Volatility</span>
                    <span>{volatility}</span>
                </div> }
                <div className={`flex justify-between ${volatility ? '' : 'bg-[#99E0E0] p-2 rounded-lg'}`}>
                    <span>% of Portfolio</span>
                    <span>{formatNumber(percentage, 1)}%</span>
                </div>
            </div>
        </div>
    )
}

export default FundLevelCard