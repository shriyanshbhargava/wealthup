import CardTitle from '../components/CardTitle'
import FundLevelCard from './FundLevelCard'
import React from 'react'
import { formatNumber } from '../components/Table'

export const VolatilityAnalysis = ({ risk }) => {
  return (
    <section>
        <div className='w-full dashboard-card '>
            <CardTitle itemKey={"volatilityAnalysis"} />
            <div className='hidden md:block'>
                <table className='w-full px-4'>
                    {/* <TableHeader header={volatilityHeaders} alignRight={["% of Portfolio", "Current Value", "No. of Funds"]} headerStyles={'px-4'} /> */}
                    <thead className='bg-primary-blue text-white'>
                        <tr className='py-6 rounded-lg'>
                            <th className='text-lg font-medium py-3 whitespace-pre-line text-left p-4'>
                                Volatility
                            </th>
                            <th className='text-lg font-medium py-3 whitespace-pre-line text-right p-4'>
                                Current Price
                            </th>
                            <th className='text-lg font-medium py-3 whitespace-pre-line text-right p-4'>
                                % of Portfolio
                            </th>
                            <th className='text-lg font-medium py-3 whitespace-pre-line text-right p-4'>
                                No. of Funds
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {risk && risk?.map((it, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? "bg-white" : 'bg-[#99e0e0]'} text-primary-blue text-base font-bold`}>
                            <td  className={`p-4 m-auto text-left w-[400px]`}>
                                <p className='w-full mb-0 '>
                                <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3 font-medium'>
                                    {it.title}
                                </span>    
                                </p> 
                            </td>
                            <td  className={`p-4 m-auto text-right w-[180px]`}>
                                <p className='w-full mb-0 font-normal'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(it.amount, 0)}</p> 
                            </td>
                            <td  className={`p-4 m-auto text-right w-[180px]`}>
                                <p className='w-full mb-0 font-normal'>{formatNumber(it.percentage, 1)}%</p> 
                            </td>
                            <td  className={`p-4 m-auto text-right w-[246px]`}>
                                <p className='w-full mb-0 font-normal'>{it.fund_size}</p> 
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className="my-4 bg-primary-blue h-1 w-full"></td>
                    </tr>
                    <tr className={` text-primary-blue text-base font-bold`}>
                        <td  className={`p-4 m-auto text-left`}>
                            <p className='w-full mb-0 '>
                            <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3 font-bold'>
                                {/* <span className='rounded-full w-2 h-2 inline-block' style={{backgroundColor:perfomanceBreakDownColors[index1]}}></span> */}
                                Total
                            </span>    
                            </p> 
                        </td>
                        <td  className={`p-4 m-auto text-right`}>
                            <p className='w-full mb-0 font-bold'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(risk?.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(risk?.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p> 
                        </td>
                        <td  className={`p-4 m-auto text-right`}>
                            <p className='w-full mb-0 font-bold'>{!isNaN(risk?.reduce((prev, curr) => prev + (curr.percentage || 0), 0)) ? formatNumber(risk?.reduce((prev, curr) => prev + (curr.percentage || 0), 0), 0) : '-'}%</p> 
                        </td>
                        <td  className={`p-4 m-auto text-right`}>
                            <p className='w-full mb-0 font-bold'>{!isNaN(risk?.reduce((prev, curr) => prev + (curr.fund_size || 0), 0)) ? formatNumber(risk?.reduce((prev, curr) => prev + (curr.fund_size || 0), 0), 0) : '-'}</p> 
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className='md:hidden'>
            {risk && 
                risk.map((item,index) =>  
                    <FundLevelCard key={index} fund={item.title} value={item.amount} percentage={formatNumber(item.percentage, 1)} />)
            }
            <FundLevelCard 
                key={"total"} 
                fund={"Total"} 
                value={risk?.reduce((prev, curr) => prev + (curr.amount || 0), 0)} 
                percentage={risk?.reduce((prev, curr) => prev + (curr.percentage || 0), 0)} 
            />
            
        </div>
    </section>
  )
}
