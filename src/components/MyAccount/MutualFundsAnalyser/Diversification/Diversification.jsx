'use client'

import React, {useEffect, useState} from 'react'

import {AiFillLock} from 'react-icons/ai'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import AssetClassCard from './AssetClassCard';
import { BiLockAlt } from 'react-icons/bi'
import CardTitle from '../components/CardTitle'
import DoughnutChart from '../components/Doughnut.jsx'
import { FundAnalysisAccess } from '@/components/FundAnalysisAccess';
import Icard from '../components/Icard'
import PortfolioTable from '../components/Table';
import ProsAndCons from '../components/ProsAndCons'
import ScoreChart from '../components/ScoreChart'
import Storage from '@/utils/storage';
import { TableHeader } from '../components/Table';
import { UserApi } from '@/api/services/user/UserApi';
import { formatNumber } from '../components/Table'
import { titleCase } from '../components/Table';
import { usePathname } from 'next/navigation'

const diversificationColors = ['#0CBBB8', '#39CEF3','#035782', '#2E87B9']
const TableHeaders = ['Asset Class', 'Current Value', '% of Portfolio', 'No. Of Funds']
const fundLevelTableHeaders = ['Fund Name', 'Current Value', '% of Portfolio', 'Asset Class']


const Diversification = () => { 
    const [data, setData] = useState(null);
    const [diversificationScore, setDiversificationScore] = useState(null);
    const [diversification, setDiversification] = useState(null);
    const [diversificationTableData, setDiversificationTableData] = useState(null);
    const [pros,setPros] = useState(null);
    const [cons,setCons] = useState(null);
    const [showIcard, setShowIcard] = useState(false);
    const [totalAmount, setTotalAmount] = useState(null)
    const [funds, setFunds] = useState(null);

    const pathname = usePathname();
    const demo = pathname?.includes('/demo');

	const fetchData = async () => {
			const { access_token } = Storage.getToken();
			const userApiClient = new UserApi(access_token);
			const res = await userApiClient.getPortfolioAudit();
			if (res.ok) {
				const data = await res.json()
				setData(data);
                setDiversificationScore(data.diversification_score)
                setPros(data.pros)
                setCons(data.cons)
                const diversificationData = data.divercification_accross_asset_class
                setDiversification(diversificationData)

                let diversificationTable = [];
                for(const key in diversificationData){
                    diversificationTable.push(
                        [titleCase(key), diversificationData[key].amount, diversificationData[key].fund_size, diversificationData[key].percentage]
                    )
                }
                setDiversificationTableData(diversificationTable);

                setFunds(
                    data.funds.map((it, index) => {return {fund_name: demo ? `Fund ${index + 1}` : it.fund_name, percentage:it.percentage * 100, asset_class:it.asset_class ?? 'Others', amount:it.amount}})
                )
                setTotalAmount(data.networth)
				
			}else{
    			console.log("Something went wrong");
            }
	}

	useEffect(() => {
		fetchData();
	}, [fetchData]);

    let diversificationMsg = ''

    if (diversificationScore >= 8 && diversificationScore <= 10) {
        diversificationMsg = 'Nice work! Your investments are well diversified.';
      } else if (diversificationScore >= 4 && diversificationScore <= 7) {
        diversificationMsg = 'Ouch! It looks like your investments are not diversified properly.';
      } else if (diversificationScore >= 0 && diversificationScore <= 3) {
        diversificationMsg = 'Oh no! Your investments are not diversified properly and need urgent attention.';
      }

  return (
        <div className='flex flex-col gap-8 px-2 md:4 '>
            <div className='flex gap-8 flex-col sm:flex-row w-full'>
                <div className='w-full sm:w-5/12 md:w-1/2 '>
                    <ScoreChart
                        itemKey={"diversificationScore"}
                        score={diversificationScore}
                        comment={diversificationMsg}
                        onShowInfo={()=> {setShowIcard(true)}}
                    />
                </div>
                <div className='w-full sm:w-5/12 md:w-1/2 dashboard-card flex gap-8 flex-col'>
                    <div className='flex gap-2 pb-2 '>
                        <CardTitle itemKey={"perfbrkd"} />
                        {/* <h5>Asset Class Breakdown</h5>
                        <AiOutlineInfoCircle size={25} className=' text-primary-blue cursor-pointer mt-1' onClick={()=> {setShowIcard(true)}}/> */}
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className='max-h-[175px] my-0 mx-auto relative'>
                            <p className={`text-xl font-bold  text-primary-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit m-auto flex`}>
                                <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber((data?.networth ?? 0)/100000,1) + 'L'}
                            </p>
                            <div className='relative max-h-[175px]'>
                                <DoughnutChart
                                    datapoints={[diversification?.debt.percentage, diversification?.equity.percentage, diversification?.others.percentage]}
                                    color={diversificationColors}
                                    labels={['Debt', 'Equity', 'Others']}
                                    tooltip={true}
                                    values={[diversification?.debt.amount, diversification?.equity.amount, diversification?.others.amount]}
                                />
                            </div>
                        </div>
                        <ol className='flex flex-col gap-2 justify-center m-auto w-full md:w-auto'>
                            <li className='flex justify-between gap-8'>
                                <div className='flex gap-2 items-center'>
                                    <span className='w-4 h-4 bg-[#0CBBB8]'></span>
                                    <p className='text-lg font-medium mb-0'>Debt</p>
                                </div>
                                <span className='text-lg font-medium'>{diversification?.debt.percentage}%</span>
                            </li>
                            <li className='flex justify-between gap-8'>
                                <div className='flex gap-2 items-center'>
                                    <span className='w-4 h-4 bg-[#39CEF3]'></span>
                                    <p className='text-lg font-medium mb-0'>Equity*</p>
                                </div>
                                <span className='text-lg font-medium'>{diversification?.equity.percentage}%</span>
                            </li>
                            <li className='flex justify-between gap-8'>
                                <div className='flex gap-2 items-center'>
                                    <span className='w-4 h-4  bg-[#069]'></span>
                                    <p className='text-lg font-medium mb-0'>Others</p>
                                </div>
                                <span className='text-lg font-medium'>{diversification?.others.percentage}%</span>
                            </li>
                        </ol>
                    </div>  
                    <div className='flex md:justify-end'>
                        *Equity also includes shares 
                    </div>
                </div>
            </div>
            <ProsAndCons pros={pros} cons={cons} flex />

            {/* <div className='flex gap-8 flex-col sm:flex-row'>
                <div className='w-full sm:w-7/12 '>
                </div>
                <div className='w-full sm:w-5/12 dashboard-card flex flex-col justify-between '>
                    <div className='flex gap-2 pb-2 '>
                        <h5 className=''>Asset Class Breakdown</h5>
                        <AiOutlineInfoCircle size={25}   className=' text-primary-blue cursor-pointer mt-1' onClick={()=> {setShowIcard(true)}}/>
                    </div>
                    <div className='max-h-[175px] my-0 mx-auto relative'>
                        <p className={`text-xl font-bold  text-primary-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit m-auto flex z-10`}>
                            <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(totalAmount/100000,1) + 'L'}
                        </p>
                        <div className='relative z-50 max-h-[175px]'>
                            <DoughnutChart 
                                datapoints={[diversification?.debt.percentage, diversification?.equity.percentage, diversification?.others.percentage]} 
                                color={diversificationColors} 
                                labels={['Debt', 'Equity', 'Others']}
                                tooltip={true}
                                values={[diversification?.debt.amount, diversification?.equity.amount, diversification?.others.amount]}
                            />
                        </div>
                    </div>
                    <ol className=' flex flex-col gap-2 justify-center pt-6 w-4/5 m-auto'>
                        <li className='flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <span className='w-4 h-4 bg-[#0CBBB8]'></span>
                                <p className='text-lg font-medium mb-0'>Debt</p>
                            </div>
                            <span className='text-lg font-medium'>{diversification?.debt.percentage}%</span>
                        </li>
                        <li className='flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <span className='w-4 h-4 bg-[#39CEF3]'></span>
                                <p className='text-lg font-medium mb-0'>Equity</p>
                            </div>
                            <span className='text-lg font-medium'>{diversification?.equity.percentage}%</span>
                        </li>   
                        <li className='flex justify-between'>
                            <div className='flex gap-2 items-center'> 
                                <span className='w-4 h-4  bg-[#069]'></span>
                                <p className='text-lg font-medium mb-0'>Others</p>
                            </div>
                            <span className='text-lg font-medium'>{diversification?.others.percentage}%</span>
                        </li> 
                    </ol>     
                </div>

                <div className='w-full sm:w-7/12 dashboard-card'>
                    <div className='px-1'>
                        <div className='flex gap-2 '>
                            <h5 className=''>Notes</h5>
                        </div>
                        <ul className='bullets listelement'>
                            <li>Your investments are highly concentrated (can be improved by reducing no of funds)</li>
                            <li>Cash is too much </li>
                            <li>Your investments are highly concentrated (can be improved by reducing no of funds)</li>
                            <li>Cash is too much </li>
                        </ul>
                    </div>
                    
                </div>
            </div> */}

            <section>
                <div className='w-full dashboard-card hidden md:block'>
                    <div className=''>
                        <CardTitle itemKey={"diversificationAnalysis"} />
                        <table className={`w-full px-4 mt-2`}>
                            <TableHeader header={TableHeaders} alignLeft={["Asset Class"]} alignRight={["% of Portfolio", "Current Value", "No. Of Funds"]} headerStyles={"px-4"} />
                            <tbody>
                            {diversificationTableData?.map((row, index1)=>(
                                <tr key={index1} className={`${index1%2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} text-primary-blue`}>
                                    <td  className={`max-w-[180px] p-4 text-left flex`}>
                                        <p className=''>{row[0]}{row[0].toLowerCase() === "equity" ? <span>*</span> : null}</p> <span className='text-transparent'>aditya birla sun life</span>
                                    </td>
                                    <td  className={`m-auto max-w-[180px] p-4  text-right`}>
                                        <p className='font-normal'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row[1],0)}</p> 
                                    </td>
                                    <td  className={`m-auto max-w-[180px] p-4  text-right`}>
                                        <p className='font-normal'>{formatNumber(row[3],1)}%</p> 
                                    </td>
                                    <td  className={`m-auto max-w-[180px] p-4  text-right`}>
                                        <p className='font-normal'>{row[2]}</p> 
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                    <td colSpan="4" className="my-4 bg-primary-blue h-1 w-full"></td>
                                </tr>
                                <tr className={` text-primary-blue text-base font-bold`}>
                                        <td  className={`mx-auto max-w-[180px] py-4 px-4 text-left`}>
                                            <p className='w-full'>
                                            <span className='m-0 font-bold p-0 text-base flex items-center gap-1 md:gap-3'>
                                                {/* <span className='rounded-full w-2 h-2 inline-block' style={{backgroundColor:perfomanceBreakDownColors[index1]}}></span> */}
                                                Total
                                            </span>    
                                            </p> 
                                        </td>
                                        <td  className={`mx-auto max-w-[180px] p-4 text-right`}>
                                            <p className='font-bold'><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(diversificationTableData?.reduce((prev, curr) => prev + curr[1], 0)) ? formatNumber(diversificationTableData?.reduce((prev, curr) => prev + curr[1], 0), 0) : '-'}</p> 
                                        </td>
                                        <td  className={`mx-auto max-w-[180px] py-4 px-4  text-right`}>
                                            <p className='font-bold'>{!isNaN(diversificationTableData?.reduce((prev, curr) => prev + curr[3], 0)) ? formatNumber(diversificationTableData?.reduce((prev, curr) => prev + curr[3], 0), 1) : '-'}%</p> 
                                        </td>
                                        <td  className={`mx-auto max-w-[180px] p-4 text-right`}>
                                            <p className='font-bold'>{!isNaN(diversificationTableData?.reduce((prev, curr) => prev + curr[2], 0)) ? formatNumber(diversificationTableData?.reduce((prev, curr) => prev + curr[2], 0), 0) : '-'}</p> 
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                        *Equit also includes shares
                    </div>
                </div>
                <div className='md:hidden'>
                    {diversificationTableData && 
                        diversificationTableData.map((item, index) => <AssetClassCard key={index} asset={item[0]} value={item[1]} percentage={item[3]} funds={item[2]}/>)
                    }
                    <AssetClassCard 
                        key={"total"} 
                        asset={"Total"} 
                        value={diversificationTableData?.reduce((prev, curr) => prev + curr[1], 0)} 
                        percentage={diversificationTableData?.reduce((prev, curr) => prev + (Number(curr[3]) || 0), 0) ? formatNumber(diversificationTableData?.reduce((prev, curr) => prev + (Number(curr[3]) || 0), 0), 1) : '-'} 
                        funds={!isNaN(diversificationTableData?.reduce((prev, curr) => prev + curr[2], 0)) ? formatNumber(diversificationTableData?.reduce((prev, curr) => prev + curr[2], 0), 0) : '-'}
                    />
                    
                </div>
            </section>

            <section className='mb-10'>
                <div className='w-full dashboard-card text-center flex flex-col mb-4'>
                    <CardTitle itemKey={"fundLevelAnalysis"} />
                    {(!funds || !funds.length) && (<div className="w-full flex flex-col items-center justify-center">
                        <FundAnalysisAccess />
                    </div>)}
                    {funds && (
                        <div className='hidden md:block'>
                            <PortfolioTable 
                                rowdata={funds} 
                                header={fundLevelTableHeaders} 
                                alignLeft={["Fund Name"]} 
                                alignRight={["% of Portfolio", "Current Value", "Asset Class"]}  
                                headerStyles={"px-4"} 
                                total={
                                    <>
                                    <tr>
                                        <td colSpan="4" className="my-4 bg-primary-blue h-1 w-full"></td>
                                    </tr>
                                    <tr className={` text-primary-blue text-base font-bold`}>
                                            <td  className={`tabledata text-left`}>
                                                <p className='w-full font-bold'>
                                                <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3'>
                                                    {/* <span className='rounded-full w-2 h-2 inline-block' style={{backgroundColor:perfomanceBreakDownColors[index1]}}></span> */}
                                                    <span >Total</span>
                                                </span>    
                                                </p> 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                <p className='font-bold'><span style={{fontFamily:'sans-serif'}}>₹</span>{!isNaN(funds?.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(funds?.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p> 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                <p className='w-full font-bold'>{!isNaN(funds?.reduce((prev, curr) => prev + (curr.percentage || 0), 0)) ? formatNumber(funds?.reduce((prev, curr) => prev + (curr.percentage || 0), 0), 0) : '-'}%</p> 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                <p className='w-[100px] font-bold'></p> 
                                            </td>
                                        </tr>
                                    </>
                                }
                            />
                        </div>
                    )}
                </div>
                <div className='md:hidden'>
                    {funds && 
                        <>
                        {funds.map((item, key) => 
                            <div className='rounded-xl p-2 bg-white relative card-shadow  mb-5' key={key}>
                                <div className='flex justify-between items-center rounded-lg py-4 px-4 bg-primary-blue text-white font-semibold'>
                                    <span className='basis-2/3'>{titleCase(item.fund_name)}</span>
                                    <p className='text-base mb-0 basis-1/3 text-right font-semibold'><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(item.amount)}</p>
                                </div>
                                <div className='flex justify-between px-4 text-primary-blue mt-3 font-medium'>
                                    <span>{item.asset_class}</span>
                                    <span>{formatNumber(item.percentage,1)}% of Portfolio</span>
                                </div>
                            </div>
                        )}
                        <div className='rounded-xl p-2 bg-white relative card-shadow  mb-5'>
                            <div className='flex justify-between items-center rounded-lg py-4 px-4 bg-primary-blue text-white font-semibold'>
                                <span className='basis-2/3'>Total</span>
                                <p className='text-base mb-0 basis-1/3 text-right font-semibold'><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(funds?.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(funds?.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p>
                            </div>
                            <div className='flex justify-between px-4 text-primary-blue mt-3 font-medium'>
                                <span></span>
                                <span>{formatNumber(funds?.reduce((prev, curr) => prev + (curr.percentage || 0), 0), 0)}% of Portfolio</span>
                            </div>
                        </div>
                        </>
                    }
                    
                </div>
            </section>

            {/* <Icard open={showIcard} onClose={()=>{setShowIcard(false)}} title="Asset Class Breakdown" details="Asset Class Breakdown - Shows your portfolio's distribution and exposure across different asset classes such as equity, debt, gold and others. This includes direct and indirect investments through mutual funds, bonds, cash in bank, fixed deposits and SGB. Demat holdings are automatically captured, investments via banks need to be manually entered." /> */}
            

        </div> 
  )
}

export default Diversification