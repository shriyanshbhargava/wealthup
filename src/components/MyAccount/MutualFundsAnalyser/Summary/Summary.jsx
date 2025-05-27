'use client'

import React, {useEffect, useState} from 'react'

import ProsAndCons from '../components/ProsAndCons';
import ScoreSection from './ScoreSection'
import Storage from '@/utils/storage';
import SummaryCard from './SummaryCard';
import SummaryTable from './SummaryTable';
import { UserApi } from '@/api/services/user/UserApi';
import { formatNumber } from '../components/Table'

const summaryTable  = ['Type of Investment', 'Current Value', '% of Portfolio']

const Summary = () => {
    const [currentValue, setCurrentValue] = useState(null)
    const [missedGain, setMissedGain] = useState(null)
    const [totalFunds, setTotalFunds] = useState(null)
    const [performanceScore, setPerformanceScore] = useState(null)
    const [riskScore, setRiskScore] = useState(null)
    const [investmentScore, setInvestmentScore] = useState(null)
    const [diversificationScore, setDiversificationScore] = useState(null)
    const [investments,setInvestments] = useState(null);
    const [pros,setPros] = useState(null);
    const [cons,setCons] = useState(null);
    const [fundsRed, setFundsRed] = useState(false);

    const fetchData = async () => {
        const { access_token } = Storage.getToken();
        const userApiClient = new UserApi(access_token);
        const res = await userApiClient.getPortfolioAudit();
        if (res.ok) {
            const data = await res.json()
            setPerformanceScore(Math.round(data.performance_count))
            setDiversificationScore(data.diversification_score)
            setRiskScore(data.risk_score)
            setTotalFunds(data.total_funds)
            setInvestmentScore(data.investment_score)
            // const amt = data.funds.reduce((prev, curr) => prev + curr.amount ,0)
            setCurrentValue(data.networth)
            setFundsRed(data.funds_red);
            setMissedGain(data.performance[0].oneYear)
            setPros([`${formatNumber(data.performance[2].percentage * 100,1)}% of your investments are out performing`])
            setCons([
                `${formatNumber(data.performance[0].percentage * 100,1)}% of your investments are under performing.`,
                `You missed ₹${formatNumber(data.performance[0].oneYear,0)} of additional gains from your investments last year due to under performing investments.`
            ])
        }else{
            console.log("Something went wrong");
        }

        const res2 = await userApiClient.getPortfolioAuditInvestments();
        if (res2.status === 200) {
            const json = await res2.json();
            const investmentData = json.summary;
            setInvestments(investmentData);
            // setLoading(false);
        } else if (res2.status === 404) {
            setShowCasModel(true);
            // setCasNotUploded(true);
        } else {
            toast.error("Something went wrong.");
            // setLoading(false);
        }
    }
    useEffect(() => {
		fetchData();
	}, []);

    let diagnosis = ''
    
    const averageScore = (investmentScore + performanceScore + diversificationScore + riskScore) / 4;
    
    if (averageScore >= 8 && averageScore <= 10) {
        diagnosis = 'Wow! Nice work! Looks like you’re managing your investments very well.{.break} Review the various sections to see how you can take them to the next level!';
    } else if (averageScore >= 4 && averageScore <= 7) {
        diagnosis = 'Ouch! There is significant scope of improvement in your investments.{.break} Review the various sections and contact your RM for help.';
    } else if (averageScore >= 0 && averageScore <= 3) {
        diagnosis = 'Things are not looking good for your investments. Visit all the sections to see the areas that need immediate attention.{.break} Contact your RM to start fixing critical issues in your portfolio.';
    }
        

  return (
    <div className='px-2 sm:px-6'>
        <SummaryCard missedGain={missedGain} totalFunds={totalFunds} currentValue={currentValue} fundsRed={fundsRed}/>
        <ProsAndCons pros={pros} cons={cons} actionItems={[diagnosis]} flex summary />
        <ScoreSection riskScore={riskScore} performanceScore={performanceScore} diversificationScore={diversificationScore} investmentScore={investmentScore} />
        <SummaryTable investments={investments} header={summaryTable} />
    </div>
  )
}

export default Summary