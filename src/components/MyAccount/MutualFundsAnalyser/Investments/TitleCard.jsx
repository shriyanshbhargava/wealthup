import React from 'react'
import {formatNumber} from '../components/Table';

const TitleCard = ({name, currentVal, percentageChange, nav}) => {
    return(
        <div className='text-base py-4 bg-[#069] text-white rounded-lg px-3 font-semibold'>
            <div className='flex justify-between items-center  '>
                <span className='basis-2/3 capitalize'>{name}</span>
                <span className='basis-1/3 text-right'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(currentVal, 0)}</span>
            </div>
            <div className='flex justify-between items-center'>
                <span className='basis-2/3'><span style={{fontFamily:'sans-serif'}}>{typeof nav === 'string' ? '' : '₹'}</span>{typeof nav === 'string' ? nav : formatNumber(nav,0)}</span>
                <span className='basis-1/3 text-right'>{isNaN(percentageChange) ? '-' : formatNumber(percentageChange,1)}{isNaN(percentageChange) ? '' : '%'}</span>
            </div>
        </div>
    )
}

export default TitleCard