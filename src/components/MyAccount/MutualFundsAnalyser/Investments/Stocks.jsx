"use client"

import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io'
import React, { useState } from 'react'

import CardTitle from '../components/CardTitle';
import MutualFundCard from './MobileCard';
import { TableHeader } from '../components/Table';
import { formatNumber } from '../components/Table';
import { usePathname } from 'next/navigation'

const StockHeaders = ['Company Name', 'No. of Shares \n Last Price' ,'Current Value','1-Day Change \n % Change', '% of Portfolio']

const Stocks = ({stocks, netWorth = 1}) => {
  const [show, setShow] = useState(false);

  const totalReturn = stocks?.reduce((prev, curr) => prev + curr.day_change, 0)
  const totalCurrentValue = stocks?.reduce((prev, curr) => prev + curr.amount, 0)
  const totalReturnPercentage = totalReturn / (totalCurrentValue - totalReturn)


  const pathname = usePathname();
  const demo = pathname?.includes('/demo')

  return (
    <section>
        <div className='w-full dashboard-card'>
            <div className='flex justify-between items-center'>
                <CardTitle itemKey={"stocks"} />
                {!show ? <IoIosArrowDropupCircle className='text-2xl cursor-poitner text-primary-button' onClick={() => setShow(true)}/> : <IoIosArrowDropdownCircle className='text-2xl cursor-poitner text-primary-button' onClick={() => setShow(false)}/> }
            </div>
            <table className={`w-full px-4 hidden md:table`}>
                <TableHeader header={StockHeaders} headerStyles={"px-4"} alignLeft={['Company Name'] } alignRight={StockHeaders.filter(it => it !== 'Company Name')} />
                <tbody>
                {show ? (
                    <>
                        {stocks?.map((row, index1)=>(
                            <tr key={index1} className={`${index1%2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} text-primary-blue`}>
                                <td  className={`m-auto p-4 text-left w-[400px]`}>
                                    <p className='w-full mb-0'>{demo ? `Company ${index1 + 1}` : row.name}</p> 
                                </td>
                                <td  className={`m-auto p-4 text-right w-[200px]`}>
                                    <p className='w-full mb-0'>{parseInt(row.quantity.toString())}</p> 
                                    <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.current_price,2)}</p>
                                </td>
                                <td  className={`m-auto p-4 text-right w-[180px]`}>
                                    <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.amount,0)}</p> 
                                </td>
                                <td  className={`m-auto p-4 text-right w-[180px]`}>
                                    <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(row.day_change, 0)}</p> 
                                    <p className='w-full mb-0'>{formatNumber(row.percent_change, 1)}%</p> 
                                </td>
                                <td  className={`m-auto p-4 text-right w-[180px]`}>
                                    <p className='w-full mb-0'>{formatNumber(row.percentage, 1)} %</p> 
                                </td>
                            </tr>
                        ))}
                    </>
                ) : null}
                <tr>
                    <td colSpan="5" className="my-4 bg-primary-blue h-1 w-full"></td>
                </tr>
                <tr className={`text-primary-blue`} onClick={() => setShow(!show)}>
                        <td  className={`m-auto p-4 text-left w-[400px]`}>
                            <p className='w-full mb-0'>Sub Total</p> 
                        </td>
                        <td  className={`m-auto p-4 text-right w-[200px]`}>
                            -
                        </td>
                        <td  className={`m-auto p-4 text-right w-[180px]`}>
                            <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(stocks?.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(stocks?.reduce((prev, curr) => prev + curr.amount, 0),0) : '-'}</p> 
                        </td>
                        <td  className={`m-auto p-4 text-right w-[180px]`}>
                        <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(totalReturn) ? formatNumber(totalReturn, 0) : '-'}</p> 
                        <p className='w-full mb-0'>
                            {!isNaN(totalReturnPercentage * 100) ? formatNumber(totalReturnPercentage * 100, 1) : '-'}%
                            {/* {formatNumber(stocks?.reduce((prev, curr) => prev + (curr.amount - (curr.cost === "N/A" ? 0 : curr.invested_amount))/ (curr.cost === "N/A" ? 1 : curr.invested_amount), 0),1)}% */}
                        </p> 
                    </td>
                        <td  className={`m-auto p-4 text-right w-[180px]`}>
                            <p className='w-full mb-0'>{!isNaN(stocks?.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(stocks?.reduce((prev, curr) => prev + curr.percentage, 0), 1) : '-'} %</p> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            {show && stocks?.map((it, index) => 
                <MutualFundCard 
                    key={index} 
                    name={demo ? `Company ${index + 1}` : it.name} 
                    units={formatNumber(it.quantity, 0)}
                    percentage={formatNumber(it.percentage, 1)}
                    nav={"1-Day % change"}
                    currentVal={it.amount}
                    percentageChange={it.percent_change}
                />
            )}
            <MutualFundCard 
                key={"total"} 
                name={"Sub Total"} 
                units={formatNumber(stocks?.reduce((prev, curr) => prev + parseFloat(curr.quantity), 0), 1)}
                percentage={formatNumber(stocks?.reduce((prev, curr) => prev + curr.percentage, 0), 1)}
                nav={'1-Day % change'}
                currentVal={stocks?.reduce((prev, curr) => prev + curr.amount, 0)}
                percentageChange={!isNaN(totalReturnPercentage * 100) ? formatNumber(totalReturnPercentage * 100, 0) : '-'}
            />
            
        </div>
    </section>
  )
}

export default Stocks