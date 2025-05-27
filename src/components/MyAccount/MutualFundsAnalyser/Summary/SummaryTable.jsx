import CardTitle from '../components/CardTitle'
import PortfolioTable from '../components/Table'
import React from 'react'
import { formatNumber } from '../components/Table'

const SummaryTable = ({investments, header}) => {
  return (
    <section className='w-full my-10'>
        <div className='dashboard-card hidden md:block'>
            <div className=''>
                <CardTitle itemKey={'yourInvestments'} />
                <PortfolioTable  header={header} alignLeft={["Type of Investment"]} alignRight={["% of Portfolio", "Current Value"]} headerStyles={'px-4'} rowdata={investments}
                    total={
                        <>
                            <tr>
                                <td colSpan={3} className='bg-primary-blue my-4 h-1'></td>
                            </tr>
                            <tr className='font-bold'>
                                <td className='tabledata text-left'>
                                    <p className='font-bold w-full'>Total</p>
                                </td>
                                <td className='tabledata text-right'>
                                    <p className='font-bold'>
                                        <span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(investments?.reduce((prev, curr) => prev + (curr.amount ? curr.amount : 0), 0)) ? formatNumber(investments?.reduce((prev, curr) => prev + (curr.amount ? curr.amount : 0), 0), 0) : '-'}
                                    </p>
                                </td>
                                <td className='tabledata text-right'>
                                    <p className='font-bold w-full'>
                                        {!isNaN(investments?.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(investments?.reduce((prev, curr) => prev + curr.percentage, 0), 0) : '-'}%
                                    </p>
                                </td>
                            </tr>
                        </>
                    }
                />
            </div>
        </div>
        <div className="bg-white rounded-lg p-2 md:hidden text-lg">
                <div className='flex justify-between items-center bg-primary-blue rounded-md text-white p-2 px-3 font-semibold'>
                    <div>Type of Investment</div>
                    <div className='text-right'>
                        <div>Current Value</div>
                        <div>% of Portfolio</div>
                    </div>
                </div>
                {investments?.map((it,index) => (
                    <div key={index} className={`flex justify-between items-center text-primary-blue ${index%2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} rounded-md p-2 px-3 my-4 font-medium`}>
                        <div>{it.name}</div>
                        <div className='text-right'>
                           <div><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(it.amount,0) || 0}</div>
                           <div>{formatNumber(it.percentage,1) || 0}%</div>
                       </div>
                   </div> 
                ))}
                <div className='w-full bg-primary-blue h-1'></div>
                <div className={`flex justify-between items-center bg-[#99e0e0] rounded-md p-2 px-3 my-4 font-medium`}>
                    <div className='font-bold'>Total</div>
                    <div className='text-right'>
                        <div className="font-bold"><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(investments?.reduce((prev, curr) => prev + (curr.amount ? curr.amount : 0), 0),0) || 0}</div>
                        <div className="font-bold">{formatNumber(investments?.reduce((prev, curr) => prev + curr.percentage, 0), 0) || 0}%</div>
                    </div>
                </div>

                {/* <div className='w-full bg-primary-new h-1'></div>
                <div className={`flex justify-between items-center text-primary-blue rounded-md p-2 px-3 my-4`}>
                        <div className='font-bold'>Total</div>
                        <div className='text-right'>
                           <div className="font-bold"><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(investments?.reduce((prev, curr) => prev + curr.current_value, 0),0) || 0}</div>
                           <div className="font-bold">{formatNumber(investments?.reduce((prev, curr) => prev + curr.percentage, 0), 0) || 0}%</div>
                       </div>
                   </div>  */}
            </div>
    </section>
  )
}

export default SummaryTable;