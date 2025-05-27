import { TableHeader, formatNumber, titleCase } from '../components/Table'

import { Accordion } from '@/components/ui/Accordion'
import { BiLockAlt } from 'react-icons/bi'
import CardTitle from '../components/CardTitle'
import FundAccordionContent from './FundAccordionContent'
import FundAccordionTitle from './FundAccordionTitle'
import { FundAnalysisAccess } from '@/components/FundAnalysisAccess'
import { Input } from '@mui/material'
import React from 'react'
import Storage from '@/utils/storage'
import { UserApi } from '@/api/services/user/UserApi'
import { formatPerformance } from './Perfomance'
import { toast } from 'react-toastify'
import { usePathname } from 'next/navigation'

export const FundLevelAnalysis = ({ fundAnanlysisHeaders, fundAnalysis, setFetchAgain }: { fundAnanlysisHeaders: Array<string>, fundAnalysis: Array<any>, setFetchAgain: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const pathname = usePathname();
    const demo = pathname?.includes('/demo')

    return (
        <section>
            <div className='w-full dashboard-card text-center flex flex-col my-6'>
                <div className='hidden md:block'>
                    <CardTitle itemKey={"fundLevelAnalysis"} />
                </div>
                {(!fundAnalysis || !fundAnalysis.length) && (
                    <FundAnalysisAccess setFetchAgain={setFetchAgain} />
                )}
                {(fundAnalysis && fundAnalysis.length > 0) && (
                    <div className='hidden md:block relative'>
                        <table className={`w-full px-4 max-w-full`}>
                            <TableHeader header={fundAnanlysisHeaders} alignLeft={["Fund Name", "Performance"]} alignRight={["% of Portfolio"]} headerStyles={"px-4"} missedGains />
                            <tbody>
                                {fundAnalysis?.map((row, index1) => (
                                    <tr key={index1} className={`${index1 % 2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} text-primary-blue`}>
                                        <td className={`px-4 py-4    max-w-[250px] m-auto text-left`}>
                                            <p className='w-full m-auto text-base font-medium'>{titleCase(demo ? `Fund ${index1 + 1}` : row.fund_name)}</p>
                                        </td>
                                        <td className={`px-4 py-4  max-w-[150px] m-auto text-right`}>
                                            <p className='w-[105px] m-auto text-base font-normal'><span style={{ fontFamily: 'sans-serif' }}>₹</span> {formatNumber(row.amount, 0)}</p>
                                        </td>
                                        <td className={`px-4 py-4   max-w-[180px] m-auto text-right`}>
                                            <p className='w-full m-auto text-base font-normal'>{formatNumber(row.percentage * 100, 1)}%</p>
                                        </td>
                                        <td className={`px-4 py-4  max-w-[180px] m-auto text-right`}>
                                            <p className='w-full m-auto text-base font-normal'>
                                                <span key={index1} className='m-0 p-0 text-base flex items-center gap-1 md:gap-3'>
                                                    <span className='rounded-full w-2 h-2 inline-block' style={{ backgroundColor: formatPerformance(row.relative_performance).color }}></span>
                                                    <span >{formatPerformance(row.relative_performance).label}</span>
                                                </span>
                                            </p>
                                        </td>
                                        <td className={`px-4 py-4  max-w-[180px] m-auto text-right`}>
                                            <p className='w-full m-auto text-base font-normal'>
                                                {row.oneYear > 0 ? <span><span style={{ fontFamily: 'sans-serif' }}>₹</span> {formatNumber(row.oneYear, 0)}</span> : '-'}
                                            </p>
                                        </td>
                                        <td className={`px-4 py-4   max-w-[180px] m-auto text-right`}>
                                            {row.twoYear > 0 ? <span><span style={{ fontFamily: 'sans-serif' }}>₹</span> {formatNumber(row.twoYear, 0)}</span> : '-'}
                                        </td>
                                        <td className={`px-4 py-4   max-w-[180px] m-auto text-right`}>
                                            <p className='w-full m-auto text-base font-normal'>
                                                {row.threeYear > 0 ? <span><span style={{ fontFamily: 'sans-serif' }}>₹</span> {formatNumber(row.threeYear, 0)}</span> : '-'}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={7} className="my-4 bg-primary-blue h-1 w-full"></td>
                                </tr>
                                <tr className={`bg-white text-primary-blue`}>
                                    <td className={`px-4 py-4  max-w-[250px] m-auto text-left`}>
                                        <p className='w-full m-auto text-base font-bold'>Total</p>
                                    </td>
                                    <td className={`px-4 py-4  max-w-[150px] m-auto text-right`}>
                                        <p className='w-[105px] m-auto text-base font-bold'><span style={{ fontFamily: 'sans-serif' }}>₹</span> {!isNaN(fundAnalysis?.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(fundAnalysis?.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p>
                                    </td>
                                    <td className={`px-4 py-4   max-w-[180px] m-auto text-right`}>
                                        <p className='w-full m-auto text-base font-bold'>{!isNaN(fundAnalysis?.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(fundAnalysis?.reduce((prev, curr) => prev + curr.percentage, 0) * 100, 0) : '-'}%</p>
                                    </td>
                                    <td className={`px-4 py-4  max-w-[180px] m-auto text-right`}>
                                    </td>
                                    <td className={`px-4 py-4  max-w-[180px] m-auto text-right`}>
                                        <p className='w-full m-auto text-base font-bold'>
                                            <span style={{ fontFamily: 'sans-serif' }}>₹</span> {!isNaN(fundAnalysis?.reduce((prev, curr) => prev + (curr.oneYear > 0 ? curr.oneYear : 0), 0)) ? formatNumber(fundAnalysis?.reduce((prev, curr) => prev + (curr.oneYear > 0 ? curr.oneYear : 0), 0), 0) : '-'}
                                        </p>
                                    </td>
                                    <td className={`px-4 py-4   max-w-[180px] m-auto text-right`}>
                                        <p className="w-full m-auto text-base font-bold"><span style={{ fontFamily: 'sans-serif' }}>₹</span> {!isNaN(fundAnalysis?.reduce((prev, curr) => prev + (curr.twoYear > 0 ? curr.twoYear : 0), 0)) ? formatNumber(fundAnalysis?.reduce((prev, curr) => prev + (curr.twoYear > 0 ? curr.twoYear : 0), 0), 0) : '-'}</p>
                                    </td>
                                    <td className={`px-4 py-4   max-w-[180px] m-auto text-right`}>
                                        <p className='w-full m-auto text-base font-bold'>
                                            <span style={{ fontFamily: 'sans-serif' }}>₹</span> {!isNaN(fundAnalysis?.reduce((prev, curr) => prev + (curr.threeYear > 0 ? curr.threeYear : 0), 0)) ? formatNumber(fundAnalysis?.reduce((prev, curr) => prev + (curr.threeYear > 0 ? curr.threeYear : 0), 0), 0) : '-'}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <div>
                    {fundAnalysis && fundAnalysis.slice(0, 1).map((item, index) => (
                        <div className='md:hidden' key={index}>
                            <Accordion
                                title={<CardTitle itemKey={"fundLevelAnalysis"} />}
                                subtitle={<FundAccordionTitle name={titleCase(demo ? `Fund ${index + 1}` : item.fund_name)} amt={item.amount} performance={item.relative_performance} percentage={item.percentage * 100} />}
                                content={<FundAccordionContent oneyear={item.oneYear} twoyear={item.twoYear} threeyear={item.threeYear} />}
                                padding={false}
                            />
                        </div>)
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-5 sm:gap-6 mb-12'>
                {fundAnalysis && fundAnalysis.slice(1, fundAnalysis.length).map((item, index) => (
                    <div className='rounded-xl p-1 bg-white relative text-lg card-shadow md:hidden' key={index}>
                        <Accordion
                            title=""
                            subtitle={<FundAccordionTitle name={titleCase(demo ? `Fund ${index + 2}` : item.fund_name)} amt={item.amount} performance={item.relative_performance} percentage={item.percentage * 100} />}
                            content={<FundAccordionContent oneyear={item.oneYear} twoyear={item.twoYear} threeyear={item.threeYear} />}
                            padding={false}
                        />
                    </div>)
                )}
                <div className='rounded-xl p-1 bg-white relative text-lg card-shadow md:hidden'>
                    <Accordion
                        title=""
                        subtitle={<FundAccordionTitle name="Total" performance="" amt={fundAnalysis?.reduce((prev, curr) => prev + curr.amount, 0)} percentage={fundAnalysis?.reduce((prev, curr) => prev + curr.percentage, 0) * 100} />}
                        content={<FundAccordionContent oneyear={fundAnalysis?.reduce((prev, curr) => prev + (curr.oneYear > 0 ? curr.oneYear : 0), 0)} twoyear={fundAnalysis?.reduce((prev, curr) => prev + (curr.twoYear > 0 ? curr.twoYear : 0), 0)} threeyear={fundAnalysis?.reduce((prev, curr) => prev + (curr.threeYear > 0 ? curr.threeYear : 0), 0)} />}
                        padding={false}
                    />
                </div>
                
            </div>
        </section>
    )
}
