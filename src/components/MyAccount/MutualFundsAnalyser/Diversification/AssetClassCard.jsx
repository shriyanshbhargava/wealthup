import React from 'react'
import { formatNumber } from '../components/Table'

const AssetClassCard = ({asset, value, percentage, funds}) =>{
    return (
        <div className='dashboard-card text-lg text-primary-blue px-12 mb-5'>
            <div className='py-4 flex justify-between items-center bg-[#99e0e0] rounded-lg px-2 font-semibold'>
                <span>{asset}</span>
                <span><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(value, 0)}</span>
            </div>
            <div className='flex flex-col px-2 font-medium text-base pt-3'>
                <div className='flex justify-between'>
                    <span>No. of Funds</span>
                    <span>{funds}</span>
                </div>
                <div className='flex justify-between'>
                    <span>% of Portfolio</span>
                    <span>{formatNumber(percentage,1)}%</span>
                </div>
            </div>
        </div>
    )
}

export default AssetClassCard