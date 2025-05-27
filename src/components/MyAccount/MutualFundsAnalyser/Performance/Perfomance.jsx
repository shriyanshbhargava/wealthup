'use client'

import React, {useEffect, useState} from 'react'

import { Accordion } from '@/components/ui/Accordion'
import {AiFillLock} from 'react-icons/ai'
import { BarChart } from '../components/BarChart'
import { BiLockAlt } from 'react-icons/bi'
import CardTitle from '../components/CardTitle'
import DoughnutChart from '../components/Doughnut.jsx'
import FundAccordionContent from './FundAccordionContent';
import FundAccordionTitle from './FundAccordionTitle'
import { FundLevelAnalysis } from './FundLevelAnalysis'
import { Input } from '@mui/material'
import {LineChart} from '../components/LineChart'
import PerformanceAccordionTitle from './PerformanceAccordionTitle';
import ProsAndCons from '../components/ProsAndCons';
import ScoreChart from '../components/ScoreChart';
import Storage from '@/utils/storage';
import Table from '@/components/ui/table'
import { TableHeader } from '../components/Table'
import { UserApi } from '@/api/services/user/UserApi';
import { formatNumber } from '../components/Table'
import { titleCase } from '../components/Table';

export const perfomanceBreakDownColors = ['#D42929','#FA8D33', '#0FD28C']
export const performanceLabels = ["Under Performing", "Avg. Performing", "Out Performing", "Total"]

const performanceAnanlysisHeaders = ["Performance","Current Value" , "% of Portfolio"]
const fundAnanlysisHeaders = ["Fund Name", "Current Value", "% of Portfolio", "Performance"]


export const formatPerformance = (performance) =>{
    let index= null;
    if(performance === "Underperformer"){
        index=0
    }else if(performance === "Average"){
        index=1;
    }else if(performance === "Outperformer"){
        index = 2;
    }else{
    }
    return {label : performanceLabels[index] , color : perfomanceBreakDownColors[index]}
}


