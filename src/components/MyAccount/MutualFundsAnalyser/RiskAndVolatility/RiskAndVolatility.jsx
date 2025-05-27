'use client'

import React, {useEffect, useState} from 'react'
import { TableHeader, formatNumber } from '../components/Table'

import {AiFillLock} from 'react-icons/ai'
import CardTitle from '../components/CardTitle';
import DoughnutChart from '../components/Doughnut.jsx'
import { FundLevelAnalysis } from './FundLevelAnalysis';
import FundLevelCard from './FundLevelCard';
import Icard from '../components/Icard'
import PortfolioTable from '../components/Table';
import ProsAndCons from '../components/ProsAndCons'
import ScoreChart from '../components/ScoreChart'
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { VolatilityAnalysis } from './VolatilityAnalysis';
import { usePathname } from 'next/navigation';

const riskColors = ['#035782', '#0CBBB8', '#39CEF3', '#2E87B9']
const volatilityLabels = ['Opposite to Market', 'Less Than Market', 'Same as Market', 'More than Market']
const volatilityHeaders = [<>Volatility</>, 'Current Value', '% of Portfolio', "No. of Funds"];
const volatilityFundLevelTableHeaders = ['Fund Name', 'Current Value', '% of Portfolio', 'Volatility']



const RiskAndVolatility = () => {
    const [data, setData] = useState(null);
    const [riskScore, setRiskScore] = useState(null);
    const [risk, setRisk] = useState(null);
    const [pros,setPros] = useState(null);
    const [cons,setCons] = useState(null);
    const [showIcard, setShowIcard] = useState(false);
    const [totalAmount, setTotalAmount] = useState(null);
    const [funds, setFunds] = useState(null);

    const pathname = usePathname();
    const demo = pathname?.includes('/demo')


	const fetchData = async () => {
			const { access_token } = Storage.getToken();
			const userApiClient = new UserApi(access_token);
			const res = await userApiClient.getPortfolioAudit();
			if (res.ok) {
				const data = await res.json()
				setData(data);
                setRiskScore(data.risk_score);
                setPros(data.pros)
                setCons(data.cons)
                setRisk(data.beta_diversification.map((it,index) => {return {...it, title:volatilityLabels[index], percentage:it.percentage*100}}))
                setTotalAmount(data.performance?.map((it) => it.amount).reduce((a,b) => a+b ,0))
                setFunds(
                    data.funds.map((it, index) => {return {fund_name: demo ? `Fund ${index + 1}` : it.fund_name, percentage:it.percentage * 100, volatilty_relative_to_market:it.volatilty_relative_to_market, amount:it.amount}})
                )
			}else{
                console.log("Something went wrong");
            }
	}

	useEffect(() => {
		fetchData();
	}, []);

    let riskMsg = ''

    if (riskScore >= 8 && riskScore <= 10) {
        riskMsg = 'Nice work! Your investments are aligned to your risk appetite.';
      } else if (riskScore >= 4 && riskScore <= 7) {
        riskMsg = 'Your investments are somewhat aligned to your risk appetite. There is scope for improvement.';
      } else if (riskScore >= 0 && riskScore <= 3) {
        riskMsg = 'You need to fix this! Your investments are completely misaligned to your risk appetite.';
      }

  return (
        <div className='flex flex-col gap-8 oy-4 px-2 md:px-6'>
            <div className='flex gap-8 flex-col sm:flex-row'>
                <div className='w-full sm:w-1/2'>
                    <ScoreChart
                        itemKey={"riskScore"}
                        score={riskScore}
                        comment={riskMsg}
                    />
                </div>
                <div className='w-full sm:w-1/2 bg-white dashboard-card text-center flex flex-col gap-4'>
                    <CardTitle itemKey={"invCorrelation"} />
                    {/* <p className='mb-0 py-0 text-base font-medium hidden md:block'>Safe and balanced amount <br /> of debt + gold holding</p> */}
                    <div className='flex flex-col justify-between h-full'>
                        <div className='max-h-[175px] my-0 mx-auto relative'>
                            <p className={`text-xl font-bold  text-primary-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit m-auto flex z-10`}>
                                <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(totalAmount/100000,1) + 'L'}
                            </p>
                            {risk &&
                                <DoughnutChart
                                    datapoints={risk.map(it => it.percentage)}
                                    labels={volatilityLabels}
                                    color={riskColors}
                                    tooltip={true}
                                    values={risk.map(it => it.amount)}
                                />
                            }
                        </div>
                        <ol className='grid grid-cols-1 xl:grid-cols-2 justify-items-start pt-3'>
                            {risk?.map((it,index) => (
                                <li key={index} className='w-11/12 m-auto text-left flex justify-between'>
                                    <div>
                                        <span className={`w-4 h-4 inline-block`} style={{backgroundColor:riskColors[index]}}></span> <span>{it.title}</span>
                                    </div>
                                    {risk && <div>{formatNumber(risk[index].percentage , 1)}%</div> }
                                </li>
                            ))}
                        </ol>
                    </div>          
                </div>
                {/* <div className='w-full sm:w-1/2 flex gap-4 flex-col'>
                </div> */}
            </div>
            <ProsAndCons pros={[]} cons={[]} flex />

            {/* <div className='flex gap-8 flex-col sm:flex-row'>
                <div className='w-full sm:w-1/2 bg-white dashboard-card text-center  flex flex-col gap-4 justify-center'>
                    <CardTitle itemKey={"invCorrelation"} />
                    <p className='mb-0 py-0 text-base font-medium hidden md:block'>Safe and balanced amount <br /> of debt + gold holding</p>
                    <div className='max-h-[175px] my-0 mx-auto relative'>
                        <p className={`text-xl font-bold  text-primary-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit m-auto flex z-10`}>
                            <span style={{fontFamily:'sans-serif'}}>₹</span> {formatNumber(totalAmount/100000,1) + 'L'}
                        </p>
                        {risk && 
                            <DoughnutChart 
                                datapoints={risk.map(it => it.percentage)} 
                                labels={volatilityLabels} 
                                color={riskColors} 
                                tooltip={true}
                                values={risk.map(it => it.amount)}
                            />
                        }
                    </div>
                    <p className='my-2 py-0 text-base font-medium md:hidden'>Safe and balanced amount <br /> of debt + gold holding</p>
                    <ol className='grid grid-cols-1 xl:grid-cols-2 justify-items-start pt-3'>
                        {risk?.map((it,index) => (
                            <li key={index} className='w-11/12 m-auto text-left flex justify-between'>
                                <div>
                                    <span className={`w-4 h-4 inline-block`} style={{backgroundColor:riskColors[index]}}></span> <span>{it.title}</span>
                                </div>
                                {risk && <div>{formatNumber(risk[index].percentage , 1)}%</div> }
                            </li>
                        ))}
                    </ol>           
                </div>

                <div className='w-full sm:w-1/2 bg-white dashboard-card text-center '>
                    <CardTitle itemKey={"debtGoldRatio"} />
                    <p className='mb-0 py-6 text-base font-medium hidden md:block'>Safe and balanced amount <br /> of debt + gold holding</p>
                    <div className='flex flex-col grow justify-center mt-6 mb-6 md:mb-0'>
                        <div className='max-h-[175px] my-0 mx-auto relative'>
                            <DoughnutChart datapoints={[100]} circumference={83/100 * 360} rotation={83/100 * 360 * 1.2} color={['#00B7B7']} />
                            <span className='text-4xl text-primary-blue font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                0.5x
                            </span>
                        </div>
                    </div>
                    <p className='my-2 py-0 text-base font-medium md:hidden'>Safe and balanced amount <br /> of debt + gold holding</p>
                </div>
           
            </div> */}

            
            <VolatilityAnalysis risk={risk} />
            <FundLevelAnalysis funds={funds} />
            {/* <section>
                <div className='w-full dashboard-card text-center flex flex-col mb-6'>
                    <CardTitle itemKey={"fundLevelAnalysis"} />
                    <div className='hidden md:block'>
                        <table className='w-full px-4'>
                            <TableHeader header={volatilityFundLevelTableHeaders} alignRight={["% of Portfolio", "Current Value"]} headerStyles={"px-4"}  />
                            <tbody>
                                {funds && funds.map((fund, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-white" : 'bg-[#99e0e0]'} text-primary-blue text-base font-bold`}>
                                        <td  className={`tabledata text-left`}>
                                            <p className='w-full '>
                                            <span className='m-0 p-0 text-base flex items-center gap-1 md:gap-3 font-medium'>
                                                {fund.title}
                                            </span>    
                                            </p> 
                                        </td>
                                        <td  className={`tabledata text-right`}>
                                            <p className='w-full font-normal'><span style={{fontFamily:'sans-serif'}}>₹</span>{formatNumber(fund.amount, 0)}</p> 
                                        </td>
                                        <td  className={`tabledata text-right`}>
                                            <p className='w-full font-normal'>{formatNumber(fund.percentage, 0)}%</p> 
                                        </td>
                                        <td  className={`tabledata text-right`}>
                                            <p className='w-full font-normal'>{fund.volatilty_relative_to_market}</p> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='md:hidden mb-10'>
                        {funds && 
                            funds.map((row, index) => 
                                <FundLevelCard key={index} fund={row.fund_name} value={row.amount} percentage={row.percentage} volatility={row.volatilty_relative_to_market}/>)
                        }
                </div>
            </section> */}
            <Icard open={showIcard} onClose={setShowIcard} />
        </div> 
  )
}

// will come on fund level analysis
// Unlock the details by enterning the code below
// input with button to submit
// Don't have the code?
// 1. Ask a friend for a code
// 2. Join the waitlist

export default RiskAndVolatility;