"use client"

import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io'
import React, { useState } from 'react'

import CardTitle from '../components/CardTitle';
import MutualFundCard from './MobileCard';
import { TableHeader } from '../components/Table';
import { formatNumber } from '../components/Table';
import { usePathname } from 'next/navigation'

const MutualFundHeaders = ["Fund Name", 'Unit Balance \n NAV*' ,'Current Value','Total Return \n Return % ', '% of Portfolio']
const leftAlignable = ["Fund Name", 'Company Name', 'Name of Investment', "Investment Amount"]

const MutualFunds = ({mutualFunds, netWorth = 1}) => {
  const [show, setShow] = useState(false)

  const totalReturn = mutualFunds?.reduce((prev, curr) => prev + (curr.invested_amount === "N/A" ? 0 : (curr.amount - curr.invested_amount)), 0)
  const totalCurrentValue = mutualFunds?.reduce((prev, curr) => prev + curr.amount, 0)
  const totalReturnPercentage = totalReturn / (totalCurrentValue - totalReturn)

  const pathname = usePathname();
  const demo = pathname?.includes('/demo');

  return (
    <section>
    <div className='w-full dashboard-card'>
        <div className='flex justify-between items-center'>
            <CardTitle itemKey={"mutualFunds"} />
            {!show ? <IoIosArrowDropupCircle className='text-primary-button text-2xl cursor-poitner' onClick={() => setShow(true)}/> : <IoIosArrowDropdownCircle className='text-primary-button text-2xl cursor-poitner' onClick={() => setShow(false)}/> }
        </div>
        <table className={`w-full px-4 hidden md:table`}>
            <TableHeader header={MutualFundHeaders} headerStyles={"px-4"} alignLeft={leftAlignable} alignRight={MutualFundHeaders.filter(it => it !== leftAlignable[0])} />
            <tbody>
            {show ? (
                <>
                    {mutualFunds?.map((row, index1)=>(
                        <tr key={index1} className={`${index1%2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} text-primary-blue`}>
                            <td  className={`m-auto p-4 text-left w-[400px]`}>
                                <p className='w-full capitalize'>{demo ? `Fund ${index1 + 1}` : row.name}</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[200px]`}>
                                <p className='w-full mb-0'>{formatNumber(row.quantity, 1)}</p> 
                                <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.current_price,2)}</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.amount,0)}</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                {row.invested_amount === "N/A" ? '-' : (
                                    <>
                                        <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber((row.amount) - row.invested_amount, 0)}</p> 
                                        <p className='w-full mb-0'>{formatNumber((((row.amount) - row.invested_amount) / row.invested_amount) * 100, 1)}%</p> 
                                    </>
                                )}
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full mb-0'>{formatNumber(row.percentage, 1)} %</p> 
                            </td>
                        </tr>
                    ))}
                </>
            ) : null}
                <tr>
                    <td colSpan="6" className="my-4 bg-primary-blue h-1 w-full"></td>
                </tr>
                <tr className={`text-primary-blue`} onClick={() => setShow(!show)}>
                    <td  className={`m-auto p-4 text-left w-[400px]`}>
                        <p className='w-full'>Sub Total</p> 
                    </td>
                    <td  className={`m-auto p-4 text-right w-[200px]`}>
                    </td>
                    <td  className={`m-auto p-4 text-right w-[180px]`}>
                        <p className='w-full'><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(totalCurrentValue) ? formatNumber(totalCurrentValue, 0) : '-'}</p> 
                    </td>
                    <td  className={`m-auto p-4 text-right w-[180px]`}>
                        <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(totalReturn) ? formatNumber(totalReturn, 0) : '-'}</p> 
                        <p className='w-full mb-0'>
                            {!isNaN(totalReturnPercentage * 100) ? formatNumber(totalReturnPercentage * 100, 1) : '-'}%
                            {/* {formatNumber(mutualFunds?.reduce((prev, curr) => prev + (curr.amount - (curr.cost === "N/A" ? 0 : curr.invested_amount))/ (curr.cost === "N/A" ? 1 : curr.invested_amount), 0),1)}% */}
                        </p> 
                    </td>
                    <td  className={`m-auto p-4 text-right w-[180px]`}>
                        <p className='w-full'>{!isNaN(mutualFunds?.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(mutualFunds?.reduce((prev, curr) => prev + curr.percentage, 0), 1) : '-'} %</p> 
                    </td>
                </tr>
                <tr>
                    <td colSpan="6" className="py-4 w-full">
                        * NAVs are approximate. We are working to improve its accuracy.
                    </td>
                </tr>
            </tbody>
        </table> 
    </div>
    <div>
        {show && mutualFunds?.map((it, index) => 
            <MutualFundCard 
                key={index} 
                name={demo ? `Fund ${index + 1}` : it.name} 
                units={formatNumber(it.quantity, 3)}
                percentage={formatNumber(it.percentage, 1)}
                nav={'% Return'}
                currentVal={it.amount}
                percentageChange={formatNumber((((it.amount) - it.invested_amount) / it.invested_amount) * 100, 1)}
                totalReturn={formatNumber((it.amount) - it.invested_amount, 0)}
                // percentReturn={formatNumber((((it.amount) - it.invested_amount) / it.invested_amount) * 100, 1)}
            />
        )}
            <MutualFundCard 
                key={"total"} 
                name={"Sub Total"} 
                units={formatNumber(mutualFunds?.reduce((prev, curr) => prev + curr.quantity, 0), 1)}
                percentage={formatNumber(mutualFunds?.reduce((prev, curr) => prev + curr.percentage, 0), 1)}
                nav={'% Return'}
                currentVal={totalCurrentValue}
                percentageChange={formatNumber(totalReturnPercentage * 100, 1)}
                totalReturn={formatNumber(totalReturn, 0)}
                // percentReturn={formatNumber(totalReturnPercentage * 100, 1)}
            />
        
    </div>
</section>
  )
}

export default MutualFunds