const Perfomance = () => {
    const [performanceScore, setPerfomanceScore] = useState(null);
	const [performance, setPerformance] = useState(null);
    const [historicPerformance, setHistoricPerformance] = useState(null);
    const [historicAssets, setHistoricAssets] = useState(null);
    const [pros,setPros] = useState(null);
    const [cons,setCons] = useState(null);
    const [performanceAnalysis, setPerformanceAnalysis] = useState(null);
    const [fundAnalysis, setFundAnalysis] = useState(null);
    const [fetchAgain, setFetchAgain] = useState(false)

	const fetchData = async () => {
			const { access_token } = Storage.getToken();
			const userApiClient = new UserApi(access_token);
			const res = await userApiClient.getPortfolioAudit();
			if (res.ok) {
				const data = await res.json()
                setPerfomanceScore(Math.round(data.performance_count))
                setPerformance(data.performance)
                setPros([`${formatNumber(data.performance[2].percentage * 100,1)}% of your investments are out performing`])
                setCons([
                    `${formatNumber(data.performance[0].percentage * 100,1)}% of your investments are under performing.`,
                    `You missed ₹${formatNumber(data.performance[0].oneYear,0)} of additional gains from your investments last year due to under performing investments.`
                ])
                setPerformanceAnalysis(data.performance)
                const historicPerformance = data.historical_performance
                setHistoricPerformance([
                    {label:'1 year', id:1, value:[historicPerformance.oneYearAnnReturnData,historicPerformance.oneYearCatAvg] },
                    {label:'2 years', id:2, value:[historicPerformance.twoYearAnnReturnData,historicPerformance.twoYearCatAvg] },
                    {label:'3 years', id:3, value:[historicPerformance.threeYearAnnReturnData,historicPerformance.threeYearCatAvg] },
                    {label:'5 years', id:5, value:[historicPerformance.fiveYearAnnReturnData,historicPerformance.fiveYearCatAvg] },
                    {label:'10 years', id:10, value:[historicPerformance.tenYearAnnReturnData,historicPerformance.tenYearCatAvg] },
                ])
                const historicAssets = {labels:[], values:[]}
                for(const key in data.historical_assets_data){
                    const [month, year] = key.split(' ')
                    historicAssets.labels.push(month + " " + year.slice(2,5))
                    historicAssets.values.push(data.historical_assets_data[key])
                }
                setHistoricAssets(historicAssets);
                setFundAnalysis(data.funds);
			}else{
                console.log("Something went wrong");
            }
	}

	useEffect(() => {
		fetchData();
	}, []);

    useEffect(() => {
        if (fetchAgain === true) {
            fetchData()
            setFetchAgain(false)
        }
    }, [fetchAgain])

    let performanceMsg = '';

    if (performanceScore >= 8 && performanceScore <= 10) {
        performanceMsg = 'Nice work! Your investments are performing well.';
      } else if (performanceScore >= 4 && performanceScore <= 7) {
        performanceMsg = 'Ouch! It looks like your investments are not performing too well.';
      } else if (performanceScore >= 0 && performanceScore <= 3) {
        performanceMsg = 'Oh no! Your investments are in pretty bad shape and not performing well at all.';
      }
    
  return (
        <div className='px-2 md:px-6 xl:px-0 performance relative'>
            <div className='flex gap-8 flex-col sm:flex-row my-6 w-full'>
                <div className={`w-full sm:w-5/12 md:w-1/2 `}>
                    <ScoreChart 
                        itemKey={"performanceScore"}
                        score={performanceScore} 
                        comment={performanceMsg}
                    />
                </div>
                <div className='w-full sm:w-5/12 md:w-1/2'>
                    <div className="w-full h-full dashboard-card text-center flex flex-col gap-8">
                        <CardTitle itemKey={"performanceBD"} />
                        <div className='flex flex-col md:flex-row'>
                            <div className='max-h-[175px] my-0 mx-auto relative'>
                                <p className={`text-xl font-bold  text-primary-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit m-auto flex `}>
                                    <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(performance?.map((it) => it.amount).reduce((a,b) => a+b ,0)/100000,1) + 'L'}
                                </p>
                                <div className='relative max-h-[175px]'>
                                    <DoughnutChart
                                        datapoints={performance?.map((it) => Math.floor((it.percentage * 1000))/10)}
                                        labels={performanceLabels}
                                        color={perfomanceBreakDownColors}
                                        values={performance?.map((it) => it.amount)}
                                        tooltip={true}
                                    />
                                </div>
                            </div>
                            <ol className='flex flex-col gap-2 justify-center md:px-6 w-full md:w-auto'>
                                {performance?.map((item, index) => (
                                    <li className='flex justify-between gap-6' key={index}>
                                        <div className='flex gap-2 items-center'>
                                            <span className='w-4 h-4 ' style={{backgroundColor:perfomanceBreakDownColors[index]}}></span>
                                            <p className='text-lg font-medium mb-0'>{performanceLabels[index]}</p>
                                        </div>
                                        <span className='text-lg font-medium'>{Math.round(item.percentage * 1000)/10}%</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex gap-4 flex-col md:flex-row'>
                <ProsAndCons pros={pros} cons={cons} flex />
            </div>

            <section >
                <div className='w-full dashboard-card my-6'>
                    <div className='hidden md:block'>
                        <CardTitle itemKey={"performanceAnalysis"} />
                    </div>
                    {/* <Table 
                        headers={[
                            {
                                text: "",
                                span: 1 
                            },
                            {
                                text: "",
                                span: 1 
                            },
                            {
                                text: "",
                                span: 1 
                            },
                            {
                                text: "Missed Gains (per year)",
                                span: 3 
                            },
                        ]}
                        missedGains={true}
                        subHeaders={[
                            {text: "Performance", left: true},
                            {text: "Current Value", left: true},
                            {text: "%age of Portfolio", left: true},
                            {text: "1 Year", right: true},
                            {text: "2 Year", right: true},
                            {text: "3 Year", right: true},
                        ]}
                        rows={[
                            [{text: "test", left: true}, {text: "test2", left: true}],
                            [{text: "test", left: true}, {text: "test2", left: true}],
                            [{text: "test", left: true}, {text: "test2", left: true}],
                        ]}
                    /> */}
                    {performanceAnalysis &&
                        <>
                            <div className='hidden md:block relative'>
                                <table className={`w-full px-4`}>
                                    <TableHeader header={performanceAnanlysisHeaders} alignLeft={["Performance"]} alignRight={["Current Value", "% of Portfolio"]} headerStyles={"px-4"} missedGains />
                                    <tbody>
                                    {performanceAnalysis?.map((row, index1)=>(
                                        <tr key={index1} className={`${index1%2 === 0 ? 'bg-white' : 'bg-[#99e0e0]'} text-primary-blue text-base font-normal`}>
                                            <td  className={`tabledata text-left`}>
                                                <p className='w-full '>
                                                <span key={index1} className='m-0 p-0 text-base flex items-center gap-1 md:gap-3'>
                                                    <span className='rounded-full w-2 h-2 inline-block' style={{backgroundColor:perfomanceBreakDownColors[index1]}}></span>
                                                    <span >{performanceLabels[index1]}</span>
                                                </span>    
                                                </p> 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.amount, 0)}
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                {formatNumber(row.percentage * 100, 1)}%
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                {row.oneYear >0 ? <span><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.oneYear, 0)}</span> : '-'} 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                {row.twoYear >0 ? <span><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.twoYear, 0)}</span> : '-'}
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                {row.threeYear >0 ? <span><span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(row.threeYear, 0)}</span> : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colspan="6" className="my-4 bg-primary-blue h-1 w-full"></td>
                                    </tr>
                                    <tr className={` text-primary-blue text-base font-bold`}>
                                            <td  className={`tabledata text-left`}>
                                                <p className='w-full'>
                                                <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3 font-bold'>
                                                    Total
                                                </span>    
                                                </p> 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                <p className='font-bold'><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(performanceAnalysis.reduce((prev, curr) => prev + curr.amount, 0)) ? formatNumber(performanceAnalysis.reduce((prev, curr) => prev + curr.amount, 0), 0) : '-'}</p> 
                                            </td>
                                            <td  className={`tabledata text-right`}>
                                                <p className='font-bold'>{!isNaN(performanceAnalysis.reduce((prev, curr) => prev + curr.percentage, 0)) ? formatNumber(performanceAnalysis.reduce((prev, curr) => prev + curr.percentage, 0) * 100, 0) : '-'}%</p> 
                                            </td>
                                            <td  className={`tabledata text-right font-bold`}>
                                                <span><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(performanceAnalysis.reduce((prev, curr) => prev + (curr.oneYear > 0 ? curr.oneYear : 0), 0)) ? formatNumber(performanceAnalysis.reduce((prev, curr) => prev + (curr.oneYear > 0 ? curr.oneYear : 0), 0), 0) : '-'}</span>
                                            </td>
                                            <td  className={`tabledata text-right font-bold`}>
                                                <span><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(performanceAnalysis.reduce((prev, curr) => prev + (curr.twoYear > 0 ? curr.twoYear : 0), 0)) ? formatNumber(performanceAnalysis.reduce((prev, curr) => prev + (curr.twoYear > 0 ? curr.twoYear : 0), 0), 0) : '-'}</span>
                                            </td>
                                            <td  className={`tabledata text-right font-bold`}>
                                                <span><span style={{fontFamily:'sans-serif'}}>₹</span> {!isNaN(performanceAnalysis.reduce((prev, curr) => prev + (curr.threeYear > 0 ? curr.threeYear : 0), 0)) ? formatNumber(performanceAnalysis.reduce((prev, curr) => prev + (curr.threeYear > 0 ? curr.threeYear : 0), 0), 0) : '-'}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                {performanceAnalysis?.slice(0,1).map((item, index)=>(
                                    <div className='md:hidden' key={index}>
                                        <Accordion 
                                            title = {<CardTitle itemKey={"performanceAnalysis"} />}
                                            subtitle ={ <PerformanceAccordionTitle  index={0} amt={item.amount} percentage={item.percentage * 100}/>}
                                            content = {<FundAccordionContent oneyear={item.oneYear} twoyear={item.twoYear} threeyear={item.threeYear} />}
                                            padding={false}
                                        />
                                    </div>)            
                                )}
                            </div>
                        </>
                    }
                </div>
                <div className='flex flex-col gap-5 sm:gap-6 '>
                    {performanceAnalysis && performanceAnalysis.slice(1,3).map((item, index)=>(
                        <div className='md:hidden pb-3 rounded-xl px-1 bg-white relative card-shadow ' key={index}>
                            <Accordion 
                                title = ""
                                subtitle ={<PerformanceAccordionTitle  index={index+1} amt={item.amount} percentage={item.percentage * 100}/>}
                                content = {<FundAccordionContent oneyear={item.oneYear} twoyear={item.twoYear} threeyear={item.threeYear} />}
                                padding={false}
                            />
                        </div>)            
                    )}
                    <div className='md:hidden pb-3 rounded-xl px-1 bg-white relative card-shadow '>
                        <Accordion 
                            title = ""
                            subtitle ={<PerformanceAccordionTitle index={3} amt={performanceAnalysis?.reduce((prev, curr) => prev + curr.amount, 0)} percentage={performanceAnalysis?.reduce((prev, curr) => prev + curr.percentage, 0) * 100}/>}
                            content = {<FundAccordionContent oneyear={performanceAnalysis?.reduce((prev, curr) => prev + (curr.oneYear > 0 ? curr.oneYear : 0), 0)} twoyear={performanceAnalysis?.reduce((prev, curr) => prev + (curr.twoYear > 0 ? curr.twoYear : 0), 0)} threeyear={performanceAnalysis?.reduce((prev, curr) => prev + (curr.threeYear > 0 ? curr.threeYear : 0), 0)} />}
                            padding={false}
                        />
                    </div>
                    
                </div>
            </section>

            <div className='flex gap-8 flex-col sm:flex-row my-6 w-full'>
                <div className='w-full sm:w-1/2 dashboard-card px'>
                    <CardTitle itemKey={"historicalPerformance"} /> 
                    <div className='md:px-5'>
                        {historicPerformance && <BarChart insights={historicPerformance}/>}
                    </div>  
                    <ol className='flex justify-center md:justify-between w-full gap-3 md:w-4/5 m-auto px-4 md:px-0 pt-3 md:pt-6'>
                        <li className='flex gap-2 items-center'>
                            <span className='w-4 h-4 bg-[#069]'></span>
                            <p className='text-base md:text-lg font-medium mb-0'>Your Portfolio</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <span className='w-4 h-4 bg-[#00B7B7]'></span>
                            <p className='text-base md:text-lg font-medium mb-0'>Category Average</p>
                        </li>
                    </ol>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className='dashboard-card'>
                        <CardTitle itemKey={"historicAssetVal"} />
                        <div className='w-full h-full py-6 md:pl-9 relative'>
                            {historicAssets && <LineChart  labels={historicAssets.labels} data={historicAssets.values} />}
                        </div>
                        <div className="hidden sm:block sm:h-[46px]"></div>
                    </div>
                </div>
            </div>

            <FundLevelAnalysis fundAnalysis={fundAnalysis} fundAnanlysisHeaders={fundAnanlysisHeaders} setFetchAgain={setFetchAgain} />
        </div>     
  )
}

export default Perfomance