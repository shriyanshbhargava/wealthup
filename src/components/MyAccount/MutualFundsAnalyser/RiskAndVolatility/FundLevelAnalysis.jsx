import { BiLockAlt } from 'react-icons/bi'
import CardTitle from '../components/CardTitle'
import { FundAnalysisAccess } from '@/components/FundAnalysisAccess'
import FundLevelCard from './FundLevelCard'
import React from 'react'
import { formatNumber } from '../components/Table'

export const FundLevelAnalysis = ({ funds }) => {
  return (
    <section>
        <div className='w-full dashboard-card text-center flex flex-col mb-6'>
            <CardTitle itemKey={"fundLevelAnalysis"} />
            {(!funds || !funds.length) && (<div className="w-full flex flex-col items-center justify-center">
                <FundAnalysisAccess />
            </div>)}
            {funds && (
                <div className='hidden md:block'>
                    <table className='w-full px-4'>
                        {/* <TableHeader header={volatilityFundLevelTableHeaders} alignRight={["% of Portfolio", "Current Value"]} headerStyles={"px-4"}  /> */}
                        <thead className='bg-primary-blue text-white'>
                            <tr className='py-6 rounded-lg'>
                                <th className='text-lg font-medium py-3 whitespace-pre-line text-left p-4'>
                                    Fund Name
                                </th>
                                <th className='text-lg font-medium py-3 whitespace-pre-line text-right p-4'>
                                    Current Price
                                </th>
                                <th className='text-lg font-medium py-3 whitespace-pre-line text-right p-4'>
                                    % of Portfolio
                                </th>
                                <th className='pl-16 text-lg font-medium py-3 whitespace-pre-line text-left p-4'>
                                    Volatility
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds && funds.map((fund, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-white" : 'bg-[#99e0e0]'} text-primary-blue text-base font-bold`}>
                                    <td  className={`p-4 text-left capitalize font-medium w-[400px]`}>
                                        {fund.fund_name}
                                        {/* <p className='w-full'>
                                        <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3 font-medium'>
                                            {fund.fund_name}
                                        </span>    
                                        </p>  */}
                                    </td>
                                    <td  className={`p-4 text-right w-[180px]`}>
                                        <p className='w-full font-normal'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(fund.amount, 0)}</p> 
                                    </td>
                                    <td  className={`p-4 text-right w-[180px]`}>
                                        <p className='w-full font-normal'>{formatNumber(fund.percentage, 1)}%</p> 
                                    </td>
                                    <td  className={`p-4 mx-auto pl-16 text-left w-[246px]`}>
                                        <p className='w-full font-normal'>{fund.volatilty_relative_to_market}</p> 
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} className="my-4 bg-primary-blue h-1 w-full"></td>
                            </tr>
                            <tr className={`bg-white text-primary-blue text-base font-bold`}>
                                <td  className={`p-4 text-left capitalize font-bold`}>
                                    Total
                                </td>
                                <td  className={`p-4 text-right w-[180px]`}>
                                    <p className='w-full font-bold'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(funds?.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(funds?.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p> 
                                </td>
                                <td  className={`p-4 text-right w-[180px]`}>
                                    <p className='w-full font-bold'>{!isNaN(funds?.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(funds?.reduce((prev, curr) => prev + curr.percentage, 0), 0) : '-'}%</p> 
                                </td>
                                <td  className={`p-4 mx-auto pl-16 text-left w-[246px]`}>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>

        <div className='md:hidden mb-10'>
                {funds && 
                    funds.map((row, index) => 
                        <FundLevelCard key={index} fund={row.fund_name} value={row.amount} percentage={row.percentage} volatility={row.volatilty_relative_to_market}/>)
                }
                {funds && (
                    <FundLevelCard 
                        key={"total"} 
                        fund={"Total"} 
                        value={funds?.reduce((prev, curr) => prev + curr.amount, 0)} 
                        percentage={funds?.reduce((prev, curr) => prev + (curr.percentage || 0), 0)} 
                    />
                )}
                
        </div>
    </section>
  )
}
