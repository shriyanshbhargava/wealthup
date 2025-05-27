"use client"

import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io'
import React, { useState } from 'react'
import { TableHeader, formatNumber } from '../components/Table';

import { Accordion } from '@/components/ui/Accordion';
import AccordionContent from './AccordionContent';
import CardTitle from '../components/CardTitle';
import { usePathname } from 'next/navigation'

const otherHeaders = ['Name of Investment', 'Investment Amount' ,'Current Value','Total Return \n Return %', '% of Portfolio']
const leftAlignable = ['Company Name', 'Fund Name', 'Name of Investment', "Investment Amount"]

const Others = ({others, netWorth, totalReturn, totalReturnPercentage }) => {
  const [show, setShow] = useState(false);

  const pathname = usePathname();
  const demo = pathname?.includes('/demo');

  return (
    <section className='mb-10'>
            <div className='w-full dashboard-card'>
                <div className='flex justify-between items-center'>
                    <CardTitle itemKey={"otherInvst"} />
                    {!show ? <IoIosArrowDropupCircle className='text-2xl cursor-poitner text-primary-button' onClick={() => setShow(true)}/> : <IoIosArrowDropdownCircle className='text-2xl cursor-poitner text-primary-button' onClick={() => setShow(false)}/> }
                </div>
                <table className={`w-full px-4 hidden md:table`}>
                    <TableHeader header={otherHeaders} headerStyles={"px-4"} alignLeft={leftAlignable} alignRight={otherHeaders.filter(it => it !== leftAlignable[0])} />
                    <tbody>
                        {show && (
                            <>
                                {others.map((it, index) => (
                                    <tr  className={`bg-white text-primary-blue`} key={index}>
                                        <td  className={`m-auto p-4 text-left w-[400px]`}>
                                            <p className='w-full mb-0'>{it.name}</p> 
                                        </td>
                                        <td  className={`m-auto p-4 text-right w-[200px]`}>
                                            <p className='w-full text-center pr-5'>-</p> 
                                        </td>
                                        <td  className={`m-auto p-4 text-right w-[180px]`}>
                                            <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(it.amount, 0)}</p> 
                                        </td>
                                        <td  className={`m-auto p-4 text-right w-[180px]`}>
                                            <p className='w-full pr-5'>-</p> 
                                        </td>
                                        <td  className={`m-auto p-4 text-right w-[180px]`}>
                                            <p className='w-full mb-0'>{formatNumber(it.percentage, 1)}%</p> 
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                        <tr>
                            <td colSpan="5" className="my-4 bg-primary-blue h-1 w-full"></td>
                        </tr>
                        <tr  className={`bg-white text-primary-blue`} onClick={() => setShow(!show)}>
                            <td  className={`m-auto p-4 text-left w-[400px]`}>
                                <p className='w-full mb-0'>Sub Total</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[200px]`}>
                                <p className='w-full text-center pr-5'>-</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(others.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(others.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full pr-5'>-</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full mb-0'>{!isNaN(others.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(others.reduce((prev, curr) => prev + curr.percentage, 0), 1) : '-'}%</p> 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="5" className="my-4 bg-primary-blue h-1 w-full"></td>
                        </tr>
                        <tr  className={`bg-white text-primary-blue`}>
                            <td  className={`m-auto p-4 text-left w-[400px]`}>
                                <p className='w-full mb-0'>Total</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[200px]`}>
                                <p className='w-full text-center pr-5'>-</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full mb-0'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(netWorth) ? formatNumber(netWorth, 0) : '-'}</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full pr-5 mb-0'>{formatNumber(totalReturn, 0)}</p> 
                                <p className='w-full pr-5 mb-0'>{formatNumber(totalReturnPercentage * 100, 1)}%</p> 
                            </td>
                            <td  className={`m-auto p-4 text-right w-[180px]`}>
                                <p className='w-full mb-0'>100%</p> 
                            </td>
                        </tr>
                        {/** Show totol just like sub total */}
                    </tbody>
                </table>
            </div>
            <div>
                <div className='rounded-xl p-1 bg-white relative text-lg  my-3 card-shadow md:hidden'>
                    {show && others.map((it, index) => (
                        <Accordion 
                            key={index}
                            title="" 
                            subtitle={<div className='flex justify-between py-4 bg-[#069] text-white rounded-lg px-3 font-semibold text-base '>
                                        <span>{it.name}</span> 
                                        <span><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(it.amount, 0)} </span> 
                                    </div>} 
                            content={<AccordionContent amount={formatNumber(it.amount, 0)}  percentage={formatNumber(it.percentage, 1)} totalReturn={'-'} percentReturn={'-'} />} 
                            padding={false}
                        />
                    ))}
                    <Accordion 
                        title="" 
                        subtitle={<div className='flex justify-between py-4 bg-[#069] text-white rounded-lg px-3 font-semibold text-base '>
                                    <span>Sub Total</span> 
                                    <span><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(others.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(others.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</span> 
                                </div>} 
                        content={<AccordionContent amount={formatNumber(Math.round(others.reduce((prev, curr) => prev + curr.amount, 0)), 0)}  percentage={formatNumber(others.reduce((prev, curr) => prev + curr.percentage, 0), 1)} totalReturn={'-'} percentReturn={'-'} />} 
                        padding={false}
                    />
                    <Accordion 
                        title="" 
                        subtitle={<div className='flex justify-between py-4 bg-[#069] text-white rounded-lg px-3 font-semibold text-base '>
                                    <span>Total</span> 
                                    <span><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(netWorth) ? formatNumber(netWorth, 0) : '-'}</span> 
                                </div>} 
                        content={<AccordionContent amount={formatNumber(Math.round(netWorth), 0)}  percentage={100} totalReturn={formatNumber(totalReturn, 0)} percentReturn={formatNumber(totalReturnPercentage * 100, 1)} />} 
                        padding={false}
                    />
                </div>
            </div>
        </section>
  )
}

export default Others